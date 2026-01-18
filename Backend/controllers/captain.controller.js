import { ENV_NODE_ENV } from '../configs/env.config.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import captianModel from '../models/captain.model.js';
import { createCaptain } from '../services/captain.service.js';
import { validationResult } from 'express-validator';

export const registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const {
            fullname: { firstname, lastname },
            email,
            password,
            vehicle: { color, plate, capacity, vehicleType },
        } = req.body;

        const isCaptainAlreadyExist = await captianModel.findOne({ email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({
                message: 'Captain already exists',
            });
        }

        const hashedPassword = await captianModel.hashPassword(password);

        const captain = await createCaptain({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType,
            },
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            token,
            captain,
        });
    } catch (error) {
        next(error);
    }
};

export const loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;

        const captain = await captianModel
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(401).json({
                message: 'Invalid email or password!',
            });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password!',
            });
        }

        const captainObj = captain.toObject();
        delete captainObj.password;

        const token = captain.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true,
            secure: ENV_NODE_ENV === 'production',
            maxAge: 3600000 * 24 * 7,
        });

        return res.status(200).json({
            token,
            captain: captainObj,
        });
    } catch (error) {
        next(error);
    }
};

export const getCaptainProfile = async (req, res) => {
    return res.status(200).json({
        captain: req.captain,
    });
};

export const logoutCaptain = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token || req.headers.authorization?.split(' ')[1];

        await blacklistTokenModel.create({ token });

        res.clearCookie('token');

        return res.status(200).json({
            message: 'Logout successfully!',
        });
    } catch (error) {
        next(error);
    }
};
