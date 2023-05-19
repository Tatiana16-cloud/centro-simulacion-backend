const Database = require('../database')

class PlacesController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM Place');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(placesId){
        try {
          const result = await Database.query('SELECT * FROM Place WHERE id = ?', placesId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_places) {
      try {
        const result = await Database.query('INSERT INTO Place SET ?', new_places);
        return {result}
      } catch (error) {
        return {error}
      }
    }

      
    async update (placesId, updatedPlaces) {
        try {
          const result = await Database.query('UPDATE Place SET ? WHERE id = ?', [updatedPlaces, placesId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (placesId) {
        try {
          const result = await Database.query('DELETE FROM Place WHERE id = ?', placesId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
}

module.exports = PlacesController;