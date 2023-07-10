/* eslint-disable default-param-last */
import { request, response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const protectRoute = async (req = request, res = response, next) => {
  // Verify if there is a token
  const { _token } = req.cookies
  if (!_token) {
    return res.redirect('/auth/login')
  }

  // Check if the token is valid
  try {
    const decoded = jwt.verify(_token, process.env.SECRET_KEY)
    const user = await User.scope('deletePassword').findByPk(decoded.id)

    // Save the user in the request
    if (user) {
      req.user = user
    } else {
      return res.redirect('/auth/login')
    }

    return next()
  } catch (error) {
    return res
      .clearCookie('_token')
      .redirect('/auth/login')
  }
}

export default protectRoute
