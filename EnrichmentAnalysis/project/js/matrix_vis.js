let url_ApiLink = settings.url_ApiLink;
let url_browse = settings.url_AmigoLink;
var ontologyList = {};
var pvalueList = [];
var count_x_elements,count_y_elements;
var width,height;

function getColorFromPalue(p_value) {
    let p_value_log = Math.log10(p_value);

    let indexofCurrentp = pvalueList.indexOf(p_value_log);

    let sizeofarray = pvalueList.length;

    let alpha = indexofCurrentp / sizeofarray;

    let d = 0;
    var c;

    d = Math.floor(255 - alpha * 255);
    c = 'rgba(255,' + d.toString() + ',0,1.0)';
    return c;
}


function getOntologyTermsFromGene(geneId, geneName, speciesID) {

	return $.ajax({
		type: 'post',
		url: url_ApiLink + 'statistics/gene-to-term?',
		dataType: 'json',
		data: 'bioentity=' + geneId + '&species=NCBITaxon:' + speciesID,
		success: function (res) {
			// console.log(res.data['gene-to-term-summary-count']);
			for (let ontologyId in res.data['gene-to-term-summary-count']) {
				if (ontologyList.hasOwnProperty(ontologyId)) {
					ontologyList[ontologyId].associatedGenes.push(geneName);
				}
			}
		}
	})
}

function getMatrixData(inputGenes, ontologyTerms, speciesId, selectedCategory) {

	var getDataFlag = $.Deferred();

	var matrixData = {
		"nodes1": [],
		"nodes2": [],
		"links": []
	};

	let inputGenesNum = inputGenes.length;
	let node1Array = [];
	let node2Array = [];

	for (let gene of inputGenes) {
		matrixData["nodes1"].push({
			"name": gene.input,
			"id": gene.id
		});
		node1Array.push(gene.input);
	}

	let index = 0;
	for (let i in ontologyTerms) {
		
		if(selectedCategory != "all" && ontologyTerms[i].ontologyCategory != selectedCategory)
			continue;
		
		matrixData["nodes2"].push({
			"name": ontologyTerms[i].ontologyId
		})
		let onid = ontologyTerms[i].ontologyId;
		
		let p_value = ontologyTerms[i].p;
		let p_value_log = Math.log10(p_value);
		pvalueList.push(p_value_log);
		
		ontologyList[onid] = {
			"term": ontologyTerms[i],
			"associatedGenes": [],
			"index": index
		}
		node2Array.push(onid);
		index++;
	}
	
	pvalueList.sort(function (a, b) { return b - a });
	var promises = [];

	for (let i of inputGenes) {
		let geneId = i.id;
		let geneName = i.input;
		promises.push(getOntologyTermsFromGene(geneId, geneName, speciesId));

	}

	$.when.apply($, promises).done(function () {
		// console.log(ontologyList);

		for (let ontologyid in ontologyList) {

			let index2 = node2Array.indexOf(ontologyid);
			
			if(index2 <0)
				continue;
			
			for (let geneid of ontologyList[ontologyid].associatedGenes) {
				let index1 = node1Array.indexOf(geneid);
				matrixData["links"].push({
					"source": index1,
					"target": index2,
					"value": 1
				})
			}
		}
		// console.log(matrixData);
		getDataFlag.resolve(matrixData);
	});
	return getDataFlag.promise();
}

