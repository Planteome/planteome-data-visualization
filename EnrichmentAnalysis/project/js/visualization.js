let raw_graph_data;
let resultList;

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
	for(let r of resultList){
		//console.log(r.ontologyId);
		if(r.p > p_worst){
			p_worst = r.p;
		}
	}
	console.log(`pworst: ${p_worst}`);

	let sqrt_nodes = Math.floor(Math.sqrt(n_arr.length));
	
	var max_e_count = 0;
	var min_e_count = 10000;
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
	
		if(e_count > max_e_count)
			max_e_count = e_count;
		if(e_count < min_e_count)
			min_e_count = e_count;
	
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

			let alpha = 0.3 + ((p_worst - p_value)/p_worst)*0.7;
			n_arr[i].color = 'rgba(255,0,0,${alpha})';
		}
		else{
			n_arr[i].color = `null`;
		}
		
		//size = influence = significance in the force layout alg
		//we get alot of nodes, so make it small
		n_arr[i].size = Math.sqrt(e_count * 1.0) * 0.1;

		//we need to initialize the node's location to begin the force layout
		//arrange in a square, starting at the top left, going across, then down
		//n_arr[i].x = Math.floor(i % sqrt_nodes);
		//n_arr[i].y = Math.floor(i / sqrt_nodes);
	}
	
	var vis_nodes = new vis.DataSet();

	for(let n of n_arr){
		vis_nodes.add({
			id: n.id,
			label: n.label,
		});
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
			  color:{
				border: '#2B7CE9',
				background:'#D2E5FF',
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
				stabilization: false,
			},
			interaction: {
				tooltipDelay: 200,
				hideEdgesOnDrag: true
			}
		};
		
		network = new vis.Network(container, data, options);
		
		allNodes = vis_nodes.get({returnType:"Object"});
		
		network.on("click",neighbourhoodHighlight);
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
				allNodes[nodeId].color = {border: '#2B7CE9',background:'#D2E5FF'};
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
	search_input.style.width = '100%';
}