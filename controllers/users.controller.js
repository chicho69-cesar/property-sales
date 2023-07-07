import bcrypt from 'bcrypt'
import { request, response } from 'express'
import { validationResult } from 'express-validator'

import { emailForgotPassword, emailRegister } from '../helpers/emails.js'
import { generateId, generateJWT } from '../helpers/tokens.js'
import User from '../models/user.js'

export const formLogin = (req = request, res = response) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión',
  })
}

export const authenticateUser = async (req = request, res = response) => {
  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      errors: errors.array(),
    })
  }

  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  // Verify if user exists
  if (!user) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      errors: [{ msg: 'El usuario con ese correo no existe' }],
    })
  }

  // Verify that the user is confirmed
  if (!user.confirmed) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      errors: [{ msg: 'Tu cuenta aún no ha sido confirmada' }],
    })
  }

  // Check the password
  if (!user.matchPassword(password)) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      errors: [{ msg: 'La contraseña es incorrecta' }],
    })
  }

  // Authenticate the user
  const token = generateJWT(user)

  // Save the token in the cookie session
  return res.cookie('_token', token, {
    httpOnly: true,
    // secure: true,
  }).redirect('/my-properties')
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

export const resetPassword = async (req = request, res = response) => {
  const { email } = req.body

  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('auth/forgot-password', {
      page: 'Recupera tu acceso a Bienes Raíces',
      errors: errors.array(),
    })
  }

  // Check if user exists
  const user = await User.findOne({ where: { email } })
  if (!user) {
    return res.render('auth/forgot-password', {
      page: 'Recupera tu acceso a Bienes Raíces',
      errors: [{ msg: 'El correo no está registrado' }],
    })
  }

  // Generate a new token
  user.token = generateId()
  await user.save()

  // Send email
  emailForgotPassword({
    email: user.email,
    name: user.name,
    token: user.token,
  })

  // Show confirm message
  return res.render('templates/message', {
    page: 'Restablece tu contraseña',
    message: `${user.name} hemos enviado un email con las instrucciones para restablecer tu contraseña. Por favor, revisa tu correo electrónico.`,
  })
}

export const checkUserToken = async (req = request, res = response) => {
  const { token } = req.params

  const user = await User.findOne({ where: { token } })
  if (!user) {
    return res.render('auth/confirm-account', {
      page: 'Recupera tu acceso a Bienes Raíces',
      message: 'Hubo un error al validar tu información, intenta lo de nuevo.',
      error: true,
    })
  }

  // Show form to reset password
  return res.render('auth/reset-password', {
    page: 'Restablece tu contraseña',
  })
}

export const updateUserPassword = async (req = request, res = response) => {
  // Validations
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('auth/reset-password', {
      page: 'Recupera tu acceso a Bienes Raíces',
      errors: errors.array(),
    })
  }

  const { token } = req.params
  const { password } = req.body

  // Identify who make the change
  const user = await User.findOne({ where: { token } })

  // Hashing the new password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
  user.token = null

  // Save changes
  await user.save()

  // Show confirm message
  return res.render('auth/confirm-account', {
    page: 'Contraseña restablecida',
    message: 'La nueva contraseña se guardo correctamente.',
  })
}
