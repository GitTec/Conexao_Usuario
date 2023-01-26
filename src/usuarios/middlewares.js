function validarUsuario(req, res, next) {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha)
        return res.status(400).send({ error: "Campo obrigatório não informado!!" })

    if (email.length < 3)
        return res.status(400).send({ error: "E-mail não pode ter menos que 3 caracteres" })

    if (senha.length < 4)
        return res.status(400).send({ error: "Senha deve ter pelo menos 4 caracteres!" })
    next()
}

function validarSenha(req, res, next) {
    const { senha } = req.body

    if (senha.length < 4)
        return res.status(400).send({ error: "Senha deve ter pelo menos 4 caracteres!" })
    next()
}

export { validarUsuario, validarSenha }