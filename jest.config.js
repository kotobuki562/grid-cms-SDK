/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots: ["<rootDir>/test"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  coverageProvider: "v8",
};
