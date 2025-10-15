import { created, serverError } from "../../helpers/http-helper";
import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { CreatePratoDTO } from "../../types";

export class CriarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const { nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor } = httpRequest.body;
        
            const novoPrato: CreatePratoDTO = {
                nome,
                cozinha,
                descricao_resumida,
                descricao_detalhada,
                imagem,
                valor
            };
    
            await Prato.create(novoPrato);

            const pratoSalvo = await Prato.findOne({ where: { nome } });
        
            return created(pratoSalvo);
        } catch (error: any) {
            return serverError(error)
        }
    }
}