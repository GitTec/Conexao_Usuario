import jwt from "jsonwebtoken"

function autenticarUsuario(req, res, next) {    //validar se foi enviado um header authorization.bearer(token)
    const authorization = req.headers.authorization
    if (!authorization) //se eu não tiver autirazado
        return res.status(403).json({ status: "Não autorizado a acessar essa rota" })

    const [metodo, token] = authorization.split(" ")    //quebro em metodo e token

    //bearer: nome do metodo de autenticacao
    //toLower: todas as letras em minusculo
    if (metodo.toLower() !== "bearer")  //se o metodo for diferente de bearer
        return res.status(403).json({ status: "Não trabalhamos com esse método de autenticação!!" })

    try {
        jwt.verify(token, process.env.JWT_KEY)  //token gerado com a chave
    } catch (e) {
        return res.status(403).json({ status: "Token inválido!!" })
    }
    next()
}

export { autenticarUsuario }