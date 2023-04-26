import axios, {
    type CanceledError,
    type AxiosRequestConfig,
    type AxiosError,
} from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export default api;
export { CanceledError, AxiosRequestConfig, AxiosError };
