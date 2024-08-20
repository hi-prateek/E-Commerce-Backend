const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, updateStock } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../middlewares/auth");

router.param("productId", getProductById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

router.get("/products", getAllProducts);

module.exports = router;
