let url_amigo = 'http://test.planteome.org/amigo/';
let raw_graph_data;
let resultList;
// #2B7CE9 : dark blue
// #D2E5FF : light blue
// #71E618 : green
var defaultColor = { border: '#2B7CE9', background: '#D2E5FF', highlight: { background: '#71E618' } };
var defaultWhiteColor = 'rgba(255,255,255,0.0)';

var NodesProperties = {};
var EdgesProperties = {};
var pvalueList = [];

//for tree distribute
var hlevelNodesList = {};
let vlevelNodesList = {};

var flag_showChildren = true;
var flag_highlightActive = false;
var allNodes;
var allEdges;


//dataset for network view
var vis_nodes;
var vis_edges;

//dataset for hiearchical view
var tree_nodes;
var tree_edges;

var network;			// for net visualization
var networkTree;		// for tree visualization

var selectedCategory;
var getCategoriesFinished = false;

function loadView() {



    console.log('vis begin');

    raw_graph_data = sessionStorage.getItem("graphData");
    resultList = sessionStorage.getItem("resultList");

   

    raw_graph_data = JSON.parse(raw_graph_data);
    resultList = JSON.parse(resultList);
    console.log(resultList);

    if (raw_graph_data.length == resultList.length) {
        //parsed all of resultList, time to view graph
        visViewGraph(raw_graph_data);
    }


    selectedCategory = document.getElementById("ontologyCategoryVis").value;

    flag_showChildren = true;
    showNodesChildren();

    /* 	var c = document.getElementById("vis_graph2");
        var ctx = c.getContext("2d");
        var clientHeight = document.getElementById('vis_graph2').clientHeight;
        var clientWeight = document.getElementById('vis_graph2').clientWidth;
        console.log(clientHeight);
        console.log(clientWeight);
        
        ctx.fillStyle = 'rgba(255, 0, 255, 1.0)';
        ctx.fillRect(-clientWeight,-clientHeight,2*clientWeight,2*clientHeight); */

}

function onclick_ontologyCategoryChangeVis() {

    selectedCategory = document.getElementById("ontologyCategoryVis").value;

    var updateArray = [];
    var updateEdgeArray = [];

    for (var nodeId in NodesProperties) {

        let c;
        let l;
        if (NodesProperties[nodeId].category == selectedCategory || selectedCategory == 'all') {

            c = NodesProperties[nodeId].color;
            l = NodesProperties[nodeId].name;

            /* 			if(c == undefined)
                            c = defaultColor; */

            if (!flag_showChildren && (NodesProperties[nodeId].hasChildrenWithPvalue == false)) {
                c = defaultWhiteColor;
                l = undefined;
            }
        } else {
            c = defaultWhiteColor;
            l = undefined;
        }

        updateArray.push({
            id: nodeId,
            label: l,
            color: c,
        })

        var edgesList = NodesProperties[nodeId].parentsEdges;

        if (c == defaultWhiteColor) {



            for(ei of edgesList) {
                updateEdgeArray.push({
                    id: ei,
                    color: defaultWhiteColor,
                })
            }
        }
        else {

            for(ei of edgesList) {
                updateEdgeArray.push({
                    id: ei,
                    color: EdgesProperties[ei].color,
                })
            }
        }
    }

    //vis_nodes.remove(deleteArray);

    vis_edges.update(updateEdgeArray);
    vis_nodes.update(updateArray);

}

