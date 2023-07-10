import { request, response } from 'express'
import { validationResult } from 'express-validator'

import models from '../models/index.js'

const { Category, Price, Property } = models

export const admin = async (req = request, res = response) => {
  const { id } = req.user

  const properties = await Property.findAll({
    where: { userId: id },
    include: [
      { model: Category, as: 'category' },
      { model: Price, as: 'price' },
    ],
  })

  res.render('properties/admin', {
    page: 'Mis propiedades',
    properties,
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

export const addImage = async (req = request, res = response) => {
  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id)
  if (!property) {
    return res.redirect('/my-properties')
  }

  // Validate that the property has not been published yet
  if (property.published) {
    return res.redirect('/my-properties')
  }

  // Validate that the property is own of who are visiting the route
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties')
  }

  return res.render('properties/add-image', {
    page: `Agrega imagen a ${property.title}`,
    property,
  })
}

export const storeImage = async (req = request, res = response, next = undefined) => {
  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id)
  if (!property) {
    return res.redirect('/my-properties')
  }

  // Validate that the property has not been published yet
  if (property.published) {
    return res.redirect('/my-properties')
  }

  // Validate that the property is own of who are visiting the route
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties')
  }

  try {
    // Store the image and publish the property
    property.image = req.file.filename
    property.published = 1

    await property.save()

    return next()
  } catch (error) {
    console.log(error)
    return res.redirect('/my-properties')
  }
}
