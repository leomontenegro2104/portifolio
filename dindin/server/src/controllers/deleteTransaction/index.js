const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { id: userId } = req.user
  const { id: transactionId } = req.params

  try {
    const { rows, rowCount } = await connect.query(
      'select * from transacoes where id = $1 and usuarios_id = $2',
      [transactionId, userId]
    )

    if (!rowCount) {
      return res.status(404).json({
        mensagem: 'Não existe transação para os parâmetros informados.'
      })
    }
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }

  const query = 'delete from transacoes where id = $1'

  try {
    const { rows, rowCount } = await connect.query(query, [transactionId])

    if (!rowCount) {
      return res.status(400).json({
        mensagem: 'Não foi possível deletar esta transação no momento.'
      })
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
