const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const { id: transactionId } = req.params
  const { id: userId } = req.user

  if (tipo) {
    if (tipo !== 'Entrada' && tipo !== 'Saida') {
      return res
        .status(400)
        .json({ mensagem: `O tipo deve ser igual a 'Entrada' ou 'Saida'.` })
    }
  }
  if (!categoria_id) {
    return res.status(400).json({ mensagem: 'Selecione a categoria.' })
  }
  try {
    const { rowCount } = await connect.query(
      'select * from categorias where id = $1',
      [categoria_id]
    )

    if (!rowCount) {
      return res
        .status(404)
        .json({ mensagem: 'A categoria selecionada não foi encontrada.' })
    }
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }

  let atualTransaction = null
  try {
    const {
      rows: [transaction],
      rowCount
    } = await connect.query(
      'select * from transacoes where id = $1 and usuarios_id = $2',
      [transactionId, userId]
    )
    atualTransaction = transaction

    if (!rowCount) {
      return res
        .status(404)
        .json({ mensagem: 'Não existe transação com parâmetro informado.' })
    }
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }

  const query = `update transacoes set
  descricao = $1,
  valor = $2,
  data = $3,
  categoria_id = $4,
  tipo = $5
  where id = $6`

  try {
    const { rowCount } = await connect.query(query, [
      descricao || atualTransaction.descricao,
      valor || atualTransaction.valor,
      data || atualTransaction.data,
      categoria_id || atualTransaction.categoria_id,
      tipo || atualTransaction.tipo,
      transactionId
    ])

    if (!rowCount) {
      return res.status(404).json({
        mensagem: 'Não foi possível editar esta transação no momento.'
      })
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
