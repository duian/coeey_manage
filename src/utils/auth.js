import cookie from 'js-cookies';

// const EXPIRES = 60000;

const auth = {
  login(data, router) {
    cookie.setItem('loginStatus', true);
    cookie.setItem('loginJsons', JSON.stringify(data));
    // cookie.setItem('username', data.userName);
    router.replace('/');
  },

  logout(router) {
    cookie.removeItem('loginStatus');
    cookie.removeItem('loginJsons');
    // cookie.removeItem('username');
    if (router) {
      router.replace('/login');
    } else {
      location.href = '/login';
    }
  },

  loggedIn() {
    return !!cookie.hasItem('loginStatus');
  },
};

export default auth;
