import { notFound, ok, serverError, unAuthorized } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoginService } from '../../service/login-service';
import { LoginDTO } from '../../types';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha }: LoginDTO = httpRequest.body;

      const loginService = new LoginService();

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

      // Retornar sucesso (você pode adicionar lógica para gerar tokens aqui)
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
