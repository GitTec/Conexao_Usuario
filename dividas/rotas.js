import { Router } from "express";
import { verificarValor } from "./middlewares.js";
import { ControllerDivida } from "./controller.js";


const rotasDivida = Router();
const controller = new ControllerDivida();

rotasDivida.get("/", controller.listar)
rotasDivida.post("/", verificarValor, controller.cadastrar)
rotasDivida.put("/:id", verificarValor, controller.editar)
rotasDivida.patch("/baixa/:id", controller.darBaixa)
rotasDivida.delete("/:id", controller.excluir)

export { rotasDivida }