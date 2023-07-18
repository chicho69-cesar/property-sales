/* eslint-disable no-underscore-dangle */
import { request, response } from 'express'
import jwt from 'jsonwebtoken'

import models from '../models/index.js'

const { User } = models

const identifyUser = async (req = request, res = response, next = undefined) => {
  const { _token } = req.cookies

  if (!_token) {
    req.user = null
    return next()
  }

  /* Comprobar el token */
  try {
    const decoded = jwt.verify(_token, process.env.SECRET_KEY)
    const user = await User.scope('deletePassword').findByPk(decoded.id)

    if (user) {
      req.user = user
    }

    return next()
  } catch (error) {
    console.log(error)
    return res.clearCookie('_token').redirect('/auth/login')
  }
}

export default identifyUser
