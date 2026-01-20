function VendorMaster() {
  return (
    <div>
      <h2>Vendor Master</h2>

      <button style={styles.addBtn}>Add Vendor</button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>ABC Suppliers</td>
            <td>Stationery</td>
            <td>9876543210</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  addBtn: {
    marginBottom: '15px',
    padding: '8px 12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
}

export default VendorMaster