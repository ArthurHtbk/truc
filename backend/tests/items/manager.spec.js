// Import required dependencies
const {
  readAllManagerTest,
  readManagerTest,
  createManagerTest,
  updateManagerTest,
  deleteManagerTest,
} = require("../globalManagers");

const item = "item";

const newItem = {
  title: "Sample item",
};

const updatedItem = {
  title: "Updated item",
};

readAllManagerTest(item);
readManagerTest(item, newItem);
createManagerTest(item, newItem);
updateManagerTest(item, newItem, updatedItem);
deleteManagerTest(item, newItem);
