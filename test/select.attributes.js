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
describe('select.attributes', function() {
  t( "Attribute Exists", "a[title]", ["google"] );
  t( "Attribute Exists", "*[title]", ["google"] );
  t( "Attribute Exists", "[title]", ["google"] );
  t( "Attribute Exists", "a[ title ]", ["google"] );

  t( "Attribute Equals", "a[rel='bookmark']", ["simon1"] );
  t( "Attribute Equals", 'a[rel="bookmark"]', ["simon1"] );
  t( "Attribute Equals", "a[rel=bookmark]", ["simon1"] );
  t( "Attribute Equals", "a[href='http://www.google.com/']", ["google"] );
  t( "Attribute Equals", "a[ rel = 'bookmark' ]", ["simon1"] );

  cheerio("#anchor2").attr('href', '#2');

  t( "href Attribute", "p a[href^=#]", ["anchor2"] );
  t( "href Attribute", "p a[href*=#]", ["simon1", "anchor2"] );

  t( "for Attribute", "form label[for]", ["label-for"] );
  t( "for Attribute in form", "#form [for=action]", ["label-for"] );

  t( "Attribute containing []", "input[name^='foo[']", ["hidden2"] );
  t( "Attribute containing []", "input[name^='foo[bar]']", ["hidden2"] );
  t( "Attribute containing []", "input[name*='[bar]']", ["hidden2"] );
  t( "Attribute containing []", "input[name$='bar]']", ["hidden2"] );
  t( "Attribute containing []", "input[name$='[bar]']", ["hidden2"] );
  t( "Attribute containing []", "input[name$='foo[bar]']", ["hidden2"] );
  t( "Attribute containing []", "input[name*='foo[bar]']", ["hidden2"] );

  t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type='hidden']", ["radio1", "radio2", "hidden1"] );
  t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type=\"hidden\"]", ["radio1", "radio2", "hidden1"] );
  t( "Multiple Attribute Equals", "#form input[type='radio'], #form input[type=hidden]", ["radio1", "radio2", "hidden1"] );

  t( "Attribute selector using UTF8", "span[lang=中文]", ["台北"] );

  t( "Attribute Begins With", "a[href ^= 'http://www']", ["google","yahoo"] );
  t( "Attribute Ends With", "a[href $= 'org/']", ["mark"] );
  t( "Attribute Contains", "a[href *= 'google']", ["google","groups"] );
  t( "Attribute Is Not Equal", "#ap a[hreflang!='en']", ["google","groups","anchor1"] );

  cheerio("option1a").attr('test', '');

  // TODO: Add match tests

  t("Empty values", "#select1 option[value='']", ["option1a"]);
  t("Empty values", "#select1 option[value!='']", ["option1b","option1c","option1d"]);

  t("Select options via :selected", "#select1 option:selected", ["option1a"] );
  t("Select options via :selected", "#select2 option:selected", ["option2d"] );
  t("Select options via :selected", "#select3 option:selected", ["option3b", "option3c"] );

  t( "Grouped Form Elements", "input[name='foo[bar]']", ["hidden2"] );

  // Make sure attribute value quoting works correctly. See: #6093
  var attrbad = cheerio('<input type="hidden" value="2" name="foo.baz" id="attrbad1"/><input type="hidden" value="2" name="foo[baz]" id="attrbad2"/>');
  cheerio('body').append(attrbad);

  t("Find escaped attribute value", "input[name=foo\\.baz]", ["attrbad1"]);
  t("Find escaped attribute value", "input[name=foo\\[baz\\]]", ["attrbad2"]);

  t("input[type=text]", "#form input[type=text]", ["text1", "text2", "hidden2", "name"]);
  t("input[type=search]", "#form input[type=search]", ["search"]);

  attrbad.remove();

  //#6428
  t("Find escaped attribute value", "#form input[name=foo\\[bar\\]]", ["hidden2"]);

  //#3279
  var div = cheerio("<div><div id='foo' xml:test='something'></div></div>");

  it('should select $([xml\\:test], div)', function() {
    expect($("[xml\\:test]", div)[0]).to.be(div[0]);
  });
});