const express = require('express')

const DeleteTransaction = require('../controllers/deleteTransaction')
const DetailTransaction = require('../controllers/detailTransaction')
const EditTransaction = require('../controllers/editTransaction')
const ListTransactions = require('../controllers/listTransactions')
const RegisterTransaction = require('../controllers/registerTransaction')
const TransactionExtract = require('../controllers/transactionExtract')

const Auth = require('../middlewares/Auth')

const routes = express()

routes.use(Auth)

routes.get('', ListTransactions)
routes.get('/extrato', TransactionExtract)
routes.get('/:id', DetailTransaction)
routes.put('/:id', EditTransaction)
routes.post('/', RegisterTransaction)
routes.delete('/:id', DeleteTransaction)

module.exports = routes
