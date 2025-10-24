import request from 'supertest';
import app from '../src/config/app';
import { email } from 'zod';

describe('CreateUserController', () => {
    it('should create a new user successfully', async () => {
        const resp = await request(app).post("/users").send({
            nome: "John Doe",
            email: "jhondoe@dominio.com",
            senha: "senhaSegura123",
            role: "Gerente"
        });
        expect(resp.status).toBe(201);
        expect(resp.body).toHaveProperty("id");
    });
});