import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { UsuarioService } from "../../service/usuario-service";
import { badRequest, created, serverError } from "../../helpers/http-helper";
import { InvalidParamError } from "../../errors";
import { BcryptAdapter } from "../../adapters/bcrypt-adapter";
import { ENV } from "../../config/env";
class CriarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, email, senha, role } = httpRequest.body;
      const encrypter = new BcryptAdapter(ENV.SALT)
      const usuarioService = new UsuarioService(encrypter);
      const user = await usuarioService.buscarPorEmail( email);
      if (user) {
        return badRequest(new InvalidParamError("email"));
      }
      const usuario = await usuarioService.criarUsuario({
        nome,
        email,
        senha,
        role,
      });
      return created(usuario);
    } catch (error: any) {
      return serverError();
    }
  }
}
export default CriarUsuarioController;
