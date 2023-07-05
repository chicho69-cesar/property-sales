import { request, response } from 'express'
import { validationResult } from 'express-validator'

import emailRegister from '../helpers/emails.js'
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

  // Send confirmation email
  emailRegister({
    name: user.name,
    email: user.email,
    token: user.token,
  })

  // Show confirm message
  return res.render('templates/message', {
    page: 'Cuenta creada',
    message: `${user.name} tu cuenta ha sido creada correctamente. Por favor, revisa tu correo electrónico para confirmar tu cuenta.`,
  })
}

export const confirmAccount = async (req = request, res = response) => {
  const { token } = req.params

  // Verify if token is valid
  const user = await User.findOne({ where: { token } })
  if (!user) {
    return res.render('auth/confirm-account', {
      page: 'Confirmar Cuenta',
      message: 'Hubo un error al confirmar tu cuenta.',
      error: true,
    })
  }

  // Confirm user account
  user.token = null
  user.confirmed = true
  await user.save()

  // Show confirm message
  return res.render('auth/confirm-account', {
    page: 'Cuenta Confirmada',
    message: 'La cuenta ha sido confirmada exitosamente.',
  })
}

export const formForgotPassword = (req = request, res = response) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raíces',
  })
}
