import { Router } from 'express'
import { getProperties } from '../controllers/api.controller.js'

const router = Router()

router.get('/properties', getProperties)

export default router
