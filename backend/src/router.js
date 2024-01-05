const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const cakeControllers = require("./controllers/cakeControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.post("/items", itemControllers.add);
router.put("/items/:id", itemControllers.edit);
router.delete("/items/:id", itemControllers.destroy);

router.get("/cakes", cakeControllers.browse);
router.get("/cakes/:id", cakeControllers.read);
router.put("/cakes/:id", cakeControllers.edit);
router.post("/cakes", cakeControllers.add);
router.delete("/cakes/:id", cakeControllers.destroy);

/* ************************************************************************* */

module.exports = router;
