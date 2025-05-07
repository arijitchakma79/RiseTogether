import React from 'react';
import '../../styles/dashboard/Pagination.css';

type Props = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                ◀️ Prev
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next ▶️
            </button>
        </div>

    )
};

export default Pagination;