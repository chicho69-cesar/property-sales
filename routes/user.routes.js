import { Router } from 'express'
import { formLogin, formRegister } from '../controllers/users.controller.js'

const router = Router()

// Routing
/* router.get('/', (req, res) => {
  res.json({
    msg: 'Hello World!'
  })
}) */

router.get('/login', formLogin)
router.get('/register', formRegister)

export default router
