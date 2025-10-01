import  User from '../../models/user-model';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UsuarioService } from '../../service/usuario-service';
class DeletarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    try {
      const usuarioService = new UsuarioService();
      const result = await usuarioService.deletarUsuario(Number(id));
      if (!result) {
        return {
          statusCode: 404,
          body: { error: 'Não foi possível deletar o usuario' }
        };
      }
      return {
        statusCode: 204,
        body: {},
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

export default DeletarUsuarioController;
