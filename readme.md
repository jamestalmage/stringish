# stringish 

Helper for creating string backed objects

[![Build Status](https://travis-ci.org/jamestalmage/stringish.svg?branch=master)](https://travis-ci.org/jamestalmage/stringish)
[![Coverage Status](https://coveralls.io/repos/jamestalmage/stringish/badge.svg?branch=master&service=github)](https://coveralls.io/github/jamestalmage/stringish?branch=master)
[![Code Climate](https://codeclimate.com/github/jamestalmage/stringish/badges/gpa.svg)](https://codeclimate.com/github/jamestalmage/stringish)
[![Dependency Status](https://david-dm.org/jamestalmage/stringish.svg)](https://david-dm.org/jamestalmage/stringish)
[![devDependency Status](https://david-dm.org/jamestalmage/stringish/dev-status.svg)](https://david-dm.org/jamestalmage/stringish#info=devDependencies)

[![NPM](https://nodei.co/npm/stringish.png)](https://nodei.co/npm/stringish/)

Wrap strings and provide additional information. This is especially useful for parser tokens, or anytime
the backing data is just a string, but you want to add sugar methods that provide additional functionality.

## Usage

```js
var stringish = require('stringish');
var assert = require('assert');

function MyParserToken(backingString) {
  this._stringValue = backingString;
}

stringish(MyParserToken.prototype); // adds `toString`, `valueOf`, and some delegate methods.

var token = new MyParserToken('Token Value');

// this is the useful bit
assert(token instanceof MyParserToken);

// toString just returns what you put in.
assert.equal(token.toString(), 'Token Value');

// toValue is overridden, so you can do non-strict comparison
assert.equal(token, 'Token Value');
  
// can be used with regularExpressions
assert(/Value$/.test(token));
assert.equal(/^\w+/.exec(token)[0], 'Token');
```

Each instance has the following delegate methods that will be called on the
underlying String.

- charAt
- charCodeAt
- concat
- indexOf
- lastIndexOf
- match
- replace
- search
- slice
- split
- substr
- substring
- toLowerCase
- toUpperCase
- trim

## API

### stringish(proto [, propertyName])

Adds a number of functions to `ConstructorFn.prototype`, including `toString`, `valueOf`, 
and a host of methods that delegate directly to the string.

#### ConstructorFn

*Required*  
type: `function`

An object that you want to add the delegate functions to, usually a prototype value.

#### propertyName

*Optional*
type: `string`

The property name of the string you want to delegate to. Defaults to `_stringValue`.

## License

MIT © [James Talmage](http://github.com/jamestalmage)
