import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Settings from '../../../components/app/settings/settings.component';
import PasswordFormContainer from './password-form.container';
import EmailFormContainer from './email-form.container';
import AccountFormContainer from './account-form.container';
import ThemeContainer from './theme.container';

function SettingsContainer() {
    const history = useHistory();
    const [show, setShow] = useState(true);
    
    const handleHide = () => {
        setShow(false);
        const { previousPath } = history.location.state || {};
        previousPath 
            ? history.push(previousPath, { previousPath: '' })
            : history.push('/');
    };

    return <Settings show={show} onHide={handleHide} >
        <Switch>
            <Route path="/settings/account/password"><PasswordFormContainer /></Route>
            <Route path="/settings/account/email"><EmailFormContainer /></Route>
            <Route path="/settings/account"><AccountFormContainer /></Route>
            <Route path="/settings/theme"><ThemeContainer /></Route>
        </Switch>
    </Settings>
}

export default SettingsContainer;