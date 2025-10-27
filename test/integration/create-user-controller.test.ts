import request from "supertest";
import { BcryptAdapter } from "../../src/adapters/bcrypt-adapter";
import app from "../../src/config/app"; // Adjust the import based on your project structure
import { ENV } from "../../src/config/env";
import sequelize from "../../src/database";
import Gerente from "../../src/models/gerente-model";
import User from "../../src/models/user-model";

describe("CreateUserController", () => {
  const encrypter = new BcryptAdapter(ENV.SALT);
  let testUserId: number;
  let authToken: string;
  let createdUser: any;
  let perfilCreated: any;
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const senhaCriptografada = await encrypter.hash("senha123");
    const user = await User.create({
      nome: "John Doe",
      email: "jhondoe@dominio.com",
      senha: senhaCriptografada,
      role: "Gerente",
    });
    const perfil = await Gerente.create({
      userId: user.id,
      nome: user.nome,
    });
    perfilCreated = perfil;
    createdUser = user;
    testUserId = user.id;
  });
  
  beforeEach(async () => {
    // Simulate login to get auth token if your app requires authentication
    const resp = await request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({
        email: createdUser.email,
        senha: "senha123",
      });
    authToken = resp.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a user successfully", async () => {
    const resp = await request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        nome: "John Doe",
        email: "jhondoe123@dominio.com",
        senha: "senha123",
        role: "Gerente",
      });
    expect(resp.body).toHaveProperty("id");
  });
  it("should not create a user with existing email", async () => {
    const resp = await request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        nome: "Jane Doe",
        email: "jhondoe123@dominio.com",
        senha: "senha123",
        role: "Gerente",
      });
    expect(resp.status).toBe(400);
    expect(resp.body).toEqual({
      message: "Verifique o seguinte parâmetro inválido: email",
      name: "InvalidParamError",
    });
  });
  // expect(resp.body).toHaveProperty("error");
});

// tests/integration/create-user.controller.int.spec.ts
// import { syncDb, resetDb, closeDb } from "../helpers/db";
// import { api } from "../helpers/api";
// import { seedUserAndLogin } from "../helpers/auth";

// describe("CreateUserController (integration)", () => {
//   let token: string;

//   beforeAll(async () => {
//     await syncDb();
//   });

//   beforeEach(async () => {
//     await resetDb();
//     const auth = await seedUserAndLogin(); // cria user+perfil e loga
//     token = auth.token;
//   });

//   afterAll(async () => {
//     await closeDb();
//   });

//   it("deve criar um usuário com sucesso", async () => {
//     const resp = await api()
//       .withAuth(api().post("/api/users"), token)
//       .send({
//         nome: "John Doe",
//         email: "jhondoe123@dominio.com",
//         senha: "senha123",
//         role: "Gerente",
//       });

//     expect(resp.status).toBe(201); // se sua API retorna 201
//     expect(resp.type).toMatch(/json/);
//     expect(resp.body).toHaveProperty("id");
//     expect(resp.body).toMatchObject({
//       nome: "John Doe",
//       email: "jhondoe123@dominio.com",
//       role: "Gerente",
//     });
//   });

//   it("não deve criar usuário com email já existente", async () => {
//     // 1ª criação
//     const first = await api()
//       .withAuth(api().post("/api/users"), token)
//       .send({
//         nome: "Jane Doe",
//         email: "jhondoe123@dominio.com",
//         senha: "senha123",
//         role: "Gerente",
//       });
//     expect(first.status).toBe(201);

//     // 2ª criação (duplicada)
//     const dup = await api()
//       .withAuth(api().post("/api/users"), token)
//       .send({
//         nome: "Outra Pessoa",
//         email: "jhondoe123@dominio.com",
//         senha: "senha123",
//         role: "Gerente",
//       });

//     expect(dup.status).toBe(400);
//     expect(dup.type).toMatch(/json/);
//     expect(dup.body).toEqual({
//       message: "Verifique o seguinte parâmetro inválido: email",
//       name: "InvalidParamError",
//     });
//   });
// });
