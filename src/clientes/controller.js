import { conexao } from "../../index.js";
import { ModelCliente } from "./model.js";

class ControllerCliente {

    constructor() {
        this.modelCLiente = new ModelCliente();
    }

    listar(req, res) {
        this.modelCLiente.listarClientes().then((resultado) => {
            if (resultado == 0) {
                return res.json("Não há clientes cadastrados!!")
            } else {
                return res.json(resultado)
            }
        }).catch((error) => {
            return res.status(500).json("Erro ao listar clientes!!")
        })
    }

    cadastrar(req, res) {
        const { nome, cpf, telefone, endereco, observacoes } = req.body
        conexao.query("insert into cliente (nome, cpf, telefone, endereco, observacoes) values (?,?,?,?,?)",
            [nome, cpf, telefone, endereco, observacoes],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao cadastrar cliente!!")
                }
                return res.json({ status: "Cliente cadastrado com sucesso!!" })
            })
    }

    editar(req, res) {
        const { id } = req.params
        const { nome, cpf, telefone, endereco, observacoes } = req.body
        conexao.query("update cliente set nome=?, cpf=?, telefone=?, endereco=?, observacoes=? where id=?",
            [nome, cpf, telefone, endereco, observacoes, id],
            (erro, resultado, campos) => {
                if (erro) {
                    return res.status(500).json("Erro ao editar cliente!!")
                }
                return res.json({ status: "Cliente editado com sucesso!!" })
            })
    }

    excluir(req, res) {
        const { id } = req.params
        conexao.query("delete from cliente where id = ?",
            [id],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao deletar cliente!!")
                }
                return res.json({ status: "Cliente deletado com sucesso!!" })
            })
    }
}

export { ControllerCliente }