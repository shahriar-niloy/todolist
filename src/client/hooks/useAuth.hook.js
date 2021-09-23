import { useDispatch, useSelector } from 'react-redux';
import { loginActionCreator, logoutActionCreator } from '../store/actions/authenticate.action';

export default function useAuth() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();

    const isLoggedIn = !!profile;

    const login = async (email, password) => {
        dispatch(loginActionCreator(email, password));    
    };

    const logout = () => dispatch(logoutActionCreator());

    return {
        isLoggedIn, 
        profile,
        login, 
        logout
    }
}