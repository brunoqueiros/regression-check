var exec = require('child_process').exec
  , args = require('./process-args')
  , browserArgs = '';

for (var prop in args) {
  browserArgs += ' --' + prop + '=' + args[prop];
};

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

// var height;

// function getPageHeight() {
//   return page.evaluate(function() { return document.body.offsetHeight });
// }

// var page = require('webpage').create();
// var pageEngine, pageEngineName;
// height = getPageHeight();
// console.log(height);
// page.viewportSize = { width:1200, height:height };

// try {
//   pageEngine = slimer;
//   pageEngineName = 'slimer';
// } catch (e) {
//   pageEngine = phantom;
//   pageEngineName = 'phantom';
// }

// // var page = require('webpage').create();
// //   height = getPageHeight();
// //   console.log(height);
// //   page.viewportSize = { width:1024, height:height };
// // page.open("http://www.whatsmybrowser.org/", function (status) {
// //   page.render('screenshot-slimerjs.png');
// //   slimer.exit();
// // });


// page.open('http://www.whatsmybrowser.org/', function() {
//   // window.setTimeout(function () {
//     page.render('screenshot-' + pageEngineName + '.png');
//     pageEngine.exit();
//   // }, 2000);
// });