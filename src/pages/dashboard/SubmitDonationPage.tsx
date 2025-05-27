// src/pages/dashboard/SubmitRequestPage.tsx

import React, { useState } from 'react';
import '../../styles/dashboard/SubmitRequestPage.css';
import { add_donation_request } from '../../apis/donation_requests_api';
import { useAuth } from '../../contexts/AuthContext';
import { uploadDonationImage } from '../../apis/upload_donation_images';

const categories = [
  'Food',
  'Education',
  'Clothes',
  'Healthcare',
  'Electronics',
  'Financial',
  'Others',
];

const SubmitRequestPage: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    contact_number: '',
    contact_email: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!user?.uid) throw new Error('You must be logged in to submit a request');
      const imageUrl = await uploadDonationImage(selectedFile, user.uid, form.category);

      const request = {
        ...form,
        image_url: imageUrl,
        created_by: user.uid,
      };

      await add_donation_request('donation_requests', request);
      setSuccess(true);
      setForm({
        title: '',
        description: '',
        category: '',
        contact_number: '',
        contact_email: '',
      });
      setSelectedFile(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-request-container">
      <div className="submit-request-left">
        <h2>Welcome</h2>
        <p>Thank you for choosing to donate. Your generosity brings change.</p>
      </div>

      <div className="submit-request-right">
        <h2 className="form-title">Submit a Donation Request</h2>

        {success && <p className="success-msg">✅ Request submitted successfully!</p>}
        {error && <p className="error-msg">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="donation-form">
          {['title', 'description', 'contact_number', 'contact_email'].map((field) => (
            <div className="form-field" key={field}>
              <input
                type={field === 'contact_email' ? 'email' : 'text'}
                name={field}
                placeholder={field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                className="field-input"
                required={field !== 'contact_email'}
              />
              <label className="field-label">
                {field === 'contact_email'
                  ? 'Contact Email (optional)'
                  : field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
            </div>
          ))}
          <div className="form-field">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="select"
              aria-label="Category"
              required
            >
              <option value="" disabled hidden>
                Select a Category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label className="field-label">Category</label>
          </div>

          <div className="form-field">
            <label className="upload-button">
              Choose File
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            {selectedFile && <p className="upload-filename">{selectedFile.name}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitRequestPage;
