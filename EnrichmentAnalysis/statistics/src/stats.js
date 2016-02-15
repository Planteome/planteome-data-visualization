'use strict';

let stats = require('mathjs');
let chisquared = require('chi-squared');

stats.chisquared = chisquared;

module.exports = stats;
