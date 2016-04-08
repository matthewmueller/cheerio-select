# cheerio-select [![Build Status](https://secure.travis-ci.org/matthewmueller/cheerio-select.svg?branch=master)](http://travis-ci.org/matthewmueller/cheerio-select)

Tiny wrapper around fb55's excellent [`css-select`](https://github.com/fb55/css-select) library.

`cheerio-select` provides a comprehensive test suite based on sizzle's test suite. 

> Warning: Currently, not all tests pass, and some sizzle features will not be supported

## Usage

```js
var select = require('cheerio-select'),
    parse = require('cheerio').parse,
    dom = parse('<ul id = "fruits"><li class = "apple">Apple</li></ul>');

select('#fruits > .apple', dom);
=> [{...}]
```

## TODO 

- [ ] Get all the unit tests to pass!

## Run tests

```
npm install
make test
```

## License 

This Project is under the [MIT License](LICENSE)
