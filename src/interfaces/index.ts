import {StatusPedido} from '../enums/status-pedido';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
export interface HttpRequest {
  body: any;
  params: any;
  pathParameters: any;
  queryStringParameters: any;
}
export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface PedidoItemDTO {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface CreatePedidoDTO {
  usuarioId: string;
  itens: PedidoItemDTO[];
}

export interface UpdatePedidoDTO {
  itens?: PedidoItemDTO[];
  status?: StatusPedido;
}