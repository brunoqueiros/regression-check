'use strict';

module.exports = function compareImage(file, file2) {
  var shell = require('shelljs');

  var metric = shell.exec('compare -metric rmse ' + file + ' ' + file2 + ' diff.png', {silent: true});

  if (metric.output === '0 (0)\n') {
    shell.rm('diff.png');
    console.log('a');
  }
}