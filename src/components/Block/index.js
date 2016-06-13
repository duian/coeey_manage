import React from 'react';
import './_block';

const Block = function Block({ children, className, ...props }) {
  return (
    <div className={className ? `block ${className}` : 'block'} {...props}>{children}</div>
  );
};

export default Block;
