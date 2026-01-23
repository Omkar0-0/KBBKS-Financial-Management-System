function SubmitButton({ loading, text, loadingText = 'Saving...', disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      style={{
        ...styles.button,
        ...(loading || disabled ? styles.disabled : {}),
      }}
    >
      {loading ? loadingText : text}
    </button>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  disabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};

export default SubmitButton;