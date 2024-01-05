// Import required dependencies
const { app, request, tables } = require("./setup");

// Test suite for the GET /api/items route
const browseRouteTest = (endpoint, table, obj) => {
  describe(`GET ${endpoint}`, () => {
    it("should fetch items successfully", async () => {
      // Create a sample item in the database
      const insertId = await tables[table].create(obj);

      // Send a GET request to the /api/items endpoint
      const response = await request(app).get(endpoint);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      // Check if the created item is present in the response
      const foundItem = response.body.find((item) => item.id === insertId);

      // Assertions
      expect(foundItem).toBeInstanceOf(Object);
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          expect(foundItem).toHaveProperty(prop);
          expect(foundItem[prop]).toBe(obj[prop]);
        }
      }
    });
  });
};

// Test suite for the GET /api/items/:id route
const readRouteTest = (endpoint, table, obj) => {
  describe(`GET ${endpoint}:id`, () => {
    it("should fetch a single item successfully", async () => {
      // Create a sample item in the database
      const insertId = await tables[table].create(obj);

      // Send a GET request to the /api/items/:id endpoint
      const response = await request(app).get(`${endpoint}${insertId}`);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(insertId);
      for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          expect(response.body).toHaveProperty(prop);
          expect(response.body[prop]).toBe(obj[prop]);
        }
      }
    });

    it("should return 404 for non-existent item", async () => {
      // Send a GET request to the /api/items/:id endpoint with an invalid ID
      const response = await request(app).get(`${endpoint}0`);

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
  });
};

// Test suite for the POST /api/items route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
const addRouteTest = (endpoint, table, obj) => {
  describe(`POST ${endpoint}`, () => {
    it("should add a new item successfully", async () => {
      // Send a POST request to the /api/items endpoint with a test item

      const response = await request(app).post(endpoint).send(obj);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.insertId).toEqual(expect.any(Number));

      // Check if the newly added item exists in the database
      const foundItem = await tables[table].read(response.body.insertId);

      // Assertions
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

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/items/:id route
const editRouteTest = (endpoint, table, obj, newObj) => {
  describe(`PUT ${endpoint}:id`, () => {
    it("should update an existing item successfully", async () => {
      // Create a sample item in the database
      const insertId = await tables[table].create(obj);

      // Send a PUT request to the /api/items/:id endpoint with updated data
      const response = await request(app)
        .put(`${endpoint}${insertId}`)
        .send(newObj);

      // Assertions
      expect(response.status).toBe(204);

      // Check if the item has been updated in the database
      const foundItem = await tables[table].read(insertId);

      // Assertions
      expect(foundItem).toBeDefined();
      for (const prop in newObj) {
        if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
          expect(foundItem).toHaveProperty(prop);
          expect(foundItem[prop]).toBe(newObj[prop]);
        }
      }
    });

    it("should return 404 error when item to update is non-existent", async () => {
      const response = await request(app).put(`${endpoint}0`).send(newObj);

      expect(response.status).toEqual(404);
    });
  });
};

// Test suite for the DELETE /api/items/:id route
const destroyRouteTest = (endpoint, table, obj) => {
  describe(`DELETE ${endpoint}:id`, () => {
    it("should delete an existing item successfully", async () => {
      // Create a sample item in the database
      const insertId = await tables[table].create(obj);

      // Send a DELETE request to the /api/items/:id endpoint
      const response = await request(app).delete(`${endpoint}${insertId}`);

      // Assertions
      expect(response.status).toEqual(204);

      // Check if the item has been deleted from the database
      const foundItem = await tables[table].read(insertId);

      // Assertions
      expect(foundItem).toBeUndefined();
    });

    it("should return 404 error when item to delete is non-existent", async () => {
      const response = await request(app).delete(`${endpoint}0`);

      expect(response.status).toEqual(404);
    });
  });
};

module.exports = {
  browseRouteTest,
  readRouteTest,
  addRouteTest,
  editRouteTest,
  destroyRouteTest,
};
