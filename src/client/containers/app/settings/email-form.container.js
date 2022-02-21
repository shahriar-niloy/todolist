import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EmailForm from '../../../components/app/settings/email-form.component';
import { updateMyEmailAction } from '../../../store/actions/user.actions';

function EmailFormContainer() {
    const profile = useSelector(state => state.user.profile);
    const history = useHistory();
    const dispatch = useDispatch();

    const initialValues = {
        email: profile?.email,
        password: ''
    }

    const handleClickback = () => history.push('/settings/account');

    const handleSubmit = values => {
        dispatch(updateMyEmailAction(values));
    };

    return <EmailForm initialValues={initialValues} onClickBack={handleClickback} onSubmit={handleSubmit} />
}

export default EmailFormContainer;