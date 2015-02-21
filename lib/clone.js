'use strict';

module.exports = function clone(obj) {
  var copy = {}
    , prop;

  for (prop in obj) {
    copy[prop] = obj[prop];
  }

  return copy;
};