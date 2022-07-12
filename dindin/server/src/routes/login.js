const express = require('express')
const Login = require('../controllers/login')

const routes = express()

routes.post('/', Login)

module.exports = routes
