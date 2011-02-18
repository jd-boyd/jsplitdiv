
// toggles text selection attributes ON (true) or OFF (false)
// Alas, this causes jquery to spit out a TypeError in Chrome,
// but then works correctly anyway.

// You need an anonymous function to wrap around your function to
// avoid conflict
(function($){
		var methods = {
				container_resize: function(t)
				{
						var w = t.innerWidth();
						t.data('container_width', w);
						t.data('split_pos', w * t.data('split_percent'));
				},
				update: function(t)
				{
						var sp = t.data('split_pos');
						var left = t.data('left');
						var right = t.data('right');
						var cw = t.data('container_width');
						$(left,t).width(sp - 5);
						$(right, t).width((cw - sp) + 1);
						$('div.splitter', t).css( {'left': (sp) + "px" });
						t.data('split_percent', sp / cw);
				}};
		
    //Attach this new method to jQuery
    $.fn.extend({ 
				
				//This is where you write your plugin's name
				splitdiv: function(left, right, options) {
						// toggles text selection attributes ON (true) or OFF (false)
						// Alas, this causes jquery to spit out a TypeError in Chrome,
						// but then works correctly anyway.
						function textselect( bool )
						{ 
								$( 'body' )
								[ bool ? "unbind" : "bind" ]("selectstart", function(){
										return false;} )
										.attr("unselectable", bool ? "off" : "on" )
										.css("MozUserSelect", bool ? "" : "none" );
						};
						
						var localData = {
								split_percent: 0.30,
								split_pos: 0
						};
						if (options) $.extend(localData, options);
						
						//Iterate over the current set of matched elements
						return this.each(function() {
								var t = $(this);
								var o = localData;
								
								t.data('split_percent', localData['split_percent']);
								t.data('split_pos', localData['split_pos']);
								t.data('left', left);
								t.data('right', right);

								t.append("<div class='splitter s_passive'></div>");
								
								$('div.splitter', t).css('position', 'absolute');
								$(left, t).css("float", "left");
								$(right, t).css("float", "right");
								
								var container_height = t.height();
								
								$('div.splitter', t).height(container_height);
  							$(left, t).height(container_height);
								$(right, t).height(container_height);
								
								$('div.splitter',t).hover(
										function() {  //Enter
												$(this).toggleClass("s_active");
												$(this).toggleClass("s_passive");
										},
										function() {//remove
												$(this).toggleClass("s_active");
												$(this).toggleClass("s_passive");
										}); 

								$('div.splitter', t).mousedown(function(eo) {
										$(document).mousemove(function(e){
												t.data('split_pos', e.pageX);
												methods.update(t);
										});
										textselect(false);
								});


								$(document).mouseup(function() { 
										$(document).unbind('mousemove');
										textselect(true);   
								});

								$(window).resize(function() { 
										methods.container_resize(t);
										methods.update(t);
								});
								methods.container_resize(t);
								methods.update(t);
						});
				}
    });
    //pass jQuery to the function, 
    //So that we will able to use any valid Javascript variable name 
    //to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);