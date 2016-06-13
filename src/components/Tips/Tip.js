import React from 'react';
import { Tag } from 'antd';

// label: 左边描述
// tip: 右边显示值
// type: antd Tag的color

const Tip = function Tip(props, key) {
  const { label, tip, color } = props;

  return (
    <div className="tip" key={key}>
      <span className="tip-label">{label}</span>
      <span>：</span>
      {parseFloat(tip, 10) ? <Tag color={color}>{tip}</Tag> : null}
    </div>
  );
};

export default Tip;
