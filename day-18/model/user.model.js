import { model, Schema } from 'mongoose';
import { timeStamp } from 'node:console';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    //in this entity we store 'base64' encoded data:
    profileImage: {
        type: String,
        default: null
    }
}, { timestamps: true }
)

export const User = model('user', userSchema);

export default User;
