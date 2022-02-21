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
        path: '',
        component: ToDoManager,
        isPrivate: true
    }
]

export default routeConfig;