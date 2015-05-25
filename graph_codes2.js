

var elesJson = { 
    nodes:[
	{ data: { id: '', name: '' } }
    ],
    edges:[
	{ data: { id: '', source: '', target: '' } }
    ]
};

var jsonBuf = [];

//ここでは、全てのメッセージをjson形式で保存しておく
//別の関数によってcytoscapeで読み込める形式にする
function msgBuffer( selectJson ){
    jsonBuf = selectJson;
    time_num = selectJson.length;
    for(var i = 0; i < time_num; ++i){
	time_buf[i] = jsonBuf[i].time_stamp;
    }
}

//ここではjsonBufに代入されているjson形式データを選択する
function selectFromBuf(start, end){

    console.log('s:' + start.toString() + ', e:' + end.toString());
    nowJson = {};
    selectJson = []
    for(var i = start; i < end; ++i){
	nowJson[jsonBuf[i].okao_id] = jsonBuf[i];
    }
    for(var i in nowJson){
	selectJson.push(nowJson[i]);
    }
    jsonToPeopleElems(selectJson);
}

//ここでは、選択されたjson形式の個人データをcytoscapeが読み込める形にする
function jsonToPeopleElems( selectJson ){
    var elem_nodes = [];
    var elem_edges = [];

    for(var i = 0; i < selectJson.length; ++i){
	var okao_id = selectJson[i].okao_id.toString();
	var target_id = selectJson[i].okao_id.toString();
	var source_id = $("#id_visual").val().toString();
	var name = selectJson[i].name.toString();

	var elem_node = '{"data":{ "id": "' + okao_id +'", "name" : "'+name+'" }}';
	elem_nodes.push(elem_node);
	if (target_id != source_id){
	    var name = selectJson[i].name.toString();
	    var elem_edge = '{"data":{ "id": "e' + target_id 
		+'", "source" : "'+source_id+'" ,"target" : "'+ target_id+ '" }}';
	    elem_edges.push(elem_edge);	
	}
	
    }

    var elemsArray = '{ "nodes": ['+ elem_nodes.toString() + '] ,"edges": ['+ elem_edges.toString()+'] }';

    var elesJson = JSON.parse(elemsArray);

    cytoGraphOutput(elesJson);
}

function cytoGraphOutput(elesJson){

    $('#cy').cytoscape({
	style: cytoscape.stylesheet()
	    .selector('node')
	    .css({
		'content': 'data(name)',
		'height': 100,
		'width': 100,//'mapData(weight, 1, 200, 1, 200)',
		'text-valign': 'center',
		'color': 'white',
		'text-outline-width': 2,
		'text-outline-color': '#888'
	    })
	    .selector('edge')
	    .css({
		'target-arrow-shape': 'triangle',
		'line-color': '#F2B1BA',
		'target-arrow-color': '#F2B1BA',
		'width': 2,
	    })
	    .selector(':selected')
	    .css({
		'background-color': 'black',
		'line-color': 'black',
		'target-arrow-color': 'black',
		'source-arrow-color': 'black',
		'text-outline-color': 'black'
	    })
	    .selector('#1')
	    .css({
		'background-image': 'images/okao/okao1.jpg'
	    })
	    .selector('#2')
	    .css({
		'background-image': 'images/okao/okao2.jpg'
	    })
	    .selector('#3')
	    .css({
		'background-image': 'images/okao/okao3.jpg'
	    })
	    .selector('#4')
	    .css({
		'background-image': 'images/okao/okao4.jpg'
	    })
	    .selector('#5')
	    .css({
		'background-image': 'images/okao/okao5.jpg'
	    })
	    .selector('#6')
	    .css({
		'background-image': 'images/okao/okao6.jpg'
	    })
	    .selector('#7')
	    .css({
		'background-image': 'images/okao/okao7.jpg'
	    })
	    .selector('#8')
	    .css({
		'background-image': 'images/okao/okao8.jpg'
	    })
	    .selector('#9')
	    .css({
		'background-image': 'images/okao/okao9.jpg'
	    })
	    .selector('#10')
	    .css({
		'background-image': 'images/okao/okao10.jpg'
	    })
	    .selector('#11')
	    .css({
		'background-image': 'images/okao/okao11.jpg'
	    })
	    .selector('#12')
	    .css({
		'background-image': 'images/okao/okao12.jpg'
	    })
	    .selector('#13')
	    .css({
		'background-image': 'images/okao/okao13.jpg'
	    })
	    .selector('#14')
	    .css({
		'background-image': 'images/okao/okao14.jpg'
	    }),

	elements: elesJson,


	layout: {
	    name: 'breadthfirst',
	    padding: 10
	},



	ready: function(){
	    // ready 1
	}

    });  

}
