const connect = require('../../../connect')

module.exports = async (req, res) => {
  try {
    const { rows: categories, rowCount } = await connect.query(
      'select * from categorias'
    )

    if (!rowCount) {
      res
        .status(400)
        .json({ mensagem: 'Não foi possível listar as categorias no momento.' })
    }

    res.json(categories)
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}
