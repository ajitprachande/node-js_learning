import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import { userTokenSchema } from '../validations/jwtToken.validation.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {

    const validationResult = await userTokenSchema.safeParseAsync(payload);

    // validation failed
    if (!validationResult.success) {
        return validationResult.error.format();
    }

    const payloadValidatedData = validationResult.data

    const token = jwt.sign(payloadValidatedData, JWT_SECRET);

    return token;
}

export async function validateUserToken(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}