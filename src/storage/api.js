import axios from 'axios';
import { getUserToken } from './auth';

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = `Bearer ${getUserToken()}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function ActionGet(table, mode = 'cart') {
  return new Promise((resolve) => {
    axios
      .get(`api/${mode}/${table}`)
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        resolve({ valid: false, msg: err });
      });
  });
}

function ActionPost(table, data, mode = 'cart') {
  return new Promise((resolve) => {
    axios
      .post(`api/${mode}/${table}`, data)
      .then((res) => {
        resolve({ valid: true, msg: 'Fetch completed', data: res.data });
      })
      .catch((err) => {
        resolve({ valid: false, msg: err });
      });
  });
}

function ActionPut(table, data, mode = 'cart') {
  return new Promise((resolve) => {
    axios
      .put(`api/${mode}/${table}`, data)
      .then((res) => {
        resolve({ valid: true, msg: 'Fetch completed', data: res.data });
      })
      .catch((err) => {
        resolve({ valid: false, msg: err });
      });
  });
}

function ActionDelete(table, data, mode = 'cart') {
  return new Promise((resolve) => {
    axios
      .delete(`api/${mode}/${table}/${data.id}`)
      .then((res) => {
        resolve({ valid: true, msg: 'Fetch completed', data: res.data });
      })
      .catch((err) => {
        resolve({ valid: false, msg: err });
      });
  });
}

function ActionUpload(file) {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('file', file);
    axios
      .post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { ActionGet, ActionPost, ActionPut, ActionDelete, ActionUpload };
