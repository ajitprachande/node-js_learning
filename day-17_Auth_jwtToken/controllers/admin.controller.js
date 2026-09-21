import { db } from '../db/index.js';
import { userTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const getAllUser = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                error: `you dont have access to access users.`
            });
        }

        const users = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            password: userTable.password
        }).from(userTable);

        return res.status(200).json({ users })
    } catch (error) {
        return res.status(501).json({
            error: error,
            success: false
        })
    }
}