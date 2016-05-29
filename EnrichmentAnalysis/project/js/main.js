'use strict';

let show_results = true;
let url_stats = 'http://test.planteome.org/api/statistics/';
let url_amigo = 'http://test.planteome.org/amigo/';
let raw_graph_data = [];
let resultList = [];
let sigma_graph;

function initialize(){
	function taxonFactory(name, id){
		let e = document.createElement('option');
		e.value = id;
		e.text = name;

		return e;
	}
	//initialize the species selet button

	let taxonList = [
		['Arabidopsis_thaliana', '3702'],
		['Aegilops_tauschii', '37682'],
		['Amborella_trichopoda', '13333'],
		['Arabidopsis_lyrata' , '59689'],
		['Arachis_duranensis', '130453'],
		['Arachis_ipaensis', '130454'],
	];

	/*
	   'Aegilops_tauschii', '37682',
	   'Amborella_trichopoda', '13333',
	   'Arabidopsis_lyrata' , '59689',
	   'Arabidopsis_thaliana', '3702',
	   'Arachis_duranensis', '130453',
	   'Arachis_ipaensis', '130454',

	   'Batrachochytrium_dendrobatidis', '109871',
	   'Brachypodium_distachyon', '15368',
	   'Brachypodium_sylvaticum.Corv', '29664',
	   'Brachypodium_sylvaticum.Greece', '29664',
	   'Brachypodium_sylvaticum.Spain', '29664',
	   'Brassica_oleracea', '3712',
	   'Brassica_rapa' ,'3711',
	   'Caenorhabditis_elegans', '6239',
	   'Cajanus_cajan', '3821',
	   'Cannabis_sativa.Purple.Kush', '3483',
	   'Capsella_rubella', '81985',
	   'Capsicum_annuum', '4072',
	   'Carica_papaya', '3649',
	   'Chlamydomonas_reinhardtii', '3055',
	   'Cicer_arietinum', '3827',
	   'Citrullus_lanatus', '3654',
	   'Citrus_clementina', '85681',
	   'Citrus_sinensis', '2711',
	   'Coffea_canephora', '49390',
	   'Cucumis_sativus', '3659',
	   'Danio_rerio', '7955',
	   'Drosophila_melanogaster', '7227',
	   'Ectocarpus_siliculosus', '2880',
	   'Elaphocordyceps_capitata', '45325',
	   'Elaphocordyceps_ophioglossoides', '71617',
	   'Elaphocordyceps_paradoxa', '94208',
	   'Epichloe_festucae', '35717',
	   'Escherichia_coli', '562',
	   'Eucalyptus_grandis', '71139',
	   'Fragaria_vesca', '57918',
	   'Fusarium_graminearum', '5518',
	   'Fusarium_oxysporum.4287', '660037',
	   'Fusarium_verticillioides', '117187',
	   'Gadus_morhua', '8049',
	   'Gasterosteus_aculeatus', '69293',
	   'Glycine_max', '3847',
	   'Gossypium_raimondii', '29730',
	   'Homo_sapiens', '9606',
	   'Hordeum_vulgare', '4513',
	   'Jatropha_curcas', '180498',
	   'Kalanchoe_laxiflora', '1670617',
	   'Laccaria_bicolor', '29883',
	   'Leersia_perrieri', '77586',
	   'Linum_usitatissimum', '4006',
	   'Magnaporthe_grissa', '148305',
	   'Malus_domestica', '3750',
	   'Manihot_esculenta', '3983',
	   'Medicago_truncatula', '3880',
	   'Mimulus_guttatus', '4155',
	   'Mus_musculus', '10090',
	   'Musa_acuminata', '4641',
	   'Nectria_haematococca', '140110',
	   'Nelumbo_nucifera', '4432',
	   'Neurospora_crassa', '5141',
	   'Nostoc_punctiforme', '272131',
	   'Oncorhynchus_mykiss', '8022',
	   'Oryza_australiensis', '4532',
	   'Oryza_barthii', '65489',
	   'Oryza_brachyantha', '4533',
	   'Oryza_glaberrima', '4538',
	   'Oryza_glumaepatula', '40148',
	   'Oryza_granulata', '110450',
	   'Oryza_kasalath', '4527',
	'Oryza_longistaminata', '4528',
		'Oryza_meridionalis', '40149',
		'Oryza_minuta', '63629',
		'Oryza_nivara', '4536',
		'Oryza_officinalis', '4535',
		'Oryza_punctata', '4537',
		'Oryza_rufipogon', '4529',
		'Oryza_sativa.indica.gramene', '39946',
		'Oryza_sativa.indica.iplant', '39946',
		'Oryza_sativa.indica.IR29', '39946',
		'Oryza_sativa.indica.pokkali', '39946',
		'Oryza_sativa.japonica.iplant', '39947',
		'Oryza_sativa.japonica.IRGSP', '39947',
		'Oryza_sativa.japonica.MSU', '39947',
		'Oryzias_latipes', '8090',
		'Pediculus_humanus', '121225',
		'Phaseolus_vulgaris', '3885',
		'Phoenix_dactylifera', '42345',
		'Phyllostachys_heterocycla', '38705',
		'Physcomitrella_patens', '3218',
		'Phytophthora_infestans', '4787',
		'Picea_abies', '3329',
		'Pinus_taeda', '3352',
		'Populus_trichocarpa', '3694',
		'Populus_trichocarpa.ver3', '3694',
		'Prunus_persica', '3760',
		'Rattus_norvegicus', '10116',
		'Rhizopus_oryzae', '64495',
		'Ricinus_communis', '3988',
		'Saccharomyces_cerevisiae', '4932',
		'Salvia_hispancia.salba', '49212',
		'Salvia_splendens', '180675',
		'Schizosaccharomyces_pombe', '4896',
		'Selaginella_moellendorffii', '88036',
		'Setaria_italica', '4555',
		'Solanum_lycopersicum', '4081',
		'Solanum_tuberosum', '4113',
		'Sorghum_bicolor', '4558',
		'Synechocystis_pcc6803', '1148',
		'Takifugu_rubripes', '31033',
		'Tetraodon_nigroviridis', '99883',
		'Theobroma_cacao', '3641',
		'Tolypocladium_inflatum', '29910',
		'Trichodesmium_erythraeum', '1206',
		'Triticum_aestivum', '4565',
		'Triticum_monococcum.DV92', '4568',
		'Triticum_monococcum.G3116', '4568',
		'Triticum_turgidum', '4571',
		'Triticum_urartu', '4572',
		'Vitis_vinifera', '29760',
		'Zea_mays', '4577',
		*/

	let e_species = document.querySelector('#species');
	for(let t of taxonList){
		e_species.appendChild(taxonFactory(t[0],t[1]));
	}
}

