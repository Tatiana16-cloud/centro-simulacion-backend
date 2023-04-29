const Database = require('../database')
const {main} = require('../tasks/importDevices')

class DeviceController {
  async getAll({pageSize, pageNumber}){
    try {
      let query = `
      SELECT device.*, 
      Supplier.id as supplier_id, 
      Supplier.name as supplier_name, 
      Supplier.address as supplier_address, 
      Supplier.phone_number as supplier_phone_number,
      Support_supplier.id as support_supplier_id, 
      Support_supplier.name as support_supplier_name, 
      Support_supplier.address as support_supplier_address, 
      Support_supplier.phone_number as support_supplier_phone_number 
      FROM device 
      LEFT JOIN Supplier ON device.Supplier = Supplier.id
      LEFT JOIN Supplier AS Support_supplier ON device.Support_supplier = Support_supplier.id;
      `;

      const offset = (pageNumber - 1) * pageSize;
      if(offset) query = query + ` LIMIT ${pageSize} OFFSET ${offset};`

      const result = await Database.query(query.replace(/[\r\n]+/g, " "));
      result.map((device)=> this.convertSupplierToObject(device))
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

  async loadDatabase(){
    try {
      const result = await main()
      return {result:{a:4}}
    } catch (error) {
      return {error}
    }
  }

  convertSupplierToObject(device){
    device.supplier = {
      id: device.supplier_id,
      name : device.supplier_name,
      phone_number : device.supplier_phone_number,
      mail : device.supplier_mail,
      address : device.supplier_address,    
    }
    device.support_supplier = {
        id: device.support_supplier_id,
        name : device.support_supplier_name,
        phone_number : device.support_supplier_phone_number,
        mail : device.support_supplier_mail,
        address : device.support_supplier_address,    
    }

    delete device.supplier_name; 
    delete device.supplier_phone_number; 
    delete device.supplier_mail;
    delete device.supplier_address;

    delete device.support_supplier_name; 
    delete device.support_supplier_phone_number; 
    delete device.support_supplier_mail;
    delete device.support_supplier_address;

    return device
  }
}

module.exports = DeviceController;