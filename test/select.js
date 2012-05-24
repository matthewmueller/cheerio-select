/**
 * Module dependencies.
 */
var select = require('../'),
    parse = require('cheerio').parse,
    expect  = require('expect.js');


describe('select.version', function() {
  it('should have the proper version number format', function() {
    expect(select.version).to.match(/^\d+\.\d+\.\d+$/);
  });
});


