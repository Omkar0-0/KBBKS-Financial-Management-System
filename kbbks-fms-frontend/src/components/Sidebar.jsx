function Sidebar({ setPage, currentRole }) {
  // Roles definition - can be moved to a constants file later
  const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    VIEWER: 'VIEWER'
  };

  const menuItems = [
    { label: 'Dashboard', page: 'dashboard', roles: [ROLES.ADMIN, ROLES.USER, ROLES.VIEWER] },
    { label: 'Vendor Master', page: 'vendors', roles: [ROLES.ADMIN] },
    { label: 'Expense Entry', page: 'expense', roles: [ROLES.ADMIN, ROLES.USER] },
    { label: 'Payment Entry', page: 'payment', roles: [ROLES.ADMIN, ROLES.USER] }
  ];

  return (
    <div style={styles.sidebar}>
      <ul style={styles.menu}>
        {menuItems
          .filter(item => item.roles.includes(currentRole))
          .map(item => (
            <li key={item.page} onClick={() => setPage(item.page)}>
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#eaeaea',
    padding: '20px',
    cursor: 'pointer',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}

export default Sidebar
