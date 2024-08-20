const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../middlewares/auth");
const { addProductToWishlist, getWishlistByUserId, removeProductFromWishlist } = require("../controllers/wishlist");

router.post("/wishlist/add/:userId", isSignedIn, isAuthenticated, addProductToWishlist);
router.get("/wishlist/:userId", isSignedIn, isAuthenticated, getWishlistByUserId);
router.delete("/wishlist/remove/:wishlistId/:userId", isSignedIn, isAuthenticated, removeProductFromWishlist);

module.exports = router;
