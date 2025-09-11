import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import authMiddleware from "../middlewares/auth-middleware";
import EditarUsuarioController from "../controllers/usuario/editar-usuario";

export default (router: Router): void => {
  router.put(
    "/users/:id",
    authMiddleware,
    adaptRoute(new EditarUsuarioController())
  );
};
