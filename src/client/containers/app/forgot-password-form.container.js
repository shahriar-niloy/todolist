import React from 'react';
import { useDispatch } from 'react-redux';
import ForgotPasswordForm from '../../components/app/forgot-password-form.component';
import { forgotPasswordAction } from '../../store/actions/user.actions';
import { AppSchema } from '../../../common';
import { useHistory } from 'react-router-dom';

function ForgotPasswordFormContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = values => {
        dispatch(forgotPasswordAction(values, () => history.push('/login')));
    };

    return <div className='forgot-password-container'>
        <ForgotPasswordForm schema={AppSchema.ForgotPasswordSchema} onSubmit={handleSubmit} />
    </div>
}

export default ForgotPasswordFormContainer;