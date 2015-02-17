var exec = require('child_process').exec
  , args = require('./process-args')
  , casperArgs = '';

console.log(args);

for (var prop in args) {
  casperArgs += ' --' + prop + '=' + args[prop];
};

console.log(casperArgs);

exec('casperjs lib/casper.js' + casperArgs,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }
);
