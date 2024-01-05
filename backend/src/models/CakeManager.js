const AbstractManager = require("./AbstractManager");

class CakeManager extends AbstractManager {
  constructor() {
    super({ table: "cake" });
  }

  async create(cake) {
    const {
      name,
      main_ingredient: mainIngredient,
      price,
      origin,
      has_gluten: hasGluten,
      has_dairy: hasDairy,
      has_peanuts: hasPeanuts,
      description,
    } = cake;
    const [result] = await this.database.query(
      `insert into ${this.table} (name, main_ingredient,
  price,
  origin,
  has_gluten,
  has_dairy,
  has_peanuts,
  description) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        mainIngredient,
        price,
        origin,
        hasGluten,
        hasDairy,
        hasPeanuts,
        description,
      ]
    );

    return result.insertId;
  }

  async update(cake) {
    const {
      name,
      main_ingredient: mainIngredient,
      price,
      origin,
      has_gluten: hasGluten,
      has_dairy: hasDairy,
      has_peanuts: hasPeanuts,
      description,
      id,
    } = cake;

    const [response] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, main_ingredient = ?, price = ?, origin = ?, has_gluten = ?, has_dairy = ?, has_peanuts = ?, description = ? WHERE id = ?`,
      [
        name,
        mainIngredient,
        price,
        origin,
        hasGluten,
        hasDairy,
        hasPeanuts,
        description,
        id,
      ]
    );

    return response;
  }
}

module.exports = CakeManager;
