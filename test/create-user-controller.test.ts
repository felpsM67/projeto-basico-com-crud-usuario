import request from "supertest";
import app from "../src/config/app"; // Adjust the import based on your project structure
import sequelize from "../src/database";
import User from "../src/models/user-model";
import { ENV } from "../src/config/env";
import { BcryptAdapter } from "../src/adapters/bcrypt-adapter";
import Gerente from "../src/models/gerente-model";

describe("CreateUserController", () => {

  const encrypter = new BcryptAdapter(ENV.SALT);
  let testUserId: number;
  let authToken: string;
  let createdUser: any;
  let perfilCreated: any;
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    const senhaCriptografada = await encrypter.hash("senha123");
    const user = await User.create({
      nome: "John Doe",
      email: "jhondoe@dominio.com",
      senha: senhaCriptografada,
      role: "Gerente"
    });
    const perfil = await Gerente.create({
      userId: user.id,
      nome: user.nome
    });
    perfilCreated = perfil;
    createdUser = user;
    testUserId = user.id;
    // Simulate login to get auth token if your app requires authentication
    const resp = await request(app)
      .post("/api/login")
      .set('Accept', 'application/json')
      .send({
        email: createdUser.email,
        senha: "senha123"
      });
    authToken = resp.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a user successfully", async () => {
    const resp = await request(app).post("/api/users")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: "John Doe",
        email: "jhondoe123@dominio.com",
        senha: "senha123",
        role: "Gerente",
      });
    expect(resp.body).toHaveProperty("id");
  });
  it("should not create a user with existing email", async () => {
    const resp = await request(app).post("/api/users")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: "Jane Doe",
        email: "jhondoe123@dominio.com",
        senha: "senha123",
        role: "Gerente",
      });
    expect(resp.status).toBe(400);
    expect(resp.body).toEqual({
       message: "Verifique o seguinte parâmetro inválido: email",
       name: "InvalidParamError"
    });
  });
  // expect(resp.body).toHaveProperty("error");
});