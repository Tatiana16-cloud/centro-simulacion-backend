const Database = require('../database')

class DeviceController {
  async getAll(){
    try {
      const result = await Database.query('SELECT * FROM device');
      return {result}
    } catch (error) {
      return {error}
    }
  }

  async getById(deviceId){
      try {
        const result = await Database.query('SELECT * FROM device WHERE id = ?', deviceId);
        return {result}
      } catch (error) {
        return {error}
      }
  }

  async create (new_device) {
    try {
      const result = await Database.query('INSERT INTO device SET ?', new_device);
      return {result}
    } catch (error) {
      return {error}
    }
  }

    
  async update (deviceId, updatedDevice) {
      try {
        const result = await Database.query('UPDATE device SET ? WHERE id = ?', [updatedDevice, deviceId]);
        return {result}
      } catch (error) {
        return {error}
      }
  }

  async delete (deviceId) {
      try {
        const result = await Database.query('DELETE FROM device WHERE id = ?', deviceId);
        return {result}
      } catch (error) {
        return {error}
      }
  }
}

module.exports = DeviceController;