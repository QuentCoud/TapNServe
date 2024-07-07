import axios from 'axios';


const baseURL = 'https://127.0.0.1:8000/'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'iXgIbReCGz98j2BCE8LqdjDYou6hhyIN'}
});

export default instance;