import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

function isAuthenticated() {
  return localStorage.getItem('isAuthenticated');
}

function getUserToken() {
  return localStorage.getItem('user-token');
}

function getUserName() {
  return localStorage.getItem('username');
}

function getUserRole() {
  return localStorage.getItem('role');
}

function ActionSignOut() {
  return new Promise((resolve) => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user-token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    resolve(true);
  });
}

function ActionSignIn(username, password) {
  if (username === '' && password === '') {
    return { valid: false, msg: 'username or password is empty' };
  }
  return new Promise((resolve) => {
    const params = JSON.stringify({ username, password });
    axios
      .post('api/auth', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('username', username);
        localStorage.setItem('user-token', res.data.accessToken);
        resolve({ valid: true, msg: 'Sign in completed' });
      })
      .catch(() => {
        resolve({ valid: false, msg: 'username or password is wrong' });
      });
  });
}

export {
  isAuthenticated,
  getUserToken,
  getUserName,
  getUserRole,
  ActionSignOut,
  ActionSignIn,
};
