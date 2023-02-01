import { ModelCliente } from "./model.js";

class ControllerCliente {

    listar(req, res) {
        const modelCLiente = new ModelCliente();
        modelCLiente.listarClientes().then((resultado) => {
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
        const modelCLiente = new ModelCliente();
        const { nome, cpf, telefone, endereco, observacoes } = req.body
        modelCLiente.cadastrarClientes(nome, cpf, telefone, endereco, observacoes).then((resultado) => {
            return res.json("Cliente cadastrado com sucesso!!")
        }).catch((error) => {
            return res.status(500).json("Erro ao cadastrar cliente!!")
        })
    }

    editar(req, res) {
        const modelCLiente = new ModelCliente();
        const { id } = req.params
        const { nome, cpf, telefone, endereco, observacoes } = req.body
        modelCLiente.editarClientes(nome, cpf, telefone, endereco, observacoes, id).then((resultado) => {
            return res.json("Cliente editado com sucesso!!")
        }).catch((error) => {
            return res.status(500).json("Erro ao editar cliente!!")
        })
    }

    excluir(req, res) {
        const modelCLiente = new ModelCliente();
        const { id } = req.params
        modelCLiente.excluirCLientes(id).then((resultado) => {
            return res.json("Cliente deletado com sucesso!!")
        }).catch((error)=>{
            return res.status(500).json("Erro ao excluir ciente!!")
        })
    }
}

export { ControllerCliente }