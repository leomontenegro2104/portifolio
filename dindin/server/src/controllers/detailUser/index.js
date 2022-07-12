const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { id } = req.user

  const query = 'select id, nome, email from usuarios where id = $1'

  try {
    const {
      rows: [user]
    } = await connect.query(query, [id])

    return res.json(user)
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