function my_submit(){
	show_results = true;
	let str_geneList = document.querySelector('#textarea_geneList').value;
	if( str_geneList == ''){
		alert('please input the interesting gene list');
		return false;
	}


	let referenceGenesNum;
	let inputGenes = splitStringToGeneList(str_geneList);
	let inputGenesNum = inputGenes.length;
	let cutoff = document.querySelector('#significance').value;

	$('#loading').show();

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}

		let summary = overview_data[0].data;
		referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +
			inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';

		console.log(ol_data[0]);
		let ontologyList = ol_data[0].data['gene-to-term-summary-count'];

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			console.log(data);
			let ontologyListRef = data.data['term-to-gene-summary-count'];

			let test_sel = document.querySelector('#method').value;
			console.log(test_sel);

			for(let ontology_ID in ontologyList){
				// K
				let numOfRefer = ontologyListRef[ontology_ID];
				// k
				let numOfInput = ontologyList[ontology_ID];
				// N
				let N = referenceGenesNum;
				// n
				let n = inputGenesNum;

				if(test_sel != 'chi-squared' && test_sel != 'hypergeometric'){
					if(numOfInput > 500 || numOfRefer > 500 || n > 500 || N > 500){
						console.log('should use chi or hypergeo for large numbers');
					}
				}

				let p = '';
				switch(test_sel){
					case 'hypergeometric':
						p = stats.hypergeometric(numOfInput,numOfRefer,n,N);
						break;
					case 'fisher':
						p = stats.fisher(numOfInput,numOfRefer,n,N);
						break;
					case 'chi-squared':
						p = stats.chi(numOfInput,numOfRefer,n,N);
						break;
					case 'fisher2':
						p = stats.fisher2(numOfInput,numOfRefer,n,N);
						break;
					default:
						break;
				}

				if(p > cutoff && !Number.isNaN(p))
					continue;


				let m_ontologyName;
				let m_description;
				let m_ontologyData = new ontology(m_ontologyName,ontology_ID, m_description, numOfInput, numOfRefer,p);
				resultList.push(JSON.parse(JSON.stringify(m_ontologyData)));
			}

			if(!show_results){
				console.log('cancelling table filling due to reset button');
				return false;
			}
			console.log('analysis of data finished');

			getOntologyData(resultList);

			$('#loading').hide();
			$('#results').show();
		});
	});
}

