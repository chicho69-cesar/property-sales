import { Router } from 'express'
import { admin, createProperty } from '../controllers/properties.controller.js'

const router = Router()

router.get('/my-properties', admin)

router.get('/properties/create', createProperty)

export default router
