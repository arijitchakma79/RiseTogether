import React from "react";

type Props = {
    onFilter: (category: string) => void;
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


const DonationFilterBar : React.FC<Props> = ({ onFilter }) => {
    return (
        <div className="filter-bar">
          <label htmlFor="category">Filter by Category: </label>
          <select id="category" onChange={(e) => onFilter(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === '' ? 'All' : cat}
              </option>
            ))}
          </select>
        </div>
    );
}

export default DonationFilterBar