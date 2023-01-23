import { conexao } from "../index.js";

class ControllerDivida {

    listar(req, res) {
        conexao.query("select * from cliente as c join divida as d on c.id = d.id_cliente",
            (erro, resultado, campos) => {
                if (erro) {
                    return res.status(500).json("Erro ao buscar Dividas!!")
                } else if (resultado == 0) {
                    return res.json("Não há dividas cadastrados!!")
                } else {
                    return res.json(resultado)
                }
            })
    }

    cadastrar(req, res) {
        const { id_cliente, valor, observacoes } = req.body
        const dt_atual = new Date()
        conexao.query("insert into divida (id_cliente, valor, observacoes, data_criacao) values (?,?,?,?)",
            [id_cliente, valor, observacoes, dt_atual],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao cadastrar divida!!")
                }
                return res.json({ status: "Divida cadastrada com sucesso!!" })
            })
    }

    editar(req, res) {
        const { id } = req.params
        const { id_cliente, valor, observacoes } = req.body
        conexao.query("update divida set id_cliente=?, valor=?, observacoes=? where id=?",
            [id_cliente, valor, observacoes, id],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao editar divida!!")
                }
                return res.json({ status: "Divida editada com sucesso!!" })
            })
    }

    darBaixa(req, res) {
        const { id } = req.params
        const dt_pgto = new Date()
        conexao.query("update divida set data_pagamento=? where id=?",
            [dt_pgto, id],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao dar baixa na divida!!")
                }
                return res.json({ status: "Sua divida foi retirada!!" })
            })
    }

    excluir(req, res) {
        const { id } = req.params
        conexao.query("delete from divida where id=?",
            [id],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao deletar divida")
                }
                return res.json({ status: "Divida deletada com sucesso!!" })
            })
    }
}
export { ControllerDivida }