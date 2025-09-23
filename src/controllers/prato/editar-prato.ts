import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export default class EditarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const { nome, cozinha, descricao_resumida, descricao_detalhada, imagem, valor } = httpRequest.body;

            const prato = await Prato.findByPk(id);

            if (!prato) {
                return {
                    statusCode: 404,
                    body: { error: 'Prato não encontrado' }
                };
            }

            prato.nome = nome || prato.nome;
            prato.cozinha = cozinha || prato.cozinha;
            prato.descricao_resumida = descricao_resumida || prato.descricao_resumida;
            prato.descricao_detalhada = descricao_detalhada || prato.descricao_detalhada;
            prato.imagem = imagem || prato.imagem;
            prato.valor = valor || prato.valor;

            await prato.save();

            return {
                statusCode: 200,
                body: prato
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };
        }
    }
}