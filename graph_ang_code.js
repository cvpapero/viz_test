// a very simple example of angular/cytoscape.js integration

// context (rightclick/2finger) drag to resize in graph
// use text boxes to resize in angular


var app = angular.module('app', []);
/*
// use a factory instead of a directive, because cy.js is not just for visualisation; you need access to the graph model and events etc 
app.factory('peopleGraph', [ '$q', function( $q ){
    var cy;
    var peopleGraph = function(people){
	var deferred = $q.defer();
	
	// put people model in cy.js
	var eles = [];
	for( var i = 0; i < people.length; i++ ){
	    eles.push({
		group: 'nodes',
		data: {
		    id: people[i].id,
		    weight: people[i].weight,
		    name: people[i].name
		}
	    });
	}
	
	$(function(){ // on dom ready
	    
	    cy = cytoscape({
		container: $('#cy')[0],
		
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
			'target-arrow-shape': 'triangle'
		    })
		    .selector(':selected')
		    .css({
			'background-color': 'black',
			'line-color': 'black',
			'target-arrow-color': 'black',
			'source-arrow-color': 'black',
			'text-outline-color': 'black'
		    })
		    .selector('#2-1')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao1.jpg'
		    })
		    .selector('#2-2')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao2.jpg'
		    })
		    .selector('#2-3')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao3.jpg'
		    })
		    .selector('#2-4')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao4.jpg'
		    })
		    .selector('#2-5')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao5.jpg'
		    })
		    .selector('#2-6')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao6.jpg'
		    })
		    .selector('#2-7')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao7.jpg'
		    })
		    .selector('#2-8')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao8.jpg'
		    })
		    .selector('#2-9')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao9.jpg'
		    })
		    .selector('#2-10')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao10.jpg'
		    })
		    .selector('#2-11')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao11.jpg'
		    })
		    .selector('#2-12')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao12.jpg'
		    })
		    .selector('#2-13')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao13.jpg'
		    })
		    .selector('#2-14')
		    .css({
			'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao14.jpg'
		    }),
		
		layout: {
		    name: 'cose',
		    padding: 10
		},
		
		elements: eles,
		
		ready: function(){
		    deferred.resolve( this );
		    
		    cy.on('cxtdrag', 'node', function(e){
			var node = this;
			var dy = Math.abs( e.cyPosition.x - node.position().x );
			var weight = Math.round( dy*2 );
			
			node.data('weight', weight);
			
			fire('onWeightChange', [ node.id(), node.data('weight') ]);
		    });
		}
	    });
	    
	}); // on dom ready
	
	return deferred.promise;
    };
    
    peopleGraph.listeners = {};
    
    function fire(e, args){
	var listeners = peopleGraph.listeners[e];
	
	for( var i = 0; listeners && i < listeners.length; i++ ){
	    var fn = listeners[i];
	    
	    fn.apply( fn, args );
	}
    }
    
    function listen(e, fn){
	var listeners = peopleGraph.listeners[e] = peopleGraph.listeners[e] || [];
	
	listeners.push(fn);
    }
    
    //create interface for weight ?
    peopleGraph.setPersonWeight = function(id, weight){
	cy.$('#' + id).data('weight', weight);
    };
    
    peopleGraph.onWeightChange = function(fn){
	listen('onWeightChange', fn);
    };
    
    return peopleGraph;
    
    
} ]);
*/


var people_elems = [ {id:'', name:'', weight:''} ]
/*
var people_elems =  [
    { id: '2-5', name: 'Adachi', weight: 65 },
    { id: '2-3', name: 'Haruna', weight: 110 },
    { id: '2-1', name: 'Uema', weight: 110 },
    { id: '2-6', name: 'Hirai', weight: 110 },
    { id: '2-4', name: 'Ikegami', weight: 110 }
];
*/

//this part calls ROS service !!

var okao_elems = [
    { id: '', name: ''}
];

