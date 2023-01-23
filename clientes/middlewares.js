import { conexao } from "../index.js"

function validarCliente(req, res, next) {
    const { nome, cpf, telefone, endereco } = req.body

    if (!nome || !cpf || !telefone || !endereco)
        return res.status(400).send({ error: "Campo obrigatório não informado!!" })

    if (cpf.length !== 11)
        return res.status(400).send({ error: "CPF inválido" })

    if (telefone < 11)
        return res.status(400).send({ error: "Telefone Incompleto" })
    next()
}

function validarDividas(req, res, next) {
    const { id } = req.params
    conexao.query("select * from divida where id_cliente=? and data_pagamento is null",
        [id],
        (erro, resultado, campos) => {
            if (erro) {
                console.log(erro)
                return res.status(500).json("Erro ao consultar debitos!")
            }
            if (resultado.length !== 0) {
                console.log(resultado)
                return res.status(500).json("NÃO PODE EXCLUIR, Cliente ainda possui dividas em aberto!!")
            }
            next()
        })
}

export { validarCliente, validarDividas }