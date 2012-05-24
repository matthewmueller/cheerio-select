
# cheerio-select

  Tiny wrapper around FB55's excellent [CSSselect]() library.

  cheerio-select provides a comprehensive test suite based on sizzle's test suite. If all the tests pass in cheerio-select, then sizzle and cheerio-select should have identical functionality. 

## Usage

    var select = require('cheerio-select'),
        parse = require('cheerio').parse,
        dom = parse('<ul id = "fruits"><li class = "apple">Apple</li></ul>');

    select('#fruits > .apple', dom);
    => [{...}]

## TODO 

* Get all the unit tests to pass!
* Consider adding client-side tests
  * psuedo-visibility: https://github.com/jquery/sizzle/blob/master/test/unit/selector.js#L530
  * psuedo-form: https://github.com/jquery/sizzle/blob/master/test/unit/selector.js#L554

## Run tests

    npm install
    make test

## License 

(The MIT License)

Copyright (c) 2012 Matt Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.