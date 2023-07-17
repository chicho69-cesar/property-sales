import { request, response } from 'express'
import models from '../models/index.js'

const { Price, Category, Property } = models

export const home = async (req = request, res = response) => {
  const [categories, prices, houses, apartments] = await Promise.all([
    Category.findAll({ raw: true }),
    Price.findAll({ raw: true }), /* Cuando usamos raw en true lo que hace es que
    limpia los resultados y unicamente nos trae la información del objeto, como el lean
    en mongodb */
    Property.findAll({
      limit: 3,
      where: {
        categoryId: 1,
      },
      include: [
        { model: Price, as: 'price' },
      ],
      order: [['createdAt', 'DESC']],
    }),
    Property.findAll({
      limit: 3,
      where: {
        categoryId: 2,
      },
      include: [
        { model: Price, as: 'price' },
      ],
      order: [['createdAt', 'DESC']],
    }),
  ])

  res.render('home', {
    page: 'Home',
    categories,
    prices,
    houses,
    apartments,
  })
}

export const categories = async (req = request, res = response) => {
  res.json({
    msg: 'Categories',
  })
}

export const notFound = (req = request, res = response) => {
  res.render('404')
}

export const searcher = async (req = request, res = response) => {
  res.json({
    msg: 'Searcher',
  })
}
