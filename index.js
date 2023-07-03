// const express = require('express') // CommonJS
import express from 'express'
import userRoutes from './routes/user.routes.js'

// Define the express server
const app = express()
// Port to listen the app
const port = 3000

// Middlewares
app.use(express.static('public'))

// Routes middlewares
app.use('/auth', userRoutes)

// Enable pug template engine
app.set('view engine', 'pug')
app.set('views', './views')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
