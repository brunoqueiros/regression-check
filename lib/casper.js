// casper casper.js --name=test --url=http://www.github.com --viewport=1024 --selector=#header
var casper = require('casper').create()
  , imageName = casper.cli.options.name
  , url = casper.cli.options.url
  , viewport = casper.cli.options.viewport || 1200
  , selector = casper.cli.options.selector || '';

function getPageHeight() {
  return casper.evaluate(function() { return document.body.offsetHeight });
}

casper.start(url, function () {
  this.wait(2000, function() {
    height = getPageHeight();

    this.viewport(viewport, height).then(function () {
      if (selector !== '') {
        this.captureSelector(imageName + '.png', selector);
      } else {
        this.capture(imageName + '.png');
      }

      console.log('Capturing screenshot from ' + url);
    });
  });
});

casper.run();
