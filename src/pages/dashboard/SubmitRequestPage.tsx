// src/pages/dashboard/SubmitRequestPage.tsx
import React, { useState} from 'react';
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
  const {user} = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    contact_number: '',
    contact_email: '',

  })
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
        created_by: user.uid
      }

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
  }
  
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Submit a Donation Request</h2>

      {success && <p style={{ color: 'green' }}>✅ Request submitted successfully!</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        /><br /><br />

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select><br /><br />

        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={form.contact_number}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email (optional)"
          value={form.contact_email}
          onChange={handleChange}
        /><br /><br />

        <label>Upload Image (optional):</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default SubmitRequestPage;
