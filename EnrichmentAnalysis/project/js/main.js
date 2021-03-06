'use strict';

let url_browse = settings.url_AmigoLink;
let url_ApiLink = settings.url_ApiLink;

let show_results = true;

var raw_graph_data = [];
var resultList = {};
let downloadContent = "";
let downloadContentHeader = "";
var table;
var inputGenes = [];	
var ambiguousData;

//var atable;
let ontologyCategory ='';	//selected ontology category
let analysisType;			//selected query type: input reference or online database
var test_sel;				//selected statistic method
var cutoff;					//cut off p-value
var speciesID = '3702';		//taxon ID


//object Ontology
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
	this.ontologyCategory = '';
	// this.associatedGenes = [];
}

//object Annotation
function annotation(m_geneID, m_ontolgoyID) {
	if(m_geneID === undefined)
		m_geneID=0;
	if(m_ontolgoyID === undefined)
		m_ontolgoyID=0;

    this.geneID = m_geneID;
    this.ontologyID = m_ontolgoyID;
}

function initialize(){

	function taxonFactory(name, id){
		let e = document.createElement('option');
		e.value = id;
		e.text = name;

		return e;
	}
	//initialize the species selet button

	let taxonList = default_taxonList;
	document.getElementById("gnames").innerHTML = default_gene_names;
	document.getElementById("gids").innerHTML = default_gene_ids;
	document.getElementById("help_reference").innerHTML = default_help_reference;

	
	let e_species = document.querySelector('#species');
	for(let t of taxonList){
		e_species.appendChild(taxonFactory(t[0],t[1]));
	}
	
	//set the default selection
	$('#species').val(speciesID);

	
	let x = $(".ontologyCategory").val();
	ontologyCategory = x;
	
	
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		// console.log(event);
		// console.log(jqxhr);
		// console.log(settings);
		// console.log(thrownError);
		showError("Sorry, there is something wrong with the server and we are trying to solve it...");
	});
	
	$(document).ready(function(){
		table = $('#resultTable').DataTable();
	});
	
	//reset buttons
	$('.btn_submit').hide();
	$('.btn_vis').hide();
	$('.btn_toggleAmbiguousTable').hide();
	

}

$(document).ready(function(){
	
	$(".ontologyCategory")
	.change(function () {
		let x = $( this ).val();
		onclick_ontologyCategoryChange(x);
	});
});

function insertText(str)
{
/* 	var elem = document.getElementById(elemID);
	elem.innerHTML = "";
	elem.innerHTML += text; */
	
	$('#textarea_geneList').val(str);
}

function onclick_submit(){
	
	my_submitReset();
	initializeDownloadContent();
	show_results = true;
	
	//get the setting of p-value calculation
	test_sel = document.querySelector('#method').value;
	cutoff = document.querySelector('#significance').value;
	cutoff = parseFloat(cutoff);
	
	if(analysisType == 'userinput'){
		staticAnalysis();
	}
	else{
		createDisambigousGeneList();
		dynamicAnalysis();
	}
}

function convertToLegalString(str){
	var str_withdash;
	str_withdash = str.replace(/\./g, "\\.");
	return str_withdash;
}

function createDisambigousGeneList(){
	
	for(let i of ambiguousData.good)
		inputGenes.push({"input": i.input, "id": i.results[0].id});
	
	for(let i of ambiguousData.ugly){
		
		name = convertToLegalString(i.input);
		
		let select = $('input[name='+name+']:checked').val();
		let selectedGene = i.results[select].id;
		inputGenes.push({"input": i.input,"id":selectedGene});
	}
	
}

function splitStringToGeneList(str){
	let geneIDList = [];
	let rex = /[\n\r\t]+/
	let inputData = str.split(rex);	// Split on carriage return
	
	let x;
	for(x in inputData){
		let trimmedData = inputData[x].trim();
		if(trimmedData ==='')
			continue;

		geneIDList.push({"input":trimmedData, "id":null});
	}
	return geneIDList;
}

