import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "../components/route/routes.component";
import { getMyProfileAction } from '../store/actions/user.actions';
import '../components/lib/axios';
import '../style/app.scss';
import useTheme from "../hooks/useTheme.hook";

const App = () => {
    const dispatch = useDispatch();
    useTheme([]);

    useEffect(() => {
        dispatch(getMyProfileAction());
    }, []);

    return <>
        <Routes />
    </>;
};

export default App;