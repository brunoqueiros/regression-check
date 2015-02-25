var args = require('./process-args')
  , fs = require('fs')
  , exec = require('child_process').exec
  , clone = require('./clone');

var Regression = (function () {
  var browserParams = []
    , needReference = false;

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

    browserParams.push(options.browser + ' lib/browser.js' + browserArgs);

    if (needReference) {
      browserArgs += ' --reference=true';
      browserParams.push(options.browser + ' lib/browser.js' + browserArgs);
      console.log(browserArgs);
    }
  }

  function execCommands() {
    var i = 0;
    
    for (i; i < browserParams.length; i++) {
      exec(browserParams[i],
        function (error, stdout, stderr) {
          console.log(stdout);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        }
      );
    }
  }

  function createProjectFolder(folderName) {
    if (!fs.existsSync(folderName)) {
      fs.mkdir(folderName, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  function createReferenceFolder(folderName) {
    var path = 'screenshots/' + folderName + '/reference';

    if (!fs.existsSync(path)) {
      fs.mkdir(path, function (err) {
        if (err) {
          console.error(err);
        }
      });
      needReference = true;
    }
  }

  function compareImage(file, file2) {
    var shell = require('shelljs');

    var metric = shell.exec('compare -metric rmse ' + file + ' ' + file2 + ' diff.png', {silent: true});

    if (metric.output === '0 (0)\n') {
      shell.rm('diff.png');
      console.log('a');
    }
  }

  return {
    init: function (options) {
      createProjectFolder(options.screenshotDirectory + '/' + options.project);
      createReferenceFolder(options.project);
      setBrowserParam(options);
      execCommands();
      // compareImage('screenshots/mozilla/reference/mozilla-phantom-1200-11510.png', 'screenshots/mozilla/mozilla-phantom-1200-11510.png');
    },

    getBrowser: function () {
      return browser;
    }
  }
})();

var r = Regression;

r.init({
  "browser": ['phantomjs', 'slimerjs'],

  "screenshotDirectory": "screenshots",

  "viewport": [1200],

  "project": "mozilla",

  "url": "https://www.mozilla.org/en-US/"
});