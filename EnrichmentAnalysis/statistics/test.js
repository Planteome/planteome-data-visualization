'use strict';

let stats = require('./src/stats.js');

//test from wikipedia
let test_hypergeo = stats.hypergeometric(4,5,10,50);
console.log(`hypergeometric test: got ${test_hypergeo}, should be 0.003964583...`);

//test from enrichment analysis doc
let test_fisher = stats.fisher(1,10,12,24);
console.log(`fisher test: got ${test_fisher}, should be 0.001379728...`);

//test from enrichment analysis doc
let test_chi = stats.chi(1,10,12,24);
console.log(`chi test: got ${test_chi}, should be <0.001...`);
