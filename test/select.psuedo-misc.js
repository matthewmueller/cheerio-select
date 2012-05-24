/**
 * Module dependencies.
 */
var $ = require('../'),
    cheerio = require('cheerio'),
    _ = require('underscore'),
    expect  = require('expect.js'),
    read = require('fs').readFileSync,
    helpers = require('./helpers'),
    t = helpers.t;

/*
 * Load test data
 */
var html = read(__dirname + '/fixtures/index.html'),
    cheerio = cheerio.load(html);

/**
 * Mocha tests
 */
describe('select.psuedo-misc', function() {
  t( "Headers", ":header", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
  t( "Has Children - :has()", "p:has(a)", ["firstp","ap","en","sap"] );

  // TODO: add option matches

  t( "Text Contains", "a:contains(Google)", ["google","groups"] );
  t( "Text Contains", "a:contains(Google Groups)", ["groups"] );

  t( "Text Contains", "a:contains(Google Groups (Link))", ["groups"] );
  t( "Text Contains", "a:contains((Link))", ["groups"] );
});