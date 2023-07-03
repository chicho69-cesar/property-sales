// const express = require('express') // CommonJS
// import express from 'express'

// Config the env variables
import 'dotenv/config.js'
import Server from './server.js'

const server = new Server()

server.listen()
