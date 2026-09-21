import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index.js';
import { userTable } from './db/schema.js';
import userRoutes from './routes/user.routes.js';

import adminRoutes from './routes/admin.routes.js';

import { isLoggedin } from './middleware/auth-jwt.middleware.js';

const app = express();

const port = process.env.PORT ?? 8000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(isLoggedin);


app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)


app.get('/', (req, res) => {
    res.status(200).json({ message: `Server is on localhost \n ` });
})

app.listen(port, () => {
    console.log(`Server listeing on PORT : http://localhost:${port}`)
});