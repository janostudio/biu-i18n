// Karma configuration
// Generated on Fri Jan 26 2018 09:17:53 GMT+0800 (CST)
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/'
      }, {
        type: 'cobertura',
        subdir: '.',
        dir: 'coverage/'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }
  config.set(configuration);
}
