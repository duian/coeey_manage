const obj = {
};

const params = {

  getKey(type, val) {
    if (obj[type]) {
      const item = obj[type].find(o => o.name === val);
      return item ? item.key : '';
    }
    throw new Error('obj[type] is undefined');
  },

  getName(type, key) {
    if (obj[type]) {
      const item = obj[type].find(o => o.key === key);
      return item ? item.name : '';
    }
    throw new Error('obj[type] is undefined');
  },

  getItem(type, options) {
    if (options) {
      if (options.filter) {
        return obj[type].filter(item => item.name !== options.filter);
      }
    } else {
      if (obj[type]) {
        return obj[type];
      }
    }

    throw new Error('obj[type] is undefined');
  },
};

export default params;
