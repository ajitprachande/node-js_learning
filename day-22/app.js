import express from 'express';

import 'dotenv/config';

const app = express();

const port = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
    return res.json({
        status: `7cr`,
        message: `Hello from Distroless image docker hub`
    });
})

app.listen(port, () => {
    console.log(`Server up and running....\n`)
});