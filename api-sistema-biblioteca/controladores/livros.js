const conexao = require('../conexao');

const listarLivros = async (req, res) => {
    try {
        const query = `
        SELECT l.id, a.nome AS nome_autor, l.nome, l.editora, l.data_publicacao FROM livros l
        LEFT JOIN autores a ON l.autor_id = a.id
        `;
        const { rows: livros } = await conexao.query(query);

        return res.status(200).json(livros);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterLivro = async (req, res) => {
    const { id } = req.params
    try {
        const query = `
        SELECT l.id, a.nome AS nome_autor, l.nome, l.editora, l.data_publicacao FROM livros l
        LEFT JOIN autores a ON l.autor_id = a.id
        WHERE l.id = $1
        `;
        const livro = await conexao.query(query, [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado.')
        }

        return res.status(200).json(livro.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarLivro = async (req, res) => {
    const { autor_id, nome, editora, data_publicacao } = req.body;

    if (!autor_id) {
        return res.status(400).json('O campo autor_id é obrigatório');
    }

    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório');
    }

    if (!editora) {
        return res.status(400).json('O campo editora é obrigatório');
    }

    try {
        const query = 'INSERT INTO livros (autor_id, nome, editora, data_publicacao) VALUES ($1, $2, $3, $4)';
        const livro = await conexao.query(query, [autor_id, nome, editora, data_publicacao]);

        if (livro.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o livro');
        }

        return res.status(201).json('Livro cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarLivro = async (req, res) => {
    const { id } = req.params;
    const { autor_id, nome, editora, data_publicacao } = req.body;
    try {
        const query = 'SELECT * FROM livros WHERE ID = $1'
        const livro = await conexao.query(query, [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado.')
        }

        if (!autor_id) {
            return res.status(400).json('O campo autor_id é obrigatório');
        }

        if (!nome) {
            return res.status(400).json('O campo nome é obrigatório');
        }

        if (!editora) {
            return res.status(400).json('O campo editora é obrigatório');
        }

        const queryAtualizacao = 'UPDATE livros SET autor_id = $1, nome = $2, editora = $3, data_publicacao = $4 WHERE id = $5'
        const livroAtualizado = await conexao.query(queryAtualizacao, [autor_id, nome, editora, data_publicacao, id]);

        if (livroAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o livro.')
        }

        return res.status(200).json('Livro atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirLivro = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM livros WHERE ID = $1'
        const livro = await conexao.query(query, [id]);
        const queryEmprestimos = `
        SELECT * FROM emprestimos
        WHERE id_livro = $1
        `;
        const emprestimos = await conexao.query(queryEmprestimos, [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado.')
        }

        if (emprestimos.rowCount !== 0) {
            return res.status(400).json('Não é possível excluir o livro pois existe(m) empréstimo(s) atrelado(s) a ele no banco de dados.');
        }

        const queryExclusao = 'DELETE FROM livros WHERE id = $1'
        const livroExcluido = await conexao.query(queryExclusao, [id]);

        if (livroExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o livro.')
        }

        return res.status(200).json('Livro excluir com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarLivros,
    obterLivro,
    cadastrarLivro,
    atualizarLivro,
    excluirLivro
}