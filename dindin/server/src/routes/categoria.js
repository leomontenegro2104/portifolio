const express = require('express')
const ListCategories = require('../controllers/listCategories')
const Auth = require('../middlewares/Auth')

const routes = express()

routes.get('/', Auth, ListCategories)

module.exports = routes
