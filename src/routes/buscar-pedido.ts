import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { BuscarPedidoController } from "../controllers/pedido/buscar-pedido";

export default (router: Router): void => {
    router.get("/pedidos/{id}", adaptRoute(new BuscarPedidoController()));
};