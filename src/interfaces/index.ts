import {StatusPedido} from '../enums/status-pedido';

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