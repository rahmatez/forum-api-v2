module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.js"],
  coveragePathIgnorePatterns: ["node_modules", "tests"],
  testMatch: ["**/tests/**/*.test.js"],
};
