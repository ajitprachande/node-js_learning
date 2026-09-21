import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { userTable } from '../db/schema.js';
import { error, table } from 'node:console';

import { randomBytes, createHmac } from 'node:crypto';

import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: `All fields are required,`,
            success: false
        });
    }

    // check is there email exist in db:
    const [existingUser] = await db.select({ email: userTable.email }).from(userTable).where((table => eq(table.email, email)));

    if (existingUser) {
        return res.status(400).json({
            error: `User already exists with email: ${email}.`
        })
    }
    //password salting before pass hashing: (Add a unique random value to each password before hashing.)
    const salt = randomBytes(32).toString('hex');

    //password hashing (now hashing both salt, userPassword and generating new hash Password.)
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    // Creating a new user:
    const [user] = await db
        .insert(userTable)
        .values({
            name,
            email,
            password: hashedPassword,
            salt,
        }).returning({ id: userTable.id, name: userTable.name });

    return res.status(201).json({
        message: `User Created Successfully.`,
        success: true,
        user: {
            id: user.id,
            name: user.name
        }
    })
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const [existingUser] = await db
        .select({
            name: userTable.name,
            email: userTable.email,
            salt: userTable.salt,
            role: userTable.role,
            password: userTable.password,  //this is hashedpassword.

            id: userTable.id    //for session creation
        })
        .from(userTable)
        .where((table => eq(table.email, email)));

    if (!existingUser) {
        return res.status(404).json({
            message: `User Email does not exists! ${email}`,
            success: false
        })
    }


    const salt = existingUser.salt;

    const existingHash = existingUser.password

    const newhash = createHmac('sha256', salt).update(password).digest('hex');

    if (newhash !== existingHash) {
        return res.status(401).json({
            message: `Password Incorrect`,
            success: false
        })
    }

    //set to true isverified column after success login user:
    await db.update(userTable).set({ isverified: true }).where(eq(userTable.id, existingUser.id))

    console.log(existingUser.name);
    console.log(existingUser.email);

    //generating jwt token

    const payload = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email, 
        role: existingUser.role,
    }
    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' })

    res.status(200).cookie().json({
        message: `Login successfull.`,
        success: true,
        role: existingUser.role,
        token
    })
}

export const profile = async (req, res) => {

    const user = req.user;

    return res.json({ user });
}

export const UpdateUserDetails = async (req, res) => {
    const user = req.user;

    const { name, email } = req.body;

    //atleast one feild is cumplosry
    if (!name && !email) {
        return res.status(400).json({ error: `Please provide name or email` });
    }

    const updateData = {};

    if (name) {
        updateData.name = name;
    }

    if (email) {
        updateData.email = email;

    }

    await db
        .update(userTable).set(updateData).where(eq(userTable.id, user.id));

    return res.status(200).json({
        message: `Updated.`,
        success: true
    });
}

export const deleteUser = async (req, res) => {
    const user = req.user;

    await db.delete(userTable).where(eq(userTable.id, user.id))

    return res.status(200).json({
        message: `Account Deleted successfully.`,
        success: true
    });
}