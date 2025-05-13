import axios from 'axios';

const baseUrl = 'http://localhost:8050/api/v1';

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000, 
});
