import { noContent, notFound, serverError } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UsuarioService } from '../../service/usuario-service';
class DeletarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    try {
      const usuarioService = new UsuarioService();
      const result = await usuarioService.deletarUsuario(Number(id));
      if (!result) {
        return notFound({ error: 'Usuário não encontrado' });
      }
      return noContent();
    } catch (error: any) {
      return serverError()
    }
  }
}

export default DeletarUsuarioController;
