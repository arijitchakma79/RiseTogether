import React, { useEffect, useState } from 'react';
import { filter_donation_request_by_uid } from '../../apis/donation_requests_api';
import { useAuth } from '../../contexts/AuthContext';
import { DonationRequestCard } from '../../components';
import '../../styles/dashboard/MyRequestPage.css'

const MyRequestsPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [myRequests, setMyRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchMyRequests = async () => {
      try {
        console.log('user id', user.uid);
        const { data } = await filter_donation_request_by_uid('donation_requests', user.uid);
        setMyRequests(data);
      } catch (error) {
        console.error('Error fetching user donation requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [user]);

  if (isLoading || loading) {
    return <p>Loading your requests...</p>;
  }

  return (
    <div className="my-requests-page">
      <h2>Your Requests</h2>
      {myRequests.length === 0 ? (
        <p>No donation requests found.</p>
      ) : (
        <div className="request-grid">
          {myRequests.map((req:any) => (
            <DonationRequestCard key={req.id || req.uid} request={req} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
