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

    cadastrarUsuario(nome, email, senhaCriptografada, filename) {   //Passo o eu precisar do controller
        return new Promise((resolve, reject) => {
            conexao.query("insert into usuario (nome, email, senha, ativo, avatar) values (?,?,?,?,?)",
                [nome, email, senhaCriptografada, 1, filename],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    editarUsuario(nome, email, senhaCriptografada, ativo, filename, id) {
        return new Promise((resolve, reject) => {
            conexao.query("update usuario set nome=?, email=?, senha=?, ativo=?, avatar=? where idusuario=?",
                [nome, email, senhaCriptografada, ativo, filename, id],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    recuperarSenha(senhaCriptografada, id) {
        return new Promise((resolve, reject) => {
            conexao.query("update usuario set senha=? where idusuario=?",
                [senhaCriptografada, id],
                (erro, resultado, campos) => {
                    if (erro) {
                        console.log(erro)
                        reject(erro)
                    }
                    resolve(resultado)
                })
        })
    }

    buscarUserporEmail(email){
        return new Promise((resolve, reject)=>{
            conexao.query("select * from usuario where email=?",
            [email],
            (erro, resultado, campos)=>{
                if (erro) {
                    console.log(erro)
                    reject(erro)
                }
                resolve(resultado)
            })
        })
    }

    excluirUsuario(id) {
        return new Promise((resolve, reject) => {
            conexao.query("delete from usuario where idusuario = ?",
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

export { ModelUsuario }