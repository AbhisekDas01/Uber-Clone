import express from 'express'
import { body, query } from 'express-validator'
import { confirmRideController, createRideController, getFareController, startRideController } from '../controllers/ride.controller.js';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';
const rideRouter = express.Router();

rideRouter.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    createRideController
);


rideRouter.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address')
    , getFareController);

rideRouter.post('/confirm', authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRideController);


rideRouter.get('/start-ride' , authCaptain , 
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({min: 6}).withMessage("Invalid otp~"),
    startRideController

)
export default rideRouter;