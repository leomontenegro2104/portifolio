const { json } = require('express');
const conexao = require('../conexao');

const listarUsuarios = async (req, res) => {
    try {
        const query = 'SELECT * FROM usuarios'
        const { rows: usuarios } = await conexao.query(query);

        for (const usuario of usuarios) {
            const query = 'SELECT * FROM emprestimos WHERE id_usuario = $1';
            const { rows: emprestimos } = await conexao.query(query, [usuario.id]);
            usuario.emprestimos = emprestimos;
        }

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterUsuario = async (req, res) => {
    const { id } = req.params
    try {
        const query = 'SELECT * FROM usuarios WHERE ID = $1'
        const usuario = await conexao.query(query, [id]);

        const queryEmprestimos = 'SELECT * FROM emprestimos WHERE id_usuario = $1';
        const { rows: emprestimos } = await conexao.query(queryEmprestimos, [id]);
        usuario.rows[0].emprestimos = emprestimos;

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuario não encontrado.')
        }

        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarUsuario = async (req, res) => {
    const { nome, idade, email, telefone, cpf } = req.body;

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório');
    }
    if (!email) {
        return res.status(400).json('O campo email é obrigatório');
    }
    if (!cpf) {
        return res.status(400).json('O campo CPF é obrigatório');
    }

    try {
        const query = `
        INSERT INTO usuarios (nome, idade, email, telefone, cpf) 
        VALUES ($1, $2, $3, $4, $5)`;
        const usuario = await conexao.query(query, [nome, idade, email, telefone, cpf]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o usuario');
        }

        return res.status(201).json('Usuário cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, idade, email, telefone, cpf } = req.body;
    try {
        const query = 'SELECT * FROM usuarios WHERE ID = $1'
        const usuario = await conexao.query(query, [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuário não encontrado.')
        }

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório');
        }
        if (!email) {
            return res.status(400).json('O campo email é obrigatório');
        }
        if (!cpf) {
            return res.status(400).json('O campo CPF é obrigatório');
        }

        const queryAtualizacao = `
        UPDATE usuarios
        SET nome = $1, idade = $2, email = $3, telefone = $4, cpf = $5
        WHERE id = $6`
        const usuarioAtualizado = await conexao.query(queryAtualizacao, [nome, idade, email, telefone, cpf, id]);

        if (usuarioAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o usuário.')
        }

        return res.status(200).json('usuario atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM usuarios WHERE ID = $1'
        const usuario = await conexao.query(query, [id]);
        const queryEmprestimos = `
        SELECT * FROM emprestimos 
        WHERE id_usuario = $1
        `;
        const emprestimos = await conexao.query(queryEmprestimos, [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuário não encontrado.')
        }

        if (emprestimos.rowCount !== 0) {
            return res.status(400).json('Não é possível excluir o usuário pois existe(m) empréstimo(s) atrelado(s) a ele no banco de dados.')
        }

        const queryExclusao = 'DELETE FROM usuarios WHERE id = $1'
        const usuarioExcluido = await conexao.query(queryExclusao, [id]);

        if (usuarioExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o usuário.')
        }

        return res.status(200).json('Usuário excluir com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
}