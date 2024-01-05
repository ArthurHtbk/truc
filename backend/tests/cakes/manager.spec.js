const {
  readAllManagerTest,
  readManagerTest,
  createManagerTest,
  updateManagerTest,
  deleteManagerTest,
} = require("../globalManagers");

const cake = "cake";

const newCake = {
  name: "Tarte au citron meringuée",
  price: 32,
};

const updatedCake = {
  name: "Tarte au citron meringuée",
  price: 34,
};

readAllManagerTest(cake);
readManagerTest(cake, newCake);
createManagerTest(cake, newCake);
updateManagerTest(cake, newCake, updatedCake);
deleteManagerTest(cake, newCake);