function splitStringToAnnotation(str){
	
	var annotationList = [];
	let rex = /[\n\r]+/
	let inputData = str.split(rex);	// Split on carriage return
	
	var x;
	for(x in inputData){
		var trimmedData = inputData[x].trim();

		if(trimmedData ==='')
			continue;
		var txt = inputData[x].split(/[\s\t]+/g);
		var annotationData = new annotation(txt[0], txt[1]);
		annotationList.push(annotationData);
	}
	return annotationList;
}

function my_submitReset(){
	$('#loading').hide();
	$('#results').hide();
	$('#downloadBtn').hide();
	$('#error').hide();
	
	
	table.clear().draw();
	
	document.querySelector('#result_summary').innerHTML = '';

	//reset globals
	raw_graph_data = [];
	resultList = {};
	inputGenes = [];
}

function onclick_disambiguity(){
	
	let str_geneList = document.querySelector('#textarea_geneList').value;
	if( str_geneList == ''){
		showError('please input the interesting gene list');
		return false;
	}

	let inputGenes = splitStringToGeneList(str_geneList);
	
	//clear the ambiguous table
	var tableBody = $('#disambiguityTableBody');
	tableBody.html("");
	
	disAmbiguateGenes(inputGenes);
	$('#disambiguityTableBody').show();

	
}

function my_reset(){
	
	var r = confirm("Current results and inputs will be reset, do you really want to continue?");
    if (r == true) {
		show_results = false;
/* 		document.querySelector('#textarea_geneList').value = '';
		document.querySelector('#textarea_backgroundList').value = ''; */
		$('#textarea_geneList').val(" ");
		$('#textarea_backgroundList').val(" ");
		
		my_submitReset();
		
		//$('#disam').show();
		$('.btn_submit').hide();
		$('.btn_vis').hide();
		
		//clear the ambiguous table
		var tableBody = $('#disambiguityTableBody');
		tableBody.html("");	
		
		$('.btn_toggleAmbiguousTable').hide();
		
		$('.disambiguity_panel').hide();
		$('#badGenesPanel').hide();
		
		$('#error').hide();	
	    
	} else {
        return
    }
	
}

//when the input gene list is changed
function onchange_InterestingInput(){

	analysisType = document.getElementById("queryType").value;
	if(analysisType == 'userinput'){
		$('.btn_submit').show();
		$('.btn_disam').hide();
		$('.btn_toggleAmbiguousTable').hide();

		$('.disambiguity_panel').hide();
		$('#badGenesPanel').hide();
		$('#error').hide();
		var tableBody = $('#disambiguityTableBody');
		tableBody.html("");	
	}
	else{
		$('.btn_submit').hide();
		
		//clear the ambiguous table
		var tableBody = $('#disambiguityTableBody');
		tableBody.html("");	
		
		$('.btn_toggleAmbiguousTable').hide();

		$('.disambiguity_panel').hide();
		$('#badGenesPanel').hide();
		$('#error').hide();
	}
}

function onclick_QueryTypeChange(){
	

	my_submitReset();

	analysisType = document.getElementById("queryType").value;
	if(analysisType == 'userinput'){
		$('.btn_submit').show();
		$('.btn_disam').hide();
		
		$('#referenceBackground').show();
		$('#exampleInputButtons').hide();
		$('#ontologyCategory_input').hide();
		$('#ontologyCategory_input2').hide();
	}
	else{
		$('.btn_submit').hide();
		$('.btn_disam').show();
		
		$('#referenceBackground').hide();
		$('#exampleInputButtons').show();
		$('#ontologyCategory_input').show();
		$('#ontologyCategory_input2').show();
	}
}

function onclick_speciesChange(){
	
	let x = document.getElementById("species").value;
	speciesID = x;
	
	onchange_InterestingInput();
}

function onclick_ontologyCategoryChange(x){
	
	//upper selection
	// let x = $(".ontologyCategory").val();
	ontologyCategory = x;
	
	initializeDownloadContent();
	
	downloadContent += downloadContentHeader;
	
	table.clear().draw();
	
	for(let i in resultList){
			
		if(ontologyCategory=='all' || resultList[i].ontologyCategory ==ontologyCategory){
			appendOntologyToTable(resultList[i]);
			appendOntologyToDownload(resultList[i]);
		}
	};
	
	//refresh the download file
	createDownloadFile(downloadContent);
	
	//lower selection
	$('.ontologyCategory').val(x);

}



