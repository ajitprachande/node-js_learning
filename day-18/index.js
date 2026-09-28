import express from 'express';
import 'dotenv/config'
import { ConnectMongoDb } from './connection.js';

import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';


import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());

app.use(authMiddleware);

ConnectMongoDb(process.env.MONGODB_URL).then(() => console.log(`MongoDB connected.`));

app.get('/', (req, res) => {
    res.end("hello from localhost.")
})

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);



app.listen(8000, () => { console.log(`http://localhost:8000`) })

