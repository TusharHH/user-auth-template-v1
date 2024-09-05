// Modules import
const User = require('../models/userModel');

// Helper functions
const asyncHandler = require('../utils/asyncHandler');
const sendMail = require('../utils/sendMail');

// Packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// api/v1/users/login
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: 'Please enter your email and password.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: 'Invalid email.' });
    };

    console.log(`Stored Hashed Password: ${user.password}`);
    console.log(`Entered Password: ${password}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({
        userId: user._id,
        username: user.name,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '8h' });

    user.token = token;

    const otp = Math.floor(1 + Math.random() * 1000);
    user.otp = otp;

    await user.save();

    sendMail(email, otp);

    res.json({ message: 'Login successful', token });

});

// api/v1/users/signup
const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter your name, email, and password.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email already exists.' });
    }

    const newUser = new User({
        name,
        email,
        password
    });

    const otp = Math.floor(1 + Math.random() * 1000);
    newUser.otp = otp;

    sendMail(email, otp);
    await newUser.save();

    res.status(201).json({
        message: 'User created successfully!',
        user: {
            name: newUser.name,
            email: newUser.email
        }
    });
});

// api/v1/users/send-otp
const send_otp = asyncHandler(async (req, res) => {

    const {email} = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please enter your email.' });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(400).json({ message: 'User not found.' });
    }

    const otp = Math.floor(1 + Math.random() * 1000);
    userExists.otp = otp;

    sendMail(email, otp);
    await userExists.save();

    res.json({ message: 'OTP sent successfully.' });

});

// api/v1/users/verfiy-otp
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Please Enter an email and OTP.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }

    user.otp = null;
    await user.save();

    res.json({ message: 'OTP verified successfully.' });
});

// api/v1/users/forgot-password
const reset_password = asyncHandler(async (req, res) => {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
        return res.status(400).json({ message: 'Please enter your email, password, and OTP.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }
    
    user.password = password;
    user.otp = null;

    await user.save();

    res.json({ message: 'Password reset successfully.' });
});

module.exports = {
    login,
    signup,
    verifyOtp,
    reset_password,
    send_otp,
};
