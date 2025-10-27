import request from "supertest";
import app from "../src/config/app"; // Adjust the import based on your project structure
import sequelize from "../src/database";

describe("CreateUserController", () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })
  it("should create a user successfully", async () => {
    const resp = await request(app).post("/api/users")
      .set('Accept', 'application/json')
      .send({
        nome: "John Doe",
        email: "jhondoe@dominio.com",
        senha: "senha123",
        role: "Gerente",
      });
    expect(resp.body).toHaveProperty("id");
  });
})

// it('smoke', () => {
//   expect(1 + 1).toBe(2);
// });
