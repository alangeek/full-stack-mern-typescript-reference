import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'

import { IAuthor } from './../models/author.model';
import { IBook } from '../models/book.model';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)

      next()
    } catch (err) {
      Logging.error(err)
      return res.status(422).json({ err })
    }
  }
}

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required()
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required()
    })
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required()
    }),
    update: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required()
    })
  }
}