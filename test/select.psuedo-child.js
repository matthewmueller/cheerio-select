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
describe('select.psuedo-child', function() {

  t( "First Child", "#qunit-fixture p:first-child", ["firstp","sndp"] );
  t( "Last Child", "p:last-child", ["sap"] );
  t( "Only Child", "#qunit-fixture a:only-child", ["simon1","anchor1","yahoo","anchor2","liveLink1","liveLink2"] );
  t( "Empty", "ul:empty", ["firstUL"] );
  t( "Is A Parent", "#qunit-fixture p:parent", ["firstp","ap","sndp","en","sap","first"] );

  t( "First Child", "p:first-child", ["firstp","sndp"] );
  t( "Nth Child", "p:nth-child(1)", ["firstp","sndp"] );
  t( "Nth Child With Whitespace", "p:nth-child( 1 )", ["firstp","sndp"] );
  t( "Not Nth Child", "#qunit-fixture p:not(:nth-child(1))", ["ap","en","sap","first"] );

  // Verify that the child position isn't being cached improperly
  cheerio("p:first-child").after("<div></div>");
  cheerio("p:first-child").before("<div></div>").next().remove();

  t( "First Child", "p:first-child", [], cheerio.dom());

  t( "Last Child", "p:last-child", ["sap"] );
  t( "Last Child", "#qunit-fixture a:last-child", ["simon1","anchor1","mark","yahoo","anchor2","simon","liveLink1","liveLink2"] );

  t( "Nth-child", "#qunit-fixture form#form > *:nth-child(2)", ["text1"] );
  t( "Nth-child", "#qunit-fixture form#form > :nth-child(2)", ["text1"] );

  t( "Nth-child", "#form select:first option:nth-child(-1)", [] );
  t( "Nth-child", "#form select:first option:nth-child(3)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(0n+3)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(1n+0)", ["option1a", "option1b", "option1c", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(1n)", ["option1a", "option1b", "option1c", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(n)", ["option1a", "option1b", "option1c", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(+n)", ["option1a", "option1b", "option1c", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(even)", ["option1b", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(odd)", ["option1a", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(2n)", ["option1b", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(2n+1)", ["option1a", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(2n + 1)", ["option1a", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(+2n + 1)", ["option1a", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(3n)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(3n+1)", ["option1a", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(3n+2)", ["option1b"] );
  t( "Nth-child", "#form select:first option:nth-child(3n+3)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(3n-1)", ["option1b"] );
  t( "Nth-child", "#form select:first option:nth-child(3n-2)", ["option1a", "option1d"] );
  t( "Nth-child", "#form select:first option:nth-child(3n-3)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(3n+0)", ["option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(-1n+3)", ["option1a", "option1b", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(-n+3)", ["option1a", "option1b", "option1c"] );
  t( "Nth-child", "#form select:first option:nth-child(-1n + 3)", ["option1a", "option1b", "option1c"] );
});