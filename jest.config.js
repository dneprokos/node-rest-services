module.exports = {
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
      '^@env$': '<rootDir>/envConfig.js',
      '^@api$': '<rootDir>/Api/index.js',
      '^@testHelpers$': '<rootDir>/TestHelpers/index.js',
      '^@models$': '<rootDir>/Models/index.js'
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    reporters: [
      'default',
      ['jest-html-reporter', 
        {
            pageTitle: 'Test Report', 
            outputPath: 'test-reports/test-report.html', 
            openReport: true,
            includeFailureMsg: true
        }
      ]
    ],
    coverageReporters: ['lcov', 'html'],
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/**/*.test.js'
    ]
  };