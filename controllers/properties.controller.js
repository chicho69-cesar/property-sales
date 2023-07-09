import { request, response } from 'express'

const admin = (req = request, res = response) => {
  res.render('properties/admin', {
    page: 'Mis propiedades',
  })
}

export default admin
