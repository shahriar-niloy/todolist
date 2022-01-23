function escapeWildcards (str) {
    return str.replace(/(_|%)/gm, '\\$1');
}

function performLogicalAnd (array) {
    if (!array) return false;
    return array.reduce((prev, cur) => prev && !!cur, true);
}

exports.escapeWildcards = escapeWildcards;
exports.performLogicalAnd = performLogicalAnd;