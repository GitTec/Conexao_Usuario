import { conexao } from "../../index.js";

class ModelDivida {

    listarDividas() {
        return new Promise((resolve, reject) => {
            conexao.query("select d.id, d.valor, d.data_criacao,d.data_pagamento,d.observacoes as obs_divida, c.nome, c.cpf,c.id as id_cliente, c.telefone, c.endereco, c.observacoes as obs_cliente from divida as d join cliente as c on c.id = d.id_cliente;",
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    cadastrarDividas(id_cliente, valor, observacoes, dt_atual) {
        return new Promise((resolve, reject) => {
            conexao.query("insert into divida (id_cliente, valor, observacoes, data_criacao) values (?,?,?,?)",
                [id_cliente, valor, observacoes, dt_atual],
                (erro, resultado, campos) => {
                    if (erro) {
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    editarDividas(id_cliente, valor, observacoes, id) {
        return new Promise((resolve, reject) => {
            conexao.query("update divida set id_cliente=?, valor=?, observacoes=? where id=?",
                [id_cliente, valor, observacoes, id],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    baixarDividas(dt_pgto, id) {
        return new Promise((resolve, reject) => {
            conexao.query("update divida set data_pagamento=? where id=?",
                [dt_pgto, id],
                (erro, resultado, campos) => {
                    if (erro) {
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    excluirDividas(id) {
        return new Promise((resolve, reject) => {
            conexao.query("delete from divida where id=?",
                [id],
                (erro, resultado, campos) => {
                    if (erro) {
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }
}

export { ModelDivida }

