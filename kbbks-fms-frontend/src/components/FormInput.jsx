function FormInput({ label, type = 'text', name, value, onChange, error, placeholder, options = [] }) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          style={styles.input}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={styles.input}
        />
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    margin: 0,
  },
};

export default FormInput;