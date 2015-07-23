'use strict';
var Delegator = require('delegates');
var assert = require('assert');

module.exports = function(proto, propName) {
  assert.strictEqual(typeof proto, 'object');

  propName = propName || '_stringValue';

  proto.toString = proto.valueOf = function() {
    return this[propName];
  };

  new Delegator(proto, propName)
    .method('charAt')
    .method('charCodeAt')
    .method('concat')
    .method('indexOf')
    .method('lastIndexOf')
    .method('match')
    .method('replace')
    .method('search')
    .method('slice')
    .method('split')
    .method('substr')
    .method('substring')
    .method('toLowerCase')
    .method('toUpperCase')
    .method('trim');

  return proto;
};
