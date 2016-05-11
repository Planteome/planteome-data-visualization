'use strict';

var show_results = true;
var url_stats = 'http://test.planteome.org/api/statistics/';
var url_amigo = 'http://test.planteome.org/amigo/';

function initialize(){
	function taxonFactory(name, id){
		let e = document.createElement('option');
		e.value = id;
		e.text = name;

		return e;
	}
	//initialize the species selet button

	var taxonList = [
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
	var str_geneList = document.querySelector('#textarea_geneList').value;
	if( str_geneList == ''){
		alert('please input the interesting gene list');
		return false;
	}

	var resultList = [];

	var referenceGenesNum;
	var inputGenes = splitStringToGeneList(str_geneList);
	var inputGenesNum = inputGenes.length;
	var cutoff = document.querySelector('#significance').value;

	$('#loading').show();

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}

		var summary = overview_data[0].data;
		referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +
			inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';

		console.log(ol_data[0]);
		var ontologyList = ol_data[0].data['gene-to-term-summary-count'];

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			console.log(data);
			var ontologyListRef = data.data['term-to-gene-summary-count'];

			let test_sel = document.querySelector('#method').value;

			for(var ontology_ID in ontologyList){
				// K
				var numOfRefer = ontologyListRef[ontology_ID];
				// k
				var numOfInput = ontologyList[ontology_ID];
				// N
				var N = referenceGenesNum;
				// n
				var n = inputGenesNum;

				if(test_sel != 'chi-squared' && test_sel != 'hypergeometric'){
					if(numOfInput > 500 || numOfRefer > 500 || n > 500 || N > 500){
						console.log('should use chi or hypergeo for large numbers');
					}
				}

				let p = '';
				switch(test_sel){
					case 'hypergeometric':
						p = stats.hypergeometric(numOfInput,numOfRefer,n,N);
						console.log('hypergeometric');
						break;
					case 'fisher':
						p = stats.fisher(numOfInput,numOfRefer,n,N);
						console.log('fisher');
						break;
					case 'chi-squared':
						p = stats.chi(numOfInput,numOfRefer,n,N);
						console.log('chi');
						break;
					case 'fisher2':
						p = stats.fisher2(numOfInput,numOfRefer,n,N);
						console.log('fisher2');
						break;
					default:
						console.error(`Invalid selection: ${test_sel}`);
						break;
				}

				if(p > cutoff && !Number.isNaN(p))
					continue;


				var m_ontologyACC;
				var m_description;
				var m_ontologyData = new ontology(m_ontologyACC,ontology_ID, m_description, numOfInput, numOfRefer,p);
				resultList.push(m_ontologyData);
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
}

//get the overview information from server
function getOverView(){
	//JS doesn't support function override
	return $.ajax({
		type: 'get',
		url: url_stats + 'overview',
		dataType: 'json'
	});
}

function getOntologyTermsFromGenes(geneList){

	var link = url_stats + 'gene-to-term?';
	for(let i of geneList){
		link +='bioentity='+i+'&';
	}
	link += 'taxon=3702';

	console.log(link);

	return $.ajax({
		type: 'get',
		//url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
		url: link,
		dataType: 'json'
	});
}

function getGenesNumInRefFromOntologys(ontologyList){

	var link = url_stats + 'term-to-gene?';
	for(let i in ontologyList){
		link +='term='+i+'&';
	}
	link += 'taxon=3702';

	console.log(link);

	return $.ajax({
		type: 'get',
		//url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
		url: link,
		dataType: 'json'
	});
}

function ontology(m_ontologyACC, m_ontologyId,m_description, m_numberOfInput,m_numberOfReference,p){
	if(m_ontologyACC === undefined)
		m_ontologyACC='';
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

	this.ontologyId = m_ontologyId;
	//this.ontologyACC = m_ontologyACC;
	this.ontologyName = '';
	this.description = m_description;
	this.numberOfInput = m_numberOfInput;
	this.numberOfReference = m_numberOfReference;
	this.p_value = p.toExponential(5);
}

function splitStringToGeneList(str){
	var geneIDList = [];
	var inputData = str.split('\n');	// Split on carriage return
	var x;
	for(x in inputData){
		var trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;

		geneIDList.push(inputData[x]);
	}
	return geneIDList;
}

function appendOntologyToRow(obj){
	let tr1 = document.createElement('tr');
	for (let x in obj) {
		let td = document.createElement('td');
		let node = document.createTextNode(obj[x]);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	document.querySelector('#result_table').appendChild(tr1);
}

function getOntologyData(resultList){
	//append to table
	for(let i of resultList){
		let j = JSON.parse(JSON.stringify(i));
		$.ajax({
			type: 'get',
			url: url_amigo + 'term/' + j.ontologyId + '/json',
			dataType: 'json',
			success: function(res){

				let name = res.results.name;
				let des = res.results.definition;

				j.ontologyName = name;
				j.description = des;

				appendOntologyToRow(j);
			}
		});
	}
}
