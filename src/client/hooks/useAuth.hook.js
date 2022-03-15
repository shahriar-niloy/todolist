import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../components/toast/toast.component';
import ToastTypes from '../constants/toast.types';
import { loginActionCreator, logoutActionCreator } from '../store/actions/authenticate.action';

export default function useAuth() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    const isLoggedIn = !!profile;

    const login = async (email, password) => {
        dispatch(
            loginActionCreator(
                email, 
                password, 
                null, 
                error => showToast(ToastTypes.ERROR, error)
            )
        );    
    };

    const logout = () => dispatch(logoutActionCreator());

    return {
        isLoggedIn, 
        profile,
        login, 
        logout
    }
}