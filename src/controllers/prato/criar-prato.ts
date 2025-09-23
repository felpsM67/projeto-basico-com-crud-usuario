import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class CriarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const { nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor } = httpRequest.body;
        
            const novoPrato = {
                nome,
                cozinha,
                descricao_resumida,
                descricao_detalhada,
                imagem,
                valor
            };
    
            await Prato.create(novoPrato);

            const pratoSalvo = await Prato.findOne({ where: { nome } });
        
            return {
            statusCode: 201,
            body: pratoSalvo
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };
            
        }
    }
}