import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import CriarUsuarioController from "../controllers/usuario/criar-usuario";

export default (router: Router): void => {
  router.post("/users",
    adaptRoute(new CriarUsuarioController()));
};
