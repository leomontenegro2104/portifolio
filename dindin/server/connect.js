const { Pool } = require('pg')
require('dotenv').config()

// const connectionString = process.env.CONNECTION_DATABASE

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dindin',
  password: '@Fsmtf2351',
  port: '5432'
})

const query = (text, param) => {
  return pool.query(text, param)
}

module.exports = { query }
