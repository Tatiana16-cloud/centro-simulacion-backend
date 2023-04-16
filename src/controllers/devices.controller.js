const Database = require('../database')

class DeviceController {
    connection = Database.getInstance();

    async getAll(req,res){
        this.connection.query('SELECT * FROM equipos', (error, equipos, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(equipos);
          });
    }

    async getById(req,res){
        const {deviceId} = req.params
        this.connection.query('SELECT * FROM equipos WHERE id = ?', deviceId ,(error, equipo, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(equipo);
          });
    }

    create (req,res) {
        const new_device = req.body;
        this.connection.query('INSERT INTO equipos SET ?', new_device, (error, equipo) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(equipo);    
        });
      }

      
    update (req,res) {
        const {deviceId} = req.params
        const updatedDevice = req.body
        this.connection.query('UPDATE equipos SET ? WHERE id = ?', [updatedDevice, deviceId], (error, equipo) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(equipo);    
        });
    }

    delete (req,res) {
        const {deviceId} = req.params
        this.connection.query('DELETE FROM equipos WHERE id = ?', deviceId, (error, equipo) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(equipo);    
        });
    }
    
}

module.exports = DeviceController;