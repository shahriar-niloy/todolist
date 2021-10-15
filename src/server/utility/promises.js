function promisifyFunction() {
    const [func, ...args] = arguments;
    return Promise.resolve(func(...args));
}

exports.promisifyFunction = promisifyFunction;