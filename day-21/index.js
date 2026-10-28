import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'Success',
        message: `Welcome to Home`
    });
});

app.listen(port, () => {
    console.log(`server running on port: ${port} \n\n http://localhost:${port} \n\n`);
});