import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/user.routes.js';
import urlRoutes from './routes/url.routes.js';
import { authenticationMiddleware } from './middleware/auth.middleware.js';

const app = express();

const port = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    res.json({
        status: 'server is running and upp...'
    });
});

app.use('/user', userRoutes);
app.use('/url', urlRoutes);

app.listen(port, () => {
    console.log(`server running on port: ${port} \n\n http://localhost:${port} \n\n`);
});