// src/pages/dashboard/SubmitRequestPage.tsx
import React, { useState } from 'react';
import '../../styles/dashboard/SubmitRequestPage.css';
import { add_donation_request } from '../../apis/donation_requests_api';
import { useAuth } from '../../contexts/AuthContext';
import { uploadDonationImage } from '../../apis/upload_donation_images';
import { FormField, FileUpload } from '../../components';

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
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!user) throw new Error('You must be logged in to submit a request');

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
          <FormField
            name="title"
            value={form.title}
            onChange={handleChange}
            label="Title"
          />

          <FormField
            name="description"
            value={form.description}
            onChange={handleChange}
            label="Description"
            textarea
          />

          <FormField
            name="category"
            value={form.category}
            onChange={handleChange}
            label="Category"
            select
            options={categories}
          />

          <FormField
            name="contact_number"
            value={form.contact_number}
            onChange={handleChange}
            label="Contact Number"
          />

          <FormField
            name="contact_email"
            value={form.contact_email}
            onChange={handleChange}
            label="Contact Email (optional)"
            type="email"
          />

          <FileUpload onChange={handleFileChange} fileName={selectedFile?.name} />

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitRequestPage;