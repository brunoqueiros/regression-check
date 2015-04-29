import args from './process-args';
import fs from 'fs';
import child_process from 'child_process';
import clone from './clone';
import extend from 'extend';
import Logger from './logger'

var browserParams = []
  , needReference = false
  , allowedOptions = {
    'browser': {
      'type': 'object',
      'values': ['phantomjs', 'slimerjs']
    },
    'screenshotDirectory': {
      'type': 'string'
    },
    'viewport': {
      'type': 'object',
      'valueType': 'number'
    },
    'project': {
      'type': 'string'
    },
    'url': {
      'type': 'string'
    }
  },
  i = 0;

class Regression {
  constructor(options) {
    var folderPath = options.screenshotDirectory + '/' + options.project;

    this.options = {
      'browser': ['phantomjs'],
      'screenshotDirectory': 'screenshots',
      'viewport': [1200],
      'project': '',
      'url': ''
    };

    this.extendOptions(options);
    this.validateOptions();

    createProjectFolder(folderPath)
      .then((path) => {
        setBrowserParam(options);
        execCommands();
      });
    // compareImage('screenshots/mozilla/reference/mozilla-phantom-1200-11510.png',
      // 'screenshots/mozilla/mozilla-phantom-1200-11510.png');
  }

  extendOptions(options) {
    this.options = extend(this.options, options);
  }

  validateOptions() {
    var option;

    for (option in this.options) {
      if (allowedOptions.hasOwnProperty(option)) {
        if (typeof this.options[option] !== allowedOptions[option].type) {
          Logger.error('Invalid option type: ' + option);
        }
      } else {
        Logger.error('Invalid option: ' + option);
      }
    }
  }
}

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

  Logger.info(browserArgs);

  browserParams.push(options.browser + ' lib/browser.js' + browserArgs);

  if (needReference) {
    browserArgs += ' --reference=true';
    browserParams.push(options.browser + ' lib/browser.js' + browserArgs);
    Logger.info(browserArgs);
  }
}

function execCommands() {
  if (i < browserParams.length) {
    child_process.exec(browserParams[i], function (error, stdout, stderr) {
      ++i;
      execCommands();

      if (error !== null) {
        Logger.error(error);
      }
    });
  }
}

function createProjectFolder(folderName) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(folderName)) {
      fs.mkdir(folderName, function (error) {
        createReferenceFolder(folderName)
          .then(() => {
            resolve(folderName);
          });

        if (error) {
          Logger.error(error);
        }
      });
    } else {
      resolve(folderName);
    }
  });
}

function createReferenceFolder(folderName) {
  var path = folderName + '/reference';

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      fs.mkdir(path, function (error) {
        needReference = true;
        resolve();

        if (error) {
          Logger.error(error);
        }
      });
    } else {
      resolve();
    }
  });
}


export default Regression;
