import { ModelDivida } from "./model.js";

class ControllerDivida {

    listar(req, res) {
        const modelDivida = new ModelDivida();
        modelDivida.listarDividas().then((resultado) => {
            if (resultado == 0) {
                return res.json("Não há dividas cadastradas!!")
            } else {
                return res.json(resultado)
            }
        }).catch((error) => {
            return res.status(500).json("Erro ao listar dividas!!")
        })
    }

    cadastrar(req, res) {
        const modelDivida = new ModelDivida();
        const dt_atual = new Date()
        const { id_cliente, valor, observacoes } = req.body
        modelDivida.cadastrarDividas(id_cliente, valor, observacoes, dt_atual).then((resultado) => {
            return res.json("Divida cadastrada com sucesso!!")
        }).catch((error) => {
            return res.status(500).json("Erro ao cadastrar divida!!")
        })
    }

    editar(req, res) {
        const modelDivida = new ModelDivida();
        const { id } = req.params
        const { id_cliente, valor, observacoes } = req.body
        modelDivida.editarDividas(id_cliente, valor, observacoes, id).then((resultado) => {
            return res.json("Divida editada com sucesso!!")
        }).catch((erro) => {
            console.log(erro)
            return res.status(500).json("Erro ao editar divida!!")
        })
    }

    darBaixa(req, res) {
        const modelDivida = new ModelDivida();
        const { id } = req.params
        const dt_pgto = new Date()
        modelDivida.baixarDividas(dt_pgto, id).then((resultado) => {
            return res.json("Sua divida foi quitada!!")
        }).catch((erro) => {
            console.log(erro)
            return res.status(500).json("Erro ao dar baixa na divida!!")
        })
    }

    excluir(req, res) {
        const modelDivida = new ModelDivida();
        const { id } = req.params
        modelDivida.excluirDividas(id).then((resultado) => {
            return res.json("Divida deletada com sucesso!!")
        }).catch((error) => {
            console.log(error)
            return res.status(500).json("Erro ao deletar divida!!")
        })
    }
}
export { ControllerDivida }