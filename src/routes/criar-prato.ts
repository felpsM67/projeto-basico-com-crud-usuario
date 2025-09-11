import { Router } from "express";
import { CriarPratoController } from "../controllers/prato/criar-prato";
import adaptRoute from "../adapters/express-route-adapter";

export default (router: Router): void => {
  router.post("/pratos", adaptRoute(new CriarPratoController()));
};
