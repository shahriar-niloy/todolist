function success(data, metadata) {
    this.data = data || {};
    this.metadata = metadata || {};
}

function error(errors) {
    this.errors = errors || [];
}

exports.success = success;
exports.error = error;