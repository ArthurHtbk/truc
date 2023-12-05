const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.post("/items", itemControllers.add);
router.put("/items/:id", itemControllers.edit);
router.delete("/items/:id", itemControllers.destroy);

/* ************************************************************************* */

module.exports = router;
