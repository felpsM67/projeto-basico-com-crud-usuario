import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { ListarPedidoController } from "../controllers/pedido/listar-pedido";

export default (router: Router): void => {
    router.get("/pedidos", adaptRoute(new ListarPedidoController()));
};