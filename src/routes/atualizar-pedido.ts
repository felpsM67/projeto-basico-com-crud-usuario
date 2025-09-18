import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { AtualizarPedidoController } from "../controllers/pedido/atualizar-pedido";

export default (router: Router): void => {
    router.put("/pedidos/{id}", adaptRoute(new AtualizarPedidoController()));
};