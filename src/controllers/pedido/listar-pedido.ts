import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { PedidoService } from "../../service/pedido-service";

export class ListarPedidoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {

            const pedidoService = new PedidoService();
            const pedidos = pedidoService.getPedidos();
            return {
                statusCode: 200,
                body: pedidos
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };

        }
    }
}