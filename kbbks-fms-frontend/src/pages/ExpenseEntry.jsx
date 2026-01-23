import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import { validateExpenseForm } from '../utils/validation';

function ExpenseEntry() {
  const [formData, setFormData] = useState({
    date: '',
    vendor: '',
    description: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateExpenseForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await addExpense(formData); // Uncomment when backend is ready
        console.log('Form submitted:', formData);
        // Reset form on success
        setFormData({
          date: '',
          vendor: '',
          description: '',
          amount: '',
        });
        setErrors({});
      } catch {
        setError('Failed to save expense. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Expense Entry</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <FormInput
          label="Expense Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
        />

        <FormInput
          label="Vendor"
          type="select"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          error={errors.vendor}
          options={[
            { value: '', label: 'Select Vendor' },
            { value: 'ABC Suppliers', label: 'ABC Suppliers' }
          ]}
        />

        <FormInput
          label="Expense Category / Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="e.g. Office Stationery"
        />

        <FormInput
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          placeholder="Enter amount"
        />

        <label>Upload Bill</label>
        <input type="file" />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitButton
          loading={loading}
          text="Save Expense"
          loadingText="Saving..."
        />
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
