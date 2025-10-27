// test/jest-setup-db.ts
import sequelize from '../src/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // ou rodar suas migrações
});

afterAll(async () => {
  await sequelize.close();
});
