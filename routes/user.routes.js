import { Router } from 'express'

const router = Router()

// Routing
/* router.get('/', (req, res) => {
  res.json({
    msg: 'Hello World!'
  })
}) */

router.get('/login', (req, res) => {
  res.render('auth/login')
})

export default router
