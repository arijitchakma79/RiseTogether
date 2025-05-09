import React from 'react';
import '../../styles/dashboard/DonationRequestCard.css';

type Props = {
  request: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    image_url?: string;
    contact_number: string;
    contact_email?: string;
    created_by: string;
    status?: string;
    fulfilled_by?: string;
  };
  onFulfill?: (id: string) => void; 
};

const DonationRequestCard: React.FC<Props> = ({ request, onFulfill }) => {
  const isFulfilled = request.status === 'fulfilled';

  return (
    <div className="donation-card">
      {request.image_url && (
        <img src={request.image_url} alt={request.title} className="card-image" />
      )}
      <h3>{request.title}</h3>
      <p><strong>Category:</strong> {request.category}</p>
      <p>{request.description}</p>
      <p><strong>Contact:</strong> {request.contact_number}</p>
      {request.contact_email && <p><strong>Email:</strong> {request.contact_email}</p>}
      {isFulfilled ? (
        <p className="fulfilled-status"><strong>Status:</strong> Fulfilled ✅</p>
      ) : (
        onFulfill && (
          <button className="fulfill-btn" onClick={() => onFulfill(request.id)}>
            I'm Interested
          </button>
        )
      )}
    </div>
  );
};

export default DonationRequestCard;
