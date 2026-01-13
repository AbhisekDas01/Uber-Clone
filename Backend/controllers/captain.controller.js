import captianModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import {validationResult} from 'express-validator'

export const registerCaptain = async (req , res , next) => {

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }


        const {fullname : {firstname , lastname } , email , password , vehicle : {color , plate , capacity , vehicleType }} = req.body;

        const isCaptainAlreadyExist = await captianModel.findOne({email});

        if(isCaptainAlreadyExist) {
            return res.status(400).json({
                message: "Captain already exists"
            })
        }

        const hashedPassword = await captianModel.hashPassword(password);

        const captain = await createCaptain({
            fullname: {
                firstname , 
                lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color , 
                plate ,
                capacity , 
                vehicleType
            }
        });

        const token = captain.generateAuthToken();

        

        res.status(201).json({
            token,
            captain
        })
        
    } catch (error) {
        next(error);
    }
}

export const loginCaptain = async (req , res , next) => {

    try {
        
    } catch (error) {
        
    }
}