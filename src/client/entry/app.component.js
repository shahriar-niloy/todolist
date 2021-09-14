import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "../components/route/routes.component";
import { getMyProfileAction } from '../store/actions/user.actions';
import '../style/app.scss';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProfileAction());
    }, []);

    return <>
        <Routes />
    </>;
};

export default App;