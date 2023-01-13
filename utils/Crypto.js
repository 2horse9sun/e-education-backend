const crypto = require('crypto');


const generateRandomSalt = () => {
    return crypto.randomBytes(16).toString("hex"); 
}

const generatePasswordHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); 
}

module.exports = {
    generateRandomSalt,
    generatePasswordHash
}