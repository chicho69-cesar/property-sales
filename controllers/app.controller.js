import { request, response } from 'express'
import { Op } from 'sequelize'

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
  const { id } = req.params

  const category = await Category.findByPk(id)
  if (!category) {
    return res.redirect('/404')
  }

  const properties = await Property.findAll({
    where: { categoryId: id },
    include: [
      { model: Price, as: 'price' },
    ],
  })

  return res.render('category', {
    page: `${category.name}s en venta`,
    properties,
  })
}

export const notFound = (req = request, res = response) => {
  res.render('404', {
    page: 'Page not found',
  })
}

export const searcher = async (req = request, res = response) => {
  const { term } = req.body
  if (!term.trim()) {
    return res.redirect('back')
  }

  // Consultar las propiedades
  const properties = await Property.findAll({
    where: {
      title: {
        [Op.like]: `%${term}%`,
      },
    },
    include: [
      { model: Price, as: 'price' },
    ],
  })

  return res.render('search', {
    page: `Resultados de búsqueda: ${term}`,
    properties,
    term,
  })
}
