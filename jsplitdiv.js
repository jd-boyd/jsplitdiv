
// toggles text selection attributes ON (true) or OFF (false)
// Alas, this causes jquery to spit out a TypeError in Chrome,
// but then works correctly anyway.
function textselect( bool )
{ 
    $( 'body' )[ bool ? "unbind" : "bind" ]("selectstart", function(){return false;} )
	.attr("unselectable", bool ? "off" : "on" )
        .css("-webkit-user-select", bool ? "" : "none" )
	.css("MozUserSelect", bool ? "" : "none" );
};

function Splitter(main_sel, left_sel, right_sel) 
{
    this.container_sel = main_sel;
    this.container_left_sel = main_sel + " " + left_sel;
    this.container_right_sel = main_sel + " " + right_sel;
    this.splitter_sel = main_sel + ' div.splitter'
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
				$(this.splitter_sel).css( {'left': (this.split_pos) + "px" });
				this.split_percent = sp / this.container_width;
    };
		
    //Preserve pointer to this object that can be used in methods attached
    //to other objects where this would refer to that other object.
    var t = this;
		
    $(this.container_sel).append("<div class='splitter s_passive'></div>");
		
    $(this.splitter_sel).css('position', 'absolute');
		
		
    $(this.container_left_sel).css("float", "left");
    $(this.container_right_sel).css("float", "right");
    
    $(this.container_sel + ' div.splitter').hover(
				function() {  //Enter
						$(this).toggleClass("s_active");
						$(this).toggleClass("s_passive");
				},
				function() {//remove
						$(this).toggleClass("s_active");
						$(this).toggleClass("s_passive");
				}); 
    
    $(this.container_sel + ' div.splitter').mousedown(function(eo) { 
				//alert('down');
				$(document).mousemove(function(e){
						//alert('drag');
						t.split_pos = e.pageX;
						//console.log("split_pos: " + split_pos);
						t.update();
				});
				
				textselect(false); //Must be last, it generates an error in chrome
    }); 
    
    $(document).mouseup(function() { 
				$(document).unbind('mousemove');
				textselect(true);   //Must be last, it generates an error in chrome
    });
    var container_height = $(this.container_sel).height();
		
    $(this.container_sel + ' div.splitter').height(container_height);
    $(this.container_left_sel).height(container_height);
    $(this.container_right_sel).height(container_height);
    
    $(window).resize(function() { t.container_resize(); t.update(); });
    
    this.container_resize();
    this.update();
    
    return true;
};

//You need an anonymous function to wrap around your function to avoid conflict
(function($){
    //Attach this new method to jQuery
    $.fn.extend({ 

	//This is where you write your plugin's name
	splitdiv: function(options) {
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
		left: '#left',
		right: '#right',
		dragging: false,
		container_width: 0,
		split_percent: 0.30,
		split_pos: 0
	    };
	    if (options) $.extend(localData, options);

	    //Iterate over the current set of matched elements
	    return this.each(function() {
		var t = $(this);
		var o = localData;
		//alert('B');
		//code to be inserted here

		var container_resize=function()
		{
		    var w = t.innerWidth();
		    $(this).data('container_width', w);
		    $(this).data('split_pos', w * this.split_percent);
		};

		var update=function()
		{
		    var sp = $(this).data('split_pos');
		    $(o['left'],t).width(sp - 5);
		    $(this.container_right_sel).width((this.container_width - sp) + 1);
		    $(this.splitter_sel).css( {'left': (this.split_pos) + "px" });
		    this.split_percent = sp / this.container_width;
		};

		$(this).append("<div class='splitter s_passive'></div>");

		$('div.splitter', t).css('position', 'absolute');
		$(o['left'], t).css("float", "left");
		$(o['right'], t).css("float", "right");

		var container_height = t.height();
		
		$('div.splitter', t).height(container_height);
  	$(o['left'], t).height(container_height);
		$(o['right'], t).height(container_height);
	    });
	}
    });
    //pass jQuery to the function, 
    //So that we will able to use any valid Javascript variable name 
    //to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);