const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const {
  addProduct,
  getAllProducts,
} = require("../controllers/productControlller");
const router = express.Router();

router.post("/product", addProduct);
router.get("/profile", getUserProfile);
router.get("/products", getAllProducts);
module.exports = router;
