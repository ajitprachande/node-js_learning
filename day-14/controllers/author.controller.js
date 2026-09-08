import authorTable from '../models/author.model.js';
import db from '../db/index.js';

import { validate as isUUID } from 'uuid';
import { eq } from 'drizzle-orm';

import bookTable from '../models/book.model.js';

const getAuthors = async (req, res) => {
    const authors = await db.select().from(authorTable);
    return res.status(200).json({ authors })
}

const getAuthorById = async (req, res) => {
    const authorId = req.params.id;

    if (!authorId) {
        return res.status(400).json({
            message: 'Author ID required.',
            success: false
        });
    }

    if (!isUUID(authorId)) {
        return res.status(400).json({
            message: `Please  provide an valid author-ID(UUID)`,
            success: false
        });
    }

    const [author] = await db.select().from(authorTable).where(eq(authorTable.id, authorId));

    return res.status(200).json({ author });

}

const createAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                message: `Author Name is required.`
            });
        }
        if (typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                message: `Author email is required.`
            });
        }

        const [author] = await db.insert(authorTable).values({ name, email }).returning({ id: authorTable.id });

        return res.status(201).json({
            message: `Author record created Successfull.`,
            success: true,
            id: author.id
        });



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Internal server error`,
            success: false
        });
    }


}


const deleteAuthor = async (req, res) => {

    const authorId = req.params.id;

    if (!isUUID(authorId)) {
        return res.status(400).json({
            message: `Provide valid AuthorID to delete author data.`,
            success: false
        });
    }

    const [del_author] = await db
        .delete(authorTable)
        .where(eq(authorTable.id, authorId))
        .returning({ id: authorTable.id });

    if (!del_author) {
        return res.status(404).json({
            message: `Author not found.`,
            success: false,
        });

    }
    return res.status(200).json({
        message: `Author record deleted successfull`,
        success: false,
        id: del_author.id
    });
}

const getBooksByAuthor = async (req, res) => {
    const authorId = req.params.id;

    const books = await db.select().from(bookTable).where(eq(bookTable.authorId, authorId));

    return res.status(200).json({
        authorId,
        books
    })

}

export {
    getAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthor,
    getBooksByAuthor
}