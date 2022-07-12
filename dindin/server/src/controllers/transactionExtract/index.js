const connect = require('../../../connect')

module.exports = async (req, res) => {
  const { id } = req.user

  const query = 'select valor, tipo from transacoes where usuarios_id = $1'

  try {
    const { rows: transacoes } = await connect.query(query, [id])

    let entrada = 0
    let saida = 0

    for (let transacao of transacoes) {
      if (transacao.tipo === 'Entrada') {
        entrada += transacao.valor
      }

      if (transacao.tipo === 'Saida') {
        saida += transacao.valor
      }
    }

    return res.json({ entrada, saida })
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
