'use stict';

var args
  , processedArgs = {}
  , delimiter = '='
  , aux
  , system;

function getArgs() {
  var args;

  try {
    args = process.argv.slice(2).replace(/\-\-/gi, '');
  } catch (e) {
    system = require('system');
    args = system.args.toString().replace(/\-\-/gi, '');
    args = args.split(',');
  }

  return args;
}

function iskeyValue(arg) {
  return arg.indexOf(delimiter) > -1;
}

function processKeyValue(arg) {
  var array = arg.split(delimiter);

  if (array.length === 1) {
    array = false;
  }

  return array;
}

args = getArgs();
args.forEach(function (val, idx, array) {
  if (iskeyValue(val)) {
    aux = processKeyValue(val);
    processedArgs[aux[0]] = aux[1];
  }
});

module.exports = processedArgs;
