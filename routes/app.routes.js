import { Router } from 'express'
import {
  categories,
  home,
  notFound, searcher,
} from '../controllers/app.controller.js'

const router = Router()

// Home Page
router.get('/', home)

// Categories
router.get('/categories/:id', categories)

// 404 Page
router.get('/404', notFound)

// Searcher
router.post('/searcher', searcher)

export default router
