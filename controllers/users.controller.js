import { request, response } from 'express'
import { validationResult } from 'express-validator'

import { generateId } from '../helpers/tokens.js'
import User from '../models/user.js'

export const formLogin = (req = request, res = response) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión',
  })
}

export const formRegister = (req = request, res = response) => {
  res.render('auth/register', {
    page: 'Crear Cuenta',
  })
}

export const register = async (req = request, res = response) => {
  const {
    name,
    email,
    password,
  } = req.body

  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: errors.array(),
      user: {
        name,
        email,
      },
    })
  }

  // Verify if email exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: [{ msg: 'El correo ya está registrado' }],
      user: {
        name,
        email,
      },
    })
  }

  const user = await User.create({
    name,
    email,
    password,
    token: generateId(),
  })

  // Show confirm message
  return res.render('templates/message', {
    page: 'Cuenta creada',
    message: `${user.name} tu cuenta ha sido creada correctamente. Por favor, revisa tu correo electrónico para confirmar tu cuenta.`,
  })
}

export const formForgotPassword = (req = request, res = response) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raíces',
  })
}
