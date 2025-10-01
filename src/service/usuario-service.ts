import { ENV } from "../config/env";
import sequelize from "../database";
import { Role } from "../enums/role";
import Cliente from "../models/cliente-model";
import Funcionario from "../models/funcionario-model";
import Gerente from "../models/gerente-model";
import User from "../models/user-model";
import bcrypt from "bcrypt";

export class UsuarioService {
  async deletarUsuario(id: number): Promise<boolean> {
    const result = sequelize.transaction(async (t) => {
      const perfil = await this.__buscarPerfilPorUserId(id);
      if (!perfil) {
        return false;
      }
      const user = await User.findByPk(id);
      if (!user) {
        return false;
      }
      await perfil.destroy({ transaction: t });
      await user.destroy({ transaction: t });
      return true;
    });
    return result;
  }

  async buscarUsuarioPorId(id: number): Promise<User | null> {
    return (await User.findByPk(id))?.toJSON();
  }

  async buscarPorEmail(email: string): Promise<User | null> {
    return (await User.findOne({ where: { email } }))?.toJSON();
  }

  async buscaTodosUsuarios(): Promise<User[]> {
    return (await User.findAll()).map((user) => user?.toJSON());
  }

  async atualizarUsuario(
    id: number,
    { nome, email, senha }: { nome?: string; email?: string; senha?: string }
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    const newUser = { ...user?.toJSON() };
    if (!user) {
      return null;
    }
    const senhaCriptografada = await bcrypt.hash(senha, ENV.SALT);
    newUser.nome = nome || newUser.nome;
    newUser.email = email || newUser.email;
    newUser.senha = senha ? senhaCriptografada : newUser.senha;
    const userAtualizado = await sequelize.transaction(async (t) => {
      const perfil = await this.__buscarPerfilPorUserId(id);
      if (perfil && nome) {
        await perfil.update({ nome }, { transaction: t });
      }
      return await user.update(newUser, { transaction: t });
    });
    return userAtualizado.toJSON();
  }

  async criarUsuario(dadosUsuario: any): Promise<any> {
    const { nome, email, senha, role } = dadosUsuario;
    const senhaCriptografada = await bcrypt.hash(senha, ENV.SALT);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada,
      role,
    });

    await this.__criarPerfil({ userId: usuario.id, role, nome });
    return dadosUsuario;
  }

  async __buscarPerfilPorUserId(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }
    if (user.role === "Funcionario") {
      return Funcionario.findOne({
        where: { userId },
        include: [{ model: User, as: "user" }],
      });
    } else if (user.role === "Cliente") {
      return Cliente.findOne({
        where: { userId },
        include: [{ model: User, as: "user" }],
      });
    } else if (user.role === "Gerente") {
      return Gerente.findOne({
        where: { userId },
        include: [{ model: User, as: "user" }],
      });
    }
    return null;
  }

  async __criarPerfil({
    userId,
    role,
    nome,
  }: {
    userId: number;
    role: string;
    nome: string;
  }) {
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

  async validarUsuarioExistente(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    return !!user;
  }
}
