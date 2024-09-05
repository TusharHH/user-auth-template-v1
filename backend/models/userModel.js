const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    otp: {
        type: Number
    }
});


userSchema.statics.hashPassword = async function (password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error('Password hashing error:', err.message);
        throw new Error('Error hashing password');
    }
};

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await this.constructor.hashPassword(this.password);
        }
        next();
    } catch (err) {
        console.error('Password pre-save error:', err.message);
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
