const { verifyBodyLogin, emailAndPasswordCorrect } = require('../../filters')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { email, senha } = req.body

  const responseVerifyBody = verifyBodyLogin(email, senha)
  if (responseVerifyBody) {
    return res.status(400).json(responseVerifyBody)
  }

  try {
    const responseCorrectData = await emailAndPasswordCorrect(email, senha)
    if (!responseCorrectData) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' })
    }

    const token = jwt.sign(
      {
        id: responseCorrectData.id
      },
      process.env.JWT_SECRET
    )

    return res.json({
      token: token,
      usuario: {
        id: responseCorrectData.id,
        nome: responseCorrectData.nome,
        email: responseCorrectData.email
      }
    })
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
