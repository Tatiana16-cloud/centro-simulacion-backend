const Database = require('../database')
const {encryptPassword, comparePassword} = require('../utils/encryption')
class UserController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM User');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(userId){
        try {
          const result = await Database.query('SELECT * FROM User WHERE id = ?', userId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_user) {
      try {
        if(!new_user.username) return {error: 'username es obligatorio para crear usuario'}

        const userResult = await Database.query('SELECT * FROM User WHERE username = ?', new_user.username);
        if(userResult.length) return {error: 'Ya existe un usuario con ese username'}

        const encrypted_password = await encryptPassword(new_user.password);
        new_user.password = encrypted_password;
        const result = await Database.query('INSERT INTO User SET ?', new_user);
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async login (username, password){
      try {
        const result = await Database.query('SELECT * FROM User WHERE username = ?', username);
        const match = await comparePassword(password, result[0].password);
        if(match) return {result}
        return {error: 'Contraseña incorrecta'}
      } catch (error) {
        return {error}
      }
    }

      
    async update (userId, updatedUser) {
        try {
          const result = await Database.query('UPDATE User SET ? WHERE id = ?', [updatedUser, userId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (userId) {
        try {
          const result = await Database.query('DELETE FROM User WHERE id = ?', userId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
    
}

module.exports = UserController;