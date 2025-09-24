import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import { CriarPedidoController } from "../controllers/pedido/criar-pedido";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
    router.post("/pedidos/",
            authMiddleware,
            authorizeRoles(['Gerente', 'Funcionario']),
            adaptRoute(new CriarPedidoController())
        );
};