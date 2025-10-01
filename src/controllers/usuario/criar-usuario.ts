import { Role } from "../../enums/role";
import Cliente from "../../models/cliente-model";
import User from "../../models/user-model";
import bcrypt from "bcrypt";
import validator from "validator";
import Funcionario from "../../models/funcionario-model";
import Gerente from "../../models/gerente-model";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { UsuarioService } from "../../service/usuario-service";
class CriarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, email, senha, role } = httpRequest.body;

      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!nome || !email || !senha || !role) {
        return {
          statusCode: 400,
          body: { error: "Todos os campos são obrigatórios" },
        };
      }
      // Verifica se o nome tem pelo menos 3 caracteres
      if (nome.length < 3) {
        return {
          statusCode: 400,
          body: { error: "O nome deve ter pelo menos 3 caracteres" },
        };
      }

      if (!Object.values(Role).includes(role)) {
        return {
          statusCode: 400,
          body: { error: `A role ${role} não existem nos papeis do sistema.` },
        };
      }

      // Validação dos dados de entrada
      if (validator.isEmail(email) === false) {
        return {
          statusCode: 400,
          body: { error: "Email inválido" },
        };
      }
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

      return {
        statusCode: 201,
        body: usuario,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };
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
