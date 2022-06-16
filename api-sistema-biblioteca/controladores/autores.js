const conexao = require('../conexao');

const listarAutores = async (req, res) => {
    try {
        const query = 'SELECT * FROM autores'
        const { rows: autores } = await conexao.query(query);

        for (const autor of autores) {
            const query = 'SELECT * FROM livros WHERE autor_id = $1'
            const { rows: livros } = await conexao.query(query, [autor.id]);
            autor.livros = livros;
        }

        return res.status(200).json(autores);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterAutor = async (req, res) => {
    const { id } = req.params
    try {
        const query = 'SELECT * FROM autores WHERE ID = $1'
        const autor = await conexao.query(query, [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Autor não encontrado.')
        }

        return res.status(200).json(autor.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarAutor = async (req, res) => {
    const { nome, idade } = req.body;

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório');
    }

    try {
        const query = 'INSERT INTO autores (nome, idade) VALUES ($1, $2)';
        const autor = await conexao.query(query, [nome, idade]);

        if (autor.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o autor');
        }

        return res.status(201).json('Autor cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarAutor = async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    try {
        const query = 'SELECT * FROM autores WHERE ID = $1'
        const autor = await conexao.query(query, [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Autor não encontrado.')
        }

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório');
        }

        const queryAtualizacao = 'UPDATE autores SET nome = $1, idade = $2 WHERE id = $3'
        const autorAtualizado = await conexao.query(queryAtualizacao, [nome, idade, id]);

        if (autorAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o autor.')
        }

        return res.status(200).json('Autor atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirAutor = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM autores WHERE ID = $1'
        const autor = await conexao.query(query, [id]);
        const queryLivros = `
        SELECT * FROM livros
        WHERE autor_id = $1
        `;
        const livros = await conexao.query(queryLivros, [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Autor não encontrado.')
        }

        if (livros.rowCount !== 0) {
            return res.status(400).json('Não é possível exluir o autor pois existe(m) livro(s) atrelado(s) a ele no banco de dados.');
        }

        const queryExclusao = 'DELETE FROM autores WHERE id = $1'
        const autorExcluido = await conexao.query(queryExclusao, [id]);

        if (autorExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o autor.')
        }

        return res.status(200).json('Autor excluir com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor
}