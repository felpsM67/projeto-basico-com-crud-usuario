import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import DeletarPratoController from "../controllers/prato/deletar-prato";

export default (router: Router): void => {
  router.delete("/pratos/:id", adaptRoute(new DeletarPratoController()));
};
