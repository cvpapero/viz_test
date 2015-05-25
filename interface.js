var time_num = 400;

var time_buf = [];

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
 

