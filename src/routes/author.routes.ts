import express from 'express'

import AuthorController from '../controllers/author.controller'

const router = express.Router()

router.post('/create', AuthorController.createAuthor)

router.get('/get/:authorId', AuthorController.readAuthor)

router.get('/get/', AuthorController.readAll)

router.patch('/update/:authorId', AuthorController.updateAuthor)

router.delete('/delete/:authorId', AuthorController.deleteAuthor)

export default router