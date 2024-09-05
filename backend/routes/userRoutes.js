const express = require('express');
const { login, signup, verifyOtp, reset_password, send_otp } = require('../controllers/userController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.post('/forgot-password', reset_password);
router.post('/verify-otp', verifyOtp); 
router.post('/send-otp', send_otp); 

module.exports = router;
