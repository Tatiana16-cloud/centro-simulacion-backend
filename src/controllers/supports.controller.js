const Database = require('../database')

class SupportController {
  async getAll(){
    try {
      const result = await Database.query('SELECT * FROM Support');
      return {result}
    } catch (error) {
      return {error}
    }
  }

  async getById(supportId){
      try {
        const result = await Database.query('SELECT * FROM Support WHERE id = ?', supportId);
        return {result}
      } catch (error) {
        return {error}
      }
  }

  async create (new_support) {
    try {
      const result = await Database.query('INSERT INTO Support SET ?', new_support);
      return {result}
    } catch (error) {
      return {error}
    }
  }

    
  async update (supportId, updatedSupport) {
      try {
        const result = await Database.query('UPDATE Support SET ? WHERE id = ?', [updatedSupport, supportId]);
        return {result}
      } catch (error) {
        return {error}
      }
  }

  async delete (supportId) {
      try {
        const result = await Database.query('DELETE FROM Support WHERE id = ?', supportId);
        return {result}
      } catch (error) {
        return {error}
      }
  }
    
}

module.exports = SupportController;