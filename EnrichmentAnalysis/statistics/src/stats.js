'use strict';

let stats = require('mathjs');
let chisquared = require('chi-squared');

function hypergeometric(k,K,n,N){
    let p = undefined;

    let bc1 = stats.combinations(K, k);
    let bc2 = stats.combinations((N - K),(n - k));
    let bc3 = stats.combinations(N, n);

    p = (bc1 * bc2) / bc3;
    return p;
}

function fisher(k,K,n,N){
    let p = 0;

    function px(m){
        let a = m;
        let b = K - m;
        let c = n - m;
        let d = (N - K) - (n - m);
        let o = N;

        function pf(x,y){
            return stats.factorial((x + y));
        }

        let p = 0;
        p = (pf(a,b)*pf(c,d)*pf(a,c)*pf(b,d))/(pf(o,0)*pf(a,0)*pf(b,0)*pf(c,0)*pf(d,0));
        //console.log(`m=${m}, p=${p}`);
        return p;
    }

    p = 0;
    for(let m = 0; m <= k; m++){
        p += px(m);
    }

    //console.log(`p=${p}`);
    return p;
}

function chi(k,K,n,N){
    let p = undefined;

    let df = 1; //always

    let obs_a = k;
    let exp_a = (n / N) * (K / N) * N;
    let obs_b = K - k;
    let exp_b = ((N - n) / N) * (K / N) * N;
    let obs_c = n - k;
    let exp_c = (n / N) * ((N - K) / N) * N;
    let obs_d = (N - n) - (K - k);
    let exp_d = ((N - n) / N) * ((N - K) / N) * N;

    let cell_a = Math.pow((obs_a - exp_a), 2) / exp_a;
    let cell_b = Math.pow((obs_b - exp_b), 2) / exp_b;
    let cell_c = Math.pow((obs_c - exp_c), 2) / exp_c;
    let cell_d = Math.pow((obs_d - exp_d), 2) / exp_d;

    let x = cell_a + cell_b + cell_c + cell_d;

    p = chisquared.pdf(x, df);
    return p;
}

module.exports = {
    hypergeometric : hypergeometric,
    fisher : fisher,
    chi : chi
};
