import userModel from "../models/user.model.js";
import {validationResult} from 'express-validator'
import userService from "../services/user.service.js";

export const registerUser = async (req ,res, next ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { fullname: {firstname , lastname} , email , password} = req.body;

        // Check if user already exists
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname , 
            lastname , 
            email , 
            password: hashedPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({
            token, user
        })
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req , res , next) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    try {
        
        const {email , password} = req.body;

        const user = await userModel.findOne({email}).select('+password');

        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = user.generateAuthToken();

        const userObj = user.toObject();
        delete userObj.password; // remove password before sending 

        res.status(200).json({token , user: userObj});

    } catch (error) {
        next(error);
    }
}
