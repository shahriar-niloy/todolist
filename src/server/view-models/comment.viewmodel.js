function comment(_comment) {
    let viewModel = {};

    if (!_comment) return viewModel;

    viewModel.id = _comment.id;
    viewModel.comment = _comment.comment;
    viewModel.user_id = _comment.user_id;
    viewModel.task_id = _comment.task_id;
    viewModel.created_at = _comment.created_at;
    viewModel.parent_id = _comment.parent_id;

    if (_comment.user) {
        viewModel.user = {
            id: _comment.user.id,
            first_name: _comment.user.first_name,
            last_name: _comment.user.last_name
        };
    }

    return viewModel;
}

exports.comment = comment;