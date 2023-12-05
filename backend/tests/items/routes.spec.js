// Import required dependencies
const {
  browseRouteTest,
  readRouteTest,
  editRouteTest,
  addRouteTest,
  destroyRouteTest,
} = require("../globalRoutes");

const endpoint = "/api/items/";

const item = "item";

const newItem = {
  title: "Sample item",
};

const updatedItem = {
  title: "Updated item",
};

browseRouteTest(endpoint, item, newItem);
readRouteTest(endpoint, item, newItem);
editRouteTest(endpoint, item, newItem, updatedItem);
addRouteTest(endpoint, item, newItem);
destroyRouteTest(endpoint, item, newItem);
