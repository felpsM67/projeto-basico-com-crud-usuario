import { PedidoService } from "../../service/pedido-service";
import { CreatePedidoDTO } from "../../interfaces";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class CriarPedidoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {

            const pedidoService = new PedidoService();
            const pedidoData: CreatePedidoDTO = httpRequest.body;
            const novoPedido = await pedidoService.createPedido(pedidoData);
            return {
                statusCode: 201,
                body: novoPedido
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };

        }
    }
}