//get the overview information from server
function getOverView(){
	return $.ajax({
		type: 'get',
		//url: url_stats + 'overview',
		url:url_ApiLink +'statistics/overview?species=NCBITaxon:'+speciesID,
		dataType: 'json'
	});
}


function disAmbiguateGenes(geneList){
	
	let link = url_ApiLink +'disambiguation/bioentity?'
	let data = '';
	
	data += 'species=NCBITaxon:' + speciesID;
	
	for(let i of geneList){
		data +='&entity='+i.input;
	}
	
	$.ajax({
		type: 'post',
		url:link,
		data:data,
		dataType: 'json',
		success: function(res){
			//console.log(res.data);
			
			ambiguousData = res.data;
			let ambiguousUglyData = res.data.ugly;
			let ambiguousBadData = res.data.bad;
			
			if(ambiguousUglyData.length == 0 && ambiguousBadData.length == 0){
				showSucessText("There are NO ambiguous inputs, please choose Analyze");
				//$('#disam').hide();
				$('.btn_submit').show();
			}
			
			if(ambiguousBadData.length != 0){
				showError("There are genes not in the selected taxon...");
				$('#badGenesPanel').show();
				$('#badGenes').html("")
				let bglist = ambiguousBadData;
				for(let i of bglist) {
					$('#badGenes').append("<span class=\"label label-warning\">" + i.input + "</span> ");
				}
			}else{
				$('#badGenesPanel').hide();
			}
			
			if(ambiguousUglyData.length != 0){
				
				//show information
				showError("Please select from ambiguous terms to target the gene product...");
				
				//reset the buttons
				$('.btn_submit').show();
				$('.btn_toggleAmbiguousTable').show();

				$('.disambiguity_panel').show();
				
				//clear the ambiguous table
				// var tableBody = $('#disambiguityTableBody');
				// tableBody.html("");
				
			}else{
				
				$('#error').hide();
				$('.disambiguity_panel').hide();
				$('.btn_toggleAmbiguousTable').hide();
			}
			
 			for(let i of ambiguousUglyData){
				
				let input = i.input;
				let ambiguousObjs = i.results;
				let ambNum = ambiguousObjs.length;
				
				
				ambNum = removeDuplicatedAmbiguousRes(ambNum, ambiguousObjs);
				
				appendAmbiguityRowToTable(input, ambNum, ambiguousObjs);
				
			}
		}
	});
}

var flag_showAmbiguousTable = true;

function onclick_toggleDisambiguousTalbe(){
	
	flag_showAmbiguousTable = !flag_showAmbiguousTable;
	
	if(flag_showAmbiguousTable)
		$('#HideAmbiguousBtn').text("Hide Ambiguous Input Table");
	else
		$('#HideAmbiguousBtn').text("Show Ambiguous Input Table");
	
	var query = $('#disambiguityTableBody');
	var isVisible = query.is(':visible');
	
	if (isVisible === true) {
		$('#disambiguityTableBody').hide();
	}
	else{
		$('#disambiguityTableBody').show();
	}
		
}

function removeDuplicatedAmbiguousRes(amNum, amObjs){
	
	let num = amNum;
	for(let i = 1; i< amNum; i++){
		let res = false;
		for(let j = 0; j<i; j++){
			
			if (!amObjs.hasOwnProperty(i) || !amObjs.hasOwnProperty(j))
				continue;
			
			if(amObjs[i].id ==  amObjs[j].id){
				res = true;
				break;
			}
		}
		
		if(res){
			delete amObjs[i];
			num--;
		}
	}
	
	return num;
}



