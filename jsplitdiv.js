
// toggles text selection attributes ON (true) or OFF (false)
// Alas, this causes jquery to spit out a TypeError in Chrome,
// but then works correctly anyway.
function textselect( bool )
{ 
    $( document )[ bool ? "unbind" : "bind" ]("selectstart", function(){return false;} )
	.attr("unselectable", bool ? "off" : "on" )
	.css("MozUserSelect", bool ? "" : "none" );
};

function Splitter(main_sel, left_sel, right_sel) {
    this.dragging=false;
    this.container_sel=null;
    this.container_left_sel=null;
    this.container_right_sel=null;
    this.container_width=0;
    this.split_percent=0.30;
    this.split_pos=0;

    this.container_resize=function()
    {
	var w = $(this.container_sel).innerWidth();
	this.container_width = w;
	this.split_pos = w * this.split_percent;
    };
    this.update=function()
    {
	var sp = this.split_pos;
	$(this.container_left_sel).width(sp - 5);
	$(this.container_right_sel).width((this.container_width - sp) +1 );
	$('.splitter').css( {'left': (this.split_pos) + "px" });
	this.split_percent = sp / this.container_width;
    };

    this.container_sel = main_sel;
    this.container_left_sel = main_sel + " " + left_sel;
    this.container_right_sel = main_sel + " " + right_sel;
    
    //Preserve pointer to this object that can be used in methods attached
    //to other objects where this would refer to that other object.
    var t = this;

    $(this.container_sel).append("<div class='splitter'></div>");
    
    $(this.container_sel + ' div.splitter').hover(
	function() {  //Enter
	    $(this).toggleClass("s_active");
	},
	function() {//remove
	    $(this).toggleClass("s_active");
	}); 
    
    $(this.container_sel + ' div.splitter').mousedown(function(eo) { 
	t.dragging=true; 
	textselect(false);
    }); 
    
    $(document).mouseup(function() { 
	t.dragging=false;   
	//alert('up');
	textselect(true);   
    });
    
    $(document).mousemove(function(e){
	if (t.dragging)
	{
	    //alert('drag');
	    t.split_pos = e.pageX;
	    //console.log("split_pos: " + split_pos);
	    t.update();
	}
    }); 
    
    $(this.container_sel + ' div.splitter').height(Math.max($('#left_area').height(), $('#right_area').height()) +'px');
    
    $(window).resize(function() { this.container_resize(); this.update(); });
    
    this.container_resize();
    this.update();
    
    return true;
};

//You need an anonymous function to wrap around your function to avoid conflict
(function($){
    //Attach this new method to jQuery
    $.fn.extend({ 

	//This is where you write your plugin's name
	pluginname: function(options) {

	    // toggles text selection attributes ON (true) or OFF (false)
	    // Alas, this causes jquery to spit out a TypeError in Chrome,
	    // but then works correctly anyway.
	    function textselect( bool )
	    { 
		$( document )[ bool ? "unbind" : "bind" ]("selectstart", function(){return false;} )
		    .attr("unselectable", bool ? "off" : "on" )
		    .css("MozUserSelect", bool ? "" : "none" );
	    };
	    

	    var localData = {
		dragging: false,
		container_width: 0,
		split_percent: 0.30,
		split_pos: 0
	    };

	    //Iterate over the current set of matched elements
	    return this.each(function() {

		//code to be inserted here

	    });
	}
    });
    //pass jQuery to the function, 
    //So that we will able to use any valid Javascript variable name 
    //to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);