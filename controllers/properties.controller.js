import { request, response } from 'express'
import { validationResult } from 'express-validator'
import { unlink } from 'node:fs/promises'

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

export const editProperty = async (req = request, res = response) => {
  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id)
  if (!property) {
    return res.redirect('/my-properties')
  }

  // Validate that the property is own of who are visiting the route
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties')
  }

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ])

  return res.render('properties/edit', {
    page: `Editar propiedad: ${property.title}`,
    data: property,
    categories,
    prices,
  })
}

export const updateProperty = async (req = request, res = response) => {
  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ])

    return res.render('properties/edit', {
      page: 'Editar propiedad',
      data: req.body,
      errors: errors.array(),
      categories,
      prices,
    })
  }

  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id)
  if (!property) {
    return res.redirect('/my-properties')
  }

  // Validate that the property is own of who are visiting the route
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties')
  }

  // Update the property
  try {
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

    property.set({
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
    })

    await property.save()

    return res.redirect('/my-properties')
  } catch (error) {
    console.log(error)
    return res.redirect('/my-properties')
  }
}

export const deleteProperty = async (req = request, res = response) => {
  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id)
  if (!property) {
    return res.redirect('/my-properties')
  }

  // Validate that the property is own of who are visiting the route
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties')
  }

  // Delete the image
  if (property.published && property.image !== '') {
    await unlink(`public/uploads/${property.image}`)
  }

  // Delete the property
  await property.destroy()

  return res.redirect('/my-properties')
}

export const showProperty = async (req = request, res = response) => {
  const { id } = req.params

  // Validate that the property exists
  const property = await Property.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      { model: Price, as: 'price' },
    ],
  })

  if (!property) {
    return res.redirect('/404')
  }

  return res.render('properties/show', {
    page: property.title,
    property,
  })
}
