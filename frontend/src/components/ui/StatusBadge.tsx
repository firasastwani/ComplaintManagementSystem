import React from 'react';

interface StatusBadgeProps {
  status: 'Pending' | 'Resolved';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusClasses = status === 'Pending' ? 'status-pending' : 'status-resolved';
  
  return (
    <span className={`status-badge ${statusClasses} ${className}`}>
      {status}
    </span>
  );
};
