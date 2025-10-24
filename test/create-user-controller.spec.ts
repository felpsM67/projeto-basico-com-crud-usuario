import request from "supertest";
import app from "../src/config/app"; // Adjust the import based on your project structure

describe("CreateUserController", () => {
  it("should create a user successfully", async () => {
    const resp = await request(app).post("/users").send({
      nome: "John Doe",
      email: "jhondoe@dominio.com",
      senha: "senhaSegura123",
      role: "Gerente",
    });
    expect(resp.status).toBe(201);
    expect(resp.body).toHaveProperty("id");
  });
});

// it('smoke', () => {
//   expect(1 + 1).toBe(2);
// });