function my_reset(){
	show_results = false;
	$('#loading').hide();
	$('#results').hide();
	document.querySelector('#textarea_geneList').value = '';
	document.querySelector('#textarea_backgroundList').value = '';
	$('#result_table tr').remove();
	document.querySelector('#result_summary').innerHTML = '';
	resultList = [];
}

function queryTypeChange(){
       let x = document.getElementById("queryType").value;
       if(x == 'userinput')
               $('#referenceBackground').show();
       else
               $('#referenceBackground').hide();
}

//get the overview information from server
function getOverView(){
	return $.ajax({
		type: 'get',
		url: url_stats + 'overview',
		dataType: 'json'
	});
}

function getOntologyTermsFromGenes(geneList){
	let link = url_stats + 'gene-to-term?';
	let data = '';

	for(let i of geneList){
		data +='bioentity='+i+'&';
	}
	data += 'taxon=3702';

	console.log(link);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}

function getGenesNumInRefFromOntologys(ontologyList){
	let link = url_stats + 'term-to-gene?';
	let data = '';

	for(let i in ontologyList){
		data +='term='+i+'&';
	}
	data += 'taxon=3702';

	console.log(link);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}

function ontology(m_ontologyName, m_ontologyId,m_description, m_numberOfInput,m_numberOfReference,p){
	if(m_ontologyName === undefined)
		m_ontologyName='';
	if(m_ontologyId === undefined)
		m_ontologyId='';
	if(m_description === undefined)
		m_description='';
	if(m_numberOfInput === undefined)
		m_numberOfInput=0;
	if(m_numberOfReference === undefined)
		m_numberOfReference=0;
	if(p === undefined)
		p=0;

	this.ontologyId = JSON.parse(JSON.stringify(m_ontologyId));
	this.ontologyName = '';
	this.description = m_description;
	this.numberOfInput = m_numberOfInput;
	this.numberOfReference = m_numberOfReference;
	this.p = p;
}

function splitStringToGeneList(str){
	let geneIDList = [];
	let inputData = str.split('\n');	// Split on carriage return
	let x;
	for(x in inputData){
		let trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;

		geneIDList.push(inputData[x]);
	}
	return geneIDList;
}

