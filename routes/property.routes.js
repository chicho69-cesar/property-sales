import { Router } from 'express'
import { body } from 'express-validator'

import { admin, createProperty, saveProperty } from '../controllers/properties.controller.js'
import protectRoute from '../middlewares/protect-route.js'

const router = Router()

router.get('/my-properties', protectRoute, admin)

router.get('/properties/create', protectRoute, createProperty)

router.post('/properties/create', [
  protectRoute,
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ max: 255 })
    .withMessage('La descripción no puede tener más de 255 caracteres'),
  body('category').isNumeric().withMessage('Selecciona una categoría'),
  body('price').isNumeric().withMessage('Selecciona un rango de precios'),
  body('rooms').isNumeric().withMessage('Selecciona el numero de habitaciones'),
  body('parking').isNumeric().withMessage('Selecciona el numero de estacionamientos'),
  body('wc').isNumeric().withMessage('Selecciona el numero de baños'),
  body('street').notEmpty().withMessage('Ubica la propiedad en el mapa'),
], saveProperty)

export default router
