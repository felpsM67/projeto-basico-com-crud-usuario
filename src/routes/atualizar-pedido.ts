import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { AtualizarPedidoController } from "../controllers/pedido/atualizar-pedido";
import { authMiddleware } from "../middlewares";
import authorizeRoles from "../middlewares/authorize-roles";

export default (router: Router): void => {
    router.put("/pedidos/{id}",
        authMiddleware,
        authorizeRoles(['Gerente', 'Funcionario']),
        adaptRoute(new AtualizarPedidoController())
    );
};