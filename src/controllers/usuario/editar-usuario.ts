import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UsuarioService } from '../../service/usuario-service';

class EditarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { nome, email, senha } = httpRequest.body;
    try {
      const usuarioService = new UsuarioService();
      const usuarioExiste = await usuarioService.validarUsuarioExistente(id);
      if (!usuarioExiste) {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      }
      const usuario = await usuarioService.atualizarUsuario(id, {
        nome,
        email,
        senha,
      });
      return {
        statusCode: 200,
        body: usuario,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  }
}

export default EditarUsuarioController;
