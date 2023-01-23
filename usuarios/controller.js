import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { conexao } from "../index.js";

class ControllerUsuario {

    listar(req, res) {
        conexao.query("select * from usuario",
            (erro, resultado, campos) => {
                if (erro) {
                    return res.status(500).json("Erro ao buscar usuário!!")
                } else if (resultado == 0) {
                    return res.json("Não há usuários cadastrados!!")
                } else {
                    return res.json(resultado)
                }
            })
    }

    cadastrar(req, res) {   //essa agora é uma rota protegida
        const { nome, email, senha } = req.body
        const {filename} = req.file
        const senhaCriptografada = hashSync(senha, 8)   //hashSync ela criptografa e devolve um texto
        conexao.query("insert into usuario (nome, email, senha, ativo, avatar) values (?,?,?,?,?)",
            [nome, email, senhaCriptografada, 1, filename],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao cadastrar usuário!!")
                }
                return res.json({ status: "Usuário inserido com sucesso!!" })
            })
    }

    editar(req, res) {
        const { id } = req.params
        const { nome, email, senha, ativo } = req.body
        const senhaCriptografada = hashSync(senha, 8)
        console.log("chegou aqui")
        conexao.query("update usuario set nome=?, email=?, senha=?, ativo=? where idusuario=?",
            [nome, email, senhaCriptografada, ativo, id],
            (erro, resultado, campos) => {
                console.log(erro)
                if (erro) {
                    return res.status(500).json("Erro ao editar usuário!!")
                }
                return res.json({ status: "Usuário editado com sucesso!!" })
            })
    }

    recuperarSenha(req, res) {
        const { id } = req.params
        const { senha } = req.body
        const senhaCriptografada = hashSync(senha, 8)
        conexao.query("update usuario set senha=? where idusuario=?",
            [senhaCriptografada, id],
            (erro, resultado, campos) => {
                if (erro) {
                    return res.status(500).json("Erro ao alterar senha!!")
                }
                console.log(resultado)
                return res.json({ status: "Senha alterada com sucesso!!" })
            })
    }

    login(req, res) {
        const { email, senha } = req.body
        conexao.query("select * from usuario where email=?",
            [email],
            (erro, resultado, campos) => {
                if (erro) {
                    console.log(erro)
                    return res.status(500).json("Erro ao alterar senha!!")
                }
                if (resultado.length === 0) {
                    return res.status(401).json("Email ou senha inválidos!!")
                }
                const usuario = resultado[0]

                if (!compareSync(senha, usuario.senha)) {
                    return res.status(401).json("Email ou senha inválidos!!")
                }
                const token = jwt.sign({
                    email: usuario.email,
                    nome: usuario.nome,
                    id: usuario.id
                }, process.env.JWT_KEY, {
                    subject: usuario.email,
                    expiresIn: 30
                })
                delete usuario.senha    //Aqui é pra senha não ficar aparecendo, mesmo que de forma criptografada

                return res.json({
                    token,
                    usuario
                })
            })
    }

    excluir(req, res) {
        const { id } = req.params
        conexao.query("delete from usuario where idusuario = ?",
            [id],
            (erro, resultado, campos) => {
                if (erro) {
                    return res.status(500).json("Erro ao deletar usuário!!")
                }
                return res.json({ status: "Usuário deletado com sucesso!!" })
            })
    }
}

export { ControllerUsuario }