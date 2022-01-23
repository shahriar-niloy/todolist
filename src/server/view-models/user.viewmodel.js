function profile(user) {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...( user.projects 
                ?   
                    {
                        projects: user.projects.map(up => ({
                            id: up.id, 
                            name: up.name,
                            is_owner: up.user_project.is_owner,
                            is_shared: !up.user_project.is_owner,
                            can_write: up.user_project.can_write,
                            can_read: up.user_project.can_read
                        }))  
                    }
                :   {}
            )
    }
}

function projects(user) {
    let viewModel = [];

    if (user && user.projects) viewModel = user.projects.map(up => ({ 
        id: up.id, 
        name: up.name,
        is_owner: up.user_project.is_owner,
        is_shared: !up.user_project.is_owner
    }));

    return viewModel;
}

exports.profile = profile;
exports.projects = projects;