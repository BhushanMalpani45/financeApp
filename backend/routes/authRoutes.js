const express = require('express');
const { registerUser, login, logout } = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post("/signup", registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/dashboard', authMiddleware,(req,res)=>{
    res.status(200).json({message: "Dashboard"});
})

module.exports = router;