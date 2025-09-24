import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoginService } from '../../service/login-service';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha } = httpRequest.body;

      const loginService = new LoginService();

      const response = await loginService.login({ email, senha });

      if (!response) {
        return {
          statusCode: 401,
          body: { message: 'Credenciais inválidas' },
        };
      }

      const perfil = await loginService.buscarPerfilPorUserId(response);
      if (!perfil) {
        return {
          statusCode: 404,
          body: { message: 'Usuário não encontrado, verificar cadastro.' },
        };
      }
      const user = perfil.user;

      const { token, refreshToken } = loginService.gerarTokens(user);

      // Retornar sucesso (você pode adicionar lógica para gerar tokens aqui)
      return {
        statusCode: 200,
        body: {
          message: 'Login realizado com sucesso',
          token,
          refreshToken,
        },
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        statusCode: 500,
        body: { message: 'Erro interno do servidor' },
      };
    }
  }
}

export default LoginController;
