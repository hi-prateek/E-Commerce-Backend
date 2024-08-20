const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../middlewares/auth");
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require("../controllers/category");

router.param("categoryId", getCategoryById);

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;
