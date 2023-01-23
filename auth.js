import jwt from "jsonwebtoken"

function autenticarUsuario(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization)
        return res.status(403).json({ status: "Não autorizado a acessar essa rota" })

    const [metodo, token] = authorization.split(" ")

    if (metodo.toLower() !== "bearer")
        return res.status(403).json({ status: "Não trabalhamos com esse método de autenticação!!" })

    try {
        jwt.verify(token, process.env.JWT_KEY)
    } catch (e) {
        return res.status(403).json({ status: "Token inválido!!" })
    }
    next()
}

export { autenticarUsuario }