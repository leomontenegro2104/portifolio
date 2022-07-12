const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json('O Token não foi informado.')
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ mensagem: error.message })
  }
}
