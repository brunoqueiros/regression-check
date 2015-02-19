// casper casper.js --name=test --url=http://www.github.com --viewport=1024 --selector=#header
var page = require('webpage').create()
  , fs = require('fs')
  , args = require('./process-args')
  , imageName = args.project
  , url = args.url
  , viewport = args.viewport || 1200
  , selector = args.selector || ''
  , height
  , pageEngine
  , pageEngineName;

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

setEngine();
height = getPageHeight();

page.viewportSize = {
  width: viewport,
  height: height
};
page.open(url, function() {
  window.setTimeout(function () {
    page.render(pageEngineName + '-' + imageName + '.png');
    pageEngine.exit();
  }, 1000);
});
