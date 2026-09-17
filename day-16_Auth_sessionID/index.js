import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index.js';
import { userSessions, userTable } from './db/schema.js';
import userRoutes from './routes/user.routes.js';

import { eq } from 'drizzle-orm';


const app = express();

const port = process.env.PORT ?? 8000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.status(200).json({ message: `Server is on localhost` });
})

app.listen(port, () => {
    console.log(`Server listeing on PORT : http://localhost:${port}`)
});