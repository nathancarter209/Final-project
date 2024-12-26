import React from 'react';

const TableHeader = ({ children }) => {
  return (
    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
      {children}
    </th>
  );
};

export default TableHeader;