import Cliente from "../models/cliente-model";
import User from "../models/user-model";
import Funcionario from '../models/funcionario-model';
import Gerente from '../models/gerente-model';
import { Encrypter } from '../interfaces';
import { Tokenizer } from '../adapters/token-adapter';

export class LoginService {
  private readonly encrypter;
  private readonly tokenizer;
  public constructor(encrypter: Encrypter, tokenizer: Tokenizer) {
    this.encrypter = encrypter;
    this.tokenizer = tokenizer;
  }
  async login({ email, senha }: { email: string; senha: string }): Promise<null | number> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    // Comparar a senha recebida com a senha criptografada
    const senhaEhValida = await this.encrypter.compare(senha, user.senha);
    if (!senhaEhValida) {
      return null;
    }
    return user.id;
  }

  async buscarPerfilPorUserId(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }
    if (user.role === 'Funcionario') {
      return Funcionario.findOne({ where: { userId } ,include: [{model: User, as: 'user'}] });
    } else if (user.role === 'Cliente') {
      return Cliente.findOne({ where: { userId } ,include: [{model: User, as: 'user'}] });
    } else if (user.role === 'Gerente') {
      return Gerente.findOne({ where: { userId } ,include: [{model: User, as: 'user'}] });
    }
    return null;
  }

  gerarTokens(user: User) {
    const token = this.tokenizer.generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = this.tokenizer.generateRefreshToken({ id: user.id });
    return { token, refreshToken };
  }
}
