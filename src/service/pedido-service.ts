import { StatusPedido } from "../enums/status-pedido";
import PedidoModel from "../models/pedido-model";
import { CreatePedidoDTO, PedidoItemDTO, UpdatePedidoDTO } from "../types";

export class PedidoService {
  async createPedido(dto: CreatePedidoDTO) {
    if (!dto?.usuarioId || !Array.isArray(dto.itens) || !dto.itens.length) {
      throw new Error("Dados inválidos");
    }
    dto.itens.forEach((i) => {
      if (!i.produtoId || i.quantidade < 1 || i.precoUnitario < 0)
        throw new Error("Item inválido");
    });
    const total = this.__calcularTotal(dto.itens);
    const created = await (PedidoModel as any).create({
      ...dto,
      total,
      status: StatusPedido.CRIADO,
    });
    return created;
  }
  async getPedidos() {
    return (
      (await (PedidoModel as any).findAll?.()) ??
      (await (PedidoModel as any).find?.())
    );
  }

  async getPedidoById(id: string) {
    const byPk = (PedidoModel as any).findByPk || (PedidoModel as any).findById;
    const p = byPk ? await byPk.call(PedidoModel, id) : null;
    if (!p) throw new Error("Pedido não encontrado");
    return p;
  }
  async updatePedido(id: string, patch: UpdatePedidoDTO) {
    const atual: any = await this.getPedidoById(id);
    const dados: any = {};
    if (patch.itens && patch.itens.length) {
      dados.itens = patch.itens;
      dados.total = this.__calcularTotal(patch.itens);
    }
    if (patch.status) {
      this.__validarTransicaoStatus(
        atual.status as StatusPedido,
        patch.status as StatusPedido
      );
      dados.status = patch.status;
    }
    if (Object.keys(dados).length) {
      if ((PedidoModel as any).update) {
        await (PedidoModel as any).update(dados, { where: { id } });
      } else if ((PedidoModel as any).findByIdAndUpdate) {
        await (PedidoModel as any).findByIdAndUpdate(id, dados, { new: true });
      }
    }
    return await this.getPedidoById(id);
  }
  async deletePedido(id: string) {
    const destroyed = (PedidoModel as any).destroy
      ? await (PedidoModel as any).destroy({ where: { id } })
      : await (PedidoModel as any).findByIdAndDelete?.(id);
    if (!destroyed) throw new Error("Pedido não encontrado");
  }
  __calcularTotal(itens: PedidoItemDTO[] = []): number {
    return itens.reduce((acc, i) => acc + i.quantidade * i.precoUnitario, 0);
  }
  __validarTransicaoStatus(atual: StatusPedido, novo: StatusPedido) {
    const mapa: Record<StatusPedido, Set<StatusPedido>> = {
      [StatusPedido.CRIADO]: new Set([
        StatusPedido.PAGO,
        StatusPedido.CANCELADO,
      ]),
      [StatusPedido.PAGO]: new Set([
        StatusPedido.ENVIADO,
        StatusPedido.CANCELADO,
      ]),
      [StatusPedido.ENVIADO]: new Set(),
      [StatusPedido.CANCELADO]: new Set(),
    } as any;
    if (!mapa[atual]?.has(novo))
      throw new Error(`Transição inválida de ${atual} para ${novo}`);
  }
}
