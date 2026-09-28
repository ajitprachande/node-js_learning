import express from 'express';

const router = express.Router();
import { User } from '../model/user.model.js';

import { authMiddleware, EnsureAuthenticated, requireAdmin } from '../middleware/auth.middleware.js';
import { log } from 'console';
import mongoose from 'mongoose';



router.get('/alluser', authMiddleware, requireAdmin, async (req, res) => {
    try {

        const users = await User.find({ role: 'USER' }).select('-salt');

        //prints all user in console
        // console.log(users);

        return res.status(200).json({
            message: `ALL Users`,
            success: true,
            users
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({

            error: `Internal server error`,
            success: false
        });
    }
})

router.get('/user/:id', authMiddleware, requireAdmin, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid user ID.',
            success: false
        });
    }

    const user = await User.findById(id).select('-salt')

    console.log(user);

    if (!user) {
        return res.status(400).json({
            error: `User not found.`,
            success: false
        });
    }

    return res.status(200).json({
        message: 'User Found.',
        success: true,
        user
    });
})

export default router;