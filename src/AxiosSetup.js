import axios from 'axios';

const thanosApp = axios.create({
   baseURL: 'https://thanos-api.azurewebsites.net/'
 // baseURL: 'http://localhost:5000/'
});

export const groundHogApp = axios.create({
  baseURL: 'https://groundhog-api.azurewebsites.net/'
});

export default thanosApp;