function appendAmbiguityRowToTable(input, amNum, amObjs){
	
	var tableBody = $('#disambiguityTableBody');
	
	let firstIndex = 0;
	for(let i = 0; i<amObjs.length; i++){
		if(amObjs.hasOwnProperty(i)){
			firstIndex = i;
			break;
		}
	}
	
 	let anode = $('<a>').text(amObjs[firstIndex].id).attr({
		href: url_browse+"gene_product/" + amObjs[firstIndex].id,
		target: "_blank"
	})
			
	tableBody.append($('<tr>')
		.append($('<td>')
			.attr('rowspan', amNum)
			.text(input)
		)
		.append($('<td>')
			.append($('<input>')
				.attr({
					type: 'radio',
					name: input,
					value: firstIndex,
					checked: "checked"
				})
			)
			.append($('<span>').append(anode))
		)
		.append($('<td>').text(amObjs[firstIndex].matched)
		)
		
	);
	
	for(let i = firstIndex+1; i<amObjs.length; i++){
		
		if (!amObjs.hasOwnProperty(i))
			continue;
		
		let anode = $('<a>').text(amObjs[i].id).attr({
				href:url_browse + "gene_product/" + amObjs[i].id,
				target: "_blank"
			})
		
		tableBody.append($('<tr>')
			.append($('<td>')			
				.append($('<input>')
						.attr({
							type: 'radio',
							name: input,
							value: i
						})
					)
				.append($('<span>').append(anode))
			)
			.append($('<td>').text(amObjs[i].matched)
			)
		);
	}	
	
}

function getOntologyTermsFromGenes(geneList){
	//let link = url_stats + 'gene-to-term?';
	let link = url_ApiLink + 'statistics/gene-to-term?';
	
	let data = '';

	for(let i of geneList){
		data +='bioentity='+i.id+'&';
	}
	data += 'species=NCBITaxon:' + speciesID;

	console.log(link+"&"+data);

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}

function getGenesNumInRefFromOntologys(ontologyList){
	//let link = url_stats + 'term-to-gene?';
	let link = url_ApiLink + 'statistics/term-to-gene?';
	
	let data = '';

	for(let i in ontologyList){
		data +='term='+i+'&';
	}
	data += 'species=NCBITaxon:' + speciesID;

	return $.ajax({
		type: 'post',
		url: link,
		data: data,
		dataType: 'json'
	});
}



function getOntologyData(resultList){
	
	//var length = resultList.length;
	var length = Object.keys(resultList).length;
	var count = 0;
	var ids= "";
	// for(let i in resultList){
		// ids += "entity=" + resultList[i].ontologyId + "&";
	// }
	
	if(length == 0){
		$('.btn_vis').hide();
		$('#loading').hide();
		$('#downloadBtn').hide();
		$('#results').hide();
		
		showSucessText("There is no enriched ontologies, please input more genes.");
		
		return;
	}
	
	let link  = url_ApiLink + 'entity/terms?';
	
	//append to table
	for(let i in resultList){
		
		$.ajax({
			type: 'post',
			url: link,
			data: "entity=" + resultList[i].ontologyId,
			dataType: 'json',
			success: function(res){
		
				if(res.status =="failure")
					console.error("error:get data unsuccess!");
				else{
				
					let result = res.data;
					
					for(let item of result){
						let name = item.annotation_class_label;
						let des = item.description;
						let category = item.source;
						
						resultList[i].ontologyName = name;
						resultList[i].description = des;
						resultList[i].ontologyCategory = category;
						
						if(ontologyCategory=='all' || category ==ontologyCategory){
							appendOntologyToTable(resultList[i]);
							appendOntologyToDownload(resultList[i]);
						}

						//data for visualization
						raw_graph_data.push(item.topology_graph_json);
						
						
						// "topology_graph_json" :
						//ontology: JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).
						
						//"regulates_transitivity_graph_json"
						//ontology: JSON blob form of all immediate neighbors of the term.
						
						//"neighborhood_graph_json" 
						//ontology: JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.
						
						//"neighborhood_limited_graph_json" 
						//ontology: Only in taxon.

						count++;
					}
				}
			}
		}).done(function(){
			if(count == length-1){
				createDownloadFile(downloadContent);
				
				$('.btn_vis').show();
				
				$('#loading').hide();
				$('#downloadBtn').show();
				$('#results').show();
		}
		
		});
	}
	
}

