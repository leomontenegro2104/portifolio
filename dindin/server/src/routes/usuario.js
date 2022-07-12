const express = require('express')

const Auth = require('../middlewares/Auth')

const Register = require('../controllers/register')
const DetailUser = require('../controllers/detailUser')
const EditProfile = require('../controllers/editProfile')

const routes = express()

routes.post('/', Register)

routes.use(Auth) //Middleware para verificação do token

routes.get('/', DetailUser)
routes.put('/', EditProfile)

module.exports = routes
