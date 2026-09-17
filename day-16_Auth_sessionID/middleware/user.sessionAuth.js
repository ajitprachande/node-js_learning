
import { userSessions, userTable } from '../db/schema.js';
import { db } from '../db/index.js';

import { eq } from 'drizzle-orm';


export const isLoggedin = async function (req, res, next) {
    const sessionID = req.headers['session-id']

    if (!sessionID) {
        return next();
    }

    const [data] = await db
        .select({
            sessionId: userSessions.id,
            id: userTable.id,
            userId: userSessions.userId,
            name: userTable.name,
            email: userTable.email
        })
        .from(userSessions)
        .rightJoin(userTable, eq(userTable.id, userSessions.userId))
        .where(table => eq(table.sessionId, sessionID));

    if (!data) {
        return next();
    }

    req.user = data;

    next();
}