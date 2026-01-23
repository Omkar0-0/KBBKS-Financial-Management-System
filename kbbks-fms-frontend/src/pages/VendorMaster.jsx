import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import { validateVendorForm } from '../utils/validation';

function VendorMaster() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contact: '',
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
    const validationErrors = validateVendorForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await addVendor(formData); // Uncomment when backend is ready
        console.log('Vendor added:', formData);
        // Reset form on success
        setFormData({
          name: '',
          category: '',
          contact: '',
        });
        setErrors({});
      } catch {
        setError('Failed to add vendor. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Vendor Master</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <FormInput
          label="Vendor Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          label="Category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
        />

        <FormInput
          label="Contact"
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitButton
          loading={loading}
          text="Add Vendor"
          loadingText="Adding..."
        />
      </form>

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
  form: {
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
}

export default VendorMaster