import { Router } from "express"
import { validarCliente, validarDividas } from "./middlewares.js"
import { ControllerCliente } from "./controller.js"


const rotasCliente = Router()
const controller = new ControllerCliente()

rotasCliente.get("/", controller.listar)
rotasCliente.post("/", validarCliente, controller.cadastrar)
rotasCliente.put("/:id", validarCliente, controller.editar)
rotasCliente.delete("/:id", validarDividas, controller.excluir)

export { rotasCliente }