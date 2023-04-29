const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance.connection;
  }

  static query(query, data) {
    // devolver una promesa
    return new Promise(( resolve, reject ) => {
      this.getInstance().query(query, data, ( err, rows) => {
        if ( err ) reject( err )
        else resolve( rows )
      })
    })
  }

}

module.exports = Database;
