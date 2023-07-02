// const express = require('express') // CommonJS
import express from "express"

// Define the express server
const app = express()
// Port to listen the app
const port = 3000

// Routing
app.get('/', (req, res) => {
  res.json({
    msg: 'Hello World!'
  })
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
