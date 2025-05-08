import React from 'react';
import '../../styles/dashboard/DonationFilterBar.css';

type Props = {
  category: string;
  onCategoryChange: (category: string) => void;
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
  status: string;
  onStatusChange: (status: string) => void;
};

const categories = [
  '',
  'Food',
  'Education',
  'Clothes',
  'Healthcare',
  'Electronics',
  'Financial',
  'Others',
];

const statuses = ['', 'pending', 'fulfilled'];

const DonationFilter: React.FC<Props> = ({
  category,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  status,
  onStatusChange
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDateRangeChange({ ...dateRange, [name]: value });
  };

  return (
    <div className="filter-bar">
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === '' ? 'All' : cat}
          </option>
        ))}
      </select>

      <label htmlFor="status-select">Status:</label>
      <select
        id="status-select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        {statuses.map((stat) => (
          <option key={stat} value={stat}>
            {stat === '' ? 'All' : stat}
          </option>
        ))}
      </select>

      <label htmlFor="date-from">From:</label>
      <input
        type="date"
        name="from"
        id="date-from"
        value={dateRange.from}
        onChange={handleDateChange}
      />
      <label htmlFor="date-to">To:</label>
      <input
        type="date"
        name="to"
        id="date-to"
        value={dateRange.to}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DonationFilter;
