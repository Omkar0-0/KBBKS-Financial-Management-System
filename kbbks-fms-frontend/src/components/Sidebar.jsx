function Sidebar({ setPage }) {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.menu}>
        <li onClick={() => setPage('dashboard')}>Dashboard</li>
        <li onClick={() => setPage('vendors')}>Vendor Master</li>
        <li onClick={() => setPage('expense')}>Expense Entry</li>
        <li onClick={() => setPage('payment')}>Payment Entry</li>
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
