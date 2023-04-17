const Database = require('../database')

class UserController {
    connection = Database.getInstance();

    async getAll(req,res){
        this.connection.query('SELECT * FROM User', (error, users, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(users);
          });
    }

    async getById(req,res){
        const {userId} = req.params
        this.connection.query('SELECT * FROM User WHERE id = ?', userId ,(error, user, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(user);
          });
    }

    create (req,res) {
        const new_user = req.body;
        this.connection.query('INSERT INTO users SET ?', new_user, (error, user) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(user);    
        });
      }

      
    update (req,res) {
        const {userId} = req.params
        const updatedUser = req.body
        this.connection.query('UPDATE User SET ? WHERE id = ?', [updatedUser, userId], (error, user) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(so);    
        });
    }

    delete (req,res) {
        const {userId} = req.params
        this.connection.query('DELETE FROM User WHERE id = ?', userId, (error, user) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(user);    
        });
    }
    
}

module.exports = UserController;