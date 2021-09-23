import axios from 'axios';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (window.location.pathname !== '/login' && error?.response?.status === 401) window.location = '/login';
    return Promise.reject(error);
});

export default axios;