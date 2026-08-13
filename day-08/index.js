const express = require('express');
const { error } = require('node:console');

const app = express()

const port = 8000;

app.use(express.json());

const books = [
    {
        id: 1,
        title: "atomic habit",
        author: "james clear"
    },
    {
        id: 2,
        title: "Mensch",
        author: "wolfgang platz"
    },
    {
        id: 3,
        title: "Star",
        author: "ajit"
    }
]

app.get('/', (req, res) => {
    res.end("WELCOME TO Book Store...")
})

app.get('/books', (req, res) => {
    // console.log(books);
    return res.status(200).json({ books })
})

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId))
        return res.status(400).json({ error: `ID is must be type of number` })

    const book = books.find(e => e.id == bookId)

    if (!book) {
        return res.status(404).json({ Error: `Book not found.` });
    }

    return res.status(200).json(book)
})

app.post('/books', (req, res) => {

    const { title, author } = req.body;

    if (!title || title == '')
        return res.status(400).json({ error: `title is required. ` })
    if (!author || author == '')
        return res.status(400).json({ error: `author is required. ` })

    const id = books.length + 1;
    const book = { id, title, author }
    books.push(book)

    return res.status(201).json({
        message: 'Book data created',
        ID: id
    })
    // console.log(req.body);
})

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
        return res.status(401).json({
            error: `Id is must be type of number.`,
            success: false
        })
    }

    const indexToDelete = books.findIndex((e) => e.id == bookId)

    if (indexToDelete < 0) {
        return res.status(404).json({
            message: `Book with ID ${bookId} is not exists.`
        })
    }
    books.splice(indexToDelete, 1);

    return res.status(200).json({
        message: `Book Deleted.`
    });






})

app.listen(port, () => console.log(`App listening on port : ${port}`));