import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'server is running and upp...'
    });
});

app.listen(port, () => {
    console.log(`server running on port: ${port} \n\n http://localhost:${port} \n\n`);
});