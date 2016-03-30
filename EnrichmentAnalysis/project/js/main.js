'use strict';

var show_results = true;

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
	//var str_referList = $('#textarea_backgroundList').val();
	if( str_geneList == ''){
		alert('please input the interesting gene list');
		return false;
	}
	//if( str_referList == ''){
	//	alert('please input the interesting gene list');
	//	return false;
	//}

	/*
	//static analysis
	var inputAnnotationData = splitStringToAnnotation(str_geneList);
	var referAnnotationData = splitStringToAnnotation(str_referList);

	$('#result_summary').html('the number of input genes is: '+inputAnnotationData.length+' <br> the number of background genes is: '+referAnnotationData.length+'<br>');
	var ontologyDataList = staticAnalyizeData(inputAnnotationData, referAnnotationData);

	var i;
	for(i in ontologyDataList)
	appendOntologyToRow(ontologyDataList[i]);
	*/

	// dynamic analysis
	var resultList = [];
	var referenceGenesNum;									//N
	var inputGenes = splitStringToGeneList(str_geneList);
	var inputGenesNum = inputGenes.length;				//n
	var cutoff = document.querySelector('#significance').value;

	$('#loading').show();

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}

		var summary = overview_data[0].summary;
		referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +
			inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';
		//console.log('There are '+referenceGenesNum+' genes in database');

		console.log(ol_data[0]);
		//console.log('get the ontology term List ' + ol_data[0].status);
		var ontologyList = ol_data[0].summary['gene-to-term-summary-count'];

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			console.log(data);
			var ontologyListRef = data.summary['term-to-gene-summary-count'];

			for(var i in ontologyList){
				var ontoloy_ID = i;

				var numOfRefer = ontologyListRef[ontoloy_ID];	//K
				var numOfInput = ontologyList[ontoloy_ID];		//k
				var N = referenceGenesNum;						//N
				var n = inputGenesNum;							//n

				let test_chi = stats.chi(numOfInput,numOfRefer,n,N);
				var p = test_chi;

				if(p>cutoff)
					continue;

				var m_ontologyACC;
				var m_description;
				var m_ontologyData = new ontology(m_ontologyACC,ontoloy_ID, m_description, numOfInput, numOfRefer,p);
				resultList.push(m_ontologyData);
			}
			if(!show_results){
				console.log('cancelling table filling due to reset button');
				return false;
			}
			console.log('analysis of data finished');
			//append to table
			var i;
			for(i in resultList){
				appendOntologyToRow(resultList[i]);
			}

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

function staticAnalyizeData(inputData,referenceData){
	var ontolotyIDList = [];
	var i;
	for(i in inputData){
		var txt = inputData[i].ontologyID;
		if($.inArray(txt, ontolotyIDList) === -1)
			ontolotyIDList.push(txt);
	}

	var ontologyList = [];
	for(i in ontolotyIDList){
		var str = ontolotyIDList[i]
		var numOfInput = getNumOfInput(str,inputData);
		var numOfRefer = getNumOfRefer(str,referenceData);

		//calculate the p with using inputData.length, referenceData.length, numOfInput, numOfRefer

		let test_hypergeo = stats.hypergeometric(numOfInput,numOfRefer,inputData.length,referenceData.length);
		let test_fisher = stats.fisher(numOfInput,numOfRefer,inputData.length,referenceData.length);
		let test_chi = stats.chi(numOfInput,numOfRefer,inputData.length,referenceData.length);
		let test_fisher2 = stats.fisher2(numOfInput,numOfRefer,inputData.length,referenceData.length);

		let test_hypergeo1 = stats.hypergeometric(1,10,12,24);
		let test_fisher1 = stats.fisher(1,10,12,24);
		let test_chi1 = stats.chi(1,10,12,24);
		let test_fisher21 = stats.fisher2(1,10,12,24);
		console.log(`hyper:${test_hypergeo1} fisher:${test_fisher1} chi:${test_chi1} fisher2:${test_fisher21}`);

		//choose stat method
		//var test_sel = $('#statistic_methods_input').children()[0].value;
		var test_sel = $('#method').val();
		var p = '';
		switch(test_sel){
			case 'hypergeometric':
				p = test_hypergeo;
				break;
			case 'fisher':
				p = test_fisher;
				break;
			case 'chi-squared':
				p = test_chi;
				break;
			case 'fisher2':
				p = test_fisher2;
				break;
			default:
				console.error(`Invalid selection: ${test_sel}`);
				break;
		}

		var cutoff = $('#significance').val();
		if(p>cutoff)
			continue;

		var m_ontologyACC;
		var m_description;

		var m_ontologyData = new ontology(m_ontologyACC,str, m_description, numOfInput, numOfRefer,p);
		ontologyList.push(m_ontologyData);
	}
	return ontologyList;
}

