import { conexao } from "../../index.js";

class ModelCliente {

    listarClientes() {
        return new Promise((resolve, reject) => {
            conexao.query("select * from cliente",
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    cadastrarClientes(nome, cpf, telefone, endereco, observacoes) {
        return new Promise((resolve, reject) => {
            conexao.query("insert into cliente (nome, cpf, telefone, endereco, observacoes) values (?,?,?,?,?)",
                [nome, cpf, telefone, endereco, observacoes],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    editarClientes(nome, cpf, telefone, endereco, observacoes, id) {
        return new Promise((resolve, reject) => {
            conexao.query("update cliente set nome=?, cpf=?, telefone=?, endereco=?, observacoes=? where id=?",
                [nome, cpf, telefone, endereco, observacoes, id],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    excluirCLientes(id) {
        return new Promise((resolve, reject) => {
            conexao.query("delete from cliente where id = ?",
                [id],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

}
export { ModelCliente }