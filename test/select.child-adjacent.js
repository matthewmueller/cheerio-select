/**
 * Module dependencies.
 */
var $ = require('../'),
    cheerio = require('cheerio'),
    _ = require('underscore'),
    expect  = require('expect.js'),
    read = require('fs').readFileSync,
    helpers = require('./helpers'),
    t = helpers.t,
    length = helpers.length;

/*
 * Load test data
 */
var html = read(__dirname + '/fixtures/index.html'),
    cheerio = cheerio.load(html);

/**
 * Mocha tests
 */
describe('select.child/adj', function() {
  t( "Child", "p > a", ["simon1","google","groups","mark","yahoo","simon"] );
  t( "Child", "p> a", ["simon1","google","groups","mark","yahoo","simon"] );
  t( "Child", "p >a", ["simon1","google","groups","mark","yahoo","simon"] );
  t( "Child", "p>a", ["simon1","google","groups","mark","yahoo","simon"] );
  t( "Child w/ Class", "p > a.blog", ["mark","simon"] );
  t( "All Children", "code > *", ["anchor1","anchor2"] );
  t( "All Grandchildren", "p > * > *", ["anchor1","anchor2"] );
  t( "Adjacent", "#qunit-fixture a + a", ["groups"] );
  t( "Adjacent", "#qunit-fixture a +a", ["groups"] );
  t( "Adjacent", "#qunit-fixture a+ a", ["groups"] );
  t( "Adjacent", "#qunit-fixture a+a", ["groups"] );
  t( "Adjacent", "p + p", ["ap","en","sap"] );
  t( "Adjacent", "p#firstp + p", ["ap"] );
  t( "Adjacent", "p[lang=en] + p", ["sap"] );
  t( "Adjacent", "a.GROUPS + code + a", ["mark"] );
  t( "Comma, Child, and Adjacent", "#qunit-fixture a + a, code > a", ["groups","anchor1","anchor2"] );
  t( "Element Preceded By", "#qunit-fixture p ~ div", ["foo", "moretests","tabindex-tests", "liveHandlerOrder", "siblingTest"] );
  t( "Element Preceded By", "#first ~ div", ["moretests","tabindex-tests", "liveHandlerOrder", "siblingTest"] );
  t( "Element Preceded By", "#groups ~ a", ["mark"] );
  t( "Element Preceded By", "#length ~ input", ["idTest"] );
  t( "Element Preceded By", "#siblingfirst ~ em", ["siblingnext"] );

  t("Element Preceded By with a context.", "#siblingfirst ~ em", ["siblingnext"]);
  t("Element Directly Preceded By with a context.", "#siblingfirst + em", ["siblingnext"]);

  length("Parent div for next test is found via ID (#8310)", "#listWithTabIndex", 1);
  length("Find by general sibling combinator (#8310)", "#listWithTabIndex  li:eq(2) ~ li", 1);
  length("Make sure the temporary id assigned by sizzle is cleared out (#8310)", "#__sizzle__", 0);
  length("Parent div for previous test is still found via ID (#8310)", "#listWithTabIndex", 1);

  t( "Verify deep class selector", "div.blah > p > a", [] );

  t( "No element deep selector", "div.foo > span > a", [] );

  t("Verify child context positional selctor", "#nothiddendiv > :first", ['nothiddendivchild']);
  t("Verify child context positional selctor", "#nothiddendiv > :eq(0)", ['nothiddendivchild']);
  t("Verify child context positional selctor", "#nothiddendiv > *:first", ['nothiddendivchild']);

  t( "Non-existant ancestors", ".fototab > .thumbnails > a", [] );

});

