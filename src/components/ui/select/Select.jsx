import React from 'react';

const Select = ({ children, onValueChange, defaultValue, ...props }) => { 
  return (
    <select onChange={(e) => onValueChange(e.target.value)} defaultValue={defaultValue} {...props}> 
      {children}
    </select>
  );
};

export default Select;