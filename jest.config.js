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
