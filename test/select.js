/**
 * Module dependencies.
 */
var select = require('../'),
    _ = require('underscore'),
    parse = require('cheerio').parse,
    expect  = require('expect.js'),
    dom;

var html = "\
<ul id = 'fruits'>\
  <li class = 'apple'>Apple</li>\
  <li class = 'orange'>Orange</li>\
  <li class = 'pear'>Pear</li>\
</ul>\
".replace(/(\n|\s{2})/g, '');

beforeEach(function() {
  dom = parse(html);
});

describe('select.version', function() {
  it('should have the proper version number format', function() {
    expect(select.version).to.match(/^\d+\.\d+\.\d+$/);
  });
});

describe('select.normalize', function() {
  it('should ignore non-root elements', function() {
    dom = select.normalize(dom.children);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(1);
    expect(dom[0].name).to.equal('ul');
  });

  it('should handle root a element', function() {
    dom = select.normalize(dom);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(1);
    expect(dom[0].name).to.equal('ul');
  });

  it('should handle multiple roots', function() {
    var dom2 = _.clone(dom);
    dom = select.normalize([dom, dom2]);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(2);
    expect(dom[0].name).to.equal('ul');
    expect(dom[1].name).to.equal('ul');
  });
});