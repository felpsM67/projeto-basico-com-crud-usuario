import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import DeletarUsuarioController from "../controllers/usuario/deletar-usuario";
import adaptRoute from "../adapters/express-route-adapter";
export default (router: Router): void => {
  router.delete(
    "/users/:id",
    authMiddleware,
    adaptRoute(new DeletarUsuarioController())
  );
};
