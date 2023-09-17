module.exports = {
    // The test environment that Jest will use.
    testEnvironment: 'jsdom',
  
    // The files that Jest should watch for changes and re-run the tests for.
    testPathIgnorePatterns: ['node_modules/'],
  
    // The modules that Jest should transform before running the tests.
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
  
    // The modules that Jest should mock.
    moduleNameMapper: {
      '^axios$': '<rootDir>/mocks/axios.js',
    },
  };