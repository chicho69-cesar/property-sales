import { request, response } from 'express'

const formLogin = (req = request, res = response) => {
  res.render('auth/login', {
    // 
  })
}

const formRegister = (req = request, res = response) => {
  res.render('auth/register', {
    // 
  })
}

export {
  formLogin,
  formRegister
}
