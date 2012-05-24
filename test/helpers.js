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

/*
 * Helper classes
 */

exports.ids = function(elem) {
  return elem.attribs.id;
};

exports.t = function(description, selector, ids, d) {
  it(description, function() {
    var result = $(selector, d || dom).map(exports.ids);
    expect(result).to.eql(ids);
  });
};

exports.length = function(description, selector, length) {
  it(description, function() {
    expect($(selector, dom)).to.have.length(length);
  });
};