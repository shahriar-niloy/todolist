import axios from 'axios';
import publicRoutes from '../../../constants/public-routes.constants';

const publicRouteList = Object.values(publicRoutes);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (!publicRouteList.includes(window.location.pathname) && error?.response?.status === 401) window.location = '/login';
    return Promise.reject(error);
});

export default axios;