function onclick_treeontologyCategoryChangeVis() {

    selectedCategory = document.getElementById("treeontologyCategoryVis").value;

    var updateArray = [];
    var updateEdgeArray = [];

    var finalnodeList = [];
    for (var nodeId in NodesProperties) {

        let c;
        let l;
        if (NodesProperties[nodeId].category == selectedCategory || selectedCategory == 'all') {
            if (NodesProperties[nodeId].hasChildrenWithPvalue == false)
                continue;

            c = NodesProperties[nodeId].color;
            l = NodesProperties[nodeId].name;

            /* 			if(c == undefined)
                            c = defaultColor; */

        } else {
            c = defaultWhiteColor;
            l = undefined;
        }

        updateArray.push({
            id: nodeId,
            color: c,
        })

        var edgesList = NodesProperties[nodeId].parentsEdges;

        if (c == defaultWhiteColor) {

            for(ei of edgesList) {
                updateEdgeArray.push({
                    id: ei,
                    color: defaultWhiteColor,
                })
            }
        }
        else {

            finalnodeList.push(nodeId);

            for(ei of edgesList) {
                updateEdgeArray.push({
                    id: ei,
                    color: EdgesProperties[ei].color,
                })
            }
        }
    }

    //vis_nodes.remove(deleteArray);

    tree_edges.update(updateEdgeArray);
    tree_nodes.update(updateArray);

    networkTree.fit({
        nodes: finalnodeList,
        animation: {
            duration: 1000,
            easingFunction: 'easeInQuad',
        }
    });

    stopSimulate();
}
function showNodesChildren() {
    //flag_showChildren = $('#checkbox_showChildren').is(':checked'); 
    flag_showChildren = (flag_showChildren + 1) % 2
    if (flag_showChildren)
        $('#checkbox_showChildren').html("Hide Children Nodes");
    else
        $('#checkbox_showChildren').html("Show Children Nodes");


    var updateArray = [];
    var updateEdgeArray = [];

    if (flag_showChildren) {

        for (var nodeId in NodesProperties) {

            //if(NodesProperties[nodeId].hasChildrenWithPvalue == true)

            //get the color of node
            let c = NodesProperties[nodeId].color;
            let l = NodesProperties[nodeId].name;

            /* 			if(c == undefined)
                            c = defaultColor; */

            if (getCategoriesFinished && selectedCategory != 'all' && NodesProperties[nodeId].category != selectedCategory) {

                c = defaultWhiteColor;
                l = undefined;

            }

            updateArray.push({
                id: nodeId,
                label: l,
                color: c,
            })

            var edgesList = NodesProperties[nodeId].parentsEdges;

            if (c == defaultWhiteColor) {
                for(ei of edgesList) {
                    updateEdgeArray.push({
                        id: ei,
                        color: defaultWhiteColor,
                    })
                }
            }
            else {

                for(ei of edgesList) {
                    updateEdgeArray.push({
                        id: ei,
                        color: EdgesProperties[ei].color,
                    })
                }
            }
        }

        //vis_nodes.add(updateArray);
        //network.setOptions({physics:true});
    } else {

        for (var nodeId in NodesProperties) {

            let c, l;
            if (NodesProperties[nodeId].hasChildrenWithPvalue == true) {

                c = NodesProperties[nodeId].color;
                l = NodesProperties[nodeId].name;
                /* 				if(c == undefined)
                                    c = defaultColor; */

                if (getCategoriesFinished && selectedCategory != 'all' && NodesProperties[nodeId].category != selectedCategory) {

                    c = defaultWhiteColor;
                    l = undefined;

                }


            } else {
                c = defaultWhiteColor;
                l = undefined;
            }

            updateArray.push({
                id: nodeId,
                label: l,
                color: c,
            })

            var edgesList = NodesProperties[nodeId].parentsEdges;

            if (c == defaultWhiteColor) {
                for(ei of edgesList) {
                    updateEdgeArray.push({
                        id: ei,
                        color: defaultWhiteColor,
                    })
                }
            }
            else {

                for(ei of edgesList) {
                    updateEdgeArray.push({
                        id: ei,
                        color: EdgesProperties[ei].color,
                    })
                }
            }
        }

        //vis_nodes.remove(deleteArray);

    }

    vis_nodes.update(updateArray);
    vis_edges.update(updateEdgeArray);

}

function hasChildwithPvalue(n_Id) {

    var childrenIds = NodesProperties[n_Id].children;

    if (NodesProperties[n_Id].pvalue != -1) {
        return 1;

    } else if (NodesProperties[n_Id].pvalue == -1) {

        var total = 0;
        for(cid of childrenIds)
			total += hasChildwithPvalue(cid);

        if (total > 0)
            return 1;
        else
            return 0;
    }
}

