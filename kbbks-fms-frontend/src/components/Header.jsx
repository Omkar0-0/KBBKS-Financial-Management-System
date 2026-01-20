function Header({ onLogout }) {
  return (
    <div style={styles.header}>
      <h3>KBBKS – FMS</h3>
      <div style={styles.rightSection}>
        <span>Role: Accounts</span>
        <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </div>
  )
}

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    borderBottom: '1px solid #ccc',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logoutButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}

export default Header
