import { Router } from "express"
import { validarUsuario, validarSenha } from "./middlewares.js";
import { autenticarUsuario } from "../../auth.js"
import { ControllerUsuario } from "./controller.js";
import multer from "multer"
import { multerConfig } from "../../multer.js"


const uploadMulter = multer({
    storage: multerConfig
})

const rotasUsuario = Router();
const controller = new ControllerUsuario();

rotasUsuario.get("/", controller.listar)
rotasUsuario.post("/", uploadMulter.single("avatar"), validarUsuario, controller.cadastrar)
rotasUsuario.put("/:id", validarUsuario, controller.editar)
rotasUsuario.patch("/recuperarSenha/:id", validarSenha, controller.alterarSenha)
rotasUsuario.post("/login", controller.login)
rotasUsuario.delete("/:id", autenticarUsuario, controller.excluir)

export { rotasUsuario }