const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [3, 'Email must be at least 3 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});

// Generate Auth Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash Password
userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
