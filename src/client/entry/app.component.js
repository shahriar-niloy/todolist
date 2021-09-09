import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "../components/route/routes.component";
import { getMyProfileAction } from '../store/actions/user.actions';
import './app.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyProfileAction());
    }, []);

    return <div>
        <Routes />
    </div>;
};

export default App;