const Database = require('../database')

class SupportController {
    connection = Database.getInstance();

    async getAll(req,res){
        this.connection.query('SELECT * FROM Support', (error, support, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(support);
          });
    }

    async getById(req,res){
        const {supportId} = req.params
        this.connection.query('SELECT * FROM Support WHERE id = ?', supportId ,(error, support, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(support);
          });
    }

    create (req,res) {
        const new_support = req.body;
        this.connection.query('INSERT INTO Support SET ?', new_support, (error, support) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(support);    
        });
      }

      
    update (req,res) {
        const {supportId} = req.params
        const updatedSupport = req.body
        this.connection.query('UPDATE Support SET ? WHERE id = ?', [updatedSupport, supportId], (error, support) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(support);    
        });
    }

    delete (req,res) {
        const {supportId} = req.params
        this.connection.query('DELETE FROM Support WHERE id = ?', supportId, (error, support) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(support);    
        });
    }
    
}

module.exports = SupportController;