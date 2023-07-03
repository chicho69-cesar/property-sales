import { Router } from 'express'
import { formLogin, formRegister, formForgotPassword } from '../controllers/users.controller.js'

const router = Router()

// Routing
/* router.get('/', (req, res) => {
  res.json({
    msg: 'Hello World!'
  })
}) */

router.get('/login', formLogin)
router.get('/register', formRegister)
router.get('/forgot-password', formForgotPassword)

export default router
