import React from 'react';

const Table = ({ children }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      {children}
    </table>
  );
};

export default Table;