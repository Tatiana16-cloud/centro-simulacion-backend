const Database = require('../database')

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
        const result = await Database.query('INSERT INTO User SET ?', new_user);
        return {result}
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