import { email, success } from 'zod';
import { db } from '../db/index.js';
import { userTable } from '../models/index.js';
import { eq } from 'drizzle-orm';

import bcrypt from 'bcrypt';
import { stat } from 'node:fs';

import { hashPasswordWithSalt } from '../utils/passwordHash.js';

export async function getUserByEmail(email) {
    const [existingUser] = await db
        .select({
            id: userTable.id,
            firstname: userTable.firstname,
            lastname: userTable.lastname,
            email: userTable.email,

            salt: userTable.salt,
            password: userTable.password

        })
        .from(userTable)
        .where(eq(userTable.email, email));

    return existingUser;
}


export async function createUser({ firstname, lastname, email, salt, password: hashedPassword }) {
    const [user] = await db.insert(userTable)
        .values({
            firstname,
            lastname,
            email,
            salt,
            password: hashedPassword
        }).returning();

    return user;
}

export async function findUserInDb(payload) {
    const user = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, payload.id))

    return user;
}

export async function updatePasswordService(userId, oldpassword, newpassword) {

    // Find the user by the id that came from the token
    const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));
    if (!user) {
        return {
            success: false,
            status: 404,
            message: `User Not Found`
        };
    }
   
    //Verify old Password.
    const oldhashed = hashPasswordWithSalt(oldpassword, user.salt);

    if (oldhashed.password !== user.password) {
        return {
            success: false,
            status: 401,
            message: `Old Password is Incorrect`
        };
    }
 
    // New password must be different
    const sameHashed = hashPasswordWithSalt(newpassword, user.salt);

    if(sameHashed.password === user.password) {
        return  {
            success: false,
            status: 400,
            message: `New Password must be different from old Password.`
        };
    }
    // Hash the new password and save it
    const HashNewPassword = hashPasswordWithSalt(newpassword);

    await db.update(userTable).set({
        salt: HashNewPassword.salt,
        password: HashNewPassword.password
    }).where(eq(userTable.id, userId))

    return {
        success: true,
        status: 200,
        message: `Password updated Successfully`
    };
}