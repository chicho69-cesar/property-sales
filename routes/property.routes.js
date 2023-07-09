import { Router } from 'express'
import admin from '../controllers/properties.controller.js'

const router = Router()

router.get('/my-properties', admin)

export default router
