import bookTable from '../models/book.model.js';
import authorTable from '../models/author.model.js';
import dotenv from 'dotenv'
import { sql } from 'drizzle-orm';

import { validate as isUUID } from 'uuid';

import db from '../db/index.js';
import { table } from 'node:console';
import { eq, ilike } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/gel-core';



dotenv.config();

const getBooks = async (req, res) => {
    const search = req.query.search;
    const price = req.query.price;

    if (search) {
        const books = await db.select().from(bookTable).where(sql`to_tsvector('english', ${bookTable.title}) @@ plainto_tsquery('english', ${search})`)
        return res.status(200).json({ books })
    }

    if(req.query.price) {
        const books = await db.select().from(bookTable).where(sql`to_tsvector('english', ${bookTable.price}) @@ plainto_tsquery('english', ${price})`)

        return res.status(200).json({books});
    }



    const books = await db.select().from(bookTable);
    return res.status(200).json({ books })
}

const getBookById = async (req, res) => {

    const bookId = req.params.id;


    if (!bookId) {
        return res.status(400).json({
            message: "Please provide a valid Book ID",
            succeess: false
        });
    }

    if (!isUUID(bookId)) {
        return res.status(400).json({
            message: `Please  provide an valid Book ID(uuid)`,
            succeess: false
        });
    }
    const [book] = await db
        .select().from(bookTable)
        .where(table => eq(table.id, bookId))
        .leftJoin(authorTable, eq(bookTable.authorId, authorTable.id))
        .limit(1)

    if (!book) {
        return res.status(401).json({
            message: `Book not found`,
            succeess: false
        });
    }

    res.status(200).json({ book });
}

const createBook = async (req, res) => {
    const { title, description, price, authorId } = req.body;

    const [Newbook] = await db
        .insert(bookTable)
        .values({ title, description, price, authorId })
        .returning({
            id: bookTable.id,
        });

    return res.status(201).json({
        message: `Book Data created Succussfull`,
        succeess: true,
        id: Newbook.id
    })

}

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        if (!isUUID(bookId)) {
            return res.status(401).json({
                message: `Invalid book ID, Provide valid ID to Perform Action.`,
                success: false
            });
        }

        // Delete book and return deleted record
        const [del_book] = await db
            .delete(bookTable)
            .where(eq(bookTable.id, bookId))
            .returning({
                id: bookTable.id
            });

        //If Book doesn't exist=>
        if (!del_book) {
            return res.status(404).json({
                message: `Book Not Found.`,
                succeess: false
            });
        }

        return res.status(200).json({
            message: `Book deleted from record.`,
            succeess: true
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Internal server error`,
            succeess: false
        });
    }
};

export {
    getBooks,
    getBookById,
    createBook,
    deleteBook
}