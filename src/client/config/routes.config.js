import Login from '../containers/login.component';
import ToDoManager from '../containers/todo-manager.container';

const routeConfig = [
    { 
        path: '/login',
        exact: true,
        component: Login
    },
    { 
        path: '',
        component: ToDoManager,
        isPrivate: true
    }
]

export default routeConfig;