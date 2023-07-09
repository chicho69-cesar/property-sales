import { request, response } from 'express'

import Category from '../models/category.js'
import Price from '../models/price.js'

export const admin = (req = request, res = response) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
  })
}

export const createProperty = async (req = request, res = response) => {
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ])

  res.render('properties/create', {
    page: 'Crear propiedad',
    categories,
    prices,
  })
}
