const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel=require('../models/blacklistToken.model');
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized: Token blacklisted'});
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error authorizing user:', error);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};
