import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },

  testRegex: "./tests/.*\\.(test|spec)?\\.(js|ts)$",
  moduleFileExtensions: ["js", "ts", "json"],
  detectOpenHandles: true,
};

export default config;
