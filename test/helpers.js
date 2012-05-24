var slice = Array.prototype.slice,
    expect = require('expect.js');

exports.ids = function(elem) {
  return elem.attribs.id;
};