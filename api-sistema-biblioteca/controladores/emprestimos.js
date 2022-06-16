const conexao = require('../conexao');

const listarEmprestimos = async (req, res) => {
    try {
        const query = `
        SELECT e.id, u.nome AS usuario, u.telefone, u.email, l.nome AS livro, e.status 
        FROM emprestimos e
        LEFT JOIN
        usuarios u
        ON e.id_usuario = u.id
        LEFT JOIN
        livros l
        ON e.id_livro = l.id
        `;
        const { rows: emprestimos } = await conexao.query(query);
        return res.status(200).json(emprestimos);

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const obterEmprestimo = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
        SELECT e.id, u.nome AS usuario, u.telefone, u.email, l.nome AS livro, e.status
        FROM emprestimos e
        LEFT JOIN 
        usuarios u
        ON e.id_usuario = u.id
        LEFT JOIN
        livros l
        ON e.id_livro = l.id
        WHERE e.id = $1
        `;
        const emprestimo = await conexao.query(query, [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Empréstimo não encontrado');
        }

        return res.status(200).json(emprestimo.rows[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarEmprestimo = async (req, res) => {
    const { id_usuario, id_livro, status } = req.body;

    if (!id_usuario) {
        return res.status(400).json('O campo id_usuario é obrigatório');
    }

    if (!id_livro) {
        return res.status(400).json('O campo id_livro é obrigatório');
    }

    if (status !== "pendente" && status !== "devolvido") {
        return res.status(400).json('Informe um status válido (status válido: pendente ou devolvido).');
    }

    try {
        const query = `
        INSERT INTO emprestimos (id_usuario, id_livro, status)
        VALUES ($1, $2, $3)
        `;
        const emprestimo = await conexao.query(query, [id_usuario, id_livro, status]);

        if (emprestimo.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar o empréstimo.');
        }

        return res.status(201).json('Emprestimo cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarEmprestimo = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_livro, status } = req.body;

    if (!id_usuario) {
        return res.status(400).json('O campo id_usuario é obrigatório.');
    }

    if (!id_livro) {
        return res.status(400).json('O campo id_livro é obrigatório.');
    }

    try {
        const query = `
        SELECT * FROM emprestimos
        WHERE id = $1
        `;
        const emprestimo = await conexao.query(query, [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Emprestimo não encontrado');
        }

        const queryAtualizacao = `
        UPDATE emprestimos
        SET id_usuario = $1, id_livro = $2, status = $3
        WHERE id = $4
        `;
        const emprestimoAtualizado = await conexao.query(queryAtualizacao, [id_usuario, id_livro, status, id]);

        if (emprestimoAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possível atualizar o empréstimo');
        }

        return res.status(201).json('Empréstimo atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirEmprestimo = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT * FROM emprestimos
        WHERE id = $1
        `;
        const emprestimo = await conexao.query(query, [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Empréstimo não encontrado');
        }

        const queryExclusao = `
        DELETE FROM emprestimos
        WHERE id = $1
        `;
        const emprestimoExcluido = await conexao.query(queryExclusao, [id]);

        if (emprestimoExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o empréstimo.');
        }

        return res.status(201).json('Empréstimo exluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarEmprestimos,
    obterEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    excluirEmprestimo
}