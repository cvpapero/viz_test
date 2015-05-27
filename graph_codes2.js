
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
