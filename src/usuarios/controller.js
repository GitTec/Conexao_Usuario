import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { ModelUsuario } from "../usuarios/modelUsuario.js";

class ControllerUsuario {

    listar(req, res) {
        const modelUsuarios = new ModelUsuario()
        modelUsuarios.listarUsuarios().then((resultado) => {
            if (resultado == 0) {
                return res.json("Não há usuários cadastrados!!")
            } else {
                return res.json(resultado)
            }
        }).catch((error) => {
            return res.status(500).json("Erro ao listar usuários!!")
        })
    }

    cadastrar(req, res) {   //essa agora é uma rota protegida
        const modelUsuarios = new ModelUsuario()
        const { nome, email, senha } = req.body
        const filename = req.file?.filename
        const senhaCriptografada = hashSync(senha, 8)   //hashSync ela criptografa e devolve um texto
        modelUsuarios.cadastrarUsuario(nome, email, senhaCriptografada, filename).then((resultado) => {//Não precisa ser os mesmos nomes
            return res.json("Usuário cadastrado com sucesso!!")
        }).catch((error) => {
            return res.status(500).json("Erro ao cadastrar usuário!!")
        })
    }

    editar(req, res) {
        const modelUsuarios = new ModelUsuario()
        const { id } = req.params
        const { nome, email, senha, ativo } = req.body
        const filename = req.file?.filename
        const senhaCriptografada = hashSync(senha, 8)
        modelUsuarios.editarUsuario(nome, email, senhaCriptografada, ativo, filename, id).then((resultado) => {
            return res.json("Usuário editado com sucesso!!")
        }).catch((erro) => {
            console.log(erro)
            return res.status(500).json("Erro ao editar usuário!!")
        })
    }

    alterarSenha(req, res) {
        const modelUsuarios = new ModelUsuario()
        const { id } = req.params
        const { senha } = req.body
        const senhaCriptografada = hashSync(senha, 8)
        modelUsuarios.recuperarSenha(senhaCriptografada, id).then((resultado) => {
            return res.json("Senha recuperada com sucesso!!")
        }).catch((erro) => {
            return res.status(500).json("Erro ao recuperar a senha!!")
        })
    }

    login(req, res) {
        const { email, senha } = req.body
        const modelUsuarios = new ModelUsuario()
        modelUsuarios.buscarUserporEmail(email).then((resultado) => {
            if (resultado.length === 0) {
                return res.status(401).json("Email ou senha inválidos!!")
            }
            const usuario = resultado[0]    //usuario na posicao 0 do array

            if (!compareSync(senha, usuario.senha)) {   //comparacao de senha digitada com senha do usuario
                return res.status(401).json("Email ou senha inválidos!!")
            }

            //A partir daqui a senha e email estao válidos
            const token = jwt.sign({    //sign: assinatura
                //Aqui não são obrigatorias, coisas que quero guardar no body no token
                email: usuario.email,
                nome: usuario.nome,
                id: usuario.id
            }, process.env.JWT_KEY, {   //2° parametro, assinar
                subject: usuario.email, //3°parametro, predefinidos do jwt mas nao sao obrigatorias
                expiresIn: 180
            })
            delete usuario.senha    //Aqui é pra senha não ficar aparecendo, mesmo que de forma criptografada

            return res.json({   //Aqui pra saber quem fez o login
                token,
                usuario
            })
        })
    }

    excluir(req, res) {
        const modelUsuarios = new ModelUsuario()
        const { id } = req.params
        modelUsuarios.excluirUsuario(id).then((resultado) => {
            return res.status(500).json("Usuário deletado com sucesso!!")
        }).catch((error) => {
            return res.json("Erro ao deletar usuário!!")
        })
    }
}

export { ControllerUsuario }