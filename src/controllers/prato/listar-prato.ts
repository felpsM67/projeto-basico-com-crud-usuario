import { ok, serverError } from "../../helpers/http-helper";
import Prato from "../../models/prato-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export default class ListarPratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const pratos = await Prato.findAll();
      return ok(pratos);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
