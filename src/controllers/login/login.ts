import { notFound, ok, serverError, unAuthorized } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoginService } from '../../service/login-service';
import { LoginDTO } from '../../types';
import { ENV } from '../../config/env';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { TokenAdapter } from '../../adapters/token-adapter';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha }: LoginDTO = httpRequest.body;

      const encrypter = new BcryptAdapter(ENV.SALT || 10);
      const tokenizer = new TokenAdapter();
      const loginService = new LoginService(encrypter, tokenizer);

      const response = await loginService.login({ email, senha });

      if (!response) {
        return unAuthorized({ message: 'Credenciais inválidas' });
      }

      const perfil = await loginService.buscarPerfilPorUserId(response);
      if (!perfil) {
        return notFound({ message: 'Usuário não encontrado, verificar cadastro.' })
      }
      const user = perfil.user;

      const { token, refreshToken } = loginService.gerarTokens(user);

      return ok({
        message: 'Login realizado com sucesso',
        token,
        refreshToken,
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export default LoginController;
