const crypto = require('crypto');

const encrypt = (val, key, iv) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decrypt = (encrypted, key, iv) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
};

exports.encrypt = encrypt;
exports.decrypt = decrypt;