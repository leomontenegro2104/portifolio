const { verifyBodyRegister, emailRepeated } = require('../../filters')
const connect = require('../../../connect')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const { nome, email, senha } = req.body
  const responseVerifyBody = verifyBodyRegister(nome, email, senha)

  if (responseVerifyBody) {
    return res.status(400).json(responseVerifyBody)
  }

  const responseEmailRepeated = await emailRepeated(email)

  if (responseEmailRepeated) {
    return res.status(400).json(responseEmailRepeated)
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ mensagem: 'A senha precisa ser maior que 6 caracteres.' })
  }

  const passwordEncrypted = bcrypt.hashSync(senha, 12)

  const query = 'insert into usuarios(nome, email, senha) values($1, $2, $3)'

  try {
    const { rowCount } = await connect.query(query, [
      nome,
      email,
      passwordEncrypted
    ])

    if (!rowCount) {
      return res.status(400).json({
        mensagem: 'Não foi possível realizar seu cadastro no momento.'
      })
    }

    const {
      rows: [user]
    } = await connect.query(
      'select id, nome, email from usuarios where email = $1',
      [email]
    )

    return res.status(201).json(user)
  } catch (error) {
    return res.json({ mensagem: error.message })
  }
}
