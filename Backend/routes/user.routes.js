const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authmiddleware=require('../middlewares/auth.middleware');

/**
 * @route POST /users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),

], 
userController.registerUser
);

/**
 * @route POST /users/login
 * @desc Login an existing user
 * @access Public
 */
router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),

],
userController.loginUser
);

/**
 * @route GET /users/profile
 * @desc Get the profile of the logged-in user
 * @access Private
 */
router.get('/profile',authmiddleware.authUser,userController.getProfile);

/**
 * @route GET /users/logout
 * @desc Logout the logged-in user
 * @access Private
 */
router.get('/logout',authmiddleware.authUser,userController.logOut);

module.exports = router;

