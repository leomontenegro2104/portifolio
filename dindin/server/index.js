const express = require('express')
const usuario = require('./src/routes/usuario')
const login = require('./src/routes/login')
const categoria = require('./src/routes/categoria')
const transacao = require('./src/routes/transacao')

const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

app.use('/usuario', usuario)
app.use('/login', login)
app.use('/categoria', categoria)
app.use('/transacao', transacao)

app.listen(5000, () => {
  console.log('Server running...')
})
