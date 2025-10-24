import type { Config } from 'jest'


const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleNameMapper: {},
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/main.ts",
        "!<rootDir>/**/index.ts"
    ],
    coverageDirectory: '<rootDir>/coverage',
};

export default config;