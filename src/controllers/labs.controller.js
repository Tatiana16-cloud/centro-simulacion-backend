const Database = require('../database')

class LabsController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM Lab');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(labsId){
        try {
          const result = await Database.query('SELECT * FROM Lab WHERE id = ?', labsId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_labs) {
      try {
        const result = await Database.query('INSERT INTO Lab SET ?', new_labs);
        return {result}
      } catch (error) {
        return {error}
      }
    }

      
    async update (labsId, updatedLabs) {
        try {
          const result = await Database.query('UPDATE Lab SET ? WHERE id = ?', [updatedLabs, labsId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (labsId) {
        try {
          const result = await Database.query('DELETE FROM Lab WHERE id = ?', labsId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
}

module.exports = LabsController;