import { Router } from "express";
import DeletarUsuarioController from "../controllers/usuario/deletar-usuario";
import adaptRoute from "../adapters/express-route-adapter";
import { authMiddleware, authorizeRoles } from "../middlewares";
export default (router: Router): void => {
  router.delete(
    "/users/:id",
    authMiddleware,
    authorizeRoles(['Gerente', 'Funcionario']),
    adaptRoute(new DeletarUsuarioController())
  );
};
