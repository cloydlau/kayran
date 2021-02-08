module.exports = {
  preset: './jest.preset',
  //testEnvironment: 'jsdom',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  setupFilesAfterEnv: [
    'expect-puppeteer',
    //'<rootDir>/setupTests.js'
  ],
  testTimeout: 2000
  //testResultsProcessor: './node_modules/jest-html-reporter'
}
