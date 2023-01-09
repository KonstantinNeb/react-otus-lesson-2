module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/stryker-tmp"],
  testEnvironment: "jsdom",
  globals: {
    window: {},
  },
};
