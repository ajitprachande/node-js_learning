import { userTable } from '../db/schema.js';
import { db } from '../db/index.js';

import { eq } from 'drizzle-orm';

import jwt from 'jsonwebtoken';
import { error } from 'node:console';

export const isLoggedin = async function (req, res, next) {
    try {
        //Header Authorization: Bearer <TOKEN>
        // Get token from Authorization header
        const tokenHeader = req.headers['authorization'];

        if (!tokenHeader) {
            return next();
        }

        if (!tokenHeader.startsWith('Bearer')) {
            return res.status(400).json({
                error: `Authorization header must be starts with Bearer.`
            });
        }

        // Remove "Bearer " and get only JWT
        const token = tokenHeader.split(' ')[1];

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in database
        const [user] = await db.select().from(userTable).where(eq(userTable.id, decoded.id));

        // JWT may be valid, but user may have been deleted then chk it:
        if (!user) {
            return res.status(401).json({
                error: 'User Account no longer exist.'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        next();
    }
}

//this middleware ensure user have to be login
export const ensureAuthentication = async function (req, res, next) {

    if (!req.user) {

        // If req.user does not exist, the user is not authenticated
        // Stop the request and send a 401 Unauthorized response
        return res.status(401).json({
            error: `You must be Authenticated.`,
            success: false
        });
    }

    // User is authenticated, so allow the request
    // to continue to the next middleware/controller
    next();
}


export const restrictToRole = function(role) {
    return function(req, res, next) {
        
        if(req.user.role !== role) {
            return res.status(401).json({
                error: `You are not Authorized person to access this resource`
            })
        }
        return next();
    };
};