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

// Publishing a Topic
// ------------------

var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
    linear : {
	x : 0.1,
	y : 0.2,
	z : 0.3
    },
    angular : {
	x : -0.1,
	y : -0.2,
	z : -0.3
    }
});
cmdVel.publish(twist);

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
    jsonToPeopleElems( selectJson );



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


/*
// Calling a service
// -----------------

var addTwoIntsClient = new ROSLIB.Service({
    ros : ros,
    name : '/add_two_ints',
    serviceType : 'rospy_tutorials/AddTwoInts'
});

var request = new ROSLIB.ServiceRequest({
    a : 1,
    b : 2
});

addTwoIntsClient.callService(request, function(result) {
    console.log('Result for service call on '
		+ addTwoIntsClient.name
		+ ': '
		+ result.sum);
});

// Getting and setting a param value
// ---------------------------------

ros.getParams(function(params) {
    console.log(params);
});

var maxVelX = new ROSLIB.Param({
    ros : ros,
    name : 'max_vel_y'
});

maxVelX.set(0.8);
maxVelX.get(function(value) {
    console.log('MAX VAL: ' + value);
});
*/
