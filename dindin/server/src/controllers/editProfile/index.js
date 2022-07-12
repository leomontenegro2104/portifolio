const connect = require('../../../connect')
const bcrypt = require('bcrypt')
const { verifyBodyRegister, emailRepeated } = require('../../filters')

module.exports = async (req, res) => {
  const { id } = req.user
  const { nome, email, senha } = req.body

  const responseVerifyBody = verifyBodyRegister(nome, email, senha)
  if (responseVerifyBody) {
    return res.status(400).json(responseVerifyBody)
  }

  if (senha.length < 6) {
    return res
      .status(400)
      .json({ mensagem: 'A senha precisa ser maior que 6 caracteres.' })
  }

  const passwordEncrypted = bcrypt.hashSync(senha, 12)

  try {
    const {
      rows: [user]
    } = await connect.query('select * from usuarios where id = $1', [id])

    const responseEmailRepeated = await emailRepeated(email)
    if (responseEmailRepeated && email !== user.email) {
      return res.status(400).json(responseEmailRepeated)
    }
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }

  const query = `update usuarios
  set nome = $1,
  email = $2,
  senha = $3
  where id = $4`

  try {
    const { rowCount } = await connect.query(query, [
      nome,
      email,
      passwordEncrypted,
      id
    ])

    if (!rowCount) {
      return res
        .status(400)
        .json({ mensagem: 'Não foi possível editar seu perfil' })
    }

    res.status(204).send()
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
