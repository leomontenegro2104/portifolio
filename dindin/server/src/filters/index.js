const connect = require('../../connect')
const bcrypt = require('bcrypt')

module.exports = {
  verifyBodyRegister: (nome, email, senha) => {
    if (!nome) {
      return { mensagem: 'O nome é obrigatório.' }
    } else if (!email) {
      return { mensagem: 'O email é obrigatório.' }
    } else if (!senha) {
      return { mensagem: 'A senha é obrigatório.' }
    }

    return
  },
  emailRepeated: async email => {
    try {
      const { rowCount } = await connect.query(
        'select * from usuarios where email = $1',
        [email]
      )

      const response = rowCount
        ? {
            mensagem: 'Este email já está registrado em nosso banco de dados.'
          }
        : null

      return response
    } catch (error) {
      return { mensagem: error.message }
    }
  },
  verifyBodyLogin: (email, senha) => {
    if (!email) {
      return { mensagem: 'O email é obrigatório.' }
    } else if (!senha) {
      return { mensagem: 'A senha é obrigatório.' }
    }

    return
  },
  emailAndPasswordCorrect: async (email, senha) => {
    try {
      const {
        rows: [user],
        rowCount
      } = await connect.query('select * from usuarios where email = $1', [
        email
      ])

      if (!rowCount) {
        return
      }

      const pwdDecode = await bcrypt.compare(senha, user.senha)
      if (!pwdDecode) {
        return
      }

      return user
    } catch (error) {
      return { mensagem: error.message }
    }
  },
  verifyBodyRegisterTransaction: (
    descricao,
    valor,
    data,
    categoria_id,
    tipo
  ) => {
    if (!descricao) {
      return { mensagem: 'A descrição é obrigatória.' }
    } else if (!valor) {
      return { mensagem: 'O valor é obrigatório.' }
    } else if (!data) {
      return { mensagem: 'A data é obrigatória.' }
    } else if (!categoria_id) {
      return { mensagem: 'Selecione a categoria.' }
    } else if (!tipo) {
      return { mensagem: 'Selecione a o tipo de transação.' }
    }

    return
  }
}
