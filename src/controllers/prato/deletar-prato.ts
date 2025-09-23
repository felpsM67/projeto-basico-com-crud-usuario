import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export default class DeletarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;

            const prato = await Prato.findByPk(id);

            if (!prato) {
                return {
                    statusCode: 404,
                    body: { error: 'Prato não encontrado' }
                };
            }

            await prato.destroy();

            return {
                statusCode: 200,
                body: { message: 'Prato deletado com sucesso' }
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };
        }
    }
}