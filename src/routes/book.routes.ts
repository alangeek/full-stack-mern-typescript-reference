import express from 'express'

import BookController from '../controllers/book.controller'
import { Schemas, ValidateSchema } from '../middleware/validateSchema.middleware'

const router = express.Router()

router.post('/create', ValidateSchema(Schemas.book.create), BookController.createBook)

router.get('/get/:bookId', BookController.readBook)

router.get('/get/', BookController.readAll)

router.patch('/update/:bookId', ValidateSchema(Schemas.book.create), BookController.updateBook)

router.delete('/delete/:bookId', BookController.deleteBook)

export default router