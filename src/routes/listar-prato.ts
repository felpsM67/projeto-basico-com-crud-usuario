import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import ListarPratoController from "../controllers/prato/listar-prato";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
  router.get("/pratos",
    adaptRoute(new ListarPratoController()));
};