function getOntologyData_separate(resultList){
	
	var length = resultList.length;
	var count = 0;
	//append to table
	for(let i of resultList){
		let j = i;
		$.ajax({
			type: 'get',
			url: url_browse + 'term/' + j.ontologyId + '/json',
			dataType: 'json',
			success: function(res){

				let name = res.results.name;
				let des = res.results.definition;
				let category = res.results.ontology;
				
				j.ontologyName = name;
				j.description = des;
				j.ontologyCategory = category;
				
				if(ontologyCategory=='all' || category ==ontologyCategory){
					appendOntologyToTable(j);
					appendOntologyToDownload(j);
				}

				//data for visualization
				raw_graph_data.push(res.results);
				
				
				// "topology_graph_json" :
				//ontology: JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).
				
				//"regulates_transitivity_graph_json"
				//ontology: JSON blob form of all immediate neighbors of the term.
				
				//"neighborhood_graph_json" 
				//ontology: JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.
				
				//"neighborhood_limited_graph_json" 
				//ontology: Only in taxon.
    
				count++;

			}
		}).done(function(){
			if(count == length-1){
				createDownloadFile(downloadContent);
				
				$('.btn_vis').show();
				
				$('#loading').hide();
				$('#downloadBtn').show();
				$('#results').show();
		}
		
		});
		
	}
}

//analysis based on user's input reference
function staticAnalysis(){
	
	$('#loading').show();
	var ontolotyIDList = [];
	var inputGenesIDList = [];
	var referGenesIDList = [];
	var ontologyDataList = [];
	
	var str_geneList= $("#textarea_geneList").val();
	var str_referList = $("#textarea_backgroundList").val();
	if( str_geneList == ""){
		showError("please input the interesting gene list");
		return false;
	}
	if( str_referList == ""){
		showError("please input the interesting gene list");
		return false;
	}
	var inputAnnotationData = splitStringToAnnotation(str_geneList);
	var referAnnotationData = splitStringToAnnotation(str_referList);

	function getOntologyNumFromAnnoData(str,AnnotationData ){
		var num = 0;
		for(var x in AnnotationData){
			if(AnnotationData[x].ontologyID === str)
				num++;
		}
		return num;
	}

	for(var i in inputAnnotationData){
		var txt = inputAnnotationData[i].ontologyID;
		if($.inArray(txt, ontolotyIDList) === -1)
			ontolotyIDList.push(txt);
		
		txt = inputAnnotationData[i].geneID;
		if($.inArray(txt, inputGenesIDList) === -1)
			inputGenesIDList.push(txt);
	}
	
	for(var i in referAnnotationData){
		txt = referAnnotationData[i].geneID;
		if($.inArray(txt, referGenesIDList) === -1)
			referGenesIDList.push(txt);
	}
	
	
	var n = inputGenesIDList.length;
	var N = referGenesIDList.length;
	
	$("#result_summary").html("the number of input genes is: "+n+" <br> the number of reference genes is: "+N+"<br>");
	
	for(var i in ontolotyIDList){
		var str = ontolotyIDList[i]
		var numOfInput = getOntologyNumFromAnnoData(str,inputAnnotationData);
		var numOfRefer = getOntologyNumFromAnnoData(str,referAnnotationData);
		
		//calculate the p with using inputData.length, referenceData.length, numOfInput, numOfRefer	
		let p = caculatePvalue(numOfInput,numOfRefer,n,N)
		
		if(p > cutoff && !Number.isNaN(p))
			continue;

		var m_ontologyACC;
		var m_description;
		
		var m_ontologyData = new ontology(m_ontologyACC,str, m_description, numOfInput, numOfRefer,p);
		ontologyDataList.push(m_ontologyData);
	}

	
	for(var i in ontologyDataList)
		appendOntologyToTable(ontologyDataList[i]);
	
	$('#loading').hide();
	$('#results').show();
}





