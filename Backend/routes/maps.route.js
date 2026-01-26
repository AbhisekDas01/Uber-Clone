import express from 'express'
import { authUser } from '../middlewares/auth.middleware.js';
import { query } from 'express-validator'
import {  getAutoCompleteSuggestionsController, getCoordinates, getDistanceTimeController } from '../controllers/map.controller.js';
const mapRouter = express.Router();

mapRouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser, getCoordinates);

mapRouter.get('/get-distance-time' , 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authUser,
    getDistanceTimeController
);

mapRouter.get('/get-suggestions' , 
    query('input').isString().isLength({min: 3}),
    authUser,
    getAutoCompleteSuggestionsController
);


export default mapRouter;