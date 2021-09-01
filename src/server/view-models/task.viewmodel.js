function task(task) {
    let viewModel = {};

    if (task) {
        viewModel.id = task.id;
        viewModel.name = task.name;
        viewModel.name = task.name;
        viewModel.description = task.description;
        viewModel.scheduled_at = task.scheduled_at;
        viewModel.is_completed = task.is_completed;
        viewModel.order = task.order; 
        viewModel.project_id = task.project_id;
    };

    return viewModel;
}

exports.task = task;