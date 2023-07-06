const Database = require('../database')

class PracticesController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM Practice');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(practicesId){
        try {
          const result = await Database.query('SELECT * FROM Practice WHERE id = ?', practicesId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_practices) {
      try {
        const result = await Database.query('INSERT INTO Practice SET ?', new_practices);
        return {result}
      } catch (error) {
        return {error}
      }
    }

      
    async update (practicesId, updatedPractices) {
        try {
          const result = await Database.query('UPDATE Practice SET ? WHERE id = ?', [updatedPractices, practicesId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (practicesId) {
        try {
          const result = await Database.query('DELETE FROM Practice WHERE id = ?', practicesId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
}

module.exports = PracticesController;