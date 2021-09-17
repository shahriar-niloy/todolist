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

        if (project.tasks) {
            viewModel.tasks = project.tasks.map(task => ({
                id: task.id,
                name: task.name,
                description: task.description,
                scheduled_at: task.scheduled_at,
                is_completed: task.is_completed,
                order: task.order,
                project_id: task.project_id,
                created_at: task.created_at,
                updated_at: task.updated_at
            }));
        }
    };

    return viewModel;
}

exports.project = project;