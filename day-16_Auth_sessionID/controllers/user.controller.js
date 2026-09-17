import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { userTable, userSessions } from '../db/schema.js';
import { error, table } from 'node:console';

import { randomBytes, createHmac } from 'node:crypto';

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
            email: userTable.email,
            salt: userTable.salt,
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

    // Generating a session for user:
    const [session] = await db.insert(userSessions).values({ userId: existingUser.id }).returning({ id: userSessions.id })

    

    res.status(200).cookie().json({
        message: `Login successfull.`,
        success: true,
        sessionId: session.id
    })
}

export const profile = async (req, res) => {

    const user  = req.user;

    if (!user) {
        return res.status(401).json({ error: `You are not logged in.` });
    }

    return res.json({ user });
}

export const UpdateName = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: `You are not logged in, can't update user name.` });
    }

    const { name } = req.body;

    await db
        .update(userTable).set({ name }).where(eq(userTable.id, user.id));

    return res.status(200).json({
        message: `Updated.`,
        success: true
    });
}

