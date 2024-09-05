// Modules import
const User = require('../models/userModel');

// Helper functions
const asyncHandler = require('../utils/asyncHandler');
const sendMail = require('../utils/sendMail');

// Packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Otp templates
const signupOtpTemplate = require('../templates/signupOtpTemplate.js');
const loginOtpTemplate = require('../templates/loginOtpTemplate.js');
const resetPasswordOtpTemplate = require('../templates/resetPasswordOtpTemplate.js');

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

    res.json({ message: 'Login successful', token });

});

// api/v1/users/signup
const signup = asyncHandler(async (req, res) => {
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

    const { email, type } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Please enter your email.' });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(400).json({ message: 'User not found.' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    userExists.otp = otp;

    let subject, htmlContent;

    if (type === 'signup') {
        subject = 'Complete Your Signup - OTP Verification';
        htmlContent = signupOtpTemplate(otp, userExists.name);
    } else if (type === 'login') {
        subject = 'Login Verification OTP';
        htmlContent = loginOtpTemplate(otp, userExists.name);
    } else if (type === 'reset-password') {
        subject = 'Password Reset OTP';
        htmlContent = resetPasswordOtpTemplate(otp, userExists.name);
    }

    await userExists.save();
    await sendMail(email, subject, htmlContent);

    res.json({ message: `OTP sent for ${type}.` });
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
