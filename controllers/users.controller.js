import { request, response } from 'express'

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

export const formForgotPassword = (req = request, res = response) => {
  res.render('auth/forgot-password', {
    page: 'Recupera tu acceso a Bienes Raíces',
  })
}
