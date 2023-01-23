
function verificarValor(req, res, next) {
    const { valor } = req.body

    if (valor < 0) {
        return res.status(400).send({ error: "Valor da divida não pode ser menor que 0,00R$" })
    }
    next()
}

export { verificarValor }