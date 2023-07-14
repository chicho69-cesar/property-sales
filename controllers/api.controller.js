import { request, response } from 'express'
import models from '../models/index.js'

const { Category, Price, Property } = models

export const getProperties = async (req = request, res = response) => {
  const properties = await Property.findAll({
    include: [
      { model: Category, as: 'category' },
      { model: Price, as: 'price' },
    ],
  })

  return res.json(properties)
}

export const postFunc = (req = request, res = response) => {
  res.json({
    msg: 'Hola Mundo',
  })
}
