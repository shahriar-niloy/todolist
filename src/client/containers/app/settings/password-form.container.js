import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PasswordForm from '../../../components/app/settings/password-form.component';
import { updateMyPasswordAction } from '../../../store/actions/user.actions';

function PasswordFormContainer() {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialValues = {
        current_password: '',
        new_password: '',
        confirm_password: ''
    }

    const handleClickback = () => history.push('/settings/account');

    const handleSubmit = values => {
        dispatch(updateMyPasswordAction(values));
    };

    return <div>
        <PasswordForm initialValues={initialValues} onClickBack={handleClickback} onSubmit={handleSubmit} />
    </div>
}

export default PasswordFormContainer;