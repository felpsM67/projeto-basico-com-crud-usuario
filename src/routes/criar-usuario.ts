import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import CriarUsuarioController from "../controllers/usuario/criar-usuario";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
  router.post("/users",
    authMiddleware,
    authorizeRoles(['Gerente', 'Funcionario']),
    adaptRoute(new CriarUsuarioController()));
};
