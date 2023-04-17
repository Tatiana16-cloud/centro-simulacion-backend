const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'database_PIS3'
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance.connection;
  }
}

module.exports = Database;
