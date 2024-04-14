module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/projects/**/jest.config.js'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
};
