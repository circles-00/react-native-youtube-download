module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*))',
  ],
};