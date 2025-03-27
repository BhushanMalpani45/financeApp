const express = require("express");
const { addAccount, updateAccount, deleteAccount } = require("../controllers/accountController");
const authMiddleware = require("../middlewares/auth"); // Ensure only authenticated users access routes

const router = express.Router();

router.post("/add", authMiddleware, addAccount); // Add account
router.put("/update/:id", authMiddleware, updateAccount); // Update account
router.delete("/delete/:id", authMiddleware, deleteAccount); // Delete account

module.exports = router;
