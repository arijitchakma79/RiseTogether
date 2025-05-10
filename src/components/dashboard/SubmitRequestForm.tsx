// src/components/SubmitRequestForm.tsx
import React, { useState } from 'react';
import '../../styles/dashboard/SubmitRequestForm.css';

type Props = {
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    contact_number: string;
    contact_email?: string;
    reason: string;
  }) => void;
};

const SubmitRequestForm: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    contact_number: '',
    contact_email: '',
    reason: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="popup-form-overlay">
      <div className="popup-form">
        <h3>Submit a Donation Request</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name*:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Contact Number*:
            <input type="text" name="contact_number" value={form.contact_number} onChange={handleChange} required />
          </label>
          <label>
            Email (optional):
            <input type="email" name="contact_email" value={form.contact_email} onChange={handleChange} />
          </label>
          <label>
            Reason / Description*:
            <textarea name="reason" value={form.reason} onChange={handleChange} required />
          </label>
          <div className="popup-form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitRequestForm;
