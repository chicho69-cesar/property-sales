import { Router } from 'express'
import { body, check } from 'express-validator'

import {
  addImage,
  admin,
  changeState,
  createProperty,
  deleteProperty,
  editProperty,
  saveProperty,
  sendMessage,
  showMessages,
  showProperty,
  storeImage,
  updateProperty,
} from '../controllers/properties.controller.js'
import identifyUser from '../middlewares/identify-user.js'
import protectRoute from '../middlewares/protect-route.js'
import upload from '../middlewares/upload-image.js'

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

router.get('/properties/add-image/:id', protectRoute, addImage)

router.post('/properties/add-image/:id', [
  protectRoute,
  upload.single('image'),
], storeImage)

router.get('/properties/edit/:id', [
  protectRoute,
], editProperty)

router.post('/properties/edit/:id', [
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
], updateProperty)

router.post('/properties/delete/:id', [
  protectRoute,
], deleteProperty)

router.patch('/property/:id', [
  protectRoute,
], changeState)

router.get('/messages/:id', [
  protectRoute,
], showMessages)

/* Public Routes */
router.get('/property/:id', [
  identifyUser,
], showProperty)

router.post('/property/:id', [
  identifyUser,
  check('message').isLength({ min: 10 }).withMessage('El mensaje no puede ir vació o es muy corto'),
], sendMessage)

export default router
