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
describe('select class', function() {

  t( "Name selector", "input[name=action]", ["text1"] );
  // t( "Name selector with single quotes", "input[name='action']", ["text1"] );
  // t( "Name selector with double quotes", 'input[name="action"]', ["text1"] );

  t( "Name selector non-input", "[name=test]", ["length", "fx-queue"] );
  t( "Name selector non-input", "[name=div]", ["fadein"] );
  t( "Name selector non-input", "*[name=iframe]", ["iframe"] );

  // t( "Name selector for grouped input", "input[name='types[]']", ["types_all", "types_anime", "types_movie"] );

  t("Name selector within the context of another element", "#form input[name=action]", ['text1']);
  // t("Name selector for grouped form element within the context of another element", "#form input[name='foo[bar]']", ['hidden2']);

  it('should handle rooted queries on forms (with possible expandos)', function() {
    var form = cheerio("<form><input name='id'/></form>");
    cheerio('body').append(form);
    expect($('input', form)).to.have.length(1);
    form.remove();
  });


  it('should handle complex insertions', function() {
    var a = cheerio('<div><a id="tName1ID" name="tName1">tName1 A</a><a id="tName2ID" name="tName2">tName2 A</a><div id="tName1">tName1 Div</div></div>');
    cheerio('#qunit-fixture').append(a);
    a = a.children();

    expect(a).to.have.length(3);
    expect(a[1].attribs.id).to.equal('tName2ID');

    // A little crazy.. basically test if new dom contains inserted elems
    expect($("[name=tName1]", cheerio.dom())[0]).to.equal(a[0]);
    expect($("[name=tName2]", cheerio.dom())[0]).to.equal(a[1]);
    expect($('#tName2ID', cheerio.dom())).to.have.length(1);

    a.remove();
  });
});