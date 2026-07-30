import { notFound, ok, serverError } from "../../helpers/http-helper";
import Categorias from "@/models/categoria-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { CreateCategoriaDTO } from "@/types/categorias";

export default class EditarCategoriaController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params
            const {
                nome,
                descricao,
            }: CreateCategoriaDTO = httpRequest.body

            const categoria = await Categorias.findByPk(id)

            if (!categoria){
                return notFound({error : "Categoria não encontrada"});
            }

            await categoria.save(httpRequest.body);

            return ok(categoria);
        } catch (error:any) {
          return serverError(error)
        }
    }
}