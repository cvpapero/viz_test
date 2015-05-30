var ros = new ROSLIB.Ros({
    url : 'ws://133.19.23.172:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var time_num = 10;
var time_buf = [];
var elesJson = { 
    nodes:[
	{ data: { id: '', name: '' } }
    ],
    edges:[
	{ data: { id: '', source: '', target: '' } }
    ]
};
var jsonBuf = [];
var pos_ok = false;

function load(){
    var mapViewer = new ROS2D.Viewer({
	divID : 'map',
	width : 700,
	height : 700
    });

    var zoomMapView = new ROS2D.ZoomView({
	rootObject : mapViewer.scene	
    });
    var panMapView = new ROS2D.PanView({
	rootObject : mapViewer.scene
    });
    var rotMapView = new ROS2D.RotView({
	rootObject : mapViewer.scene
    });
    

    var gridClient = new ROS2D.OccupancyGridClient({
	ros : ros,
	topic : 'map',
	rootObject : mapViewer.scene
    });
    
    gridClient.on('change', function(){
	mapViewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
	mapViewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
	
	registerMouseHandlers();
    });

    var clickedImage = false;
    var selectedImageIndex = null;
    var clickedPolygon = false;
    var selectedPointIndex = null;

    var pointCallBack = function(type, event, index) {
	if (type === 'mousedown') {
	    if (event.nativeEvent.shiftKey === true) {
		polygon.remPoint(index);
	    }
	    else {
		selectedPointIndex = index;
	    }
	}
	clickedPolygon = true;
    };
    
    var lineCallBack = function(type, event, index) {
	if (type === 'mousedown') {
	    if (event.nativeEvent.ctrlKey === true) {
		polygon.splitLine(index);
	    }
	}
	clickedPolygon = true;
    };

    var imageCallBack = function(type, event, index) {
	if (type === 'mousedown') {
	    if (event.nativeEvent.shiftKey === true) {
		console.log('index:'+index);
		image.remImage(index);
	    }
	    else {
		selectedImageIndex = index;
	    }
	}
	clickedImage = true;
    };

 
    // Create the polygon
    var polygon = new ROS2D.PolygonMarker({
	pointSize : 0.3,
	lineSize : 0.3,
	lineColor : createjs.Graphics.getRGB(100, 100, 255, 1),
	pointCallBack : pointCallBack,
	lineCallBack : lineCallBack
    });

    // Create the polygon
    var image = new ROS2D.ImageMarker({
	imageSize : 0.01,
	imageCallBack : imageCallBack
    });

    // Add the polygon to the viewer
    mapViewer.scene.addChild(polygon);  
    // Add the polygon to the viewer
    mapViewer.scene.addChild(image);  
    // Event listeners for mouse interaction with the stage
    mapViewer.scene.mouseMoveOutside = false; // doesn't seem to work  


    mapViewer.scene.addEventListener('stagemousemove', function(event) {
	var pos = mapViewer.scene.globalToRos(event.stageX, event.stageY);
	jQuery( "#pos_x" ).text(pos.x);
	jQuery( "#pos_y" ).text(pos.y);    
	//jQuery( "#rotation" ).text();

	if (selectedPointIndex != null && pos_ok == true){
	    var pos = mapViewer.scene.globalToRos(event.stageX, event.stageY);
	    polygon.movePoint(selectedPointIndex, pos);
	}


    });

    mapViewer.scene.addEventListener('stagemouseup', function(event) {	
	// Add point when not clicked on the polygon
	if (selectedPointIndex !== null) {
	    selectedPointIndex = null;
	}
	else if (mapViewer.scene.mouseInBounds === true && clickedPolygon === false && pos_ok == true) {
	    var pos = mapViewer.scene.globalToRos(event.stageX, event.stageY);
	    //var name = 'images/okao/okao1.jpg'
	    polygon.addPoint(pos);			
	}
	clickedPolygon = false;	
    });


    function registerMouseHandlers(){
	var mouseDown = false;
	var zoomKey = false;
	var panKey = false;
	var rotKey = false;
	var startPos = new ROSLIB.Vector3();
	//var startRotation = new ROSLIB.Vector3();
	mapViewer.scene.addEventListener('stagemousedown', function(event) {
	    if (event.nativeEvent.shiftKey === true && event.nativeEvent.ctrlKey === true) {
		panKey = true;
		panMapView.startPan(event.stageX, event.stageY);
	    }
	    else if (event.nativeEvent.ctrlKey === true) {
		zoomKey = true;
		zoomMapView.startZoom(event.stageX, event.stageY);
	    }
	    else if (event.nativeEvent.shiftKey === true) {
		rotKey = true;
		rotMapView.startRot(event.stageX, event.stageY);
	    }

	    startPos.x = event.stageX;
	    startPos.y = event.stageY;
	    //startRot.z = event.stageR;
	    mouseDown = true;
	});

	mapViewer.scene.addEventListener('stagemousemove', function(event) {
	    if (mouseDown === true) {
		if (zoomKey === true) {
		    var dy = event.stageY - startPos.y;
		    var zoom = 1 + 
			10*Math.abs(dy) / mapViewer.scene.canvas.clientHeight;
		    if (dy < 0)
			zoom = 1 / zoom;
		    zoomMapView.zoom(zoom);
		}					
		else if (panKey === true) {
		    panMapView.pan(event.stageX, event.stageY);
		}
		else if (rotKey === true) {
		    var rd = Math.atan2(event.stageY - startPos.y, 
					event.stageX - startPos.x);
		    var dg = rd * 180 / Math.PI;
		    console.log('deg'+dg);
		    rotMapView.rot(dg);
		}
	    }
	});

	mapViewer.scene.addEventListener('stagemouseup', function(event) {
	    if (mouseDown === true) {
		if (zoomKey === true) {
		}
		else if (panKey === true) {
		}
		else if (rotKey === true) {
		}
		zoomKey = false;
		panKey = false;
		rotKey = false;
		mouseDown = false;
	    }
	});
    }

    
    // Subscribing to a Topic
    // ----------------------
    
    var select_listener = new ROSLIB.Topic({
	ros : ros,
	name : '/select_elem',
	messageType : 'std_msgs/String'
    });
    
    select_listener.subscribe(function(msg) {
	console.log('Received message on ' + select_listener.name + ': ' + msg.data);
	var selectJson = JSON.parse(msg.data);
	msgBuffer( selectJson );
    });
    
    
    var jsonListener = new ROSLIB.Topic({
	ros : ros,
	name : '/select_time',
	messageType : 'std_msgs/String'
    });
    
    jsonListener.subscribe(function(msg){
	console.log('Received msg on '+ jsonListener.name + ': ' + msg.data);
	var time_elems = JSON.parse( msg.data );
	//console.log('json '+ elesJson ); 
	jsonToPeopleElems( time_elems );
	drawPeople( time_elems );
    }); 
    
    function selectTimeZone(start_str, end_str){
	console.log('time_zone '+start_str+', '+end_str);
	var okao_id = $("#id_visual").val();
	var req_num = parseInt(okao_id);
	var visualGraphClient = new ROSLIB.Service({
	    ros : ros,
	    name : '/time_relation',
	    serviceType : 'humans_msgs/TimeZoneSrv'
	});
	var vizRequest = new ROSLIB.ServiceRequest({
	    n : req_num,
	    start : start_str,
	    end : end_str
	});
	visualGraphClient.callService(vizRequest, function(vizResult){
	    console.log('Result for selectTime call on '
			+ visualGraphClient.name
			+ ': '
			+ vizResult);
	});
    }
   
    function drawPeople( selectJson ){
	image.remAllImage(); 
	for(var i = 0; i < selectJson.length; ++i){
	    //console.log('parse pre px:'+selectJson[i].px);
	    var px = parseFloat(selectJson[i].px);
	    var py = parseFloat(selectJson[i].py);
	    var okao_id = selectJson[i].okao_id.toString();
	    //console.log('px:'+px+', py:'+py);
	    //var pos =  mapViewer.scene.globalToRos(px, py);
	    var pos = new ROSLIB.Vector3();
	    pos.x = px;
	    pos.y = py;

	    var name = 'images/okao/okao'+okao_id+'.jpg'
	    image.addImage(pos, name);
	}
    }

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
	    
	    var elem_node = '{"data":{ "id": "' 
		+ okao_id +'", "name" : "'+name+'" }}';
	    elem_nodes.push(elem_node);
	    if (target_id != source_id){
		var name = selectJson[i].name.toString();
		var elem_edge = '{"data":{ "id": "e' + target_id 
		    +'", "source" : "'+source_id+'" ,"target" : "'
		    + target_id+ '" }}';
		elem_edges.push(elem_edge);	
	    }   
	}
	var elemsArray = '{ "nodes": ['+ elem_nodes.toString() 
	    + '] ,"edges": ['+ elem_edges.toString()+'] }';	
	var elesJson = JSON.parse(elemsArray);
	
	cytoGraphOutput(elesJson);
    }
   

    $(function(){
	$("#btn_analy").click(function(){
	    init_value();
	    console.log("click analysis");
	    var okao_id = $("#id_analy").val();
	    var req_num = parseInt(okao_id);
	    var selectGraphClient = new ROSLIB.Service({
		ros : ros,
		name : '/relation',
		serviceType : 'humans_msgs/Int32Srv'
	    });
	    var selectRequest = new ROSLIB.ServiceRequest({
		n : req_num,
	    });
	    selectGraphClient.callService(selectRequest, function(selectResult){
		console.log('Result for service call on '
			    + selectGraphClient.name
			    + ': '
			    + selectResult.data);
		jQuery( "#analyOutput" ).text(selectResult.data);
	    });
	});
	
	$("#btn_visual").click(function(){
	    console.log("click visualize");
	    var okao_id = $("#id_visual").val();
	    var req_num = parseInt(okao_id);
	    var visualGraphClient = new ROSLIB.Service({
		ros : ros,
		name : '/viz_relation',
		serviceType : 'humans_msgs/Int32Srv'
	    });
	    var vizRequest = new ROSLIB.ServiceRequest({
		n : req_num,
	    });
	    visualGraphClient.callService(vizRequest, function(vizResult){
		console.log('Result for service call on '
			    + visualGraphClient.name
			    + ': '
			    + vizResult);
		jQuery( "#visualOutput" ).text(vizResult.data);
	    });
	    return true;
	});
    });
    
    function init_value(){
	time_num = 0;
	time_buf = [];
	elesJson = {};
	jsonBUf = [];
    }

    $(function() { 
	$( "#slider" ).slider({
	    min:0,
	    max:time_num,
	    renge: true,
	    values:[0,0],
	    
	    slide: function( event, ui ) {
		$("#slidvalmin").val(time_buf[ui.values[0]]);
		$("#slidvalmax").val(time_buf[ui.values[1]]);
	    },
	    create: function( event, ui ) {
		var values = $(this).slider('option','values');
		$("#slidvalmin").val(values[0]);
		$("#slidvalmax").val(values[1]);
		//$("#slidval").html("slider："+$(this).slider( "value" ));
	    },
	    change: function( event, ui ) {
		var minval = ui.values[0];//$("#slider").slider("value");
		var maxval = ui.values[1];
		//selectFromBuf(minval, maxval);
		var start = time_buf[minval];
		var end = time_buf[maxval];
		selectTimeZone(start.toString(), end.toString());
	    },
	    start: function( event, ui ) {
		$(this).slider('option', 'max', time_num);
	    }
	});
	

	
    }); 
    
    $(function() {
	$("[name='q1']").click(function(){
	    var num = $("[name='q1']").index(this);
	    console.log('radio:'+num);
	    if(num == 1){
		pos_ok = true;
	    } 
	    else{
		pos_ok = false; 
	    }
	});
    });
}



