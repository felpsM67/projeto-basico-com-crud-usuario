import User from '../../models/user-model';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UsuarioService } from '../../service/usuario-service';

class ListarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.params.id;
      const usuarioService = new UsuarioService()
      const usuario = await usuarioService.buscarUsuarioPorId(userId);
      if (!usuario && userId !== '{id}' && userId !== undefined) {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      } else if (userId !== '{id}' && userId !== undefined) {
        return {
          statusCode: 200,
          body: usuario,
        };
      }
      const usuarios = await usuarioService.buscaTodosUsuarios();
      if (usuarios.length === 0) {
        return {
          statusCode: 404,
          body: { error: 'Nenhum usuário encontrado' },
        };
      }
      return {
        statusCode: 200,
        body: usuarios,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

export default ListarUsuarioController;
