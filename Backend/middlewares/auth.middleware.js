import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { ENV_JWT_SECRET } from '../configs/env.config.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import captianModel from '../models/captain.model.js';

export const authUser = async (req, res, next) => {
    const token =
        req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        //check for black list token
        const isBlackListed = await blacklistTokenModel.findOne({ token });

        if (isBlackListed) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, ENV_JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        // Fix: Check if user actually exists in DB
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
};

export const authCaptain = async (req, res, next) => {
    const token =
        req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized!',
        });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({
            message: 'Unauthorized!',
        });
    }

    try {
        const decoded = jwt.verify(token, ENV_JWT_SECRET);

        const captain = await captianModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized!',
        });
    }
};
