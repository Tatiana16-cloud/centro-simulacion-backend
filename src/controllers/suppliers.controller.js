const Database = require('../database')

class SupplierController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM Supplier');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(supplierId){
        try {
          const result = await Database.query('SELECT * FROM Supplier WHERE id = ?', supplierId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_supplier) {
      try {
        const result = await Database.query('INSERT INTO Supplier SET ?', new_supplier);
        return {result}
      } catch (error) {
        return {error}
      }
    }

      
    async update (supplierId, updatedSupplier) {
        try {
          const result = await Database.query('UPDATE Supplier SET ? WHERE id = ?', [updatedSupplier, supplierId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (supplierId) {
        try {
          const result = await Database.query('DELETE FROM Supplier WHERE id = ?', supplierId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
}

module.exports = SupplierController;