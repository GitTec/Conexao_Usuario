import { conexao } from "../../index.js"

class ModelUsuario {

    listarUsuarios() {
        return new Promise((resolve, reject) => {
            conexao.query("select * from usuario",
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    salvarUsuario(nome, email, senhaCriptografada, filename) {
        conexao.query("insert into usuario (nome, email, senha, ativo, avatar) values (?,?,?,?,?)",
            [nome, email, senhaCriptografada, 1, filename],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                }
                return resultado
            })
    }
}

export { ModelUsuario }