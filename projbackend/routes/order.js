const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../middlewares/auth");
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");
const { updateStock } = require("../controllers/product");

router.param("orderId", getOrderById);

router.post("/order/create/:userId", isSignedIn, isAuthenticated, updateStock, createOrder);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
