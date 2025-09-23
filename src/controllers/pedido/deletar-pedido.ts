import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { PedidoService } from "../../service/pedido-service";

export class DeletarPedidoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {

            const pedidoService = new PedidoService();
            const pedidoId = httpRequest.params.id;
            const response = pedidoService.deletePedido(pedidoId!);
            return {
                statusCode: 204,
                body: {  }
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };

        }
    }
}