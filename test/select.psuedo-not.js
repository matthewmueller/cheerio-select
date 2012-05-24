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
describe('select.psuedo-not', function() {

  t( "Not", "a.blog:not(.link)", ["mark"] );

  t( "Not - multiple", "#form option:not(:contains(Nothing),#option1b,:selected)", ["option1c", "option1d", "option2b", "option2c", "option3d", "option3e", "option4e", "option5b", "option5c"] );
  t( "Not - recursive", "#form option:not(:not(:selected))[id^='option3']", [ "option3b", "option3c"] );

  t( ":not() failing interior", "#qunit-fixture p:not(.foo)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not() failing interior", "#qunit-fixture p:not(div.foo)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not() failing interior", "#qunit-fixture p:not(p.foo)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not() failing interior", "#qunit-fixture p:not(#blargh)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not() failing interior", "#qunit-fixture p:not(div#blargh)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not() failing interior", "#qunit-fixture p:not(p#blargh)", ["firstp","ap","sndp","en","sap","first"] );

  t( ":not Multiple", "#qunit-fixture p:not(a)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not Multiple", "#qunit-fixture p:not(a, b)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not Multiple", "#qunit-fixture p:not(a, b, div)", ["firstp","ap","sndp","en","sap","first"] );
  t( ":not Multiple", "p:not(p)", [] );
  t( ":not Multiple", "p:not(a,p)", [] );
  t( ":not Multiple", "p:not(p,a)", [] );
  t( ":not Multiple", "p:not(a,p,b)", [] );
  t( ":not Multiple", ":input:not(:image,:input,:submit)", [] );

  t( "No element not selector", ".container div:not(.excluded) div", [] );

  t( ":not() Existing attribute", "#form select:not([multiple])", ["select1", "select2", "select5"]);
  t( ":not() Equals attribute", "#form select:not([name=select1])", ["select2", "select3", "select4","select5"]);
  t( ":not() Equals quoted attribute", "#form select:not([name='select1'])", ["select2", "select3", "select4", "select5"]);

  t( ":not() Multiple Class", "#foo a:not(.blog)", ["yahoo","anchor2"] );
  t( ":not() Multiple Class", "#foo a:not(.link)", ["yahoo","anchor2"] );
  t( ":not() Multiple Class", "#foo a:not(.blog.link)", ["yahoo","anchor2"] );

});