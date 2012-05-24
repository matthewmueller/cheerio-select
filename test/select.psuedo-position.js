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
describe('select.psuedo-position', function() {
  t( "nth Element", "#qunit-fixture p:nth(1)", ["ap"] );
  t( "First Element", "#qunit-fixture p:first", ["firstp"] );
  t( "Last Element", "p:last", ["first"] );
  t( "Even Elements", "#qunit-fixture p:even", ["firstp","sndp","sap"] );
  t( "Odd Elements", "#qunit-fixture p:odd", ["ap","en","first"] );
  t( "Position Equals", "#qunit-fixture p:eq(1)", ["ap"] );
  t( "Position Greater Than", "#qunit-fixture p:gt(0)", ["ap","sndp","en","sap","first"] );
  t( "Position Less Than", "#qunit-fixture p:lt(3)", ["firstp","ap","sndp"] );

  t( "Check position filtering", "div#nothiddendiv:eq(0)", ["nothiddendiv"] );
  t( "Check position filtering", "div#nothiddendiv:last", ["nothiddendiv"] );
  t( "Check position filtering", "div#nothiddendiv:not(:gt(0))", ["nothiddendiv"] );
  t( "Check position filtering", "#foo > :not(:first)", ["en", "sap"] );
  t( "Check position filtering", "select > :not(:gt(2))", ["option1a", "option1b", "option1c"] );
  t( "Check position filtering", "select:lt(2) :not(:first)", ["option1b", "option1c", "option1d", "option2a", "option2b", "option2c", "option2d"] );
  t( "Check position filtering", "div.nothiddendiv:eq(0)", ["nothiddendiv"] );
  t( "Check position filtering", "div.nothiddendiv:last", ["nothiddendiv"] );
  t( "Check position filtering", "div.nothiddendiv:not(:lt(0))", ["nothiddendiv"] );

  t( "Check element position", "div div:eq(0)", ["nothiddendivchild"] );
  t( "Check element position", "div div:eq(5)", ["t2037"] );
  t( "Check element position", "div div:eq(28)", ["fx-queue"] );
  t( "Check element position", "div div:first", ["nothiddendivchild"] );
  t( "Check element position", "div > div:first", ["nothiddendivchild"] );
  t( "Check element position", "#dl div:first div:first", ["foo"] );
  t( "Check element position", "#dl div:first > div:first", ["foo"] );
  t( "Check element position", "div#nothiddendiv:first > div:first", ["nothiddendivchild"] );
});