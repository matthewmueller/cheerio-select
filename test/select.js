/**
 * Module dependencies.
 */
var $ = require('../'),
    _ = require('underscore'),
    cheerio = require('cheerio'),
    parse = cheerio.parse,
    expect  = require('expect.js');

describe('select#normalize', function() {
  var html = "<ul id = 'fruits'><li class = 'apple'>Apple</li></ul>",
      dom;

  beforeEach(function() {
    dom = parse(html);
  });

  it('should ignore non-root elements', function() {
    dom = $.normalize(dom.children);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(1);
    expect(dom[0].name).to.equal('ul');
  });

  it('should handle root a element', function() {
    dom = $.normalize(dom);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(1);
    expect(dom[0].name).to.equal('ul');
  });

  it('should handle multiple roots', function() {
    var dom2 = _.clone(dom);
    dom = $.normalize([dom, dom2]);
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(2);
    expect(dom[0].name).to.equal('ul');
    expect(dom[1].name).to.equal('ul');
  });

  it('should normalize on cheerio objects', function() {
    dom = cheerio(dom);
    expect(dom.cheerio).to.be.ok();
    dom = $.normalize(dom);
    expect(dom.cheerio).to.not.be.ok();
    expect(dom).to.be.an(Array);
    expect(dom).to.have.length(1);
    expect(dom[0].name).to.equal('ul');
  });
});


describe('select#version', function() {
  it('should have the proper version number format', function() {
    expect($.version).to.match(/^\d+\.\d+\.\d+$/);
  });
});