//analysis based on reference database
function dynamicAnalysis(){
	
	let inputGenesNum = inputGenes.length;

	showText("Processing...");

	$.when(getOverView(), getOntologyTermsFromGenes(inputGenes)).done(function(overview_data, ol_data){
		
		if(!show_results){
			console.log('cancelling terms request due to reset button');
			return false;
		}
		
		let summary = overview_data[0].data;
		let referenceGenesNum = summary['gene-product-count'];
		document.querySelector('#result_summary').innerHTML = 'the number of input genes is: ' +inputGenesNum + ' <br> the number of background genes is: ' + referenceGenesNum + '<br>';

		//output the input information to download fileCreatedDate
		appendInputDesicription(inputGenesNum,referenceGenesNum);

		let ontologyList = ol_data[0].data['gene-to-term-summary-count'];
		
		//console.log(ol_data);

		$.when(getGenesNumInRefFromOntologys(ontologyList)).done(function(data, textStatus, jqXHR){
			if(!show_results){
				console.log('cancelling ref request due to reset button');
				return false;
			}
			
			
			let ontologyListRef = data.data['term-to-gene-summary-count'];

			for(let ontology_ID in ontologyList){
				// K
				let numOfRefer = ontologyListRef[ontology_ID];
				// k
				let numOfInput = ontologyList[ontology_ID];
				// N
				let N = referenceGenesNum;
				// n
				let n = inputGenesNum;

				if(numOfRefer == 0)
					continue;
				if(numOfInput == 0)
					continue;
				
				let p = caculatePvalue(numOfInput,numOfRefer,n,N);

				if(Number.isNaN(p)){
					console.log(p);
					continue;
				}
				
				if(p == 0)
					console.log(p);
				
				if(p == null){
					console.log(p);
					continue;
				}
				
				if(ontology_ID.includes("BFO")|| ontology_ID.includes("PATO"))
					continue;
				
				if(p > cutoff && !Number.isNaN(p))
					continue;
	
				let m_ontologyName;
				let m_description;
				let m_ontologyData = new ontology(m_ontologyName,ontology_ID, m_description, numOfInput, numOfRefer,p);
				//resultList.push(JSON.parse(JSON.stringify(m_ontologyData)));
				resultList[ontology_ID] = JSON.parse(JSON.stringify(m_ontologyData));
			}

			if(!show_results){
				console.log('cancelling table filling due to reset button');
				return false;
			}

			showText('analysis of data finished, retrieving ontology data from server...');
			
			getOntologyData(resultList);
			
			
			if(resultList.length == 0){
				showError("Sorry, there is something wrong with the server... We are fixing it and please come back in the future...")
			}
		});
	});
}


function caculatePvalue(numOfInput,numOfRefer,n,N){
	
	// if(test_sel != 'chi-squared' && test_sel != 'hypergeometric'){
		// if(numOfInput > 500 || numOfRefer > 500 || n > 500 || N > 500){
			// console.log('should use chi or hypergeo for large numbers');
		// }
	// }

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
		
		// if(p == 0)
			// console.log("i:"+numOfInput+" R:"+numOfRefer+" n:"+n+" N:"+N);
		
		break;
	case 'fisher2':
		p = stats.fisher2(numOfInput,numOfRefer,n,N);
		break;
	case 'yates':
		p = stats.yatesChi(numOfInput,numOfRefer,n,N);
		break;
	default:
		break;
	}
	
	return p;
}

function showError(content){
	
	$('#error').show();
	$('#error_content').html(content)
	
	$('#loading').hide();
	$('#success').hide();
	
}

function showText(content){
	
	$('#loading').show();
	$('#processingTxt').html(content)
	
	$('#error').hide();
	$('#success').hide();
}

function showSucessText(content){
	
	$('#success').show();
	$('#success_content').html(content)
	
	$('#loading').hide();
	$('#error').hide();
}

function appendOntologyToTable(obj){
	

	//let link = "http://browser.planteome.org/amigo/term/" + obj.ontologyId;
	let link = url_browse + "term/" + obj.ontologyId;
	
	let idNode = "<a target='_blank' href="+link + ">" + obj.ontologyId + "</a>";
	let inputGeneNum = "<a ontology="+obj.ontologyId+" GeneListQuery='' onclick='showInputGeneListFromOntology(this)'>" + obj.numberOfInput + "</a>";
	table.row.add( [
			idNode,
			obj.ontologyName,
			obj.ontologyCategory,
			obj.description,
			inputGeneNum,
			obj.numberOfReference,
			obj.p.toExponential(4),
		] ).draw( false );
		
}

