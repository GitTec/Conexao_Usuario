import express from "express"
import mysql from "mysql2"
import env from "dotenv"
import { rotasUsuario } from "./src/usuarios/rotas.js"
import { rotasDivida } from "./src/dividas/rotas.js"
import { rotasCliente } from "./src/clientes/rotas.js"

const app = express()
env.config()   
/*Ao chamar a configuracao do dotenv as variaveis de ambiente que estao 
dentro do arquivo .env são adicionadas as variaveis de ambiente do S.O*/

export const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

//INICIO DAS ROTAS
app.use(express.json())


app.use("/uploads", express.static("./uploads"));   //Rota para arquivos estaticos

app.use('/usuarios', rotasUsuario)
app.use('/dividas', rotasDivida)
app.use('/clientes', rotasCliente)
//FIMA DAS ROTAS

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Ocorreu um erro!!")
    } else {
        console.log(`Servidor iniciado com sucesso!!: node:${process.version}: S.O:${process.platform}: user: ${process.env.USERNAME}`)
    }
})
