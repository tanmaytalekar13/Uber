const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service')
const {validationResult}=require('express-validator');
const blacklistTokenModel=require('../models/blacklistToken.model');
module.exports.RegisterCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname, email, password, vehicle}=req.body;
    const iscaptainAlreadyExist=await captainModel.findOne({email});
    if(iscaptainAlreadyExist){
        return res.status(400).json({message:'Captain already exist'});
    }
    const hashPassword=await captainModel.hashPassword(password);
    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,

    });
    const token=captain.generateAuthToken();
    res.status(201).json({token});
}
module.exports.loginCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid credentials'});
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token});
}
module.exports.getProfile=async(req,res)=>{
    const captain=await captainModel.findById(req.user._id);
    res.json(captain);
}
module.exports.logOutCaptain=async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:'Logged out successfully'});
}