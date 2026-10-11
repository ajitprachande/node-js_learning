import express from 'express';

import { authenticationMiddleware } from '../middleware/auth.middleware.js';

import { signup, login, profile, updatePassword } from '../controller/user.controller.js';

const router = express.Router();



router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticationMiddleware, profile);
router.post('/updatepassword', authenticationMiddleware, updatePassword);

export default router;