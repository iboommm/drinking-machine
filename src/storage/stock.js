import axios from 'axios';
import { getUserToken } from './auth';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${getUserToken()}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function GetStock(id, mode = 'cart') {
  id = id || 1;
  return new Promise((resolve) => {
    axios
      .get(`api/${mode}/stockWithId/${id}`)
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        resolve({ valid: false, msg: err });
      });
  });
}

export { GetStock };
