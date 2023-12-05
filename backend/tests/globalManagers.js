const { database, tables } = require("./setup");
const { generatePlaceholders } = require("../src/services/utils");

const readAllManagerTest = (table) => {
  describe("Read all items", () => {
    it("should read all items successfully", async () => {
      const response = await tables[table].readAll();

      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeDefined();
      expect(response[0]).toBeInstanceOf(Object);
    });
  });
};

const readManagerTest = (table, obj) => {
  describe("Read item", () => {
    it("should read item with corresponding ID", async () => {
      const placeholders = generatePlaceholders(obj);
      const values = Object.values(obj);
      const keys = Object.keys(obj);

      const [result] = await database.query(
        `insert into ${tables[table].table} (${keys}) values (${placeholders})`,
        values
      );

      const response = await tables[table].read(result.insertId);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Object);

      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          expect(response).toHaveProperty(prop);
          expect(response[prop]).toBe(obj[prop]);
        }
      }
    });
  });
};

const createManagerTest = (table, obj) => {
  describe("Create item", () => {
    it("should create an item successfully", async () => {
      const insertId = await tables[table].create(obj);

      const [rows] = await database.query(
        `select * from ${tables[table].table} where id = ?`,
        insertId
      );

      const foundItem = rows[0];

      expect(foundItem).toBeDefined();
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          expect(foundItem).toHaveProperty(prop);
          expect(foundItem[prop]).toBe(obj[prop]);
        }
      }
    });
  });
};

const updateManagerTest = (table, obj, newObj) => {
  describe("Update item", () => {
    it("should successfully update given item", async () => {
      const placeholders = generatePlaceholders(obj);
      const values = Object.values(obj);
      const keys = Object.keys(obj);

      const [result] = await database.query(
        `insert into ${tables[table].table} (${keys}) values (${placeholders})`,
        values
      );

      const updatedItem = {
        ...newObj,
        id: result.insertId,
      };

      await tables[table].update(updatedItem);

      const [rows] = await database.query(
        `select * from ${tables[table].table} where id = ?`,
        [result.insertId]
      );

      const foundItem = rows[0];

      expect(foundItem).toBeDefined();
      expect(foundItem).toBeInstanceOf(Object);
      for (const prop in newObj) {
        if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
          expect(foundItem).toHaveProperty(prop);
          expect(foundItem[prop]).toBe(newObj[prop]);
        }
      }
    });
  });
};

const deleteManagerTest = (table, obj) => {
  describe("Delete item", () => {
    it("should successfully delete given item", async () => {
      const placeholders = generatePlaceholders(obj);
      const values = Object.values(obj);
      const keys = Object.keys(obj);

      const [result] = await database.query(
        `insert into ${tables[table].table} (${keys}) values (${placeholders})`,
        values
      );

      await tables[table].delete(result.insertId);

      const [item] = await database.query(
        `select * from ${tables[table].table} where id = ?`,
        [result.insertId]
      );

      expect(item.length).toEqual(0);
    });
  });
};

module.exports = {
  readAllManagerTest,
  readManagerTest,
  createManagerTest,
  updateManagerTest,
  deleteManagerTest,
};
