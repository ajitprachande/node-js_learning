import express from 'express';
import { User } from '../model/user.model.js';
const router = express.Router();
import { randomBytes, createHmac } from 'crypto';

import multer from 'multer';
import { unlink } from 'node:fs/promises';

import { EnsureAuthenticated, authMiddleware } from '../middleware/auth.middleware.js';

// import { profileImg,  } from '../controller/profileImg.controller.js';

import jwt from 'jsonwebtoken';

// ====================================================================================================
//file/Image upload code:
//set up multer to store files in our created folder:->

//  1. it stores in our local storage:
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploadProfileImages');
    },

    filename: (req, file, cb) => {
        const suffix = Date.now();
        cb(null, suffix + '-' + file.originalname);
    }
})

// 2.configure multer to store files/images in memory as Buffer:
// const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }
});

router.post('/uploadimg', upload.single('profileImage'), async (req, res) => {
    return res.json({
        message: 'Uploaded.',
        filename: req.file.filename
    })
})


// ====================================================================================================

router.post('/signup', upload.single('profileImage'), async (req, res) => {
    console.log('Uploaded file:', req.file);
    console.log('Text fields:', req.body);
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: `All fields are required.`
            });
        }

        //verify user already exists in db:
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User Already exists.',
                success: false
            });
        }

        const salt = randomBytes(256).toString('hex'); // It generates Binary code
        const HashedPassword = createHmac('sha256', salt).update(password).digest('hex');  // by using algorithm 'sha256' and our salt create Hashed Password.

        // profile image path (in way-1 for diskStorage) 
        // const PhotoPath = req.file ? req.file.path: null //get the file path if uploaded

        //(for in memoryStorage)
        // const imageBase64 = req.file ? req.file.buffer.toString('base64') : null;

        const user = await User.insertOne({
            name,
            email,
            password: HashedPassword,
            salt,
            profileImage: req.file ? req.file.path : null
        });

        return res.status(201).json({
            message: `User Signup successfully.🎉`,
            success: true,
            data: {
                USER_ID: user._id,
                profileImage: user.profileImage
            }
        });


    } catch (error) {

        // For example, the database insert may fail after Multer saved the file.
        if (req.file) {
            try {
                await unlink(req.file.path);
            } catch (cleanupError) {
                console.error('Could not remove uploaded file:', cleanupError);
            }
        }

        console.error(error);
        return res.status(500).json({
            error: 'Signup failed.',
            success: false
        });



    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //verify user email exist or not:
    if (!existingUser) {
        return res.status(404).json({
            error: `User Not Found, with this email ${email}`,
            success: false
        });
    }

    //If user Email exist in db then verify User password:
    const salt = existingUser.salt;
    const existingHash = existingUser.password;

    const newPassword = createHmac('sha256', salt).update(password).digest('hex');

    if (existingHash !== newPassword) {
        return res.status(401).json({
            error: `Invalid Password.👎`,
            success: false
        });
    }

    const payload = {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role
    };

    console.log(`PAYLOAD`, payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET);


    return res.status(200).json({
        message: `Login Successfull.`,
        success: true,
        token
    });
});

router.get('/profile', authMiddleware, EnsureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password, -salt");

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            error: `Internal server error`,
            success: false,
        });
    }
});

router.patch('/update', EnsureAuthenticated, async (req, res) => {

    const { name } = req.body;

    if (name == " " || !name) {
        return res.status(401).json({
            error: `Name is required.`,
            success: true
        });
    }

    await User.findByIdAndUpdate(req.user._id, { name });

    return res.status(201).json({
        message: `{${name}} name updated successfully.`,
        success: true
    });
})

export default router;