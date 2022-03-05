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
    const [timer, setTimer] = useState(null);

    const handleChangePasswordClick = () => history.push('/settings/account/password');

    const handleChangeEmailClick = () => history.push('/settings/account/email');

    const handleOnSubmit = (values) => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        };

        setIsPending(true);
        setIsSuccess(false);

        dispatch(updateMyProfileAction(values, () => {
            setIsSuccess(true);
            setIsPending(false);

            setTimer(
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsPending(false);
                    setTimer(null);
                }, 4000)
            );
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