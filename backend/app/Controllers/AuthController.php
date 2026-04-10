<?php

namespace App\Controllers;

use App\Models\UserModel;
use Config\Services;

class AuthController extends BaseController
{
    private const RESET_TOKEN_TTL_SECONDS = 900; // 15 minutes
    private const RESET_MAX_REQUESTS = 3;

    // REGISTER NEW USER
    public function register()
    {
        // Accept both JSON and form data
        $input = $this->request->getJSON(true) ?: $this->request->getPost();
        
        $name = $input['name'] ?? null;
        $email = $input['email'] ?? null;
        $password = $input['password'] ?? null;
        $role = $input['role'] ?? null;

        if (!$name || !$email || !$password || !$role) {
            return $this->response->setJSON([
                'status'  => false,
                'message' => 'All fields are required'
            ]);
        }

        $userModel = new UserModel();

        if ($userModel->where('email', $email)->first()) {
            return $this->response->setJSON([
                'status'  => false,
                'message' => 'Email already registered'
            ]);
        }

        $userModel->insert([
            'name' => $name,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'role' => $role
        ]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'User registered successfully'
        ]);
    }

    // LOGIN USER
    public function login()
    {
        // Accept both JSON and form data
        $input = $this->request->getJSON(true) ?: $this->request->getPost();
        
        $email    = $input['email'] ?? null;
        $password = $input['password'] ?? null;

        if (!$email || !$password) {
            return $this->response->setJSON([
                'status'  => false,
                'message' => 'Email and password are required'
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response->setJSON([
                'status'  => false,
                'message' => 'Invalid email or password'
            ]);
        }

        // Generate and store token
        $token = bin2hex(random_bytes(32));

        $userModel->update($user['user_id'], [
            'token' => $token
        ]);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
            'role' => $user['role'],
            'user_id' => $user['user_id'],
            'name' => $user['name']
        ]);
    }

    // FORGOT PASSWORD - generate reset token
    public function forgotPassword()
    {
        $input = $this->request->getJSON(true) ?: $this->request->getPost();
        $email = strtolower(trim((string)($input['email'] ?? '')));

        if (!$email) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Email is required'
            ]);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Please enter a valid email'
            ]);
        }

        // Basic throttling by email + IP (prevents brute-force request spamming)
        $ipAddress = (string)$this->request->getIPAddress();
        $cache = cache();
        $throttleKey = 'forgot_pwd_' . sha1($email . '|' . $ipAddress);
        $attemptCount = (int)($cache->get($throttleKey) ?? 0);
        if ($attemptCount >= self::RESET_MAX_REQUESTS) {
            return $this->response->setStatusCode(429)->setJSON([
                'status'  => false,
                'message' => 'Too many reset requests. Try again after some time.'
            ]);
        }
        $cache->save($throttleKey, $attemptCount + 1, self::RESET_TOKEN_TTL_SECONDS);

        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();

        // Do not reveal whether email exists.
        if (!$user) {
            return $this->response->setJSON([
                'status'  => true,
                'message' => 'If the email is registered, password reset instructions have been sent.'
            ]);
        }

        $plainToken = bin2hex(random_bytes(32));
        $hashedToken = hash('sha256', $plainToken);
        $expiresAt = date('Y-m-d H:i:s', time() + self::RESET_TOKEN_TTL_SECONDS);

        $userModel->update($user['user_id'], [
            'reset_token' => $hashedToken,
            'reset_token_expires_at' => $expiresAt
        ]);

        $frontendBase = rtrim((string)env('app.frontendURL', 'http://localhost:5173'), '/');
        $resetLink = $frontendBase . '/login?mode=reset&email=' . rawurlencode($email) . '&token=' . rawurlencode($plainToken);

        $emailService = Services::email();
        $emailService->setTo($email);
        $emailService->setSubject('Reset your KBBKS FMS password');
        $emailService->setMessage(
            "Hello,\n\n" .
            "We received a request to reset your password.\n\n" .
            "Click this link to reset your password:\n" .
            $resetLink . "\n\n" .
            "This link expires in 15 minutes.\n" .
            "If you did not request this, please ignore this email.\n"
        );

        // We keep the response generic in both success/failure to avoid user enumeration.
        // On mail failure, token remains stored for TTL and can be retried by user.
        try {
            $emailService->send();
        } catch (\Throwable $e) {
            // Intentionally swallow; do not leak email-system internals to clients.
        }

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'If the email is registered, password reset instructions have been sent.'
        ]);
    }

    // RESET PASSWORD - verify token and set new password
    public function resetPassword()
    {
        $input = $this->request->getJSON(true) ?: $this->request->getPost();
        $email = strtolower(trim((string)($input['email'] ?? '')));
        $token = trim((string)($input['token'] ?? ''));
        $newPassword = (string)($input['new_password'] ?? '');

        if (!$email || !$token || !$newPassword) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Email, token and new password are required'
            ]);
        }

        if (strlen($newPassword) < 6) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'New password must be at least 6 characters'
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();

        if (!$user || empty($user['reset_token']) || empty($user['reset_token_expires_at'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Invalid or expired reset token'
            ]);
        }

        if (strtotime((string)$user['reset_token_expires_at']) < time()) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Reset token expired'
            ]);
        }

        $hashedInputToken = hash('sha256', $token);
        if (!hash_equals($user['reset_token'], $hashedInputToken)) {
            return $this->response->setStatusCode(400)->setJSON([
                'status'  => false,
                'message' => 'Invalid or expired reset token'
            ]);
        }

        $userModel->update($user['user_id'], [
            'password' => password_hash($newPassword, PASSWORD_DEFAULT),
            'reset_token' => null,
            'reset_token_expires_at' => null
        ]);

        return $this->response->setJSON([
            'status'  => true,
            'message' => 'Password reset successfully. Please login with your new password.'
        ]);
    }
}
