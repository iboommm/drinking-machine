import { reactive } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

function useLoginForm(props) {
  const loginFrom = reactive(props);

  async function onClickSubmit() {
    const { username, password } = loginFrom;
    if (username === '' && password === '') {
      loginFrom.msg = 'username or password has empty.';
      loginFrom.valid = false;
      return;
    }
    return new Promise((resolve, reject) => {
      const params = JSON.stringify(loginFrom);
      axios
        .post('api/auth', params, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('username', loginFrom.username);
          localStorage.setItem('user-token', res.data.accessToken);
          loginFrom.msg = 'Login completed, redirect in 3 sec.';
          loginFrom.valid = true;
          setTimeout(() => {
            location.reload();
          });
          resolve();
        })
        .catch((error) => {
          loginFrom.msg = 'username or password has wrong.';
          loginFrom.valid = false;
          reject(error);
        });
    });
  }

  return { loginFrom, onClickSubmit };
}

export default { useLoginForm };
