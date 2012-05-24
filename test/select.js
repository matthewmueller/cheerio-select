
/**
 * Module dependencies.
 */

var cheerio-select = require('cheerio-select')
  , should = require('should');

module.exports = {
  'test .version': function(){
    cheerio-select.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};