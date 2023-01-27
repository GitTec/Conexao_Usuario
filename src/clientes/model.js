import { conexao } from "../../index.js";

class ModelCliente {

    listarClientes() {
        return new Promise((resolve, reject) => {
            conexao.query("select * from cliente",
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
export { ModelCliente }