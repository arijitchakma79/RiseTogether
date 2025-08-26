import React, { useEffect, useState } from 'react';
import { 
  get_all_donation_request, 
  update_donation_request 
} from '../../apis/donation_requests_api';
import DonationFilter from '../../components/dashboard/DonationFilter';
import Pagination from '../../components/dashboard/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

interface DonationRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'approved' | 'fulfilled';
  created_at: string;
  contact_number: string;
  contact_email?: string;
  image_url?: string;
  created_by: string;
  fulfilled_by?: string;
}

interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  fulfilled: number;
}

const ITEMS_PER_PAGE = 12;

const AdminPanel: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<DonationRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDates, setFilterDates] = useState({ from: '', to: '' });
  
  // Stats
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    pending: 0,
    approved: 0,
    fulfilled: 0
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [requests, filterCategory, filterStatus, filterDates]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await get_all_donation_request('donation_requests');
      if (response.data) {
        console.log('Fetched requests:', response.data); // Add logging
        setRequests(response.data);
      } else {
        console.log('No requests data in response'); // Add logging
      }
    } catch (err: any) {
      console.error('Error fetching requests:', err); // Add logging
      setError(err.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    if (filterCategory) {
      filtered = filtered.filter(req => req.category === filterCategory);
    }

    if (filterStatus) {
      filtered = filtered.filter(req => req.status === filterStatus);
    }

    if (filterDates.from && filterDates.to) {
      filtered = filtered.filter(req => {
        const createdAt = new Date(req.created_at);
        return createdAt >= new Date(filterDates.from) && 
               createdAt <= new Date(filterDates.to);
      });
    }

    setFilteredRequests(filtered);
    setCurrentPage(1);
  };

  const calculateStats = () => {
    const total = requests.length;
    const pending = requests.filter(req => req.status === 'pending').length;
    const approved = requests.filter(req => req.status === 'approved').length;
    const fulfilled = requests.filter(req => req.status === 'fulfilled').length;
    
    setStats({ total, pending, approved, fulfilled });
  };

  const handleStatusChange = async (requestId: string, newStatus: 'pending' | 'approved' | 'fulfilled') => {
    try {
      await update_donation_request('donation_requests', requestId, { status: newStatus });
      
      // Update local state
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update request status');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    }
  };

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const StatCard: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
    <div className={`stat-card ${color}`}>
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );

  const AdminActionCard: React.FC<{ request: DonationRequest }> = ({ request }) => (
    <div className="admin-request-card">
      <div className="request-header">
        <h4>{request.title}</h4>
        <span className={`status-badge ${request.status}`}>
          {request.status.toUpperCase()}
        </span>
      </div>
      
      <div className="request-info">
        <p><strong>Category:</strong> {request.category}</p>
        <p><strong>Contact:</strong> {request.contact_number}</p>
        <p><strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
        {request.description && (
          <p><strong>Description:</strong> {request.description.substring(0, 100)}...</p>
        )}
      </div>

      <div className="admin-actions">
        <button
          className="approve-btn"
          onClick={() => handleStatusChange(request.id, 'approved')}
          disabled={request.status === 'approved'}
        >
          Approve
        </button>
        <button
          className="fulfill-btn"
          onClick={() => handleStatusChange(request.id, 'fulfilled')}
          disabled={request.status === 'fulfilled'}
        >
          Mark Fulfilled
        </button>
        <button
          className="pending-btn"
          onClick={() => handleStatusChange(request.id, 'pending')}
          disabled={request.status === 'pending'}
        >
          Mark Pending
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-text">
            <h1>🛠️ Admin Control Panel</h1>
            <p>Manage donation requests and monitor platform activity</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {error && (
        <div className="admin-error">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Statistics Dashboard */}
      <section className="stats-section">
        <h2>📊 Overview</h2>
        <div className="stats-grid">
          <StatCard title="Total Requests" value={stats.total} color="blue" />
          <StatCard title="Pending" value={stats.pending} color="yellow" />
          <StatCard title="Approved" value={stats.approved} color="green" />
          <StatCard title="Fulfilled" value={stats.fulfilled} color="purple" />
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h2>🔍 Filter Requests</h2>
        <DonationFilter
          category={filterCategory}
          onCategoryChange={setFilterCategory}
          dateRange={filterDates}
          onDateRangeChange={setFilterDates}
          status={filterStatus}
          onStatusChange={setFilterStatus}
        />
      </section>

      {/* Requests Management */}
      <section className="requests-section">
        <h2>📋 Manage Requests ({filteredRequests.length})</h2>
        
        {paginatedRequests.length === 0 ? (
          <div className="no-requests">
            <p>No requests found with current filters.</p>
          </div>
        ) : (
          <div className="requests-grid">
            {paginatedRequests.map(request => (
              <AdminActionCard key={request.id} request={request} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={filteredRequests.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default AdminPanel;
  