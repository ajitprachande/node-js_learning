const express = require('express');
const { error } = require('node:console');
const { read } = require('node:fs');

const app = express();

const PORT = 8000;

app.use(express.json());


const DAIRY = {};
const EMAILS = new Set();

app.post('/signup', (req, res) => {

    // Unique email ID.
    const { name, email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: `name is required.` })
    }

    if (EMAILS.has(email)) {
        return res.status(400).json({ error: `Email already taken.` })
    }

    // assume date is token for user, as of now creting token:
    const token = `${Date.now()}`;

    //new entry of user: with token
    DAIRY[token] = { name, email, password };
    EMAILS.add(email);

    return res.status(200).json({ Token: token });
})


app.get('/me/:id', (req, res) => {
    const token = req.params.id;

    if (!token) {
        return res.status(400).json({ error: `token is missing.` });
    }
    //search token in Dairy:
    if (!(token in DAIRY)) {
        return res.status(400).json({ error: `Invalid Token.` });
    }
    const me = DAIRY[token];
    return res.status(200).json({ me });
})

app.get("/dairy", (req, res) => {
    const dairy = DAIRY;
    return res.status(200).json({ dairy });
})

app.listen(PORT, () => console.log(`App server running on port: ${PORT}`));