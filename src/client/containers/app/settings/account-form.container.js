import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountForm from '../../../components/app/settings/account-form.component';
import { updateMyProfileAction } from '../../../store/actions/user.actions';

function AccountFormContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector(state => state.user.profile);

    const handleChangePasswordClick = () => history.push('/settings/account/password');

    const handleChangeEmailClick = () => history.push('/settings/account/email');

    const handleOnSubmit = (values) => {
        dispatch(updateMyProfileAction(values));
    };

    return <AccountForm 
        profile={profile}
        onSubmit={handleOnSubmit}
        onChangeEmailClick={handleChangeEmailClick} 
        onChangePasswordClick={handleChangePasswordClick} 
    />
}

export default AccountFormContainer;