function getNumOfInput(str,inputData ){
	var num = 0;
	var x;
	for(x in inputData){
		if(inputData[x].ontologyID === str)
			num++;
	}
	return num;
}

//get the overview information from server
function getOverView(){
	//JS doesn't support function override
	return $.ajax({
		type: 'get',
		url: 'http://test.planteome.org/api/overview',
		dataType: 'json'
	});
}

function getOntologyTermsFromGenes(geneList){

	var link = 'http://test.planteome.org:8080/gene-to-term?';
	for(var i in geneList){
		link +='q='+geneList[i]+'&';
	}
	link+='s=NCBITaxon:3702';

	console.log(link);

	return $.ajax({
		type: 'get',
		//url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
		url: link,
		dataType: 'json'
	});


	/*
	   $.ajax({
type: 'get',
url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
dataType: 'json',
success: function(data){
console.log(data);
console.log('success');
},
error:function (){
alert('error');
}
});

*/
}

function getGenesNumInRefFromOntologys(ontologyList){

	var link = 'http://test.planteome.org/api/term-to-gene?s=NCBITaxon:3702';
	for(var i in ontologyList){
		link +='&q='+i;
	}

	//console.log(link);

	return $.ajax({
		type: 'get',
		//url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
		url: link,
		dataType: 'json'
	});
}

function getOntologyInfo(ontologyID){

	var link = 'http://amigo.geneontology.org/amigo/term/GO:0022008/json';
	console.log(link);
	return $.ajax({
		type: 'get',
		//url: 'http://test.planteome.org:8080/gene-to-term?q=TAIR:locus:2143261&s=NCBITaxon:3702',
		url: link,
		dataType: 'json'
	});
}

function getNumOfRefer(str,referenceData){
	var num = 0;
	var x;
	for(x in referenceData){
		if(referenceData[x].ontologyID === str)
			num++;
	}
	return num;
}
function ontology(m_ontologyACC, m_ontologyName,m_description, m_numberOfInput,m_numberOfReference,p){
	if(m_ontologyACC === undefined)
		m_ontologyACC='';
	if(m_ontologyName === undefined)
		m_ontologyName='';
	if(m_description === undefined)
		m_description='';
	if(m_numberOfInput === undefined)
		m_numberOfInput=0;
	if(m_numberOfReference === undefined)
		m_numberOfReference=0;
	if(p === undefined)
		p=0;

	this.ontologyACC = m_ontologyACC;
	this.ontologyName = m_ontologyName;
	this.Description = m_description;
	this.numberOfInput = m_numberOfInput;
	this.numberOfReference = m_numberOfReference;
	this.p_value = p;
}

function annotation(a, b) {
	if(a === undefined)
		a=0;
	if(b === undefined)
		b=0;

	this.geneID = a;
	this.ontologyID = b;
}

function splitStringToAnnotation(str){
	//var inputData = str.split('\n');          // Split on carriage return

	var annotationList = [];
	var inputData = str.split('\n');
	var x;
	for(x in inputData){
		var trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;
		var txt = inputData[x].split(/\s+/g);
		var annotationData = new annotation(txt[0], txt[1]);
		annotationList.push(annotationData);
	}
	return annotationList;
}

function splitStringToGeneList(str){

	//var annotationList = [];
	var geneIDList = [];
	var inputData = str.split('\n');	// Split on carriage return
	var x;
	for(x in inputData){
		var trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;
		/*var txt = inputData[x].split(/\s+/g);
		  var annotationData = new annotation(txt[0], txt[1]);
		  annotationList.push(annotationData); */

		geneIDList.push(inputData[x]);
	}
	return geneIDList;
}
/* function appendAnnotationToRow(obj){
   var tr1 = document.createElement('tr');

   for (x in obj) {
   var td = document.createElement('td');
   var node = document.createTextNode(obj[x]);
   td.appendChild(node);
   tr1.appendChild(td);
   }
   $('#result_table').append(tr1);
   } */

function appendOntologyToRow(obj){
	var tr1 = document.createElement('tr');
	var x;
	for (x in obj) {
		var td = document.createElement('td');
		var node = document.createTextNode(obj[x]);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	document.querySelector('#result_table').appendChild(tr1);
}
