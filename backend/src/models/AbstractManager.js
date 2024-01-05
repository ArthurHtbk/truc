// Import database client
const database = require("../../database/client");

// Provide database access through AbstractManager class
class AbstractManager {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async delete(id) {
    const [response] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return response;
  }
}

// Ready to export
module.exports = AbstractManager;
