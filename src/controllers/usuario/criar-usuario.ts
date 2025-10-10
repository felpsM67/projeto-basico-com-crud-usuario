import { Role } from "../../enums/role";
import Cliente from "../../models/cliente-model";
import User from "../../models/user-model";
import bcrypt from "bcrypt";
import validator from "validator";
import Funcionario from "../../models/funcionario-model";
import Gerente from "../../models/gerente-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { UsuarioService } from "../../service/usuario-service";
import { created, serverError } from "../../helpers/http-helper";
class CriarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, email, senha, role } = httpRequest.body;
      const usuarioService = new UsuarioService();
      const user = await usuarioService.buscarPorEmail( email);

      if (user) {
        return {
          statusCode: 400,
          body: { error: "Email já cadastrado" },
        };
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

  async criarPerfil(userId: number, role: string, nome: string) {
    if (role === Role.CLIENTE) {
      await Cliente.create({
        nome,
        userId,
      });
    } else if (role === Role.FUNCIONARIO) {
      await Funcionario.create({
        nome,
        userId,
      });
    } else if (role === Role.GERENTE) {
      await Gerente.create({
        nome,
        userId,
      });
    }
  }
}

export default CriarUsuarioController;
