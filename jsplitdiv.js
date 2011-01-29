
// toggles text selection attributes ON (true) or OFF (false)
// Alas, this causes jquery to spit out a TypeError in Chrome,
// but then works correctly anyway.
function textselect( bool )
{ 
    $( document )[ bool ? "unbind" : "bind" ]("selectstart", function(){return false;} )
	.attr("unselectable", bool ? "off" : "on" )
	.css("MozUserSelect", bool ? "" : "none" );
};

var container_width;

var split_percent = 0.30;
var split_pos = 0;

function update_split()
{
  $('#left_area').width(split_pos - 5);
  $('#right_area').width((container_width - split_pos) +1 );
  $('.splitter').css( {'left': (split_pos) + "px" });
  split_percent = split_pos / container_width;
}

function calc_resize()
{
    var w = $('#main_cont').innerWidth();
    container_width = w;
    //$('#sz_info').text("Bob " + container_width);

    split_pos = container_width * split_percent;
};

$(window).resize(function() { calc_resize(); update_split(); });

var offX=0;
var dragging = false;

function setupSplitter()
{
  $('.split_container').append("<div class='splitter'></div>");

  $('.splitter').hover(
    function() {  //Enter
      $(this).toggleClass("s_active");
    },
    function() {//remove
      $(this).toggleClass("s_active");
    }); 

  $('.splitter').mousedown(function(eo) { 
      dragging=true; 
      //offX=eo.pageX-split_pos;
      offX=0;
      textselect(false);
  });

  $(document).mouseup(function() { 
      dragging=false;   
      textselect(true);   
  });

  $(document).mousemove(function(e){
      //$('#mouse_info').text(e.pageX +', '+ e.pageY);
      if (dragging)
       {
           split_pos = e.pageX + offX;
	   console.log("split_pos: " + split_pos);
           update_split();
       }
   }); 

  $('.splitter').height(Math.max($('#left_area').height(), $('#right_area').height()) +'px');

  calc_resize();
  update_split();
}

$(window).load(function(event)
{
 setupSplitter();
}

);

(function( $ ){
  $.fn.myPlugin = function() {
  
    // Do your awesome plugin stuff here

  };
})( jQuery );