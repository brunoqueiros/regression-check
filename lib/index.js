var exec = require('child_process').exec
  , args = require('./process-args')
  , fs = require('fs')
  , browserArgs = '';

for (var prop in args) {
  browserArgs += ' --' + prop + '=' + args[prop];
};

function createProjectFolder() {
  if (!fs.existsSync(args.project)) {
    fs.mkdir(args.project, function (err) {

    });
  }
}

createProjectFolder();

console.log(args.browser + ' lib/browser.js' + browserArgs);


exec(args.browser + ' lib/browser.js' + browserArgs,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }
);