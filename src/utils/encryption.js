
const bcrypt = require('bcrypt')

const encryptPassword = (password) =>{
    return bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(password, salt, null)
    }).then(hash => {
        return hash
    })
}

const comparePassword = (password, encryptedPassword) => {
    return bcrypt.compare(password, encryptedPassword).then( res =>{
        return res
    })
}

module.exports = {
    encryptPassword,
    comparePassword
}