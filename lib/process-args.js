'use stict';

var args = process.argv.slice(2)
  , processedArgs = {}
  , delimiter = '='
  , aux;

function iskeyValue(arg) {
  return arg.indexOf(delimiter);;
}

function processKeyValue(arg) {
  var array = arg.split(delimiter);

  if (array.length === 1) {
    array = false;
  }

  return array;
}

args.forEach(function (val, idx, array) {
  if (iskeyValue(val)) {
    aux = processKeyValue(val);
    processedArgs[aux[0]] = aux[1];
  }
});

module.exports = processedArgs;
