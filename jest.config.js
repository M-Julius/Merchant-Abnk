module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-redux)',
  ],
  moduleNameMapper: {
    '\\.png$': '<rootDir>/__mocks__/fileMock.js', // ini untuk memock file gambar
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
