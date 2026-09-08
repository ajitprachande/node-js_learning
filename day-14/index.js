import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import BookRoutes from './routes/book.routes.js'
import AuthorRoutes from './routes/author.routes.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).end(`<h1>Welcome to online book store:</h1>`)
})

app.use('/books',BookRoutes);
app.use('/authors',AuthorRoutes);


app.listen(process.env.PORT, () => { console.log(`App listening on port: ${process.env.PORT}\n➡️${process.env.BASE_URL}`) });