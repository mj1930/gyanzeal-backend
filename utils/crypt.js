let bcrypt = require('bcrypt');

class Crypt {

    constructor() {

    }

    async hashPassword(password) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 12, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        });
        return hashedPassword
    }
}

module.exports = Crypt;