import { Role } from '../enums/role';
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

export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  role: Role;
}

export interface EditarUsuarioDTO {
  nome?: string;
  email?: string;
  senha?: string;
  role?: Role;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface AuthResponseDTO {
  token: string;
  userId: number;
  role: Role;
}

export interface CriarPratoDTO {
  nome: string;
  cozinha: string;
  descricaoResumida: string;
  descricaoDetalhada: string;
  preco: number;
  imagemUrl: string;
}