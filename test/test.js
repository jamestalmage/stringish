'use strict';
var assert = require('assert');
var stringish = require('../');

describe('stringish', function() {

  function MyStringWrapper(s) {
    this._stringValue = s;
  }

  stringish(MyStringWrapper.prototype);

  it('toString should equal input', function() {
    assert.equal(
      new MyStringWrapper('\u001b[3m').toString(),
      '\u001b[3m'
    );
  });

  it('valueOf should equal input', function() {
    assert.equal(
      new MyStringWrapper('\u001b[3m').valueOf(),
      '\u001b[3m'
    );
  });

  it('comparison via assert.equal', function() {
    assert.equal(
      new MyStringWrapper('\u001b[3m'),
      '\u001b[3m'
    );
  });

  it('use with regex', function() {
    assert(/^\u001b/.test(new MyStringWrapper('\u001b')));

    assert.equal('\u001b', /\u001b/.exec(new MyStringWrapper('\u001b'))[0]);
  });

  it('delegates some methods', function() {
    var s = '\u001b[33m';
    var e = new MyStringWrapper(s);

    assert.strictEqual(s.charAt(1), e.charAt(1), 'charAt');
    assert.strictEqual(s.charCodeAt(2), e.charCodeAt(2), 'charCodeAt');
    assert.strictEqual(s.concat('abc'), e.concat('abc'), 'concat');
    assert.strictEqual(s.indexOf('3'), e.indexOf('3'), 'indexOf');
    assert.strictEqual(s.lastIndexOf('3'), e.lastIndexOf('3'), 'lastIndexOf');
    assert.deepEqual(s.match(/(\d)(\d)/), e.match(/(\d)(\d)/), 'match');
    assert.strictEqual(s.replace('33', '43'), e.replace('33', '43'), 'replace');
    assert.strictEqual(s.search('33'), e.search('33'), 'search');
    assert.strictEqual(s.slice(2), e.slice(2), 'slice');
    assert.deepEqual(s.split('3'), e.split('3'), 'split');
    assert.strictEqual(s.substr(2), e.substr(2), 'substr');
    assert.strictEqual(s.substring(3), e.substring(3), 'substring');
    assert.strictEqual(s.toLowerCase(), e.toLowerCase(), 'toLowerCase');
    assert.strictEqual(s.toUpperCase(), e.toUpperCase(), 'toUpperCase');
    assert.strictEqual(s.trim(), e.trim(), 'trim');
  });

  it('should be able to supply alternate propertyName', function() {
    function Alternate(str) {
      this._alternate = str;
    }

    stringish(Alternate.prototype, '_alternate');

    assert.equal(new Alternate('blah').valueOf(), 'blah');
  });

});
