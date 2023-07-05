import { Router } from 'express'
import { check } from 'express-validator'

import {
  formForgotPassword,
  formLogin, formRegister,
  register,
} from '../controllers/users.controller.js'

const router = Router()

// Routing
/* router.get('/', (req, res) => {
  res.json({
    msg: 'Hello World!'
  })
}) */

router.get('/login', formLogin)

router.get('/register', formRegister)
router.post('/register', [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('email').isEmail().withMessage('El Email no es un email valido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('retype_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden')
    }

    return true
  }),
  // validateFields,
], register)

router.get('/forgot-password', formForgotPassword)

export default router
