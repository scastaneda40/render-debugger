module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest to transform JavaScript and TypeScript files
  },
  testEnvironment: "jest-environment-jsdom", // Explicitly specify the jsdom environment
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"], // Recognize these file extensions
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js", // Mock static assets
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(render-debugger|some-esm-package|another-esm-package)/)", // Allow specific ESM packages to be transformed
  ],
};
