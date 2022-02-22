import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignUp from '../../../components/app/signup/signup-form.component';
import { createUserAction } from '../../../store/actions/user.actions';
import { AppSchema } from '../../../../common';

function SignUpContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleSubmit = values => {
        dispatch(createUserAction(values, () => history.push('/login')));
    };

    return <div className='signup-container'>
        <SignUp schema={AppSchema.SignupSchema} onSubmit={handleSubmit} />
    </div>;
}

export default SignUpContainer;