import axios from 'axios';
import publicRoutes from '../../../constants/public-routes.constants';

const publicRouteList = Object.values(publicRoutes);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (!publicRouteList.includes(window.location.pathname) && error?.response?.status === 401) window.location = '/login';
    return Promise.reject(error);
});

let numberOfPendingRequests = 0;

function setLoading(isLoading) {
    if (isLoading) {
        numberOfPendingRequests++;
        document.getElementById('loader').style = 'display: flex';
    } else if (numberOfPendingRequests > 0) {
        numberOfPendingRequests--;
        if (numberOfPendingRequests > 0) document.getElementById('loader').style = 'display: flex';
        else document.getElementById('loader').style = 'display: none';
    }
}

axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    setLoading(false);
    return response;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

export default axios;