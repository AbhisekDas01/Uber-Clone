import express from 'express'
import {body} from 'express-validator'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';


const userRouter = express.Router();

//the body middleware is used to validate the body inputs
userRouter.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 char long'),
    body('password').isLength({min: 6}).withMessage('Password must be of 6 char long')
] ,registerUser)


//user log in route
userRouter.post('/login' , [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be 6 char long")
] , loginUser);

//get user profile
userRouter.get('/profile' , authUser , getUserProfile);

//logout user
userRouter.get('/logout' , authUser , logoutUser);

export default userRouter;