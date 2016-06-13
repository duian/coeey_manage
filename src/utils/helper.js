// import timeHelper from './time';
export function isObject(obj) {
  return (Object.prototype.toString.call(obj).slice(-7, -1) === 'Object');
}

export function mergeObj(objA, objB, ...other) {
  let obj = {};
  if (!isObject(objA)) {
    return obj;
  }

  if (typeof objA === 'object' && typeof objB === 'undefined') {
    obj = Object.assign({}, objA);
  } else {
    obj = Object.assign({}, objA, objB, other);
  }

  return obj;
}

export function removeEmptyProperty(obj) {
  if (!isObject(obj)) {
    throw new Error;
  }

  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}
