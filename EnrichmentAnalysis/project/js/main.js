'use strict';

function my_submit(){
	var str_geneList= $("#textarea_geneList").val();
	var str_referList = $("#textarea_backgroundList").val();
	if( str_geneList == ""){
		alert("please input the interesting gene list");
		return false;
	}
	if( str_referList == ""){
		alert("please input the interesting gene list");
		return false;
	}
	
	$("#result_table").html("<tr><th>GO term</th><th>Ontology</th><th>Description</th><th>Number in input list</th><th>Number in BG/Ref</th><th>p-value</th></tr>")
	
	var inputAnnotationData = splitStringToAnnotation(str_geneList);
	var referAnnotationData = splitStringToAnnotation(str_referList);
	
	$("#result_summary").html("the number of input genes is: "+inputAnnotationData.length+" <br> the number of background genes is: "+referAnnotationData.length+"<br>");
	
	var ontologyDataList = analyizeData(inputAnnotationData, referAnnotationData);
	var i;
	for(i in ontologyDataList)
		appendOntologyToRow(ontologyDataList[i]);
	
}

function my_reset(){
	$("#textarea_geneList").val("");
	$("#textarea_backgroundList").val("");
	$("#result_table").html("<tr><th>GO term</th><th>Ontology</th><th>Description</th><th>Number in input list</th><th>Number in BG/Ref</th><th>p-value</th></tr>")
}

function analyizeData(inputData,referenceData){
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
		
		let test_hypergeo1 = stats.hypergeometric(1,10,12,24);
		let test_fisher1 = stats.fisher(1,10,12,24);
		let test_chi1 = stats.chi(1,10,12,24);
		
		//choose stat method
        var test_sel = $('#statistic_methods_input').children()[0].value;
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
            default:
                console.error(`Invalid selection: ${test_sel}`);
                break;
        }

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
		m_ontologyACC="";
	if(m_ontologyName === undefined)
		m_ontologyName="";
	if(m_description === undefined)
		m_description="";
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
		if(trimmedData ==="")
			continue;
		var txt = inputData[x].split(/\s+/g);
		var annotationData = new annotation(txt[0], txt[1]);
		annotationList.push(annotationData);
	}
	return annotationList;
}

/* function appendAnnotationToRow(obj){
	var tr1 = document.createElement("tr");
		
	for (x in obj) {
		var td = document.createElement("td");
 		var node = document.createTextNode(obj[x]);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	$("#result_table").append(tr1);	
} */

function appendOntologyToRow(obj){
	var tr1 = document.createElement("tr");
	var x;	
	for (x in obj) {
		var td = document.createElement("td");
 		var node = document.createTextNode(obj[x]);
		td.appendChild(node);
		tr1.appendChild(td);
	}
	$("#result_table").append(tr1);	
}
