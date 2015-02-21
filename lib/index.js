var args = require('./process-args')
  , fs = require('fs')
  , exec = require('child_process').exec
  , clone = require('./clone');

var Regression = (function () {
  var browser;

  function setBrowserParam(options) {
    var i = 0
      , auxOptions;

    for (i; i < options.browser.length; i++) {
      auxOptions = clone(options);
      auxOptions['browser'] = options.browser[i];

      setViewportParam(auxOptions);
    }
  }

  function setViewportParam(options) {
    var i = 0
      , auxOptions;

    for (i; i < options.viewport.length; i++) {
      auxOptions = clone(options);
      auxOptions['viewport'] = options.viewport[i];

      setInlineParams(auxOptions);
    }
  }

  function setInlineParams(options) {
    var browserArgs = ''
      , prop;

    for (prop in options) {
      browserArgs += ' --' + prop + '=' + options[prop];
    }

    console.log(browserArgs);

    createProjectFolder(options.screenshotDirectory + '/' + options.project);

    exec(options.browser + ' lib/browser.js' + browserArgs,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      }
    );
  }

  function createProjectFolder(folderName) {
    if (!fs.existsSync(folderName)) {
      fs.mkdir(folderName, function (err) {

      });
    }
  }

  return {
    init: function (options) {
      setBrowserParam(options);
    },

    getBrowser: function () {
      return browser;
    }
  }
})();

var r = Regression;

r.init({
  "browser": ['phantomjs'],

  "screenshotDirectory": "screenshots",

  "viewport": [320, 1200],

  "project": "whatsmybrowser",

  "url": "http://www.whatsmybrowser.org"
});