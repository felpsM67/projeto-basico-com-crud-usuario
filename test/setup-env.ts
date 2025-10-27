// test/setup-env.ts
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: '.env.test' });

// Garante um ambiente consistente
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
