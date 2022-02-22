import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ResetPasswordForm from '../../components/app/reset-password-form.component';
import { resetPasswordAction } from '../../store/actions/user.actions';
import { AppSchema } from '../../../common';

function ResetPasswordFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const searchParams = new URLSearchParams(location.search);

    const passwordResetToken = searchParams.get('token');

    const handleSubmit = values => {
        values.password_reset_token = passwordResetToken;
        dispatch(resetPasswordAction(values, () => history.push('/login')));
    };

    return <div className='forgot-password-container'>
        <ResetPasswordForm 
            schema={AppSchema.ResetPasswordSchema}
            onSubmit={handleSubmit}
        />
    </div>
}

export default ResetPasswordFormContainer;