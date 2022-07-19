import express from 'express'

import AuthorController from '../controllers/author.controller'
import { Schemas, ValidateSchema } from '../middleware/validateSchema.middleware'

const router = express.Router()

router.post('/create', ValidateSchema(Schemas.author.create), AuthorController.createAuthor)

router.get('/get/:authorId', AuthorController.readAuthor)

router.get('/get/', AuthorController.readAll)

router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), AuthorController.updateAuthor)

router.delete('/delete/:authorId', AuthorController.deleteAuthor)

export default router