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


// Subscribing to a Topic
// ----------------------

var select_listener = new ROSLIB.Topic({
    ros : ros,
    name : '/select_time',
    messageType : 'std_msgs/String'
});

time_listener.subscribe(function(msg) {
    console.log('Received message on ' + time_listener.name + ': ' + msg.data);
    var timeJson = JSON.parse(msg.data);
});


var jsonListener = new ROSLIB.Topic({
    ros : ros,
    name : '/json_listener',
    messageType : 'std_msgs/String'
});

jsonListener.subscribe(function(msg){
    console.log('Received msg on '+ jsonListener.name + ': ' + msg.data);

    time_elems = JSON.parse(msg.data);

    console.log('json '+ elesJson ); 
    cytoGraphOutput(elesJson);

});

function reqAnalysis(okao_id){
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
		    + selectResult);
    });
    return true;
}

function reqVisualize(okao_id){
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
    });
    return true;
}


