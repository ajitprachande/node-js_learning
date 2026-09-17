import express from 'express';
import { db } from '../db/index.js';
import { signup, login, profile, UpdateName } from '../controllers/user.controller.js'
import { error, table } from 'node:console';
import { eq } from 'drizzle-orm';

import { userSessions, userTable } from "../db/schema.js";
import { isLoggedin } from '../middleware/user.sessionAuth.js';

const router = express();



router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', isLoggedin, profile);

router.patch('/profile', isLoggedin, UpdateName);


//update user name:
// router.patch('/profile', isLoggedin, async (req, res) => {
//     const user = req.user;

//     if (!user) {
//         return res.status(401).json({ error: `You are not logged in.` });
//     }

//     const name = req.body;

//     await db
//         .update(userTable).set({ name }).where(eq(userTable.id, user.id));

//     return res.json(201).json({
//         message: `Updated.`,
//         success: true
//     });
// })

export default router;