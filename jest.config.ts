/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Onde estão seus testes .ts
  roots: ["<rootDir>/test"],
  testMatch: ["**/?(*.)+(spec|test).ts"],

  // Passa o tsconfig específico dos testes p/ o ts-jest
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },

  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main.ts",
    "!<rootDir>/**/index.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
};
