import cookieParser from 'cookie-parser'
import express from 'express'

import db from './config/db.js'
import userRoutes from './routes/user.routes.js'

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.dbStatus = 'Unconnected'

    // DB connection
    this.dbConnection()
    // Middlewares
    this.middlewares()
    // Routes
    this.routes()
    // Config
    this.config()
  }

  async dbConnection() {
    try {
      // Authenticate with the database
      await db.authenticate()
      // Sync changes on models for the db tables
      db.sync()

      this.dbStatus = 'Connected'
      console.log(`Database ${this.dbStatus}...`)
    } catch (error) {
      console.log(`${error}... ${this.dbStatus}`)
    }
  }

  middlewares() {
    // URL encoded for POST requests with form data
    this.app.use(express.urlencoded({ extended: true }))
    // JSON parser for API requests
    this.app.use(express.json())
    // Enable the use of the public folder
    this.app.use(express.static('public'))
    // Cookies by cookie parser
    this.app.use(cookieParser())
  }

  routes() {
    // Auth routes
    this.app.use('/auth', userRoutes)
  }

  config() {
    // Config pug as template engine
    this.app.set('view engine', 'pug')
    // Config pug views folder on folder 'views'
    this.app.set('views', './views')
  }

  listen() {
    this.app.listen((this.port), () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}

export default Server