function visViewGraph(raw_data) {
    //we have alot of duplicate nodes/edges,
    //because each topology graph contains everything connecting
    //to that individual node (both in and out of node)
    //use set to filter the dups out
    let nodes = new Set();
    let edges = new Set();

    for(let raw_graph of raw_data) {
        let json = JSON.parse(raw_graph.topology_graph_json);

    //without stringifying the node objects,
    //we would have to manually check each node/edge to see
    //if it was a dup or not,
    //whether we used JS's Sets or just plain Arrays.
    //stringifying it allows for shallow compare,
    //which JS's Sets do for us, quickly.
    //Since our objects that we are stringifying
    //are really simple, we aren't worried about illegal JSON.
        for(let n of json.nodes) {
            nodes.add(JSON.stringify({ "id": n.id, "label": n.lbl }));
        }

        for(let e of json.edges) {
    //TODO: add some sort of label for edges using e.pred (predicate, aka method)
    //note, only one edge between two nodes is allowed
            edges.add(JSON.stringify({ "id": `${e.sub}x${e.obj}`, "from": e.sub, "to": e.obj, /* 'type':e.pred */ }));

            let eid = `${e.sub}x${e.obj}`;
            EdgesProperties[eid] = {};
            EdgesProperties[eid].from = e.sub;
            EdgesProperties[eid].to = e.obj;
            if (!EdgesProperties[eid].hasOwnProperty('type'))
                EdgesProperties[eid].type = e.pred;
            else {
                cosole.log(EdgesProperties[`${e.sub}x${e.obj}`]);
                cosole.log(e.pred);
            }

            var type = EdgesProperties[eid].type;
            var c;

            if (type == 'is_a')
                c = '#2B7CE9';
            else if (type == 'part of')
                c = 'purple';
            else if (type == 'regulates')
                c = '#E29640';
            else if (type == 'positively regulates')
                c = '#00FF00';
            else if (type == 'negatively regulates')
                c = 'red';
            else if (type == 'occurs in')
                c = '#006600';
            else
                c = '##00FFFF'

            EdgesProperties[eid].color = c;
        }
    }

    //now that we have our sets, expand them into the objects
    let n_arr = [];
    let e_arr = [];
    nodes.forEach(n => n_arr.push(JSON.parse(n)));
    edges.forEach(e => e_arr.push(JSON.parse(e)));

    for (let i in n_arr) {
        //the more edges with this node,
        //the larger it will be
        //to signify importance

        var parentsEdgesIds = [];
        var childrenEdgesIds = [];
        var parentNodesIds = [];
        var childrenNodesIds = [];


        //try to get the term's pvalue
        let p_value = null;
        let mtype = undefined;
        let on_catagory = null;
        let inputGenesCount = 1;
        for(let r of resultList) {
            if (r.ontologyId == n_arr[i].id) {
                p_value = r.p;
                mtype = r.ontologyCategory;
                inputGenesCount = r.numberOfInput;
                //on_catagory = r.ontologyCategory;
            }
        }

        let e_count = 0;
        for(let e of e_arr) {
            if (e.to == n_arr[i].id) {
                e_count++;
                let edgeId = e.from + "x" + e.to;
                childrenEdgesIds.push(edgeId);
                childrenNodesIds.push(e.from);
            }
            if (e.from == n_arr[i].id) {
                e_count++;
                let edgeId = e.from + "x" + e.to;
                parentsEdgesIds.push(edgeId);
                parentNodesIds.push(e.to);
            }
        }



        //if we calculated a p_value for this term, then we can rate it,
        //from grayest (least related) to most red (most related)
        //if we didn't calculate a p_value, then just give it the color blue

        if (p_value) {

            let p_value_log = Math.log10(p_value);
            pvalueList.push(p_value_log);

        }
        else {
            p_value = -1;
        }

        var propertyName = n_arr[i].id;
        var propertyItem = { name: n_arr[i].label, inputCount:inputGenesCount, edgeCount: e_count, pvalue: p_value, parentsEdges: parentsEdgesIds, childrenEdges: childrenEdgesIds, parents: parentNodesIds, children: childrenNodesIds, category: mtype };
        NodesProperties[propertyName] = propertyItem;

    }

    //sort the array of pvalueList

    pvalueList.sort(function (a, b) { return b - a });

    //send the category based on relationship
    for (let i in n_arr) {

        let nid = n_arr[i].id;
        let type = NodesProperties[nid].category;

        if (type == undefined)
            continue;

        let nodelist = NodesProperties[nid].children;
        for(child of nodelist) {

            let edgeid = child + "x" + nid;
            let edgetype = EdgesProperties[edgeid].type;

            if (edgetype == 'is_a') {

                if (NodesProperties[child].category != undefined && NodesProperties[child].category != type) {
                    console.log(NodesProperties[child]);
                    console.log(type);
                }

                NodesProperties[child].category = type;
            }
        }
    }

    let count = 0;
    for (let i in n_arr) {

        if (NodesProperties[n_arr[i].id].category != undefined) {
            count++;
            continue;
        }

        $.ajax({
            type: 'get',
            url: url_amigo + 'term/' + n_arr[i].id + '/json',
            dataType: 'json',
            success: function (res) {

                on_catagory = res.results.ontology;
                var id = res.results.acc;
                var item = NodesProperties[id];
                item['data'] = res.results;
                item['category'] = on_catagory;
                count++;
            }
        }).done(function () {
            if (count == n_arr.length) {
                $('#ontologyCategoryVis').prop("disabled", false);
                $('#treeontologyCategoryVis').prop("disabled", false);
                getCategoriesFinished = true;
                console.log("getting categories finished")
            }
        });
    }

    vis_nodes = new vis.DataSet();
    vis_edges = new vis.DataSet();

    tree_nodes = new vis.DataSet();
    tree_edges = new vis.DataSet();


    distributeNodesForNetwork();

    //create the nodes dataset for network
    var haschildrenNodecount = 0;
    for(let n of n_arr) {

        if (hasChildwithPvalue(n.id) > 0) {
            NodesProperties[n.id].hasChildrenWithPvalue = true;
            haschildrenNodecount++;
        } else {
            NodesProperties[n.id].hasChildrenWithPvalue = false;
        }

        let c;
        if (NodesProperties[n.id].pvalue != -1) {
            c = getColorFromPalue(NodesProperties[n.id].pvalue);
            NodesProperties[n.id].color = c;
        } else {
            c = defaultColor;
            NodesProperties[n.id].color = c;
        }

        vis_nodes.add({
            id: n.id,
            label: NodesProperties[n.id].name,
            value: NodesProperties[n.id].inputCount,
            //value: NodesProperties[n.id].edgeCount,
            title: n.id,
            color: c,
        });
    }

    //console.log(haschildrenNodecount);

    distributeNodesForTreeVisualization();

    //create the nodes dataset for tree
    for(let n of n_arr) {

        if ((NodesProperties[n.id].hasChildrenWithPvalue != true))
            continue;

        let c, p_value_text;
        if (NodesProperties[n.id].pvalue != -1) {
            c = getColorFromPalue(NodesProperties[n.id].pvalue);
            NodesProperties[n.id].color = c;
            p_value_text = "\n" + NodesProperties[n.id].pvalue.toExponential(4);
        } else {
            c = defaultColor;
            p_value_text = "";
        }

    //let label_name_short = NodesProperties[n.id].name.match(/([\w+]+)/g);
        let label_name_short;
        if (NodesProperties[n.id].name.length > 12)
            label_name_short = NodesProperties[n.id].name.substring(0, 9) + "..."
        else
            label_name_short = NodesProperties[n.id].name.substring(0, 12);



        let label_detail = n.id + '\n' + label_name_short + p_value_text;

        tree_nodes.add({
            id: n.id,
            //label: n.id,
            label: label_detail,
            //value: NodesProperties[n.id].edgeCount,
            //level: co%10,
            title: NodesProperties[n.id].name,
            color: c,
            //hidden: NodesProperties[n.id].hidden,
            x: NodesProperties[n.id].treex,
            y: NodesProperties[n.id].treey,
        });
    }

    for(let e of e_arr) {

        vis_edges.add({
            id: e.id,
            from: e.from,
            to: e.to,
            title: e.from + " " + EdgesProperties[e.id].type + " " + e.to,
            color: EdgesProperties[e.id].color,
        });



        tree_edges.add({
            id: e.id,
            from: EdgesProperties[e.id].from,
            to: EdgesProperties[e.id].to,
            color: EdgesProperties[e.id].color,
            title: e.from + " " + EdgesProperties[e.id].type + " " + e.to,
        });
    }


    drawNetwork();
    drawTree();

    //searches the graph for the id in the input box,
    //and goes to it if its found
    function searchGraph() {

        let id = document.querySelector('#sigma_search_input').value;

        if (id == undefined || id == null) {
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

        if (id != null && id != undefined) {
            network.setSelection({
                nodes: [id],
            });
        }
    }


    function treesearchGraph() {

        let id = document.querySelector('#tree_search_input').value;

        if (id == undefined || id == null) {
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
        networkTree.focus(id, options);
    }



    //add button listeners
    (document.querySelector('#start_forcelayout')).onclick = startSimulate;
    (document.querySelector('#stop_forcelayout')).onclick = stopSimulate;
    (document.querySelector('#sigma_search_submit')).onclick = searchGraph;
    (document.querySelector('#tree_search_submit')).onclick = treesearchGraph;

    /* 	(document.querySelector('#start_simulate')).onclick = startTreeSimulate;
        (document.querySelector('#stop_simulate')).onclick = stopTreeSimulate; */

    //set up search input autocomplete
    let search_input = document.querySelector('#sigma_search_input');
    let awe_list = { list: [], maxItems: 20 };
    resultList.forEach(r => awe_list.list.push({ "label": r.ontologyName, "value": r.ontologyId }));

    let tree_search_input = document.querySelector('#tree_search_input');
    let tree_awe_list = { list: [], maxItems: 20 };
    resultList.forEach(r => tree_awe_list.list.push({ "label": r.ontologyName, "value": r.ontologyId }));
    //console.log(awe_list);

    let awesomplete = new Awesomplete(search_input, awe_list);
    search_input.parentElement.classList.add('form-control');
    search_input.parentElement.style.padding = '0px';

    let treeawesomplete = new Awesomplete(tree_search_input, tree_awe_list);
    tree_search_input.parentElement.classList.add('form-control');
    tree_search_input.parentElement.style.padding = '0px';
}

//distriubte the nodes to a circle and seperate based on category
function distributeNodesForNetwork() {

}

//distribute the nodes to a tree
function distributeNodesForTreeVisualization() {
    var nodeDis = 200;
    //var treeDis = 500;
    var step = 0.25;	//get by using network.getBoundingBox
    var levelDis = 250;

    //var hlevelNodesList={};
    //let vlevelNodesList={};

    //node_h_level ranges can be negative
    function getX(node_h_level) {
        return nodeDis * node_h_level;
    }

    function getY(node_v_level) {
        return levelDis * node_v_level;
    }

    function setVLevel(nodeID, level) {

        if (NodesProperties[nodeID].hasOwnProperty('vlevel')) {

            ori_level = NodesProperties[nodeID].vlevel;
            if (ori_level < level) {
                NodesProperties[nodeID].vlevel = level
            }
        } else
            NodesProperties[nodeID].vlevel = level;



    }

    function getVLevel(nodeID) {
        if (NodesProperties[nodeID].hasOwnProperty('vlevel')) {
            return NodesProperties[nodeID].vlevel;
        } else
            return -1;

    }


    let leftInserted = false;
    function getAvailableHLevel(nodeID, hlevel) {

        function checkCollide(vlevel, hlevel) {

            if (hlevelNodesList[vlevel].hasOwnProperty(hlevel))
                return [true, hlevelNodesList[vlevel][hlevel].leftmove];

            var hs = Object.keys(hlevelNodesList[vlevel]);
            //hs.sort(function(a, b){return a - b});

            for (var i = 0; i < hs.length; i++) {

                //let left = parseFloat(hs[i])- 1;
                let left = parseFloat(hs[i]) - hlevelNodesList[vlevel][hs[i]].left;
                //let right = parseFloat(hs[i])+1;
                let right = parseFloat(hs[i]) + hlevelNodesList[vlevel][hs[i]].right;
                if ((hlevel <= right) && (hlevel >= left))
                    return [true, hlevelNodesList[vlevel][hs[i]].leftmove];
            }

            return [false, null];

        }

        function getLowerLevelChildrenCount(nodeID) {

            let children = getChildren(nodeID);
            var vlevel = getVLevel(nodeID);

            let lowerLevelChildrenCount = 0;
            for(ccc of children) {

                if (getVLevel(ccc) == vlevel + 1)
                    lowerLevelChildrenCount++;
            }

            return lowerLevelChildrenCount;
        }



        function getRightAvailableHlevel(nodeID, hlevel) {

            var vlevel = getVLevel(nodeID);

            if (checkCollide(vlevel, hlevel)[0])
                return getRightAvailableHlevel(nodeID, hlevel + step);
            else {

                //get the number of children in next level with only this parent
                let offset = getLowerLevelChildrenCount(nodeID);
                //offset = offset/2;
                offset = offset < 1 ? 1 : offset;
                hlevelNodesList[vlevel][hlevel] = { node: nodeID, left: offset, right: offset };
                return hlevel;
            }
        }

        function getLeftAvailableHlevel(nodeID, hlevel) {

            let vlevel = getVLevel(nodeID);

            if (checkCollide(vlevel, hlevel)[0]) {
                return getLeftAvailableHlevel(nodeID, hlevel - step);
            }
            else {

                //get the number of children in next level with only this parent
                let offset = getLowerLevelChildrenCount(nodeID);
                //offset = offset/2;				
                offset = offset < 1 ? 1 : offset;
                hlevelNodesList[vlevel][hlevel] = { node: nodeID, left: offset, right: offset };
                return hlevel;
            }
        }

        function getAvailableHlevelWithAdjusting(nodeID, hlevel) {

            var vlevel = getVLevel(nodeID);

            var leftMove = false;

            var collided = checkCollide(vlevel, hlevel);
            if (collided[0]) {

                //move left last time, should move right this time
                if (collided[1] !== true)
                    leftMove = false;
                else
                    leftMove = true;

                //move this node to left or right based on leftMove



                //find all nodes on this nodes right and move them

                //move their parents smaller

                //update the hlevelNodesList

                //find all nodes on this nodes left and move them

                //move their parents smaller

                //update the hlevelNodesList


            }

            //get the number of children in next level with only this parent
            let offset = 1;//getLowerLevelChildrenCount(nodeID);
            //offset = offset/2;				
            //offset = offset<1? 1:offset;
            hlevelNodesList[vlevel][hlevel] = { node: nodeID, left: offset, right: offset, leftmove: leftMove };
            return hlevel;

        }

        let newlevel;
        if (leftInserted) {
            newlevel = getRightAvailableHlevel(nodeID, hlevel);
            leftInserted = (leftInserted + 1) % 2;
        }
        else {
            newlevel = getLeftAvailableHlevel(nodeID, hlevel);
            leftInserted = (leftInserted + 1) % 2;
        }

        //newlevel = getAvailableHlevelWithAdjusting(nodeID, hlevel);

        return newlevel;

    }

    function setHLevel(nodeID, level) {

        //let vlevel = getVLevel(nodeID);

        //delete duplicate		
        let new_hlevel = getAvailableHLevel(nodeID, level);

        NodesProperties[nodeID].hlevel = new_hlevel
    }

    function getHLevel(nodeID) {
        if (NodesProperties[nodeID].hasOwnProperty('hlevel')) {
            return NodesProperties[nodeID].hlevel;
        } else
            return undefined;
    }

    //get children shown
    function getChildren(nodeId) {

        var childrenWithChildrenHasPvList = [];
        var allChildren = NodesProperties[nodeId].children;
        for(let cnode of allChildren) {

            if (NodesProperties[cnode].hasChildrenWithPvalue == true)
                childrenWithChildrenHasPvList.push(cnode);
        }

        return childrenWithChildrenHasPvList;
    }

    //get parents shown
    function getParentAll(nodeId) {

        var parentsWithChildrenHasPvList = [];
        var allParents = NodesProperties[nodeId].parents;

        return allParents;



    }
	
	//get parents shown
    function getParent(nodeId) {

        var parentsWithChildrenHasPvList = [];
        var allParents = NodesProperties[nodeId].parents;
        for(let cnode of allParents) {

            if (NodesProperties[cnode].hasChildrenWithPvalue == true)
                parentsWithChildrenHasPvList.push(cnode);
        }

        return parentsWithChildrenHasPvList;



    }

    function getParentsWithIsARelationship(nodeId) {

        var parentsWithChildrenHasPvList = [];
        var allParents = NodesProperties[nodeId].parents;
        for(let cnode of allParents) {

            if (NodesProperties[cnode].hasChildrenWithPvalue == false)
                continue;

            let eid = nodeId + "x" + cnode;
            let etype = EdgesProperties[eid].type;

            if (etype != 'is_a')
                continue;

            parentsWithChildrenHasPvList.push(cnode);
        }

        return parentsWithChildrenHasPvList;
    }

    function getParentOneUpperLevel(nodeId) {

        var parentsWithChildrenHasPvList = [];
        var allParents = NodesProperties[nodeId].parents;
        let vlevel = getVLevel(nodeID);
        let upperLevelParentsCount = 0;

        for(let cnode of allParents) {

            if (NodesProperties[cnode].hasChildrenWithPvalue != true)
                continue;

            if (getVLevel(cnode) != vlevel - 1)
                continue;

            lowerLevelChildrenCount++;
            parentsWithChildrenHasPvList.push(cnode);
        }

        return parentsWithChildrenHasPvList;
    }

    function setChildrenVLevel(nodeId) {
        let level = getVLevel(nodeId);

        if (level == -1) {
            console.warn("the node " + nodeId.toString() + " doesn't has vlevel");
            return;
        }

        for(c of getChildren(nodeId)) {

            let eid = c + "x" + nodeId;
            let etype = EdgesProperties[eid].type;

            if (etype != 'is_a')
                continue;

            setVLevel(c, level + 1);
            setChildrenVLevel(c)
        }
    }



    function setHLevelBasedonParents(nodeId) {

        //let parents = getParent(nodeId);
        let parents = getParentsWithIsARelationship(nodeId);
        let parentsCount = parents.length;

        if (parentsCount == 0) {
            console.warn("the node " + nodeId.toString() + " doesn't has any parents");
            return;
        }

        let totalParentHlevel = 0;
        let n_vl = getVLevel(nodeId);

        let oneUpperParentCount = 0;
        for(p of parents) {

            let hl = getHLevel(p);
            let vl = getVLevel(p);

        //only consider the parents in one upper level
            if (vl != n_vl - 1)
                continue;

            oneUpperParentCount++;

            if (hl == undefined) {
                console.warn("the node " + p.toString() + " doesn't has horizontal level");
                return;
            }

        //totalParentHlevel += hl*(vl+1)/n_vl;
            totalParentHlevel += hl;
        }
        //console.log(oneUpperParentCount);
        //let level = totalParentHlevel / parentsCount;
        let level = totalParentHlevel / oneUpperParentCount
        //level = level.toFixed(1);
        //level = level.valueOf();
        setHLevel(nodeId, level);
    }


    //calc the vertical level of each node
    var toppestNodesList = [];
    for (i in NodesProperties) {

        //setVLevel(i, 0);
        if (!NodesProperties[i].hasChildrenWithPvalue)
            continue;
		
        if (getParent(i).length == 0) {
            toppestNodesList.push(i);
            setVLevel(i, 0);
            setChildrenVLevel(i);
        }
    }

    if (toppestNodesList.length == 0)
        console.warn("there is no nodes without parents");



    //set the y positions
    for (i in NodesProperties) {

        if (!NodesProperties[i].hasChildrenWithPvalue)
            continue;

        NodesProperties[i].treey = getY(getVLevel(i));

        //add nodeID to vlevel Nodes List to adjust x in the future
        let level = getVLevel(i);
        if (!vlevelNodesList.hasOwnProperty(level))
            vlevelNodesList[level] = [];

        vlevelNodesList[level].push(i);

    }

    let mostNodesLevelNodesCount = 0;
    let totalVerticalLevel = 0;

    for (i in vlevelNodesList) {
        let list = vlevelNodesList[i];
        let size = list.length;
        if (size > mostNodesLevelNodesCount)
            mostNodesLevelNodesCount = size;

        //sort each level list based on parents nodes number
        var sortable = [];
        for (var node of list)
			sortable.push({ node: node, parents: getParent(node).length });
        sortable.sort(
            function (a, b) {
                //return a.parents - b.parents
                return -a.parents + b.parents
            });

        list = [];
        for(j of sortable)
			list.push(j.node);

        //create hlevel list
        hlevelNodesList[i] = {};
        totalVerticalLevel++;
    }


    //initialize the toppest nodes
    for (var i = 0; i < toppestNodesList.length; i++) {

        let nid = toppestNodesList[i];
        setHLevel(nid, 1.2 * i * mostNodesLevelNodesCount);

        let level = getHLevel(nid);

        NodesProperties[nid].treex = getX(level);
    }


    for (vl in vlevelNodesList) {
        if (vl == 0)
            continue;


        /*  		if(vl >= 3){
                    continue;
                } */


        let Nodeslist = vlevelNodesList[vl];

        for(nid of Nodeslist) {
            setHLevelBasedonParents(nid);
        }



        //save final x position 
        for(nid of Nodeslist) {
            let level = getHLevel(nid);
            NodesProperties[nid].treex = getX(level);
        }
    }

    //console.log(count);
    //console.log(vlevelNodesList);
    //console.log(hlevelNodesList);
}

function startSimulate() {
    network.setOptions({
        physics: true
    });
}

function stopSimulate() {
    network.setOptions({
        physics: false
    });
}

function startTreeSimulate() {
    networkTree.setOptions({
        physics: true
    });
}

function stopTreeSimulate() {
    networkTree.setOptions({
        physics: false
    });
}

//draw tree
function drawTree() {

    // create a network
    var container = document.getElementById('vis_graph_tree');

    var data = {
        nodes: tree_nodes,
        edges: tree_edges
    };

    var options = {
        nodes: {
            //shape: 'dot',
            shape: 'box',
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.5)',
                size: 10,
                x: 5,
                y: 5
            },
            font: {
                color: '#343434',
                size: 30,
            },
        },

        edges: {
            //smooth: {
                //type: 'continuous',
            //    type: 'diagonalCross',
                //forceDirection: 'vertical',
            //    roundness: 0.2
            //},
            arrows: { to: true },
            width: 3,
            selectionWidth: 6,
        },

        layout: {
            improvedLayout: false,
            hierarchical: {
                enabled: false,
                levelSeparation: 250,
                treeSpacing: 10,
                nodeSpacing: 150,
                direction: "DU",
                sortMethod: 'directed'
            }
        },

        interaction: { dragNodes: true },

        physics:
		{
		    enabled: false,
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
		    minVelocity: 10,
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
        ctx.fillRect(-clientWeight / scale, -clientHeight / scale, 2 * clientWeight / scale, 2 * clientHeight / scale);

    });

    networkTree.on("click", stopSimulate);

}


