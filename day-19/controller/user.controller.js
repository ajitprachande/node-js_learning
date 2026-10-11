import dotenv from 'dotenv';

dotenv.config();
import { randomBytes, createHmac } from 'node:crypto';

import jwt from 'jsonwebtoken';
import { email, success } from 'zod';

import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validations/request.validation.js';

import { getUserByEmail, createUser, updatePasswordService } from '../services/user.service.js';

import { hashPasswordWithSalt } from '../utils/passwordHash.js';

import { createUserToken } from '../utils/jwtToken.js';


import { validateURL } from 'zod/v4/core';
import { error } from 'node:console';
// import { id } from 'zod/locales';

export const signup = async (req, res) => {
    try {
        const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

        //get any input error 
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.format(),
                success: false
            });
        }

        //destructure input user data
        const { firstname, lastname, email, password } = validationResult.data;

        // if (!firstname || !email || !password) {
        //     return res.status(400).json({
        //         error: `All feilds are required.`,
        //         success: false
        //     });
        // }

        /**old way without service code:
            //check email exist in db:
            // const [existingUser] = await db
            //     .select({
            //         id: userTable.id
            //     })
            //     .from(userTable)
            //     .where(eq(userTable.email, email));
        */
        //service code:
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({
                error: `User with this ${email} already exists!`,
                success: false
            });
        }

        /** old way without service code:
                // creating the salt password which is long binary code:
                // const salt = randomBytes(32).toString('hex');
                // //Hashing the password 
                // const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        */

        // both 'salt' and 'hashedPassword' takes from "../utils.passwordHash.js" and we pass as argument to function user 'password':
        const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

        /** old-way to insert code:
            // const [user] = await db.insert(userTable).values({
            //     firstname,
            //     lastname,
            //     email,
            //     salt,
            //     password: hashedPassword
            // }).returning();
         */

        //using service architecture:
        const user = await createUser({ firstname, lastname, email, salt, password: hashedPassword });

        return res.status(201).json({
            message: `***User SignUp successfully***`,
            success: true,
            User: {
                UserID: user.id,
                UserEmail: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.format(),
                success: false
            });
        }
        const { email, password } = validationResult.data;

        /**old way:
            // const [existingUser] = await db
            //     .select({
            //         email: userTable.email,
            //         salt: userTable.salt,
            //         password: userTable.password,

            //         //id and name for 'jwt payload':
            //         id: userTable.id,
            //         name: userTable.firstname

            //     })
            //     .from(userTable)
            //     .where(eq(userTable.email, email));
        */

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return res.status(404).json({
                error: `Email not Exist ${email}, please Signup First.`,
                success: false
            });
        }
        /**  // Old way of verifying user credentials:
          //extracting saved Salt-password from db:
            const salt = existingUser.salt;
            console.log("salt: ", salt);
    
    
            //extracting saved Hashed_password from db: 
            const hashedPassword = existingUser.password;
    
            // generating new password using 'createHmac' and using salt 
            const newHash = createHmac('sha256', salt).update(password).digest('hex');
       
        
            //new hashedPassword and old hashedpassword if both are same then Login Success: 
            if (newHash !== hashedPassword) {
                return res.status(401).json({
                    error: `Login Failed, Incorect password`,
                    success: false
                });
            }
         */

        const { password: hashedPassword } = hashPasswordWithSalt(password, existingUser.salt);

        if (existingUser.password !== hashedPassword) {
            return res.status(400).json({
                error: `Invalid Password, Please try again.`
            });
        }

        /**old way
            //generating jwt token
            const payload = {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            };
            console.log("jwt Payload: ", payload);

            // const token = jwt.sign(payload, process.env.JWT_SECRET)
        */

        const token = await createUserToken({
            id: existingUser.id,
            firstname: existingUser.firstname,
            email: existingUser.email,
        });

        return res.status(201).json({
            message: `***Login Success***`,
            success: true,
            data: {
                token,
                email: existingUser.email
            }
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: `Internal server error`,
            success: false,
            error
        });
    }
}

export const profile = async (req, res) => {
    const user = req.user;

    console.log(user);

    return res.json({
        user,
    });

}

export const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldpassword, newpassword } = req.body;

        if (!oldpassword || !newpassword) {
            return res.status(400).json({
                error: `Both fields are required`,
                success: false
            });
        }
        if (newpassword.length < 6) {
            return res.status(400).json({
                error: `New Password must be atleast 6 characters.`
            });
        }
        const result = await updatePasswordService(userId, oldpassword, newpassword);

        return res.status(result.status).json({
            success: result.success,
            message: result.message
        });
    } catch (error) {
        console.error("UpdatePassword Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }

}