function task(_task) {
    let viewModel = {};

    if (!_task) return viewModel;

    viewModel.id = _task.id;
    viewModel.name = _task.name;
    viewModel.name = _task.name;
    viewModel.description = _task.description;
    viewModel.scheduled_at = _task.scheduled_at;
    viewModel.priority = _task.priority;
    viewModel.is_completed = _task.is_completed;
    viewModel.order = _task.order;
    viewModel.project_id = _task.project_id;
    viewModel.parent_task_id = _task.parent_task_id;
    viewModel.subtasks = _task.subtasks
        ? _task.subtasks.map((t) => task(t))
        : null;
    viewModel.parentTask = _task.parentTask ? task(_task.parentTask) : null;

    return viewModel;
}

function subtaskHierarchy(tasks) {
    const viewModel = [];

    if (!tasks) return viewModel;

    for (const _task of tasks) viewModel.push(task(_task));

    return viewModel;
}

exports.task = task;
exports.subtaskHierarchy = subtaskHierarchy;