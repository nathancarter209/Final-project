import React from 'react';

const TableCell = ({ children }) => {
  return (
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
      {children}
    </td>
  );
};

export default TableCell;