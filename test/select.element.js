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
describe('select.element', function() {

  it('("*", dom) : should select all elements', function() {
    var elems = $('*', dom),
        nodeType = /tag|script|link/;

    // Select all
    expect(elems.length).to.be.above(30);

    // They should all be tags
    _.each(elems, function(elem) {
      expect(nodeType.test(elem.type)).to.be.ok();
    });
  });

  t( "Element Selector", "#qunit-fixture p", ["firstp","ap","sndp","en","sap","first"] );
  t( "Element Selector", "body", ["body"] );
  t( "Element Selector", "html", ["html"] );
  t( "Parent Element", "div p", ["firstp","ap","sndp","en","sap","first"] );

  it('("#object1 param") : should get param tags within #object1', function() {
    var elems = $("#object1 param", dom);
    expect(elems).to.have.length(2);
  });

  it('("#form select") : should get select tags within #form', function() {
    var elems = $("#form select", dom),
        ids = elems.map(helpers.ids);

    expect(["select1","select2","select3","select4","select5"]).to.eql(ids);
  });

  it('("#length") : can handle ids on input', function() {
    expect($('#length', dom)).to.have.length(1);
  });

  it('("#lengthtest input") : can handle ids on input', function() {
    expect($('#lengthtest input', dom)).to.have.length(2);
  });

  it('("p, div p") : checks for duplicates', function() {
    var ids = $("p, div p", dom).map(helpers.ids),
        ids2 = $("p", dom).map(helpers.ids);

    expect(ids).to.have.length(ids2.length);
    expect(ids).to.eql(ids2);
  });

  t( "Checking sort order", "h2, h1", ["qunit-header", "qunit-banner", "qunit-userAgent"] );
  // t( "Checking sort order", "h2:first, h1:first", ["qunit-header", "qunit-banner"] );
  t( "Checking sort order", "#qunit-fixture p, #qunit-fixture p a", ["firstp", "simon1", "ap", "google", "groups", "anchor1", "mark", "sndp", "en", "yahoo", "sap", "anchor2", "simon", "first"] );

  it('("#lengthtest #idTest") : it should handle id of ID', function() {
    expect($("#lengthtest #idTest", dom).map(helpers.ids)).to.eql(['idTest']);
    // expect($("#lengthtest [name='id']", dom).map(helpers.ids)).to.eql(['idTest']);
    // expect($("#lengthtest input[id='idTest']", dom).mgiap(helpers.ids)).to.eql(['idTest']);
  });

});