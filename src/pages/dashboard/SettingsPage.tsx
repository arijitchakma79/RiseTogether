import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { update_user } from '../../apis/auth';
import supabase from '../../supabase/supabaseClient';
import '../../styles/dashboard/SettingsPage.css';

const SettingsPage: React.FC = () => {
  const { user, isLoading, setUser } = useAuth() as any;
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [status, setStatus] = useState('');

  const handleUpdate = async () => {
    setStatus('');
    try {
      const result = await update_user(undefined, password || undefined, fullName, phoneNumber);

      if (result.success) {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) throw error;

        const metadata = data.user.user_metadata || {};
        setUser({
          email: data.user.email!,
          uid: data.user.id,
          role: metadata.userRole || 'user',
          fullName: metadata.fullName || '',
          displayName: metadata.displayName || '',
          phoneNumber: metadata.phoneNumber || '',
        });

        setPassword('');
        setStatus('✅ Profile updated successfully!');
      } else {
        setStatus('❌ ' + result.error);
      }
    } catch {
      setStatus('❌ Failed to update profile.');
    }
  };

  if (isLoading) return <p>Loading user info...</p>;

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      <div className="settings-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          disabled
          aria-label="Email"
          placeholder="Your email"
        />
      </div>

      <div className="settings-field">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          aria-label="Full Name"
        />
      </div>

      <div className="settings-field">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          aria-label="Phone Number"
        />
      </div>

      <div className="settings-field">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          aria-label="New Password"
        />
      </div>

      <button onClick={handleUpdate}>Save Changes</button>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
};

export default SettingsPage;
