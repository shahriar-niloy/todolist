import ForgotPasswordFormContainer from '../containers/app/forgot-password-form.container';
import ResetPasswordFormContainer from '../containers/app/reset-password-form.container';
import SignUpContainer from '../containers/app/signup/signup.container';
import Login from '../containers/login.component';
import ToDoManager from '../containers/todo-manager.container';

const routeConfig = [
    { 
        path: '/login',
        exact: true,
        component: Login
    },
    { 
        path: '/sign-up',
        exact: true,
        component: SignUpContainer
    },
    { 
        path: '/reset-password',
        exact: true,
        component: ResetPasswordFormContainer
    },
    { 
        path: '/forgot-password',
        exact: true,
        component: ForgotPasswordFormContainer
    },
    { 
        path: '',
        component: ToDoManager,
        isPrivate: true
    }
]

export default routeConfig;