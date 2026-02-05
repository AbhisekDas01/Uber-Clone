import { ExpressValidator, validationResult } from "express-validator";
import { confirmRide, createRide, endRide, getFare, startRide } from "../services/ride.service.js";
import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

export const createRideController = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinate(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(
            {
                ltd: pickupCoordinates.ltd,
                lng: pickupCoordinates.lng,
                radius: 2
            });

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {


            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        if (res.headersSent) {
            return next(error);
        }
        return res.status(400).json({ message: error.message });
    }
}

export const getFareController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}



export const confirmRideController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { rideId, captainId } = req.body;

    try {

        const ride = await confirmRide({ rideId: rideId, captainId: captainId });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        ride.otp = "";
        return res.status(200).json(ride);
    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}

export const startRideController = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { rideId, otp } = req.query;

    try {

        const ride = await startRide({ rideId: rideId, otp: otp, captain: req.captain });

        return res.status(200).json(ride);


    } catch (error) {

        console.log("Error in startride controller: ", error);

        return res.status(500).json({
            message: error.message
        })
    }
}


export const endRideController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide({ rideId, captain: req.captain });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}