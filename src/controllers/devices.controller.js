const Database = require('../database')

class DeviceController {
    connection = Database.getInstance();

    async getAll(req,res){
        this.connection.query('SELECT * FROM device', (error, device, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(device);
          });
    }

    async getById(req,res){
        const {deviceId} = req.params
        this.connection.query('SELECT * FROM device WHERE id = ?', deviceId ,(error, device, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(device);
          });
    }

    create (req,res) {
        const new_device = req.body;
        this.connection.query('INSERT INTO device SET ?', new_device, (error, device) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(device);    
        });
      }

      
    update (req,res) {
        const {deviceId} = req.params
        const updatedDevice = req.body
        this.connection.query('UPDATE device SET ? WHERE id = ?', [updatedDevice, deviceId], (error, device) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(device);    
        });
    }

    delete (req,res) {
        const {deviceId} = req.params
        this.connection.query('DELETE FROM device WHERE id = ?', deviceId, (error, device) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(device);    
        });
    }
    
}

module.exports = DeviceController;