
import User from '../../models/user-model';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { forbidden, notFound, ok, serverError } from '../../helpers/http-helper';
import { ENV } from '../../config/env';
import { RefreshTokenDTO } from '../../types';

class RefreshTokenController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { refreshToken }: RefreshTokenDTO = httpRequest.body;

      if (!refreshToken) {
        return notFound({ message: 'Refresh token é obrigatório' })
      }

      const secret = ENV.JWT_REFRESH_SECRET;
      if (!secret) {
        return serverError(new Error('JWT_REFRESH_SECRET is not defined'))
      }
      const decoded = jwt.verify(refreshToken, secret) as JwtPayload;

      // Opcional: Verifique se o refresh token ainda é válido no banco de dados
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return forbidden({ message: 'Refresh token inválido' })
      }

      const signOptions: SignOptions = {
        expiresIn: '15m',
      };
      // Gere um novo access token
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })(),
        signOptions
      );

      return ok({ token: newAccessToken })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export default RefreshTokenController;
