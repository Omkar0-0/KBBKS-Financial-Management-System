function ExpenseEntry() {
  return (
    <div>
      <h2>Expense Entry</h2>

      <form style={styles.form}>
        <label>Expense Date</label>
        <input type="date" />

        <label>Vendor</label>
        <select>
          <option>Select Vendor</option>
          <option>ABC Suppliers</option>
        </select>

        <label>Expense Category / Description</label>
        <input type="text" placeholder="e.g. Office Stationery" />

        <label>Amount</label>
        <input type="number" placeholder="Enter amount" />

        <label>Upload Bill</label>
        <input type="file" />

        <button type="button">Save Expense</button>
      </form>
    </div>
  )
}

const styles = {
  form: {
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}

export default ExpenseEntry
