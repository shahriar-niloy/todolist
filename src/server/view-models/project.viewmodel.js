const TaskViewModels = require('./task.viewmodel');

function project(project) {
    let viewModel = {};

    if (project) {
        viewModel.id = project.id;
        viewModel.name = project.name;
        viewModel.icon = project.icon;
        
        if (project.users) {
            viewModel.users =  project.users.map(u => ({ 
                id: u.id, 
                first_name: u.first_name,
                last_name: u.last_name,
                email: u.email,
                is_owner: u.is_owner,
                can_read: u.can_read,
                can_write: u.can_write
            }));
        }

        if (project.tasks) {
            viewModel.tasks = project.tasks.map(task => TaskViewModels.task(task));
        }
    };

    return viewModel;
}

exports.project = project;