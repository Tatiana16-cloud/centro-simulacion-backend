const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2134jdvr',
      database: 'database_PIS3'
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
