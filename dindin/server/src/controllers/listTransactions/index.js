const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { id } = req.user

  const query =
    'select t.id, t.descricao, t.valor, t.tipo, t.data, t.usuarios_id, t.categoria_id, c.descricao as nome_categoria from transacoes as t left join categorias as c on t.categoria_id = c.id where usuarios_id = $1'

  try {
    const { rows: transactions } = await connect.query(query, [id])

    return res.json(transactions)
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
