let url_amigo = 'http://test.planteome.org/amigo/';
let raw_graph_data;
let resultList;
var defaultColor = {border: '#2B7CE9',background:'#D2E5FF'};
var defaultWhiteColor = 'rgba(255,255,255,0.0)';

var NodesProperties = {};
var EdgesProperties = {};

var flag_showChildren = true;
var flag_highlightActive = false;
var allNodes;


//dataset for network view
var vis_nodes;
var vis_edges;

//dataset for hiearchical view
var tree_nodes;
var tree_edges;

var network;			// for net visualization
var networkTree;		// for tree visualization

var p_worst;
var selectedCategory;
var getCategoriesFinished = false;

function loadView(){
	
	
	
	console.log('vis begin');
	
	raw_graph_data = sessionStorage.getItem("graphData");
	resultList = sessionStorage.getItem("resultList");
	
	raw_graph_data = JSON.parse(raw_graph_data);
	resultList = JSON.parse(resultList);

	
	if(raw_graph_data.length == resultList.length){
	//parsed all of resultList, time to view graph
		visViewGraph(raw_graph_data);
	}
	

	selectedCategory = document.getElementById("ontologyCategoryVis").value;
	
/* 	var c = document.getElementById("vis_graph2");
	var ctx = c.getContext("2d");
	var clientHeight = document.getElementById('vis_graph2').clientHeight;
	var clientWeight = document.getElementById('vis_graph2').clientWidth;
	console.log(clientHeight);
	console.log(clientWeight);
	
    ctx.fillStyle = 'rgba(255, 0, 255, 1.0)';
    ctx.fillRect(-clientWeight,-clientHeight,2*clientWeight,2*clientHeight); */
}

function onclick_ontologyCategoryChangeVis(){
	
	selectedCategory = document.getElementById("ontologyCategoryVis").value;
	
	var updateArray = [];
	
		
	for (var nodeId in NodesProperties) {
		
		let c;
		let l;
		if(NodesProperties[nodeId].category == selectedCategory || selectedCategory=='all'){
			
			c = NodesProperties[nodeId].color ;
			l = NodesProperties[nodeId].name;
		
			if(c == undefined)
				c = defaultColor;
			
			if(!flag_showChildren && (NodesProperties[nodeId].hasChildrenWithPvalue == false)){
				c = defaultWhiteColor;
				l = undefined;
			}
		}else{
			c = defaultWhiteColor ;
			l = undefined;
		}
		
		updateArray.push({
				id: nodeId,
				label: l,
				color: c,
			})
	}
		
	//vis_nodes.remove(deleteArray);
		
	vis_nodes.update(updateArray);
	
}
function showNodesChildren(){
	//flag_showChildren = $('#checkbox_showChildren').is(':checked'); 
	flag_showChildren = (flag_showChildren + 1 )%2
	if(flag_showChildren)
		$('#checkbox_showChildren').html("Hide Children Nodes");
	else
		$('#checkbox_showChildren').html("Show Children Nodes");
	//network.setOptions({physics:false});

/* 	if(flag_showChildren){
		
		var updateArray = [];
		
		for (var nodeId in NodesProperties) {
			

			var items =  vis_nodes.get(nodeId);
 			if(items)
				continue;
		
			//if(NodesProperties[nodeId].hasChildrenWithPvalue == true)

			//get the color of node
			let c = NodesProperties[nodeId].color ;
			
			updateArray.push({
				id: nodeId,
				label: NodesProperties[nodeId].name,
				value: NodesProperties[nodeId].edgeCount,
				title: nodeId,
				color: c,
			})
		}
		
		//vis_nodes.add(updateArray);
		//network.setOptions({physics:true});
	}else{
		
		var deleteArray = [];
		for (var nodeId in NodesProperties) {
			

			if(NodesProperties[nodeId].hasChildrenWithPvalue == true)
				continue
			
			deleteArray.push(nodeId)
		}
		
		//vis_nodes.remove(deleteArray);
		
	} */
	
	var updateArray = [];
	
	if(flag_showChildren){
		
		for (var nodeId in NodesProperties) {
		
			//if(NodesProperties[nodeId].hasChildrenWithPvalue == true)

			//get the color of node
			let c = NodesProperties[nodeId].color ;
			let l = NodesProperties[nodeId].name;
			if(c == undefined)
				c = defaultColor;
			
			if(getCategoriesFinished && selectedCategory!='all' && NodesProperties[nodeId].category != selectedCategory){
				
				c = defaultWhiteColor;
				l = undefined;
				
			}
			
			updateArray.push({
				id: nodeId,
				label: l,
				color: c,
			})
		}
		
		//vis_nodes.add(updateArray);
		//network.setOptions({physics:true});
	}else{
		
		for (var nodeId in NodesProperties) {
			
			let c, l;
			if(NodesProperties[nodeId].hasChildrenWithPvalue == true){
				
				c = NodesProperties[nodeId].color ;
				l = NodesProperties[nodeId].name;
				if(c == undefined)
					c = defaultColor;
				
				if(getCategoriesFinished && selectedCategory!='all' && NodesProperties[nodeId].category != selectedCategory){
				
					c = defaultWhiteColor ;
					l = undefined;
				
				}
				
				
			}else{
				c = defaultWhiteColor ;
				l = undefined;
			}
			
			updateArray.push({
					id: nodeId,
					label: l,
					color: c,
				})
		}
		
		//vis_nodes.remove(deleteArray);
		
	}
	
	vis_nodes.update(updateArray);
	
} 

