function Dashboard() {
  return (
    <div>
      <h2>Financial Dashboard</h2>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h4>Total Expenses</h4>
          <p>₹ 1,25,000</p>
        </div>

        <div style={styles.card}>
          <h4>Total Income</h4>
          <p>₹ 2,00,000</p>
        </div>

        <div style={styles.card}>
          <h4>Outstanding Amount</h4>
          <p>₹ 75,000</p>
        </div>
      </div>

      <div style={styles.chart}>
        Chart Placeholder
      </div>
    </div>
  )
}

const styles = {
  cards: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    flex: 1,
    border: '1px solid #ccc',
  },
  chart: {
    marginTop: '40px',
    height: '250px',
    border: '1px dashed #999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
  },
}

export default Dashboard
