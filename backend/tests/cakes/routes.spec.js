const {
  browseRouteTest,
  readRouteTest,
  editRouteTest,
  addRouteTest,
  destroyRouteTest,
} = require("../globalRoutes");

const endpoint = "/api/cakes/";

const cake = "cake";

const newCake = {
  name: "Tarte au citron meringuée",
  price: 32,
};

const updatedCake = {
  name: "Tarte au citron meringuée",
  price: 34,
};

browseRouteTest(endpoint, cake, newCake);
readRouteTest(endpoint, cake, newCake);
editRouteTest(endpoint, cake, newCake, updatedCake);
addRouteTest(endpoint, cake, newCake);
destroyRouteTest(endpoint, cake, newCake);