function hasChildwithPvalue(n_Id){
	
	var childrenIds = NodesProperties[n_Id].children;
	
	if(NodesProperties[n_Id].pvalue !=-1){
		return 1;
		
	}else if(NodesProperties[n_Id].pvalue == -1){

		var total = 0;
		for(cid of childrenIds)
			total += hasChildwithPvalue(cid);
		
		if(total > 0)
			return 1;
		else
			return 0;
	}
}

function visViewGraph(raw_data){
	//we have alot of duplicate nodes/edges,
	//because each topology graph contains everything connecting
	//to that individual node (both in and out of node)
	//use set to filter the dups out
	let nodes = new Set();
	let edges = new Set();

	for(let raw_graph of raw_data){
		let json = JSON.parse(raw_graph.topology_graph_json);

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
			edges.add(JSON.stringify({"id":`${e.sub}x${e.obj}`,"from":e.sub,"to":e.obj, /* 'type':e.pred */}));
			
			let eid = `${e.sub}x${e.obj}`;
			EdgesProperties[eid] = {};
			EdgesProperties[eid].from = e.sub;
			EdgesProperties[eid].to = e.obj;
			if(!EdgesProperties[eid].hasOwnProperty('type'))
				EdgesProperties[eid].type = e.pred;
			else{
				cosole.log(EdgesProperties[`${e.sub}x${e.obj}`]);
				cosole.log(e.pred);
			}
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
	p_worst = 0.00000001;

	for(let i in n_arr){
		//the more edges with this node,
		//the larger it will be
		//to signify importance
		
		var parentsEdgesIds = [];
		var childrenEdgesIds = [];
		var parentNodesIds = [];
		var childrenNodesIds = [];
		
		let e_count = 0;
		for(let e of e_arr){
			if(e.to == n_arr[i].id){
				e_count++;
				let edgeId = e.from+"x"+e.to;
				childrenEdgesIds.push(edgeId);
				childrenNodesIds.push(e.from);
			}
			if(e.from == n_arr[i].id){
				e_count++;
				let edgeId = e.from+"x"+e.to;
				parentsEdgesIds.push(edgeId);
				parentNodesIds.push(e.to);
			}
		}
	
		//try to get the term's pvalue
		let p_value = null;
		let on_catagory = null;
		for(let r of resultList){
			if(r.ontologyId == n_arr[i].id){
				p_value = r.p;
				//on_catagory = r.ontologyCategory;
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
		var propertyItem =  {name:n_arr[i].label ,edgeCount: e_count, pvalue: p_value, parentsEdges:parentsEdgesIds, childrenEdges: childrenEdgesIds, parents: parentNodesIds, children: childrenNodesIds};
		NodesProperties[propertyName] = propertyItem;

	}
	
	let count = 0;
	for(let i in n_arr){
		
		$.ajax({
			type: 'get',
			url: url_amigo + 'term/' + n_arr[i].id + '/json',
			dataType: 'json',
			success: function(res){

				on_catagory = res.results.ontology;
				var id = res.results.acc;
				var item = NodesProperties[id];
				item['data'] = res.results;
				item['category'] = on_catagory;
				count++;
			}
		}).done(function(){
			if(count == n_arr.length){
				$('#ontologyCategoryVis').prop( "disabled", false );
				getCategoriesFinished = true;
				console.log("getting categories finished")
			}
		});
	}

	vis_nodes = new vis.DataSet();
	vis_edges = new vis.DataSet();
	
	tree_nodes = new vis.DataSet();
	tree_edges = new vis.DataSet();
	
	
	//var teststr;	
	let co = 0;
	for(let n of n_arr){
		
		if(hasChildwithPvalue(n.id) > 0){
			NodesProperties[n.id].hasChildrenWithPvalue = true;
		}else{
			NodesProperties[n.id].hasChildrenWithPvalue = false;
		}
		
		let c;
		if(NodesProperties[n.id].pvalue != -1){
			c = getColorFromPalue(NodesProperties[n.id].pvalue);
			NodesProperties[n.id].color = c;
		}else{
			c = defaultColor;
		}
		
		vis_nodes.add({
			id: n.id,
			label: NodesProperties[n.id].name,
			value: NodesProperties[n.id].edgeCount,
			title: n.id,
			color: c,
		});
		
		if((NodesProperties[n.id].hasChildrenWithPvalue != true))
			continue;
		
	/* 	if(NodesProperties[n.id].pvalue == -1){
			continue;
		} */
		
  		//if(co>50){
			/* console.log(n.id)
			console.log(NodesProperties[n.id].parentsEdges); */
		//	co++;
		//	continue;
		//}
		co++;
		tree_nodes.add({
			id: n.id,
			label: n.id,
			//value: NodesProperties[n.id].edgeCount,
			level: co%10,
			title: NodesProperties[n.id].name,
			color: c,
		});
		
		
		
		//teststr += "tree_nodes.add({id: '"+n.id.toString()+"',label: '"+n.id.toString()+"', level: "+(co%10).toString()+", title: '"+NodesProperties[n.id].name.toString()+"',color: '"+c.toString()+"'});\n"
		
/*  		for( eid of NodesProperties[n.id].parentsEdges){
			//console.log(eid);
			
			tree_edges.add({
				//id: eid,
				from: EdgesProperties[eid].from,
				to:EdgesProperties[eid].to,
				//title: eid,
			});
		} */

	}
		//console.log(teststr);

	for(let e of e_arr){
		vis_edges.add({
			id: e.id,
			from: e.from,
			to:e.to,
			title: e.id,
		});
		
/* 		tree_edges.add({
			//id: eid,
			from: EdgesProperties[e.id].from,
			to:EdgesProperties[e.id].to,
			//title: eid,
		}); */
		
		//teststr += "tree_edges.add({from: '"+EdgesProperties[e.id].from.toString()+"',to:'"+EdgesProperties[e.id].to.toString()+"'})\n"
		
	}	

	
	//drawNetwork();
	drawTree();
	
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

	  stopSimulate();
      network.focus(id, options);
	}
	

  	//add button listeners
	(document.querySelector('#start_forcelayout')).onclick = startSimulate;
	(document.querySelector('#stop_forcelayout')).onclick = stopSimulate;
	(document.querySelector('#sigma_search_submit')).onclick = searchGraph;
  
	(document.querySelector('#start_simulate')).onclick = startTreeSimulate;
	(document.querySelector('#stop_simulate')).onclick = stopTreeSimulate;
  
	//set up search input autocomplete
	let search_input = document.querySelector('#sigma_search_input');
	let awe_list = {list:[],maxItems:20};
	resultList.forEach(r => awe_list.list.push({"label":r.ontologyName,"value":r.ontologyId}));
	console.log(awe_list);
	let awesomplete = new Awesomplete(search_input, awe_list);
	search_input.parentElement.classList.add('form-control');
	search_input.parentElement.style.padding = '0px';
}

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

function startTreeSimulate(){
	networkTree.setOptions({
		physics:true
	});
//network.startSimulation();
}

function stopTreeSimulate(){
	networkTree.setOptions({
		physics:false
	});
//network.startSimulation();
}

//draw tree
function drawTree() {
	//destroy();

/* 	var nodes = [];
	var edges = [];
	// randomly create some nodes and edges
	for (var i = 0; i < 19; i++) {
	nodes.push({id: i, label: 'GOxxxxxx'+String(i), title: 'eeeeeee'});
	}
	edges.push({from: 0, to: 1});
	edges.push({from: 0, to: 6});
	edges.push({from: 0, to: 13});
	edges.push({from: 0, to: 11});
	edges.push({from: 1, to: 2});
	edges.push({from: 2, to: 3});
	edges.push({from: 2, to: 4});
	edges.push({from: 3, to: 5});
	edges.push({from: 1, to: 10});
	edges.push({from: 1, to: 7});
	edges.push({from: 2, to: 8});
	edges.push({from: 2, to: 9});
	edges.push({from: 3, to: 14});
	edges.push({from: 1, to: 12});
	edges.push({from: 16, to: 15});
	edges.push({from: 15, to: 17});
	edges.push({from: 18, to: 17}); */

	// create a network
	var container = document.getElementById('vis_graph_tree');
/* 	var data = {
	nodes: nodes,
	edges: edges
	}; */

	var data = {
		nodes: tree_nodes,
		edges: tree_edges
	};
	
	/* var options = {
		layout: {
			hierarchical: {
				direction: 'DU'
			}
		}
	}; */
	
 	var options = {
		nodes:{
			//shape: 'dot',
			shape:'box',
			shadow:{
			  enabled: true,
			  color: 'rgba(0,0,0,0.5)',
			  size:10,
			  x:5,
			  y:5
			},
			font:{
				color:'#343434',
				size: 20,
			},			
		},

		edges: {
			smooth: {
				//type: 'continuous',
				type: 'diagonalCross',
				//forceDirection: 'vertical',
				roundness: 0.2
			},
			arrows: {to : true }
		},
		
  		layout: {
			hierarchical: {
				enabled:true,
				levelSeparation: 250,
				treeSpacing:10,
				nodeSpacing:150,
				direction: "DU",
				sortMethod: 'directed'
			}
		},
		 
		interaction: {dragNodes :true},
		
		physics: 
		{
			enabled:false,
			barnesHut: {
				gravitationalConstant: -10000,
				centralGravity: 0.3,
				springLength: 200,
				springConstant: 0.04,
				damping: 0.09,
				avoidOverlap: 0.5
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
			minVelocity:10,
		},
/* 		configure:function (option, path) {
			if (path.indexOf('smooth') !== -1 || option === 'smooth') {
				return true;
			}
			return false; 
		},*/
		
	};
	networkTree = new vis.Network(container, data, options);
	
	networkTree.on('select', clickNode);
	
	networkTree.on("beforeDrawing", function createWhiteBackground(ctx) {
	
		var clientHeight = document.getElementById('vis_graph_tree').clientHeight;
		var clientWeight = document.getElementById('vis_graph_tree').clientWidth;
		
		var scale = networkTree.getScale();
		//console.log(scale);
		//console.log(clientWeight);
		
		ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
		ctx.fillRect(-clientWeight/scale,-clientHeight/scale,2*clientWeight/scale,2*clientHeight/scale);
	
	});
	
	networkTree.on("click",stopSimulate);
	
}


// create a network
function drawNetwork(){
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
				max: 60,
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
			
			arrows: {
			    to:     {enabled: true, scaleFactor:1}
			},
		},
		
		layout:{
			improvedLayout:false,
		},
		
		physics: 
		{   
			enabled:true,
			barnesHut: {
				gravitationalConstant: -10000,
				centralGravity: 0.3,
				springLength: 200,
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
			minVelocity:10,
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
	network.on('select', clickNode);
	
	network.on("beforeDrawing", function creatWhieBackground(ctx) {
	
		var clientHeight = document.getElementById('vis_graph2').clientHeight;
		var clientWeight = document.getElementById('vis_graph2').clientWidth;
		
		var scale = network.getScale();
		//console.log(scale);
		//console.log(clientWeight);
		
		ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
		ctx.fillRect(-clientWeight/scale,-clientHeight/scale,2*clientWeight/scale,2*clientHeight/scale);
	
	});
}

function clickNode(params) {
		
		if(params.nodes.length>0){
			document.getElementById('selectedNode').innerHTML = 'Selection: ' + params.nodes +'</br>';
			$('#selectedNode').append('the children nodes are '+ NodesProperties[params.nodes].children.toString());
		//console.log(NodesProperties[params.nodes]);
		}
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
	
function neighbourhoodHighlight(params) {
	// if something is selected:
	if (params.nodes.length > 0) {
		flag_highlightActive = true;
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
		
		function getClickedNodeColor(nodeId, r,g,b,a){
			let newc;
			if(NodesProperties[nodeId].pvalue != -1)
			{
				var color = NodesProperties[nodeId].color;
				//let c_components = color.match(/\d+\.?\d*/g);
				/* let newr = (parseInt(c_components[0].trim())+r);
				newr = newr>255 ? 255:newr;
				newr = newr.toString();
				let newg = (parseInt(c_components[1].trim())+g);
				newg = newg>255 ? 255:newg;
				newg = newg.toString();
				let newb = (parseInt(c_components[2].trim())+b);
				newb = newb>255 ? 255:newb;
				newb = newb.toString();
				let newa = a.toString();
				newc = 'rgba('+newr+','+newg+','+newb+','+newa+')'; */
				newc = color;
				return newc;
			}else{
				return 'rgba('+r.toString()+','+g.toString()+','+b.toString()+','+a.toString()+')'
			}
			
		}

		// all second degree nodes get a different color and their label back
		for (i = 0; i < allConnectedNodes.length; i++) {
			//allNodes[allConnectedNodes[i]].color = 'rgba(0,0,255,0.3)';
			allNodes[allConnectedNodes[i]].color = getClickedNodeColor(allConnectedNodes[i], 0,0,76,1.0);
			if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
			  allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
			  allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
			}
		}

		// all first degree nodes get their own color and their label back
		for (i = 0; i < connectedNodes.length; i++) {
			//allNodes[connectedNodes[i]].color = 'rgba(0, 0, 255, 0.6)';
			allNodes[connectedNodes[i]].color = getClickedNodeColor(connectedNodes[i], 0, 0, 153, 1.0);
			if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
			  allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
			  allNodes[connectedNodes[i]].hiddenLabel = undefined;
			}
		}

		// the main node gets its own color and its label back.
		//allNodes[selectedNode].color = 'rgba(0, 0, 255, 1.0)';
		allNodes[selectedNode].color = getClickedNodeColor(selectedNode, 0, 0, 255, 1.0);
		if (allNodes[selectedNode].hiddenLabel !== undefined) {
			allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
			allNodes[selectedNode].hiddenLabel = undefined;
		}
	}
	else if (flag_highlightActive === true) {
		// reset all nodes
		let c, l;
		for (var nodeId in allNodes) {
			
			if(NodesProperties[nodeId].pvalue!=-1){
				c = NodesProperties[nodeId].color;
				l = NodesProperties[nodeId].name;
			}
			else{
				c = defaultColor;
				l = NodesProperties[nodeId].name;
			}
			
			if(!flag_showChildren && (NodesProperties[nodeId].hasChildrenWithPvalue == false)){
				c = defaultWhiteColor;
				l = undefined;
			}
			
			if(getCategoriesFinished && selectedCategory!='all' && NodesProperties[nodeId].category != selectedCategory){
					c = defaultWhiteColor ;
					l = undefined;	
			}
			
			allNodes[nodeId].color = c;
			allNodes[nodeId].label = l;
			
/* 			if (allNodes[nodeId].hiddenLabel !== undefined) {
			  allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
			  allNodes[nodeId].hiddenLabel = undefined;
			} */
		}
		flag_highlightActive = false
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