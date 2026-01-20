function Login({ onLogin }) {
  const handleLogin = () => {
    // Here you can add actual authentication logic later
    onLogin()
  }

  return (
    <div style={styles.container}>
      <h2>KBBKS – Financial Management System</h2>

      <div style={styles.form}>
        <label>Email</label>
        <input type="email" placeholder="Enter email" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}

export default Login
