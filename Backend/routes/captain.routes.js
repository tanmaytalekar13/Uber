const express=require('express');
const captainController = require('../controllers/captain.controller');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware');
const {body} = require('express-validator');


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Vehicle type must be car, motorcycle or auto'),

],captainController.RegisterCaptain
);
router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),

],captainController.loginCaptain
);
router.get('/profile', authMiddleware.authCaptain, captainController.getProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logOutCaptain);
module.exports=router;
