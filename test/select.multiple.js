/**
 * Module dependencies.
 */
var $ = require('../'),
    _ = require('underscore'),
    parse = require('cheerio').parse,
    expect  = require('expect.js'),
    read = require('fs').readFileSync,
    helpers = require('./helpers'),
    t = helpers.t;

/*
 * Load test data
 */
var html = read(__dirname + '/fixtures/index.html'),
    dom  = parse(html);

/**
 * Mocha tests
 */
describe('select.multiple', function() {
  t( "Comma Support", "h2, #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
  t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
  t( "Comma Support", "h2 , #qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
  t( "Comma Support", "h2,#qunit-fixture p", ["qunit-banner","qunit-userAgent","firstp","ap","sndp","en","sap","first"]);
});