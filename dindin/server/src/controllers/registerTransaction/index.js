const connect = require('../../../connect')
const { verifyBodyRegisterTransaction } = require('../../filters')

module.exports = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const { id } = req.user

  const responseVerifyBody = verifyBodyRegisterTransaction(
    descricao,
    valor,
    data,
    categoria_id,
    tipo
  )
  if (responseVerifyBody) {
    return res.status(400).json(responseVerifyBody)
  }

  if (tipo !== 'Entrada' && tipo !== 'Saida') {
    return res
      .status(400)
      .json({ mensagem: `O tipo deve ser igual a 'Entrada' ou 'Saida'.` })
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

  const query = `insert into transacoes(descricao, valor, data, categoria_id, usuarios_id, tipo) 
  values($1, $2, $3, $4, $5, $6)`

  try {
    const { rowCount } = await connect.query(query, [
      descricao,
      valor,
      data,
      categoria_id,
      id,
      tipo
    ])

    if (!rowCount) {
      return res.status(400).json({
        mensagem: 'Não foi possível cadastrar esta transação no momento.'
      })
    }

    const {
      rows: [lastTransaction]
    } = await connect.query(
      'select * from transacoes where usuarios_id = $1 order by id desc limit 1',
      [id]
    )

    return res.status(201).json(lastTransaction)
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
