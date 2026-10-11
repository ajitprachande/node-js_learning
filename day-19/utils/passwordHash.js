import { randomBytes, createHmac } from 'node:crypto';

export function hashPasswordWithSalt(password, userSalt = undefined) {

    // creating the salt password which is long binary code : // and above "userSalt=undefined" bcoz for login route when user logging and check salt
    const salt = userSalt ?? randomBytes(32).toString('hex');

    //Hashing the actual user password :
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    return { salt, password: hashedPassword };
}