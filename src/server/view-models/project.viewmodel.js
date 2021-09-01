function project(project) {
    let viewModel = {};

    if (project) {
        viewModel.id = project.id;
        viewModel.name = project.name;

        if (project.users) {
            viewModel.users =  project.users.map(u => ({ 
                id: u.id, 
                first_name: u.first_name,
                last_name: u.last_name,
                email: u.email,
                is_owner: u?.user_profile?.is_owner || false
            }));
        }
    };

    return viewModel;
}

exports.project = project;