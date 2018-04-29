const base = require('./jest.config.base.js');

module.exports = Object.assign(
  {},
  base,
  {
    setupTestFrameworkScriptFile: './test/unit.setupTestFrameworkScriptFile.js',
    rootDir: '../',
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.js$': 'babel-jest',
    },
    snapshotSerializers: [
      'enzyme-to-json/serializer',
    ],
    collectCoverageFrom: [
      /* Renderer files */
      'app/renderer/**/*.{js,jsx}',
      '!app/renderer/store/**/*.{js,jsx}', // Not worth covering
      '!app/renderer/*.{js,jsx}', // Ignore root files
      /* Worker files */
      'app/worker/**/*.{js,jsx}',
      '!app/worker/*.{js,jsx}', // Ignore root files
      '!app/worker/controllers/**/*.{js,jsx}', // Covered by integration tests
      /* Common ignore */
      '!**/utils/**/*', // Small helper files not worth covering
      '!**/*.prod.{js,jsx}', // Production bundles
      '!**/dist/**', // Dist files
      '!**/index.{js,jsx}', // index.js files are primarily used to export files
    ],
  },
);
