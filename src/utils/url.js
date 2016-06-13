const host = 'http://localhost:8089';
const prefix = '/api/';
// 接口地址
let url = {
  login: 'user',
};

const addHost = (u) => {
  for (const _u in u) {
    if (u.hasOwnProperty(_u)) {
      url[_u] = `${host}${prefix}${url[_u]}`;
    }
  }
  return url;
};

url = addHost(url);

export default url;
