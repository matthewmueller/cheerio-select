/*
 * Module dependencies
 */
var CSSselect = require('CSSselect'),
    isArray = Array.isArray;

/*
 * Select function
 */
exports = module.exports = function(selector, dom) {
  dom = normalize(dom);


};

/*
 * Normalize the dom
 */
var normalize = exports.normalize = function(dom) {
  dom = isArray(dom) ? dom : [dom];
  
  var len = dom.length,
      out = [],
      elem;

  for(var i = 0; i < len; i++) {
    elem = dom[i];
    if(elem.type === 'root') {
      out = out.concat(elem.out || []);
    } else {
      out.push(elem);
    }
  }

  return out;
};