import express from 'express'

import BookController from '../controllers/book.controller'

const router = express.Router()

router.post('/create', BookController.createBook)

router.get('/get/:bookId', BookController.readBook)

router.get('/get/', BookController.readAll)

router.patch('/update/:bookId', BookController.updateBook)

router.delete('/delete/:bookId', BookController.deleteBook)

export default router