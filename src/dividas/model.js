import { conexao } from "../../index.js";

class ModelDivida {

    listarDividas() {
        return new Promise((resolve, reject) => {
            conexao.query("select * from divida as d join cliente as c on c.id = d.id_cliente",
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
export { ModelDivida }

