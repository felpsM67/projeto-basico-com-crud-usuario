import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import EditarPratoController from "../controllers/prato/editar-prato";

export default (router: Router): void => {
     router.put("/pratos/:id", adaptRoute(new EditarPratoController()));
};