function loadMatrixView(inputGenes, ontologyTerms, speciesId) {

	$('#vis_graph_matrix').empty();
	
	selectedCategory = document.getElementById("matrixOntologyCategoryVis").value;
	
	var margin = {
		top: 100,
		right: 0,
		bottom: 10,
		left: 100
	};

	$.when(getMatrixData(inputGenes, ontologyTerms, speciesId, selectedCategory)).done(function (res) {
		
		// get the matrix
		var data = res;

		var matrix = [];
		nodes1 = data.nodes1,
		nodes2 = data.nodes2,
		n1 = nodes1.length,
		n2 = nodes2.length;

		count_x_elements = n2;
		count_y_elements = n1;

		width = 15 * count_x_elements;
		height = 15 * count_y_elements;

		$('#saveImage').width(width);
		$('#saveImage').height(height);
			
		var y = d3.scaleBand().range([0, height]),
		x = d3.scaleBand().range([0, width]),
		z = d3.scaleLinear().domain([0, 4]).clamp(true);	

		var svg = d3.select("#vis_graph_matrix").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style("margin-left", 0 + "px")
			.style("font-size", "10px")
			.style("font-family", "sans-serif")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");		
		
		// Compute index per node.
		nodes1.forEach(function (node, i) {
			node.index = i;
			node.count = 0;
			matrix[i] = d3.range(n2).map(function (j) {
					return {
						x: j,
						y: i,
						z: 0
					};
				});
		});

		nodes2.forEach(function (node, i) {
			node.index = i;
			node.count = 0;
		});

		// Convert links to matrix; count character occurrences.
		data.links.forEach(function (link) {
			matrix[link.source][link.target].z = link.value;
			//matrix[link.target][link.source].z += link.value;
			//matrix[link.source][link.source].z += link.value;
			//matrix[link.target][link.target].z += link.value;
			nodes1[link.source].count += 1;
			nodes2[link.target].count += 1;
		});

		// Precompute the orders.
		var orders = {
			name1: d3.range(n1).sort(function (a, b) {
				return d3.ascending(nodes1[a].name, nodes1[b].name);
			}),
			name2: d3.range(n2).sort(function (a, b) {
				return d3.ascending(nodes2[a].name, nodes2[b].name);
			}),
			count1: d3.range(n1).sort(function (a, b) {
				return nodes1[b].count - nodes1[a].count;
			}),
			count2: d3.range(n2).sort(function (a, b) {
				return nodes2[b].count - nodes2[a].count;
			}),
			pvalue: d3.range(n2).sort(function (a, b) {
				
				let p_a = ontologyTerms[nodes2[a].name].p;
				let p_b = ontologyTerms[nodes2[b].name].p;
				return p_a - p_b;
			}),
			pvalue2: d3.range(n2).sort(function (a, b) {
				
				let p_a = ontologyTerms[nodes2[a].name].p;
				let p_b = ontologyTerms[nodes2[b].name].p;
				return p_b - p_a;
			}),			
			catagory: d3.range(n2).sort(function (a, b) {
				
				let c_a = ontologyTerms[nodes2[a].name].ontologyCategory;
				let c_b = ontologyTerms[nodes2[b].name].ontologyCategory;
				if(c_a != c_b)
					return c_a - c_b;
				else{
					let p_a = ontologyTerms[nodes2[a].name].p;
					let p_b = ontologyTerms[nodes2[b].name].p;
					return p_a - p_b
				}
			}),
			//group: d3.range(n).sort(function(a, b) { return nodes[b].group - nodes[a].group; })
		};

		// The default sort order.
		x.domain(orders.pvalue);
		y.domain(orders.count1)

		svg.append("rect")
		.attr("class", "background")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "#eee")


		var row = svg.selectAll(".row")
			.data(matrix)
			.enter().append("g")
			.attr("class", "row")
			.attr("transform", function (d, i) {
				return "translate(0," + y(i) + ")";
			})
			.each(row);

		row.append("line")
		.attr("x2", width)
		.style("stroke", "#fff");

		row.append("a")
		.attr("href", function (d, i) {
			return url_browse + "gene_product/" + nodes1[i].id;
		})
		.attr("target", "_blank")
		.append("text")
		.attr("x", -6)
		.attr("y", y.bandwidth() / 2)
		.attr("dy", "0.32em")
		.attr("text-anchor", "end")
		.text(function (d, i) {
			return nodes1[i].name;
		});

		var column = svg.selectAll(".column")
			.data(nodes2)
			.enter().append("g")
			.attr("class", "column")
			.attr("transform", function (d, i) {
				return "translate(" + x(i) + ")rotate(-90)";
			});

		column.append("line")
		.attr("x1", -width)
		.style("stroke", "#fff");

		column.append("a")
		.attr("href", function (d, i) {
			return url_browse + "term/" + nodes2[i].name;
		})
		.attr("target", "_blank")
		.append("text")
		.attr("x", 6)
		.attr("y", x.bandwidth() / 2)
		.attr("dy", ".32em")
		.attr("text-anchor", "start")
		.text(function (d, i) {
			return nodes2[i].name;
		});

		function row(row) {
			var cell = d3.select(this).selectAll(".cell")
				.data(row.filter(function (d) {
						return d.z;
				}))
				.enter()
				.append("rect")
				.attr("class", "cell")
				.attr("x", function (d) {
					return x(d.x);
				})
				.attr("width", x.bandwidth())
				.attr("height", y.bandwidth())
				.style("fill-opacity", function (d) {
					return 1.0;
				})
				.style("fill", function (d) {
					
					// console.log(d.x);
					let term = nodes2[d.x].name;
					let p_value = ontologyTerms[term].p;
					let color = getColorFromPalue(p_value);
					
					
					return color;
				})
				.on("mouseover", mouseover)
				.on("mouseout", mouseout)				
				.append("svg:title")
				.text(function(d) { 
					let term = nodes2[d.x].name;
					let name = ontologyTerms[term].ontologyName;
					let p_value = ontologyTerms[term].p;
					let category = ontologyTerms[term].ontologyCategory;
					return name+" \n"+p_value+"\n"+category; 
				});
		}

		// console.log(z.domain());
		function mouseover(p) {
			d3.selectAll(".row text").classed("active", function (d, i) {
				return i == p.y;
			});
			d3.selectAll(".column text").classed("active", function (d, i) {
				return i == p.x;
			});
		}

		function mouseout() {
			d3.selectAll("text").classed("active", false);
		}

		$("#order_x, #order_y").change( function () {
			// clearTimeout(timeout);
			// $("#animationNotification").show();
			let x_order = $("#order_x").val();
			let y_order = $("#order_y").val();
			order(x_order, y_order);
			
			// let time = count_x_elements*count_y_elements*2 + 200;
			// setTimeout(function(){ 
				// $("#animationNotification").hide(); 
			// }, time);
		});

		function order(x_order, y_order) {

			x.domain(orders[x_order]);
			y.domain(orders[y_order]);

			var tx = svg.transition().duration(100);
			var ty = svg.transition().duration(100);
			
			ty.selectAll(".row")
			.delay(function (d, i) {
				return y(i) * 2;
			})
			.attr("transform", function (d, i) {
				return "translate(0," + y(i) + ")";
			}).each(function(d, i){
				// if(i == count_y_elements-1)
					// $("#animationNotification").hide();
			})
			.selectAll(".cell")
			.delay(function (d) {
				return x(d.x) * 2;
			})
			.attr("x", function (d) {
				return x(d.x);
			});

			tx.selectAll(".column")
			.delay(function (d, i) {
				return x(i) * 2;
			})
			.attr("transform", function (d, i) {
				return "translate(" + x(i) + ")rotate(-90)";
			});
			
			// let c = 0;
			// d3.selectAll(".column")
			// .each(function(d, i){
				// // if(i == count_x_elements-1)
					// // $("#animationNotification").hide();
				
			// }).transition()
			// .on("end", function(){
				// $("#animationNotification").hide();
			// });
		
		}

		// var timeout = setTimeout(function() {
		// order("group");
		// d3.select("#order").property("selectedIndex", 2).node().focus();
		// }, 5000);
		
		$("#animationNotification").hide(); 
	});
}

function downloadMatrixView(){
	var html = d3.select("svg")
	.attr("version", 1.1)
	.attr("xmlns", "http://www.w3.org/2000/svg")
	.node().parentNode.innerHTML;

	var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);

	var canvas = document.getElementById('saveImage');
	canvas.width = width + 100;
	canvas.height = height + 100;
	
	context = canvas.getContext("2d");

	var image = new Image;
	image.src = imgsrc;
	image.onload = function() {
		
		context.drawImage(image, 0, 0);
		var a = document.createElement("a");
		a.download = "matrix_view.png";
		a.href = canvas.toDataURL("image/png");
		a.click();
	};
}

function onclick_matrixOntologyCategoryChangeVis(){

	/*Load Matrix View*/
	$('#animationNotification').show();
	var ontologyList = {};
	var pvalueList = [];
	loadMatrixView(inputGenes, resultList, speciesId);
}

