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
        <form onSubmit={handleSubmit} className="popup-form-body">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name*"
            className="popup-input"
          />
          <input
            type="text"
            name="contact_number"
            value={form.contact_number}
            onChange={handleChange}
            required
            placeholder="Contact Number*"
            className="popup-input"
          />
          <input
            type="email"
            name="contact_email"
            value={form.contact_email}
            onChange={handleChange}
            placeholder="Email (optional)"
            className="popup-input"
          />
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            placeholder="Reason / Description*"
            className="popup-textarea"
          />
          <div className="popup-form-actions">
            <button type="submit" className="popup-submit-btn">Submit</button>
            <button type="button" className="popup-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitRequestForm;
