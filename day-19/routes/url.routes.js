import express from 'express';

import { urlShorten, getAllUrl, redirectToTargetUrl, DeleteShortcode } from '../controller/url.controller.js';

import { ensureAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/shorten', ensureAuthenticated, urlShorten)
router.get('/userurl', ensureAuthenticated, getAllUrl)

//urlsTable(shortCode Id)=>
router.delete('/:urlId', ensureAuthenticated, DeleteShortcode)

router.get('/:shortCode', ensureAuthenticated, redirectToTargetUrl)




export default router;