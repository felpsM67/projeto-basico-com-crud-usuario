import { Controller, HttpRequest, HttpResponse } from "../../interfaces";
import Prato from "../../models/prato-model";

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