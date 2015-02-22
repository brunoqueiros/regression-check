// casper casper.js --name=test --url=http://www.github.com --viewport=1024 --selector=#header
var page = require('webpage').create()
  , fs = require('fs')
  , args = require('./process-args')
  , imageName = args.project
  , url = args.url
  , viewport = args.viewport || 1200
  , selector = args.selector || ''
  , delay = args.delay || 0
  , reference = args.reference || false
  , screenshotDirectory = args.screenshotDirectory || 'screenshots'
  , height
  , pageEngine
  , pageEngineName
  , date = new Date()
  , screenshotName
  , path;

console.log(url);

function getPageHeight() {
  return page.evaluate(function() { return document.body.offsetHeight });
}

function setEngine() {
  try {
    pageEngine = slimer;
    pageEngineName = 'slimer';
  } catch (e) {
    pageEngine = phantom;
    pageEngineName = 'phantom';
  }
}

function setScreenshotName() {
  var name;

  name = imageName + '-' + pageEngineName;
  name += '-' + viewport;
  name += '-' + date.getYear() + date.getMonth() + date.getDay();

  screenshotName = name;
}

function setScreenshotPath() {
  path = screenshotDirectory + '/' + imageName;

  if (reference) {
    path += '/reference';
  }
}

setEngine();
height = getPageHeight();
setScreenshotName();
setScreenshotPath();

page.viewportSize = {
  width: viewport,
  height: height
};
page.open(url, function() {
  // TODO: log Capturing
  window.setTimeout(function () {
    page.render(path + '/' + screenshotName + '.png');
    pageEngine.exit();
  }, delay);
});
