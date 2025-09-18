import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { DeletarPedidoController } from "../controllers/pedido/deletar-pedido";

export default (router: Router): void => {
    router.delete("/pedidos/{id}", adaptRoute(new DeletarPedidoController()));
};