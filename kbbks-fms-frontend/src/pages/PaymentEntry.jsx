import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import { validatePaymentForm } from '../utils/validation';

function PaymentEntry() {
  const [formData, setFormData] = useState({
    vendor: '',
    billReference: '',
    paymentMode: '',
    paymentDate: '',
    amountPaid: '',
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
    const validationErrors = validatePaymentForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await addPayment(formData); // Uncomment when backend is ready
        console.log('Payment submitted:', formData);
        // Reset form on success
        setFormData({
          vendor: '',
          billReference: '',
          paymentMode: '',
          paymentDate: '',
          amountPaid: '',
        });
        setErrors({});
      } catch {
        setError('Failed to save payment. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Payment Entry</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
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
          label="Bill Reference"
          type="text"
          name="billReference"
          value={formData.billReference}
          onChange={handleChange}
          error={errors.billReference}
          placeholder="Bill / Expense Ref No"
        />

        <FormInput
          label="Payment Mode"
          type="select"
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
          error={errors.paymentMode}
          options={[
            { value: '', label: 'Select Mode' },
            { value: 'Cash', label: 'Cash' },
            { value: 'Cheque', label: 'Cheque' },
            { value: 'NEFT / Bank Transfer', label: 'NEFT / Bank Transfer' }
          ]}
        />

        <FormInput
          label="Payment Date"
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          error={errors.paymentDate}
        />

        <FormInput
          label="Amount Paid"
          type="number"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          error={errors.amountPaid}
          placeholder="Enter amount"
        />

        <label>Upload Payment Proof</label>
        <input type="file" />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitButton
          loading={loading}
          text="Save Payment"
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

export default PaymentEntry