// create a network
function drawNetwork() {
    var container = document.getElementById('vis_graph2');

    var data = {
        nodes: vis_nodes,
        edges: vis_edges
    };

    var options = {
        nodes: {
            shape: 'dot',
            size: 20,

            color: {
                border: '#2B7CE9',
                background: '#97C2FC',
                highlight: {
                    border: '##71E618',
                },
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
            font: {
                color: '#343434',
                size: 10,
            },
        },


        edges: {
/*             smooth: {
                type: 'continuous'
            }, */

            arrows: {
                to: { enabled: true, scaleFactor: 1 }
            },

            width: 3,
            selectionWidth: 6,
        },

        layout: {
            improvedLayout: false,
        },

        physics:
		{
		    enabled: false,
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
		    minVelocity: 10,
		},

        interaction: {
            tooltipDelay: 200,
            hideEdgesOnDrag: true
        },
    };

    network = new vis.Network(container, data, options);

    allNodes = vis_nodes.get({ returnType: "Object" });
    allEdges = vis_edges.get({ returnType: "Object" });

    network.on("click", clickEvent);

    // add event listeners
    //network.on('select', clickNode);

    network.on("beforeDrawing", function creatWhieBackground(ctx) {

        var clientHeight = document.getElementById('vis_graph2').clientHeight;
        var clientWeight = document.getElementById('vis_graph2').clientWidth;

        var scale = network.getScale();
        //console.log(scale);
        //console.log(clientWeight);

        ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
        ctx.fillRect(-clientWeight / scale, -clientHeight / scale, 2 * clientWeight / scale, 2 * clientHeight / scale);

    });
}

function clickNode(params) {

    if (params.nodes.length > 0) {
        document.getElementById('selectedNode').innerHTML = 'Selection Node: ' + "<a onclick='FocusNode(\"" + params.nodes + "\")'>" + params.nodes + "</a> ";//params.nodes;
        document.getElementById('selectedNodeName').innerHTML = 'Ontology Name: ' + NodesProperties[params.nodes].name;
        document.getElementById('selectedNodepvalue').innerHTML = 'P value: ' + NodesProperties[params.nodes].pvalue.toExponential(4);
        document.getElementById('selectedNodeInputCount').innerHTML = 'Input Genes count: ' + NodesProperties[params.nodes].inputCount;

        document.getElementById('selectedNodechildren').innerHTML = 'children nodes: ';
        let clist = NodesProperties[params.nodes].children;
        for(i of clist) {
            $('#selectedNodechildren').append("<a onclick='FocusNode(\"" + i + "\")'>" + i + "</a> ");
        }

        document.getElementById('selectedNodeparents').innerHTML = 'parents nodes: ';
        let plist = NodesProperties[params.nodes].parents;
        for(i of plist) {
            $('#selectedNodeparents').append("<a onclick='FocusNode(\"" + i + "\")'>" + i + "</a> ");
        }


        /*  			var pos = networkTree.getPositions(params.nodes);
                    $('#selectedNode').append('</br>the pisition is x: ' + pos[params.nodes.toString()]["x"] + ',Y: '+ pos[params.nodes.toString()]["y"]);
                    
                    var boundingbox = networkTree.getBoundingBox(params.nodes);
                    $('#selectedNode').append('</br>the box is left: ' + boundingbox["top"] + ',right: '+ boundingbox["bottom"]); */
    }
}


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

function FocusNode(id) {

    if (id == undefined || id == null) {
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
    networkTree.focus(id, options);

    if (id != null && id != undefined) {
        network.setSelection({
            nodes: [id],
        });
    }
}

function clickEvent(params) {

    clickNode(params);

    //console.log(params);

    // if something is selected:
    if (params.nodes.length > 0) {
        flag_highlightActive = true;
        var i, j;
        var selectedNode = params.nodes[0];
        var degrees = 2;

        // mark all nodes as hard to read.
        for (var nodeId in allNodes) {
            allNodes[nodeId].color = 'rgba(200,200,200,0.3)';
            if (allNodes[nodeId].hiddenLabel === undefined) {
                allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                allNodes[nodeId].label = undefined;
            }
        }

        //mark all edges as hard to read
        for (var edgeId in allEdges) {
            allEdges[edgeId].color = 'rgba(200,200,200,0.3)';
        }

        var connectedNodes = network.getConnectedNodes(selectedNode);
        var allConnectedNodes = [];

        // get the second degree nodes
        for (i = 1; i < degrees; i++) {
            for (j = 0; j < connectedNodes.length; j++) {
                allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
            }
        }

        function getClickedNodeColor(nodeId, r, g, b, a) {
            let newc;
            if (NodesProperties[nodeId].pvalue != -1) {
                var color = NodesProperties[nodeId].color;
                newc = color;
                return newc;
            } else {
                return 'rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + a.toString() + ')'
            }

        }

        // all second degree nodes get a different color and their label back
        for (i = 0; i < allConnectedNodes.length; i++) {
            //allNodes[allConnectedNodes[i]].color = 'rgba(0,0,255,0.3)';
            allNodes[allConnectedNodes[i]].color = getClickedNodeColor(allConnectedNodes[i], 0, 0, 76, 1.0);
            if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
                allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
                allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
            }

            let edges = NodesProperties[allConnectedNodes[i]].parentsEdges;
            for(eid of edges) {
                allEdges[eid].color = EdgesProperties[eid].color;
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

            let edges = NodesProperties[connectedNodes[i]].parentsEdges;
            for(eid of edges) {
                allEdges[eid].color = EdgesProperties[eid].color;
            }
        }

        // the main node gets its own color and its label back.
        //allNodes[selectedNode].color = 'rgba(0, 0, 255, 1.0)';
        allNodes[selectedNode].color = getClickedNodeColor(selectedNode, 0, 0, 255, 1.0);
        if (allNodes[selectedNode].hiddenLabel !== undefined) {
            allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
            allNodes[selectedNode].hiddenLabel = undefined;
        }

        let edges = NodesProperties[selectedNode].parentsEdges;
        for(eid of edges) {
            allEdges[eid].color = EdgesProperties[eid].color;
        }

    }
    else if (flag_highlightActive === true) {
        // reset all nodes and edges
        let c, l;
        for (var nodeId in allNodes) {

            if (NodesProperties[nodeId].pvalue != -1) {
                c = NodesProperties[nodeId].color;
                l = NodesProperties[nodeId].name;
            }
            else {
                c = defaultColor;
                l = NodesProperties[nodeId].name;
            }

            if (!flag_showChildren && (NodesProperties[nodeId].hasChildrenWithPvalue == false)) {
                c = defaultWhiteColor;
                l = undefined;
            }

            if (getCategoriesFinished && selectedCategory != 'all' && NodesProperties[nodeId].category != selectedCategory) {
                c = defaultWhiteColor;
                l = undefined;
            }

            allNodes[nodeId].color = c;
            allNodes[nodeId].label = l;


            let edges = NodesProperties[nodeId].parentsEdges;
            if (c == defaultWhiteColor) {
                for(eid of edges) {
                    allEdges[eid].color = defaultWhiteColor;
                }
            } else {
                for(eid of edges) {
                    allEdges[eid].color = EdgesProperties[eid].color;
                }
            }
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

    EdgeUpdateArray = [];
    for (eId in allEdges) {
        if (allEdges.hasOwnProperty(eId)) {
            EdgeUpdateArray.push(allEdges[eId]);
        }
    }

    vis_nodes.update(updateArray);
    vis_edges.update(EdgeUpdateArray);

}

