function PaymentEntry() {
  return (
    <div>
      <h2>Payment Entry</h2>

      <form style={styles.form}>
        <label>Vendor</label>
        <select>
          <option>Select Vendor</option>
          <option>ABC Suppliers</option>
        </select>

        <label>Bill Reference</label>
        <input type="text" placeholder="Bill / Expense Ref No" />

        <label>Payment Mode</label>
        <select>
          <option>Select Mode</option>
          <option>Cash</option>
          <option>Cheque</option>
          <option>NEFT / Bank Transfer</option>
        </select>

        <label>Payment Date</label>
        <input type="date" />

        <label>Amount Paid</label>
        <input type="number" placeholder="Enter amount" />

        <label>Upload Payment Proof</label>
        <input type="file" />

        <button type="button">Save Payment</button>
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

export default PaymentEntry
