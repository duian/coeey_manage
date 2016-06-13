import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const renderOptions = function options(items) {
  if (!Object.prototype.toString.call(items).slice(-6, -1) === 'Array') {
    throw new TypeError('list is not a array');
  }
  return items.map((item, index) =>
    <Option value={item.key} key={index}>{item.name}</Option>
  );
};

export default renderOptions;
