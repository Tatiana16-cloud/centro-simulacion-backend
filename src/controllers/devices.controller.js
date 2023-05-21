const Database = require('../database')
const {main} = require('../tasks/importDevices')

const populateSuppliersQuery = `
SELECT device.*, 
Supplier.id as supplier_id, 
Supplier.name as supplier_name, 
Supplier.address as supplier_address, 
Supplier.phone_number as supplier_phone_number,
Supplier.mail as supplier_mail, 
Support_supplier.id as support_supplier_id, 
Support_supplier.name as support_supplier_name, 
Support_supplier.address as support_supplier_address, 
Support_supplier.phone_number as support_supplier_phone_number, 
Support_supplier.mail as support_supplier_mail 
FROM device 
LEFT JOIN Supplier ON device.Supplier = Supplier.id
LEFT JOIN Supplier AS Support_supplier ON device.Support_supplier = Support_supplier.id
`

class DeviceController {
  async getAll({pageSize, pageNumber}){
    try {
      let query = populateSuppliersQuery;

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
        let query = populateSuppliersQuery + ` WHERE device.id = ?`;
        const result = await Database.query(query.replace(/[\r\n]+/g, " "), deviceId);
        result.map((device)=> this.convertSupplierToObject(device))
        return {result}
      } catch (error) {
        return {error}
      }
  }

  async create (new_device) {
    try {
      new_device.deviceId = parseInt(new_device.deviceId)

      if(new_device.supplier && new_device.supplier.name){
          new_device.supplier = await this.insertNewSupplier(new_device.supplier)
      }

      if(new_device.support_supplier && new_device.support_supplier.name){
        new_device.support_supplier = await this.insertNewSupplier(new_device.support_supplier)
      }

      const result = await Database.query('INSERT INTO device SET ?', new_device);
      return {result}
    } catch (error) {
      return {error}
    }
  }

    
  async update (deviceId, updatedDevice) {
      try {
        if(updatedDevice.deviceId) updatedDevice.deviceId = parseInt(updatedDevice.deviceId)

        if(updatedDevice.supplier && updatedDevice.supplier.name){
          updatedDevice.supplier = await this.insertNewSupplier(updatedDevice.supplier)
        }else delete updatedDevice.supplier

        if(updatedDevice.support_supplier && updatedDevice.support_supplier.name){
          updatedDevice.support_supplier = await this.insertNewSupplier(updatedDevice.support_supplier)
        }else delete updatedDevice.support_supplier

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
      return {result:{OK: 200}}
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

  // Función para insertar o actualizar un registro en la tabla Supplier
  async insertNewSupplier(supplier) {
      try {
        const [existingSupplier] = await Database.query('SELECT id FROM Supplier WHERE name = ? LIMIT 1',[supplier.name]);

        if (existingSupplier?.length > 0) {
          return existingSupplier[0].id;
        } else {
          const result = await Database.query('INSERT INTO Supplier SET ?',supplier);
          return result.insertId;
        }
      } catch (error) {
        throw error;
      }
  }
}

module.exports = DeviceController;