app.controller('OkaoCtrl', ['$scope', function( $scope ){
    $scope.okao_ids = okao_elems;
    $scope.msg1 = 'please select okao_id:';
    $scope.msg2 = 'please select okao_id:';
    $scope.onAnaClick = function(okao_id) {
	$scope.msg = 'sending';
	var req_analysis = reqAnalysis(okao_id.id);

	if (req_analysis==true){
	    $scope.msg1 = 'analysis ' + okao_id.id + ' !!';
	    //var req_visualize = reqVisualize(okao_id.id);
	}
    }

    $scope.onReqClick = function(okao_id) {
	var req_visualize = reqVisualize(okao_id.id);
	$scope.msg2 = 'get data from okao_id:' + okao_id.id + ' !!';
    }

 
    //$scope.times = time_elems;
}]);



//ここでjsonを詰め替える？あるいは?
function jsonToPeopleElems(json_str)
{
/*
    //var elem = {} 
    for(var i = 0; i < json_str.length; ++i){
	console.log('okao_id: '+ String(json_str[i].okao_id) );
	var elem = {
	    'id': json_str[i].okao_id ,
	    'name': String(json_str[i].name)
	}
	people_elems.push(elem);
    }
    console.log('Received message on '+ people_elems[0].id );
*/
    people_elems =  [
	{ id: '2-5', name: 'Adachi', weight: 65 },
	{ id: '2-3', name: 'Haruna', weight: 110 },
	{ id: '2-1', name: 'Uema', weight: 110 },
	{ id: '2-6', name: 'Hirai', weight: 110 },
	{ id: '2-4', name: 'Ikegami', weight: 110 }
    ];
    
    //angular.element(document.getElementById('people-table')).scope().peopleGraph(people_elems);

    cytoGraphOutput(people_elems);

}


function cytoGraphOutput(people_elems){    
 
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
		'target-arrow-shape': 'triangle'
	    })
	    .selector(':selected')
	    .css({
		'background-color': 'black',
		'line-color': 'black',
		'target-arrow-color': 'black',
		'source-arrow-color': 'black',
		'text-outline-color': 'black'
	    })
	    .selector('#2-1')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao1.jpg'
	    })
	    .selector('#2-2')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao2.jpg'
	    })
	    .selector('#2-3')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao3.jpg'
	    })
	    .selector('#2-4')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao4.jpg'
	    })
	    .selector('#2-5')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao5.jpg'
	    })
	    .selector('#2-6')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao6.jpg'
	    })
	    .selector('#2-7')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao7.jpg'
	    })
	    .selector('#2-8')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao8.jpg'
	    })
	    .selector('#2-9')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao9.jpg'
	    })
	    .selector('#2-10')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao10.jpg'
	    })
	    .selector('#2-11')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao11.jpg'
	    })
	    .selector('#2-12')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao12.jpg'
	    })
	    .selector('#2-13')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao13.jpg'
	    })
	    .selector('#2-14')
	    .css({
		'background-image': 'https://googledrive.com/host/0B7_4tuJusJehfjlIX2x1NXVMNE1QbE1uU0JPUzBaZmI3MXY2NWl2X2NrTmhYNG1OdFRxajA/okao14.jpg'
	    }),
	
	layout: {
	    name: 'cose',
	    padding: 10
	},
	
	elements: people_elems,
	
	ready: function(){
	    deferred.resolve( this );
	    
	    cy.on('cxtdrag', 'node', function(e){
		var node = this;
		var dy = Math.abs( e.cyPosition.x - node.position().x );
		var weight = Math.round( dy*2 );
		
		node.data('weight', weight);
		
		//fire('onWeightChange', [ node.id(), node.data('weight') ]);
	    });	  
	}
    });  
    
} // on dom ready



/*
//this part controls master's relation 
app.controller('PeopleCtrl', [ '$scope', 'peopleGraph', function( $scope, peopleGraph ){
    var cy;
 
    $scope.people = people_elems;
    
    var peopleById = {};
    for( var i = 0; i < $scope.people.length; i++ ){
	var p = $scope.people[i];
	
	peopleById[ p.id ] = p;
    }
    
    // you would probably want some ui to prevent use of PeopleCtrl until cy is loaded
    peopleGraph( $scope.people ).then(function( peopleCy ){
	cy = peopleCy;
	
	// use this variable to hide ui until cy loaded if you want
	$scope.cyLoaded = true;
    });
    
    $scope.onWeightChange = function(person){
	peopleGraph.setPersonWeight( person.id, person.weight );
    };
    
    peopleGraph.onWeightChange(function(id, weight){
	peopleById[id].weight = weight;
	
	$scope.$apply();
    });
    
} ]);
*/
