import Cliente from "../models/cliente-model";
import User from "../models/user-model";
import bcrypt from 'bcrypt';

export class LoginService {
  async login({ email, senha }: { email: string; senha: string }): Promise<null | number> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    // Comparar a senha recebida com a senha criptografada
    const senhaEhValida = await bcrypt.compare(senha, user.senha);
    if (!senhaEhValida) {
      return null;
    }
    return user.id;
  }

  buscarPerfilPorUserId(userId: number) {
    return Cliente.findOne({ where: { userId } ,include: [User] });
  }
}
