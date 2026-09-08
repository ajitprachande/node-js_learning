import express from "express";

import { getBooks, getBookById, createBook, deleteBook} from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', getBooks);

router.get('/:id', getBookById);

router.post('/', createBook);

router.delete('/:id', deleteBook);

export default router;
