import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AccountForm from '../../../components/app/settings/account-form.component';
import { updateMyProfileAction } from '../../../store/actions/user.actions';
import { UserSchema } from '../../../../common';

function AccountFormContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector(state => state.user.profile);
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChangePasswordClick = () => history.push('/settings/account/password');

    const handleChangeEmailClick = () => history.push('/settings/account/email');

    const handleOnSubmit = (values) => {
        setIsPending(true);
        setIsSuccess(false);
        
        dispatch(updateMyProfileAction(values, () => {
            setIsSuccess(true);
            setIsPending(false);
        }));
    };

    return <AccountForm 
        schema={UserSchema.UserAccountFormSchema}
        profile={profile}
        isPending={isPending}
        isSuccess={isSuccess}
        onSubmit={handleOnSubmit}
        onChangeEmailClick={handleChangeEmailClick} 
        onChangePasswordClick={handleChangePasswordClick} 
    />
}

export default AccountFormContainer;