var select = require('../'),
    parse = require('cheerio').parse,
    dom = parse('<ul id="fruits"><li class = "apples">Apples</li></ul>');

var query = select('#fruits > .apples', dom);

console.log(query);