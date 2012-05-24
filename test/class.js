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
describe('select class', function() {
  t( "Class Selector", ".blog", ["mark","simon"] );
  t( "Class Selector", ".GROUPS", ["groups"] );
  t( "Class Selector", ".blog.link", ["simon"] );
  t( "Class Selector w/ Element", "a.blog", ["mark","simon"] );
  t( "Parent Class Selector", "p .blog", ["mark","simon"] );

  t('("p .blog") : should find elements within class', 'p .blog', ['mark', 'simon']);

  // No support for UTF8 yet...
  // t( "Class selector using UTF8", ".台北Táiběi", ["utf8class1"] );
  // //t( "Class selector using UTF8", ".台北", ["utf8class1","utf8class2"] );
  // t( "Class selector using UTF8", ".台北Táiběi.台北", ["utf8class1"] );
  // t( "Class selector using UTF8", ".台北Táiběi, .台北", ["utf8class1","utf8class2"] );
  // t( "Descendant class selector using UTF8", "div .台北Táiběi", ["utf8class1"] );
  // t( "Child class selector using UTF8", "form > .台北Táiběi", ["utf8class1"] );

  t( "Escaped Class", ".foo\\:bar", ["foo:bar"] );
  t( "Escaped Class", ".test\\.foo\\[5\\]bar", ["test.foo[5]bar"] );
  t( "Descendant scaped Class", "div .foo\\:bar", ["foo:bar"] );
  t( "Descendant scaped Class", "div .test\\.foo\\[5\\]bar", ["test.foo[5]bar"] );
  t( "Child escaped Class", "form > .foo\\:bar", ["foo:bar"] );
  t( "Child escaped Class", "form > .test\\.foo\\[5\\]bar", ["test.foo[5]bar"] );

  it('(".e") : should find second classes', function() {
    var test = parse("<div><div class='test e'></div><div class='test'></div></div>");
    expect($(".e", test)).to.have.length(1);
    
    // Now add .e to second div and test again
    test.children[0].children[1].attribs['class'] = 'e';
    expect($(".e", test)).to.have.length(2);
  });
});