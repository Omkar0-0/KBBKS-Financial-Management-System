<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $allowedFields = [
        'name',
        'email',
        'password',
        'role',
        'token',
        'reset_token',
        'reset_token_expires_at'
    ];
    protected $returnType = 'array';
}
