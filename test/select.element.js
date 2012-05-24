/**
 * Module dependencies.
 */
var $ = require('../'),
    _ = require('underscore'),
    parse = require('cheerio').parse,
    expect  = require('expect.js'),
    helpers = require('./helpers'),
    read = require('fs').readFileSync;

/* 
 * Load test data
 */
var html = read(__dirname + '/fixtures/index.html'),
    dom  = parse(html);

/**
 * Mocha tests
 */
describe('select element', function() {

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

  it('("#qunit-fixture p", dom) : should select p tags within id', function() {
    var elems = $('#qunit-fixture p', dom),
        ids = elems.map(helpers.ids);
    expect(["firstp","ap","sndp","en","sap","first"]).to.eql(ids);
  });

  it('("body", dom) : should get the body tag', function() {
    var elems = $("body", dom);
    expect(elems[0].name).to.equal('body');
  });

  it('("html", dom) : should get the html tag', function() {
    var elems = $("html", dom);
    expect(elems[0].name).to.equal('html');
  });

  it('("div p") : should get p tags within a div', function() {
    var elems = $("div p", dom),
        ids = elems.map(helpers.ids);
    expect(["firstp","ap","sndp","en","sap","first"]).to.eql(ids);
  });

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

  it('("h2, h1") : handles sorting order', function() {
    var ids = $("h2, h1", dom).map(helpers.ids);
    expect(["qunit-header", "qunit-banner", "qunit-userAgent"]).to.eql(ids);
  });

  // it('("h2:first, h1:first") : handles sorting order', function() {
  //   var ids = $("h2:first, h1:first", dom).map(helpers.ids);
  //   expect(["qunit-header", "qunit-banner"]).to.eql(ids);
  // });

  it('("#qunit-fixture p, #qunit-fixture p a") : handles sorting order', function() {
    var ids = $("#qunit-fixture p, #qunit-fixture p a", dom).map(helpers.ids);
    expect(["firstp", "simon1", "ap", "google", "groups", "anchor1", "mark", "sndp", "en", "yahoo", "sap", "anchor2", "simon", "first"]).to.eql(ids);
  });

  it('("#lengthtest #idTest") : it should handle id of ID', function() {
    expect($("#lengthtest #idTest", dom).map(helpers.ids)).to.eql(['idTest']);
    // expect($("#lengthtest [name='id']", dom).map(helpers.ids)).to.eql(['idTest']);
    // expect($("#lengthtest input[id='idTest']", dom).mgiap(helpers.ids)).to.eql(['idTest']);
  });

});