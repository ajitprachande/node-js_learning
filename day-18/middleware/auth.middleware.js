import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { User } from '../model/user.model.js';


/**
 *  
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
*/

export const authMiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization'];

        if (!tokenHeader) {
            return next();
        }
        if (!tokenHeader.startsWith('Bearer')) {
            return res.status(400).json({
                error: `Authorization Header must start with 'Bearer'`,
                success: false
            });
        }

        const token = tokenHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED:", decoded);

        req.user = decoded;
        return next();

    } catch (error) {
        next();
    }

}

export const EnsureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: `You must be Authenticated to access this.`,
            success: false
        });
    }
    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                error: 'You must be logged in.',
                success: false
            });
        }

        const user = await User.findById(req.user._id).select('role');

        if (!user) {
            return res.status(401).json({
                error: 'Account not found.',
                success: false
            });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({
                error: 'Only admins can access this data.',
                success: false
            });
        }

        next();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Internal server error.',
            success: false
        });
    }
};