function appendOntologyToRow(obj){
	let tr1 = document.createElement('tr');
	let atts = [
		obj.ontologyId,
		obj.ontologyName,
		obj.description,
		obj.numberOfInput,
		obj.numberOfReference,
		obj.p.toExponential(5)
	];

	for (let att of atts) {
		let td = document.createElement('td');
		let node = document.createTextNode(att);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	document.querySelector('#result_table').appendChild(tr1);
}

function getOntologyData(resultList){
	//append to table

	for(let i of resultList){
		let j = i;
		$.ajax({
			type: 'get',
			url: url_amigo + 'term/' + j.ontologyId + '/json',
			dataType: 'json',
			success: function(res){
				//console.log(res);

				let name = res.results.name;
				let des = res.results.definition;

				j.ontologyName = name;
				j.description = des;

				appendOntologyToRow(j);

				//data for visualization
				raw_graph_data.push(res.results.topology_graph_json);

				if(raw_graph_data.length == resultList.length){
					//parsed all of resultList, time to view graph
					viewGraph(raw_graph_data);
				}
			}
		});
	}
}

function viewGraph(raw_data){
	//we have alot of duplicate nodes/edges,
	//because each topology graph contains everything connecting
	//to that individual node (both in and out of node)
	//use set to filter the dups out
	let nodes = new Set();
	let edges = new Set();

	for(let raw_graph of raw_data){
		let json = JSON.parse(raw_graph);

		//without stringifying the node objects,
		//we would have to manually check each node/edge to see
		//if it was a dup or not,
		//whether we used JS's Sets or just plain Arrays.
		//stringifying it allows for shallow compare,
		//which JS's Sets do for us, quickly.
		//Since our objects that we are stringifying
		//are really simple, we aren't worried about illegal JSON.
		for(let n of json.nodes){
			nodes.add(JSON.stringify({"id":n.id,"label":n.lbl}));
		}

		for(let e of json.edges){
			//TODO: add some sort of label for edges using e.pred (predicate, aka method)
			//note, only one edge between two nodes is allowed
			edges.add(JSON.stringify({"id":`${e.sub}x${e.obj}`,"source":e.sub,"target":e.obj}));
		}
	}

	//now that we have our sets, expand them into the objects
	let n_arr = [];
	let e_arr = [];
	nodes.forEach(n => n_arr.push(JSON.parse(n)));
	edges.forEach(e => e_arr.push(JSON.parse(e)));

	//get our worst p_value to be used as the far end of the scale
	//start with just a verrrry small value instead of 0, because
	//we want to make sure not to get NaNs when using this
	//in the denominator
	let p_worst = 0.00000001;
	for(let r of resultList){
		//console.log(r.ontologyId);
		if(r.p > p_worst){
			p_worst = r.p;
		}
	}
	console.log(`pworst: ${p_worst}`);

	let sqrt_nodes = Math.floor(Math.sqrt(n_arr.length));
	for(let i in n_arr){
		//the more edges with this node,
		//the larger it will be
		//to signify importance
		let e_count = 0;
		for(let e of e_arr){
			if(e.target == n_arr[i].id || e.source == n_arr[i].id){
				e_count++;
			}
		}

		//try to get the term's pvalue
		let p_value = null;
		for(let r of resultList){
			if(r.ontologyId == n_arr[i].id){
				p_value = r.p;
			}
		}

		//if we calculated a p_value for this term, then we can rate it,
		//from grayest (least related) to most red (most related)
		//if we didn't calculate a p_value, then just give it the color blue
		let hue = p_value ? 3 : 221;
		//default colour sat = 81
		let sat = p_value ? 100*((p_worst - p_value)/p_worst) : 100;
		n_arr[i].color = `hsl(${hue},${sat}%,60%)`;

		//size = influence = significance in the force layout alg
		//we get alot of nodes, so make it small
		n_arr[i].size = Math.sqrt(e_count * 1.0) * 0.1;

		//we need to initialize the node's location to begin the force layout
		//arrange in a square, starting at the top left, going across, then down
		n_arr[i].x = Math.floor(i % sqrt_nodes);
		n_arr[i].y = Math.floor(i / sqrt_nodes);
	}

	let graph = {
		"nodes": n_arr,
		"edges": e_arr
	};

	sigma_graph = new sigma({
		graph: graph,
		container: 'sigma_graph',
		settings: {
			edgeColor: 'default',
			//black edges
			defaultEdgeColor: '#000',
			defaultNodeColor: '#ec5148',
		},
		renderers: [
			{
				//make sure its the canvas renderer,
				//so we all get the same experience
				container: document.querySelector('#sigma_graph'),
				type: 'canvas'
			}
		]
	});

	//we have a LARGE graph,
	//so lets optimize the force layout alg
	let config = {
		//this just uses an alg that scales better
		barnesHutOptimize: true,
		//default is 1
		//10 helps alot with responsiveness
		slowDown: 1,
		//higher means a jumpier graph but less render calls,
		//lower means smoother but more render calls
		iterationsPerRender: 1
	};

	sigma_graph.startForceAtlas2(config);

	//for a button, to unpause the alg
	function startAlg(){
		if(!sigma_graph){
			return;
		}

		if(!sigma_graph.isForceAtlas2Running()){
			sigma_graph.startForceAtlas2();
		}
	}

	//for another button, to pause the alg
	function stopAlg(){
		if(!sigma_graph){
			return;
		}

		if(sigma_graph.isForceAtlas2Running()){
			sigma_graph.stopForceAtlas2();
		}
	}

	//zooms to a specific node
	function moveCamera(node){
		let camera = sigma_graph.camera;

		let preTransform = {
			x: camera.x,
			y: camera.y,
			ratio: 0.0625,
			angle: camera.angle
		}
		camera.goTo(preTransform);
		sigma_graph.refresh();

		let toTransform = {
			x: node['read_cam0:x'],
			y: node['read_cam0:y'],
			ratio: camera.ratio,
			angle: camera.angle
		};

		camera.goTo(toTransform);
		sigma_graph.refresh();
	}

	//searches the graph for the id in the input box,
	//and goes to it if its found
	function searchGraph(){
		let id = document.querySelector('#sigma_search_input').value;

		if(id == undefined || id == null){
			throw new Error('No node given!');
		}

		let node = null;
		for(let n of sigma_graph.graph.nodes()){
			if(n.id == id){
				node = n;
				break;
			}
		}

		if(node == null){
			throw new Error('No node found :(');
		}

		moveCamera(node);
	}

	//add button listeners
	(document.querySelector('#start_forcelayout')).onclick = startAlg;
	(document.querySelector('#stop_forcelayout')).onclick = stopAlg;
	(document.querySelector('#sigma_search_submit')).onclick = searchGraph;

	//set up search input autocomplete
	let search_input = document.querySelector('#sigma_search_input');
	let awe_list = {list:[],maxItems:20};
	resultList.forEach(r => awe_list.list.push({"label":r.ontologyName,"value":r.ontologyId}));
	console.log(awe_list);
	let awesomplete = new Awesomplete(search_input, awe_list);
	search_input.parentElement.classList.add('form-control');
	search_input.parentElement.style.padding = '0px';
	search_input.style.width = '100%';
}
