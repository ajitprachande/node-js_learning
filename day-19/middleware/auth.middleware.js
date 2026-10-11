import { validateUserToken } from '../utils/jwtToken.js'
import { findUserInDb } from '../services/user.service.js';
/**
 *  
 * @param {import('express').Request } req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next  
 */

import { error } from 'node:console';
import { success, validate } from 'zod';
import { getUserByEmail } from '../services/user.service.js';

export async function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return next();
    }

    if (!authHeader.startsWith('Bearer')) {
        return res.status(400).json({
            error: `auth headers must sart with 'Bearer' word.`,
            success: false,
        });
    }

    const token = authHeader.split(' ')[1];
    const payload = await validateUserToken(token);

    const [user] = await findUserInDb(payload);

    if (!user) {
        return res.status(401).json({
            error: 'User Account no longer exist.'
        });
    }
    req.user = payload;
    next()
}

/**
 *  
 * @param {import('express').Request } req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next  
 */

export function ensureAuthenticated(req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            message: `You must be loged in to access this resource`,
            success: false
        });
    }
    next();
}
