import React from 'react';
import Tip from './Tip';
import './_tips';

const Tips = function Tips(props) {
  return (
    <div className="tips">
      {props.tips.map(Tip)}
    </div>
  );
};

export default Tips;
