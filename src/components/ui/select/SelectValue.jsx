import React from 'react';

const SelectValue = ({ placeholder, ...props }) => { 
  return (
    <span {...props}>
      {placeholder}
    </span>
  );
};

export default SelectValue;