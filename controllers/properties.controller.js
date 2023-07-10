import { request, response } from 'express'
import { validationResult } from 'express-validator'

import models from '../models/index.js'

const { Category, Price, Property } = models

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
    data: {},
    categories,
    prices,
  })
}

export const saveProperty = async (req = request, res = response) => {
  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ])

    return res.render('properties/create', {
      page: 'Crear propiedad',
      data: req.body,
      errors: errors.array(),
      categories,
      prices,
    })
  }

  const {
    title,
    description,
    rooms,
    parking,
    wc,
    street,
    lat,
    lng,
    price: priceId,
    category: categoryId,
  } = req.body

  const { id: userId } = req.user

  try {
    const propertySaved = await Property.create({
      title,
      description,
      rooms,
      parking,
      wc,
      street,
      lat,
      lng,
      priceId,
      categoryId,
      userId,
      image: '',
    })

    const { id } = propertySaved

    return res.redirect(`/properties/add-image/${id}`)
  } catch (error) {
    console.log(error)
    return res.redirect('/my-properties')
  }
}
