const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "item" });
  }

  // The C of CRUD - Create operation

  async create(item) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,
      [item.title]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async update(item) {
    const { title, id } = item;

    const [response] = await this.database.query(
      `UPDATE ${this.table} SET title = ? WHERE id = ?`,
      [title, id]
    );

    return response;
  }
}

module.exports = ItemManager;
