import express from 'express';

import { getAuthors, getAuthorById, createAuthor, deleteAuthor, getBooksByAuthor} from '../controllers/author.controller.js';

const router = express.Router();

router.get('/',getAuthors);

router.get('/:id',getAuthorById)

router.post('/',createAuthor)

router.delete('/:id',deleteAuthor)

//get all books by author (his own all books)
router.get('/:id/books', getBooksByAuthor)

export default router;



