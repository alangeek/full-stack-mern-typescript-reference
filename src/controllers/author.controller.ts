import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import Author from '../models/author.model'

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body

  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
    name
  })

  return author
    .save()
    .then((author) => res.status(201).json({ author }))
    .catch((err) => res.status(500).json({ err }))
}

const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId

  return Author.findById(authorId)
    .then(author => author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not Found' }))
    .catch(err => res.status(500).json({ err }))
}
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .then(authors => res.status(200).json({ authors }))
    .catch(err => res.status(500).json({ err }))
}

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body)

        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((err) => res.status(500).json({ err }))
      } else {
        res.status(404).json({ message: 'Not Found' })
      }
    })
}

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId

  return Author.findByIdAndDelete(authorId)
    .then((author) => (author ? res.status(201).json({ message: 'Delete ' }) : res.status(404)
      .json({ message: 'Not Found' })))
    .catch((err) => res.status(500).json({ err }))
}

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor }