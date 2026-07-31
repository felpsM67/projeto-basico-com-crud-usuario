import Entregador from "@/models/entregador-model";
import { CreateAdicionalDTO } from "@/types/Adicionais";
import { CreateEntregadorDTO } from "@/types/Entregador";

export class EntregadorService {

    async criarEntregador(novoEntregador: CreateEntregadorDTO): Promise<Entregador> {
        return await Entregador.create(novoEntregador);
    }
}