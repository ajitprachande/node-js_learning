import express from 'express';
const router = express();

import { db } from '../db/index.js';
import { userTable } from "../db/schema.js";

import { getAllUser } from '../controllers/admin.controller.js';

import { isLoggedin, ensureAuthentication, restrictToRole } from '../middleware/auth-jwt.middleware.js';

const adminRestrictMiddleware = restrictToRole('ADMIN');


//role based access control ('adminRestrictMiddleware');
router.use(ensureAuthentication)
router.use(adminRestrictMiddleware)

router.get('/allusers', getAllUser);

export default router;

