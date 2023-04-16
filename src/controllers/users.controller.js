const Database = require('../database')

class UserController {
    connection = Database.getInstance();

    async getAll(req,res){
        this.connection.query('SELECT * FROM usuarios', (error, usuarios, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(usuarios);
          });
    }

    async getById(req,res){
        const {userId} = req.params
        this.connection.query('SELECT * FROM usuarios WHERE id = ?', userId ,(error, usuario, fields) => {
            if (error) {
              console.error(error);
              return;
            }
          
            return res.status(200).send(usuario);
          });
    }

    create (req,res) {
        const new_user = req.body;
        this.connection.query('INSERT INTO usuarios SET ?', new_user, (error, usuario) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(usuario);    
        });
      }

      
    update (req,res) {
        const {userId} = req.params
        const updatedUser = req.body
        this.connection.query('UPDATE usuarios SET ? WHERE id = ?', [updatedUser, userId], (error, usuario) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(so);    
        });
    }

    delete (req,res) {
        const {userId} = req.params
        this.connection.query('DELETE FROM usuarios WHERE id = ?', userId, (error, usuario) => {
          if (error) {
            console.error(error);
            return;
          }

          return res.status(200).send(usuario);    
        });
    }
    
}

module.exports = UserController;