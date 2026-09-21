import express from 'express';
import { db } from '../db/index.js';
import { signup, login, profile, UpdateUserDetails, deleteUser } from '../controllers/user.controller.js'
import { error, table } from 'node:console';
import { eq } from 'drizzle-orm';

import { userTable } from "../db/schema.js";
import { isLoggedin, ensureAuthentication } from '../middleware/auth-jwt.middleware.js';

const router = express();

router.post('/signup', signup);

router.post('/login', login);

router.get('/profile', isLoggedin, ensureAuthentication, profile);

router.patch('/profile', isLoggedin, ensureAuthentication, UpdateUserDetails);

router.delete('/', isLoggedin, ensureAuthentication, deleteUser);

export default router;