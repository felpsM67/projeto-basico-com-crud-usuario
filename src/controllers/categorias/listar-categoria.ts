import { notFound, ok, serverError } from "@/helpers/http-helper";
import Categorias from "@/models/categoria-model";
import { Controller, HttpRequest, HttpResponse } from "@/protocols";


export default class ListaCategoriasController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try{
            const categoriaId = httpRequest.params.id;
            const categoria = await Categorias.findByPk(categoriaId);
            if (!categoria && categoriaId !== "{id}" && categoriaId !== undefined) {
                return notFound({ error: "Prato não encontrado"});
            } else if (categoriaId !== "{id}" && categoriaId !== undefined) {
                return ok(categoria)
            }
            const categorias = await Categorias.findAll();
            return ok(categorias);
        }   catch (error: any) {
            return serverError(error)
        }
    }
}