var OntologyAssociatedInputGenes = {};
function showInputGeneListFromOntology(param) {
    
    let GeneListQuery = param.getAttribute("GeneListQuery");
    if(GeneListQuery =="true"){
        $(param).popover('show');
        return;
    }
    
    OntologyAssociatedInputGenes = {};
    
    let ontologyTerm = param.getAttribute("ontology");
    //console.log(ontologyID);
    
    $.when(getInputGenesFromOntology(inputGenes, ontologyTerm, speciesID)).done(function (res) {
        
        $(param).popover({title: "Input Assoicated Genes", content: res, placement: "left", trigger: 'click'});
        
        if ($(param).prop('popShown') == undefined) {
            $(param).prop('popShown', true).popover('show');
        }
        
        $(param).attr("GeneListQuery", "true");
    
    });
}

function getInputGenesFromOntology(inputGenes, ontologyTerm, speciesId) {
    
	var getDataFlag = $.Deferred();

	let inputGenesNum = inputGenes.length;

    OntologyAssociatedInputGenes = {
        "ontologyName": ontologyTerm,
        "associatedGenes": [],
    }

	var promises = [];

	for (let i of inputGenes) {
		let geneId = i.id;
		let geneName = i.input;
		promises.push(getOntologyTermsFromGene(geneId, geneName, speciesId));

	}

    var geneList = [];
    
	$.when.apply($, promises).done(function () {
		// console.log(ontologyList);
        geneList = OntologyAssociatedInputGenes["associatedGenes"];
/* 		for (let ontologyid in ontologyList) {

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
		} */
		// console.log(matrixData);
		getDataFlag.resolve(geneList);
	});
	return getDataFlag.promise();
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
				if (OntologyAssociatedInputGenes["ontologyName"] == ontologyId) {
					OntologyAssociatedInputGenes["associatedGenes"].push(geneName);
				}
			}
		}
	})
}

function initializeDownloadContent(){
	downloadContent ="This is the ontology enrichment analysis result created by Planteome"+"\n";
	var date = new Date();
	var str = date.toDateString();
	downloadContent+=str + "\n";
}

function appendInputDesicription(inputGenesNum, BackgroundGenes){
	downloadContentHeader = 'the number of input genes is: ' + inputGenesNum + '\n'+
					   'the number of background genes is: ' + BackgroundGenes + '\n';
	
	downloadContentHeader +="Each column menas:" +'\n'
	+ "1 Ontology Database ID" +"\n"
	+ "2 Ontology Name" +"\n"
	+ "3 number of genes annotated to the ontology in input" +"\n"
	+ "4 number of genes annotated to the ontology in background" +"\n"
	+ "5 p-value" +"\n"
	+ "6 Ontology Category" +"\n"
	+ "7 Ontology description" +"\n\n";
	
	downloadContent += downloadContentHeader;
	
}

function appendOntologyToDownload(obj){
	let atts = [
		obj.ontologyId,
		obj.ontologyName,
		obj.numberOfInput,
		obj.numberOfReference,
		obj.p.toExponential(5),
		obj.ontologyCategory,
		obj.description,
	];
	
	for (let att of atts) {
		downloadContent += att +"\t";
	}
	downloadContent += "\n";
}

function createDownloadFile(data){
	var textFile = null;
	var makeTextFile = function (text) {
	var data = new Blob([text], {type: 'text/plain'});

	// If we are replacing a previously generated file we need to
	// manually revoke the object URL to avoid memory leaks.
	if (textFile !== null) {
	  window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
	};

	var link = document.getElementById('downloadBtn');
	link.href = makeTextFile(data);
}

function visualize(){
		
	sessionStorage.setItem('graphData', JSON.stringify(raw_graph_data));
	sessionStorage.setItem('resultList', JSON.stringify(resultList));
	sessionStorage.setItem('inputGenes', JSON.stringify(inputGenes));
	sessionStorage.setItem('speciesID', speciesID);
	
	window.open("./visualization.html");
}

function onclick_help(){
	window.open("./help.html");
}


