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
      await db.authenticate()
      this.dbStatus = 'Connected'
      console.log(`Database ${this.dbStatus}...`)
    } catch (error) {
      console.log(`${error}... ${this.dbStatus}`)
    }
  }

  middlewares() {
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use('/auth', userRoutes)
  }

  config() {
    this.app.set('view engine', 'pug')
    this.app.set('views', './views')
  }

  listen() {
    this.app.listen((this.port), () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}

export default Server
