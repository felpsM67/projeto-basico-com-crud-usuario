import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export default class ListarPratoController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const pratos = await Prato.findAll();
            return {
                statusCode: 200,
                body: pratos
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: { error: error.message }
            };
        }
    }
}