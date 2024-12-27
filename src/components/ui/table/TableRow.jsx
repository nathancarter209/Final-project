import React from 'react';

const TableRow = ({ children }) => {
  return (
    <tr style={{ borderBottom: '1px solid #ddd' }}>
      {children}
    </tr>
  );
};

export default TableRow;