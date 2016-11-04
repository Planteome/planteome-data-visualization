let raw_graph_data;
let resultList;
var NodesProperties = {};


function loadView(){
	
	console.log('vis begin');
	
	raw_graph_data = sessionStorage.getItem("graphData");
	resultList = sessionStorage.getItem("resultList");
	
	raw_graph_data = JSON.parse(raw_graph_data);
	resultList = JSON.parse(resultList);
	
	//console.log(raw_graph_data);
	//console.log(resultList);
	
	if(raw_graph_data.length == resultList.length){
	//parsed all of resultList, time to view graph
		visViewGraph(raw_graph_data);
	}
	/*
 	var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('vis_graph2');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
	  nodes:{
		  shape:'dot',
		  size: 10,
		  //color:'blue',
	  }
  };
  var network = new vis.Network(container, data, options);
  */
}

function visViewGraph(raw_data){
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
			edges.add(JSON.stringify({"id":`${e.sub}x${e.obj}`,"from":e.sub,"to":e.obj}));
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

	
	for(let i in n_arr){
		//the more edges with this node,
		//the larger it will be
		//to signify importance
		
		let e_count = 0;
		for(let e of e_arr){
			if(e.to == n_arr[i].id || e.from == n_arr[i].id){
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
		
		if(p_value){
			if(p_value > p_worst)
				p_worst = p_value;
		}
		else{
			p_value = -1;
		}

		var propertyName = n_arr[i].id;
		var propertyItem =  {edgeCount: e_count, pvalue: p_value};
		NodesProperties[propertyName] = propertyItem;
	}
	
	//console.log(`pworst: ${p_worst}`);
	//console.log(NodesProperties);
	
	
	var vis_nodes = new vis.DataSet();

	for(let n of n_arr){
		
		vis_nodes.add({
			id: n.id,
			label: n.label,
			value: NodesProperties[n.id].edgeCount,
			title: n.id,
		});
		
		//update the colors of nodes
		if(NodesProperties[n.id].pvalue != -1){
			let c = getColorFromPalue(NodesProperties[n.id].pvalue);
			NodesProperties[n.id].color = c;
			vis_nodes.update({id: n.id,color: c});
		}
	}
	
	// create an array with edges
	var vis_edges = new vis.DataSet();
	for(let e of e_arr){
		vis_edges.add({
			id: e.id,
			from: e.from,
			to:e.to,
		});
	}
	
	var network;
	
	// create a network
	function redrawAll(){
		var container = document.getElementById('vis_graph2');
		
		var data = {
			nodes: vis_nodes,
			edges: vis_edges
		};
		
		var options = {
			nodes:{
				shape:'dot',
				size: 20,
				
				color: {
					border: '#2B7CE9',
					background: '#97C2FC',
				},
				
				scaling: {
					min: 10,
					max: 100,
					label: {
						enabled: false,
						min: 14,
						max: 30,
						maxVisible: 30,
						drawThreshold: 5
					}
				},			
				font:{
					color:'#343434',
					size: 10,
				},
			},

			
			edges:{
				smooth:{
					type:'continuous'
				},
			},
			
			layout:{
				improvedLayout:false,
			},
			
			physics: 
			{        
				barnesHut: {
					gravitationalConstant: -10000,
					centralGravity: 0.3,
					springLength: 95,
					springConstant: 0.04,
					damping: 0.09,
					avoidOverlap: 0
				},
				forceAtlas2Based: {
				  gravitationalConstant: -200,
				  centralGravity: 0.01,
				  springConstant: 0.08,
				  springLength: 100,
				  damping: 0.4,
				  avoidOverlap: 0
				},
				solver: 'barnesHut',
				stabilization: false,
			},
			
			interaction: {
				tooltipDelay: 200,
				hideEdgesOnDrag: true
			},
		};
		
		network = new vis.Network(container, data, options);
		
		allNodes = vis_nodes.get({returnType:"Object"});
		
		network.on("click",neighbourhoodHighlight);
		
		// add event listeners
		network.on('select', function (params) {
			document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
		});
	}
	
	var allNodes;
	var highlightActive = false;
	
	function neighbourhoodHighlight(params) {
		// if something is selected:
		if (params.nodes.length > 0) {
			highlightActive = true;
			var i,j;
			var selectedNode = params.nodes[0];
			var degrees = 2;

			// mark all nodes as hard to read.
			for (var nodeId in allNodes) {
				allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
				if (allNodes[nodeId].hiddenLabel === undefined) {
				  allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
				  allNodes[nodeId].label = undefined;
				}
			}
			var connectedNodes = network.getConnectedNodes(selectedNode);
			var allConnectedNodes = [];

			// get the second degree nodes
			for (i = 1; i < degrees; i++) {
				for (j = 0; j < connectedNodes.length; j++) {
				  allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
				}
			}

			// all second degree nodes get a different color and their label back
			for (i = 0; i < allConnectedNodes.length; i++) {
				allNodes[allConnectedNodes[i]].color = 'rgba(0,0,255,0.3)';
				if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
				  allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
				  allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
				}
			}

			// all first degree nodes get their own color and their label back
			for (i = 0; i < connectedNodes.length; i++) {
				allNodes[connectedNodes[i]].color = 'rgba(0, 0, 255, 0.6)';
				if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
				  allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
				  allNodes[connectedNodes[i]].hiddenLabel = undefined;
				}
			}

			// the main node gets its own color and its label back.
			allNodes[selectedNode].color = 'rgba(0, 0, 255, 1.0)';
			if (allNodes[selectedNode].hiddenLabel !== undefined) {
			allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
			allNodes[selectedNode].hiddenLabel = undefined;
			}
		}
		else if (highlightActive === true) {
			// reset all nodes
			
			for (var nodeId in allNodes) {
				
				if(NodesProperties[nodeId].pvalue!=-1)
					allNodes[nodeId].color = NodesProperties[nodeId].color;
				else
					allNodes[nodeId].color ={border: '#2B7CE9',background:'#D2E5FF'};
				
				if (allNodes[nodeId].hiddenLabel !== undefined) {
				  allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
				  allNodes[nodeId].hiddenLabel = undefined;
				}
			}
			highlightActive = false
		}

	// transform the object into an array
		var updateArray = [];
		for (nodeId in allNodes) {
			if (allNodes.hasOwnProperty(nodeId)) {
				updateArray.push(allNodes[nodeId]);
			}
		}
		vis_nodes.update(updateArray);
	}

	redrawAll();
  
    function startSimulate(){
		network.setOptions({
			physics:true
		});
	//network.startSimulation();
	}
	
	function stopSimulate(){
		network.setOptions({
			physics:false
		});
	//network.startSimulation();
	}
	
	
	//searches the graph for the id in the input box,
	//and goes to it if its found
	function searchGraph(){
		
		let id = document.querySelector('#sigma_search_input').value;

		if(id == undefined || id == null){
			throw new Error('No node given!');
		}

		var options = {
			scale: 3.0,
			animation: {
				        
			duration: 1000,
			easingFunction: 'easeInOutQuad',
			}
		};

      network.focus(id, options);
    
	}
	
	function getColorFromPalue(p_value){
		let alpha = ((p_worst - p_value)/p_worst);
		//console.log(alpha);
		
		let d = 0;
		var c;
/* 		if(alpha < 0.5){
			d = 255 - 2*alpha*255;
			c = 'rgba(0,0,'+d.toString()+',1.0)';
			//vis_nodes.update({id: n.id, color: c});
			//n_arr[i].color = 'rgba(0,0,${d},1.0)';
		}
		else{
			d = 2*(alpha- 0.5)*255;
			c = 'rgba('+d.toString()+',0,0,1.0)';
			//vis_nodes.update({id: n.id,color: c});
			//n_arr[i].color = 'rgba(${d},0,0,1.0)';
		} */
		

		d = Math.floor(255 - alpha*255);
		//console.log(d);
		c = 'rgba(255,'+d.toString()+',0,1.0)';
		
		//return 'rgba(255,0,0,1.0)';
		return c;
	}
	
  	//add button listeners
	(document.querySelector('#start_forcelayout')).onclick = startSimulate;
	(document.querySelector('#stop_forcelayout')).onclick = stopSimulate;
	(document.querySelector('#sigma_search_submit')).onclick = searchGraph;
  
	//set up search input autocomplete
	let search_input = document.querySelector('#sigma_search_input');
	let awe_list = {list:[],maxItems:20};
	resultList.forEach(r => awe_list.list.push({"label":r.ontologyName,"value":r.ontologyId}));
	console.log(awe_list);
	let awesomplete = new Awesomplete(search_input, awe_list);
	search_input.parentElement.classList.add('form-control');
	search_input.parentElement.style.padding = '0px';
}