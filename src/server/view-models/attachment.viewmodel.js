function attachment(_attachment) {
    let viewModel = {};

    if (!attachment) return viewModel;

    viewModel.id = _attachment.id;
    viewModel.name = _attachment.name;
    viewModel.file_size = _attachment.file_size;
    viewModel.type = _attachment.type;
    viewModel.data = _attachment.data;
    viewModel.task_id = _attachment.task_id; 
    viewModel.created_at = _attachment.created_at; 
    viewModel.mimetype = _attachment.mimetype; 

    return viewModel;
}

exports.attachment = attachment;