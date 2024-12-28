const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model'); 
const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const isUserAlready=await userModel.findOne({ email: email });
    if(isUserAlready){
        return res.status(400).json({ message: 'User already exist' });
    }
    try {
        // Hash the password
        const hashPassword = await userModel.prototype.hashPassword(password);

        // Create the user
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
        });

        // Generate the token
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.loginUser = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;

    const user =await userModel.findOne({email:email}).select('+password');
    if(!user){
        return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid credentials'});
    }
    const token=user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({user,token});
}
module.exports.logOut=async (req,res) => {
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authrization.split(' ')[1];
    await blacklistTokenModel.create({token});
    
    res.status(200).json({message:'Logged out successfully'});

}
module.exports.getProfile = async (req, res) => {
    return res.status(200).json({ user: req.user });
};
