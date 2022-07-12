const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { id: userId } = req.user
  const { id: transactionId } = req.params

  const query =
    'select t.id, t.descricao, t.valor, t.data, t.usuarios_id, t.categoria_id, c.descricao as nome_categoria from transacoes as t left join categorias as c on t.categoria_id = c.id where t.id = $1 and t.usuarios_id = $2'

  try {
    const {
      rows: [transaction],
      rowCount
    } = await connect.query(query, [Number(transactionId), userId])

    if (!rowCount) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe transação com parâmetro informado.' })
    }

    return res.json(transaction)
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
