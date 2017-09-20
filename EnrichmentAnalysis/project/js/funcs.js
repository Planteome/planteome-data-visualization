'use strict';

/* funcs.js
 *	desc: holds the statistical analysis methods' implementations and helper functions
 *
 *	functionality exposed:
 *		stats.hypergeometric()
 *		stats.chi()
 *		stats.fisher()
 *		stats.fisher2()
 *
 *	NOTES:
 *		to be loaded AFTER bundle.js
 */
 /*jshint esversion: 6 */
 /*jshint node: true */
 /*jshint -W080 */
 /*jshint laxbreak: true */
 /*globals stats */

(function(){
	//converts from the four numbers (a,b,c,d)
	//to the four numbers (k,K,n,N)
	function alpha_to_kn(a,b,c,d){
		let k = a;
		let K = a + b;
		let n = a + c;
		let N = a + b + c + d;

		return [k,K,n,N];
	}
	//opposite
	function kn_to_alpha(k,K,n,N){
		let a = k;
		let b = K - k;
		let c = n - k;
		let d = (N - K) - (n - k);

		return [a,b,c,d];
	}

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
			//p = pf(a,b)/pf(o,0)*pf(c,d)/pf(a,0)*pf(a,c)/pf(b,0)*pf(b,d)/pf(c,0)/pf(d,0);
			//console.log(`m=${m}, p=${p}`);
			return p;
		}
		
		p = 0;


		if(n<K){
			for(let m = k; m <= n; m++){
				//p += px(m);
				p += hypergeometric(m, K, n, N);
			}
		}else{
			for(let m = k; m <= K; m++){
				//p += px(m);
				p += hypergeometric(m, K, n, N);
			}
		}
		
		/*
		//left tail of fisher's exact test
		//used for tests, enrichment analysis should use right tail 
		p = 0;
		for(let m = 0; m <= k; m++){
		    //p += px(m);
			p+= hypergeometric(m, K, n, N);
		}
		*/


		/*
		//two tails fisher's exact test
		var disproportionDegree = Math.abs(k/K - (n-k)/(N-K));

		var min1 = (n<K)?n:K;
		for(let m = 0; m<=min1; m++){
		var t = Math.abs(m/K - (n-m)/(N-K));
		if(t >= disproportionDegree){
		var temp = px(m);
		p +=temp;
		}
		}
		*/

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

		p = stats.chisquared.pdf(x, df);
		return p;
	}

	//experimental, hopefully more stable version of fisher's exact test
	//the parameters are in format (a,b,c,d) -> DO NOT call this function directly
	//use (preferably) stats.fisher2 (see below) or fisher2,
	//both of which properly converts parameter formats from alpha to kn
	function _fisher2(a,b,c,d){
		//if fisher2 is slow, lower this number
		//for more accuracy, make it bigger
		let f32_arr_len = 500;
		let f32_top1 = new Float32Array(f32_arr_len);
		let f32_bot1 = new Float32Array(f32_arr_len);
		let f32_top2 = new Float32Array(f32_arr_len);
		let f32_bot2 = new Float32Array(f32_arr_len);
		let f32_top3 = new Float32Array(f32_arr_len);
		let f32_bot3 = new Float32Array(f32_arr_len);
		let top1 = 0;
		let bot1 = 0;
		let top2 = 0;
		let bot2 = 0;
		let top3 = 0;
		let bot3 = 0;
		let p = 0.0;

		function pcalc(a,b,c,d,x){
			let total = 1.0;
			top1 = a + b;
			bot1 = x;
			top2 = c + d;
			bot2 = a + c - x;
			top3 = a + b + c + d;
			bot3 = a + c;

			function fill_arr(x,y,top,bot){
				for(let i = 0; i < top.length; i++){
					top[i] = x - i > x - y ? x - i : 1;
				}

				for(let i = 0; i < bot.length; i++){
					bot[i] = y - i > 0 ? y - i : 1;
				}
			}

			fill_arr(top1, bot1, f32_top1, f32_bot1);
			fill_arr(top2, bot2, f32_top2, f32_bot2);
			fill_arr(top3, bot3, f32_top3, f32_bot3);

			for(let i = 0; i < f32_arr_len; i++){
				if(
					f32_top1[i] == f32_bot1[i]
				&& f32_top1[i] == f32_top2[i]
				&& f32_top1[i] == f32_bot2[i]
				&& f32_top1[i] == f32_top3[i]
				&& f32_top1[i] == f32_bot3[i]
				&& f32_top1[i] == 1
				){
					break;
				}

				total *= (f32_top1[i] / f32_bot1[i]);
				total *= (f32_bot3[i] / f32_top3[i]);
				total *= (f32_top2[i] / f32_bot2[i]);
			}

			return total;
		}

		for(let i = a; i <= a + b; i++/* = a + b + 1*/){
			let np = pcalc(a,b,c,d,i);
			//console.log(`np=${np}`);
			if(Number.isNaN(np))
				break;
			p += np;
		}

		return p;
	}

	function fisher2(k,K,n,N){
		return _fisher2(...(kn_to_alpha(k,K,n,N)));
	}


	stats.hypergeometric = hypergeometric;
	stats.chi = chi;
	stats.fisher = fisher;
	stats.fisher2 = fisher2;

	// let test_vals = [
		// [12,5,29,2],
		// [100,2,1000,5],
		// [2,100,5,1000],
		// [2,7,8,2],
		// [5,1,10,10],
		// [1,9,11,3],
		// [5,5,5,200],
	// ];
	// console.log(`tests for stat methods:`);
	// for(let alpha_vals of test_vals){
		// let kn_vals = alpha_to_kn(...alpha_vals);

		// console.log(`for (k,K,n,N) == (${kn_vals})`);
		// for(let method of [stats.hypergeometric, stats.chi, stats.fisher, stats.fisher2]){
			// let res = 0;
			// try {
				// res = method(...kn_vals).toExponential();
			// } catch (e) {
				// res = `err: ${e.name}, ${e.message}`;
			// }
			// console.log(`\t${method.name}: ${res}`);
		// }
	// }
})();
