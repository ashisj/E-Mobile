import axios from 'axios';

//const host = 'http://localhost:4000/api';

export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const setForm = () => {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
}

export const call = async (method, path, data) => {
  const response = await axios[method](`${path}`, data);
  return response.data;
};

export default { setForm,setToken, call };