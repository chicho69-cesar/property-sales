import { request, response } from 'express'

export const admin = (req = request, res = response) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
  })
}

export const createProperty = (req = request, res = response) => {
  res.render('properties/create', {
    page: 'Crear propiedad',
  })
}
