function success(data, metadata) {
    this.data = data || {};
    this.metadata = metadata || {};
}

function error(errors) {
    this.errors = errors || [];
    
    this.addError = (message, code) => this.errors = [...this.errors, { code, message }];
    this.hasError = () => this.errors.length > 0;
}

exports.success = success;
exports.error = error;