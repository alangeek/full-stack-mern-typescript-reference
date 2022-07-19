import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Book from '../models/book.model'

const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author
  })

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((err) => res.status(500).json({ err }))
}

const readBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId

  return Book.findById(bookId)
    .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' }))
    .catch(err => res.status(500).json({ err }))
}
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Book.find()
    .then(books => res.status(200).json({ books }))
    .catch(err => res.status(500).json({ err }))
}

const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId

  return Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body)

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((err) => res.status(500).json({ err }))
      } else {
        res.status(404).json({ message: 'Not Found' })
      }
    })
}

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId

  return Book.findByIdAndDelete(bookId)
    .then((book) => (book ? res.status(201).json({ message: 'Delete ' }) : res.status(404)
      .json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }))
}

export default { createBook, readBook, readAll, updateBook, deleteBook }