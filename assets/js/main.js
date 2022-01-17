	// Header & ToTop Btn Handler
	jQuery(document).scroll(function() {
		var y = jQuery(this).scrollTop();
		if (y > 300) {
		  jQuery('#toTop').css('opacity', '1');	
		  jQuery('.main-header').addClass('inverted');
		} else {
		  jQuery('#toTop').css('opacity', '0');
		  jQuery('.main-header').removeClass('inverted');
		}
	});
	
	// Smooth Transition on targted sections
	jQuery('a.smooth-scroll').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		var target = this.hash;
		$target = jQuery(target);
		jQuery('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 700, 'swing');
	});



jQuery(document).ready(function() {

	// AOS Instance
	AOS.init({
		duration: 2000,
	});
	
	// Sidebar Menu Transitions
	jQuery('.menu-icon').on('click', function() {
		jQuery('body').toggleClass('js_nav');
		jQuery('#close_mobile_menu').toggleClass('open');
	})
	jQuery('#close_mobile_menu').on('click', function() {
		jQuery('body').toggleClass('js_nav');
		jQuery('#close_mobile_menu').toggleClass('open');
	});
	

	// Mobile Nav Multi Menu Animations
	jQuery('.mobile_main_nav li.has-submenu > a').on('click', function() {
		jQuery('.mobile_main_nav').removeClass('mainnav_in').addClass('mainnav_out');
		jQuery('#submenu_container').show().removeClass('subnav_out').addClass('subnav_in');
		jQuery(this).siblings('.sub-menu').clone().appendTo('#submenu_container .slide-in-menu');
		setTimeout(()=> {
			jQuery('.mobile_main_nav').hide();
		}, 400)
	})

	// Close Sidebar Second level menu
	jQuery('.close-sidebar-submenu').on('click', function(e) {
		e.pr
		jQuery('.mobile_main_nav').show().removeClass('mainnav_out').addClass('mainnav_in');
		jQuery('#submenu_container').removeClass('subnav_in').addClass('subnav_out');
		
		setTimeout(()=> {
			jQuery('#submenu_container .slide-in-menu').empty();
			jQuery('#submenu_container').hide();
		}, 400)
	})

});


// Tilter JS
// from https://tympanus.net/codrops/2016/11/23/tilt-hover-effects/

;(function(window) {

	'use strict';

	// Helper vars and functions.
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// from https://www.quirksmode.org/js/events_properties.html#position
	function getMousePos(e) {
		var posx = 0, posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy }
	}

	/**
	 * TiltFx obj.
	 */
	function TiltFx(el, options) {
		this.DOM = {};
		this.DOM.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	TiltFx.prototype.options = {
		movement: {
			imgWrapper : {
				translation : {x: 0, y: 0, z: 0},
				rotation : {x: -5, y: 5, z: 0},
				reverseAnimation : {
					duration : 1200,
					easing : 'easeOutElastic',
					elasticity : 600
				}
			},
			lines : {
				translation : {x: 10, y: 10, z: [0,10]},
				reverseAnimation : {
					duration : 1000,
					easing : 'easeOutExpo',
					elasticity : 600
				}
			},
			caption : {
				translation : {x: 20, y: 20, z: 0},
				rotation : {x: 0, y: 0, z: 0},
				reverseAnimation : {
					duration : 1500,
					easing : 'easeOutElastic',
					elasticity : 600
				}
			},
			/*
			overlay : {
				translation : {x: 10, y: 10, z: [0,50]},
				reverseAnimation : {
					duration : 500,
					easing : 'easeOutExpo'
				}
			},
			*/
			shine : {
				translation : {x: 50, y: 50, z: 0},
				reverseAnimation : {
					duration : 1200,
					easing : 'easeOutElastic',
					elasticity: 600
				}
			}
		}
	};

	/**
	 * Init.
	 */
	TiltFx.prototype._init = function() {
		this.DOM.animatable = {};
		this.DOM.animatable.imgWrapper = this.DOM.el.querySelector('.tilter__figure');
		this.DOM.animatable.lines = this.DOM.el.querySelector('.tilter__deco--lines');
		this.DOM.animatable.caption = this.DOM.el.querySelector('.tilter__caption');
		this.DOM.animatable.overlay = this.DOM.el.querySelector('.tilter__deco--overlay');
		this.DOM.animatable.shine = this.DOM.el.querySelector('.tilter__deco--shine > div');
		this._initEvents();
	};

	/**
	 * Init/Bind events.
	 */
	TiltFx.prototype._initEvents = function() {
		var self = this;
		
		this.mouseenterFn = function() {
			for(var key in self.DOM.animatable) {
				anime.remove(self.DOM.animatable[key]);
			}
		};
		
		this.mousemoveFn = function(ev) {
			requestAnimationFrame(function() { self._layout(ev); });
		};
		
		this.mouseleaveFn = function(ev) {
			requestAnimationFrame(function() {
				for(var key in self.DOM.animatable) {
					if( self.options.movement[key] == undefined ) {continue;}
					anime({
						targets: self.DOM.animatable[key],
						duration: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.duration || 0 : 1,
						easing: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.easing || 'linear' : 'linear',
						elasticity: self.options.movement[key].reverseAnimation != undefined ? self.options.movement[key].reverseAnimation.elasticity || null : null,
						scaleX: 1,
						scaleY: 1,
						scaleZ: 1,
						translateX: 0,
						translateY: 0,
						translateZ: 0,
						rotateX: 0,
						rotateY: 0,
						rotateZ: 0
					});
				}
			});
		};

		this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
		this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
		this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
	};

	TiltFx.prototype._layout = function(ev) {
		// Mouse position relative to the document.
		var mousepos = getMousePos(ev),
			// Document scrolls.
			docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop},
			bounds = this.DOM.el.getBoundingClientRect(),
			// Mouse position relative to the main element (this.DOM.el).
			relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

		// Movement settings for the animatable elements.
		for(var key in this.DOM.animatable) {
			if( this.DOM.animatable[key] == undefined || this.options.movement[key] == undefined ) {
				continue;
			}
			var t = this.options.movement[key] != undefined ? this.options.movement[key].translation || {x:0,y:0,z:0} : {x:0,y:0,z:0},
				r = this.options.movement[key] != undefined ? this.options.movement[key].rotation || {x:0,y:0,z:0} : {x:0,y:0,z:0},
				setRange = function (obj) {
					for(var k in obj) {
						if( obj[k] == undefined ) {
							obj[k] = [0,0];
						}
						else if( typeof obj[k] === 'number' ) {
							obj[k] = [-1*obj[k],obj[k]];
						}
					}
				};

			setRange(t);
			setRange(r);
			
			var transforms = {
				translation : {
					x: (t.x[1]-t.x[0])/bounds.width*relmousepos.x + t.x[0],
					y: (t.y[1]-t.y[0])/bounds.height*relmousepos.y + t.y[0],
					z: (t.z[1]-t.z[0])/bounds.height*relmousepos.y + t.z[0],
				},
				rotation : {
					x: (r.x[1]-r.x[0])/bounds.height*relmousepos.y + r.x[0],
					y: (r.y[1]-r.y[0])/bounds.width*relmousepos.x + r.y[0],
					z: (r.z[1]-r.z[0])/bounds.width*relmousepos.x + r.z[0]
				}
			};

			this.DOM.animatable[key].style.WebkitTransform = this.DOM.animatable[key].style.transform = 'translateX(' + transforms.translation.x + 'px) translateY(' + transforms.translation.y + 'px) translateZ(' + transforms.translation.z + 'px) rotateX(' + transforms.rotation.x + 'deg) rotateY(' + transforms.rotation.y + 'deg) rotateZ(' + transforms.rotation.z + 'deg)';
		}
	};

	window.TiltFx = TiltFx;

})(window);



;(function(){
  var options = [
    {},
    {
      movement: {
		// The main wrapper.
		imgWrapper : {
			translation : {x: 10, y: 10, z: 30},
			rotation : {x: 0, y: -10, z: 0},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		},
		// The SVG lines element.
		lines : {
			translation : {x: 10, y: 10, z: [0,70]},
			rotation : {x: 0, y: 0, z: -2},
			reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
		},
		// The caption/text element.
		caption : {
			rotation : {x: 0, y: 0, z: 2},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		},
		// The overlay element.
		overlay : {
			translation : {x: 10, y: -10, z: 0},
			rotation : {x: 0, y: 0, z: 2},
			reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
		},
		// The shine element.
		shine : {
			translation : {x: 100, y: 100, z: 0},
			reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
		}
	}
    }
  ]
  
  function init() {
	var idx = 0;
		[].slice.call(document.querySelectorAll('a.tilter')).forEach(function(el, pos) { 
			idx = pos%2 === 0 ? idx+1 : idx;
			new TiltFx(el, options[idx-1]);
		});
  }
  
  init();
  
})();


// Tilt Hover Effect

// $('.js-tilt').tilt({
//     scale: 1
// })

( function( $ ) {

	"use strict";

  $(".js-tilt").tilt({
    // maxTilt: 15,
    perspective: 1400,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    // speed: 1500,
    maxGlare: 0.2,
    scale: 1.08
  });
  
}( jQuery ) );


/*!
 jQuery sticky sidebar scroll plugin
*/
(function(a,b){a.extend({stickysidebarscroll:function(c,e){if(e&&e.offset){e.offset.bottom=parseInt(e.offset.bottom,10);e.offset.top=parseInt(e.offset.top,10)}else{e.offset={bottom:100,top:0}}var c=a(c);if(c&&c.offset()){var j=c.offset().top,q=c.offset().left,o=c.outerHeight(true),k=c.outerWidth(),h=c.css("position"),g=c.css("top"),f=parseInt(c.css("marginTop"),10),n=a(document).height(),l=a(document).height()-e.offset.bottom,m=0,d=false,i=false,p=false;if(e.forcemargin===true||navigator.userAgent.match(/\bMSIE (4|5|6)\./)||navigator.userAgent.match(/\bOS (3|4|5|6)_/)||navigator.userAgent.match(/\bAndroid (1|2|3|4)\./i)){p=true}a(window).bind("scroll resize orientationchange load",c,function(t){if(n!==a(document).height()){l=a(document).height()-e.offset.bottom;n=a(document).height()}if(i==false){j=c.offset().top}var s=c.outerHeight(),r=a(window).scrollTop();if(p&&document.activeElement&&document.activeElement.nodeName==="INPUT"){return}i=true;if(r>=(j-(f?f:0)-e.offset.top)){if(l<(r+s+f+e.offset.top)){m=(r+s+f+e.offset.top)-l}else{m=0}if(p){c.css({marginTop:parseInt(((f?f:0)+(r-j-m)+2*e.offset.top),10)+"px"})}else{c.css({position:"fixed",top:(e.offset.top-m)+"px",width:k+"px"})}}else{i=false;q=c.offset().left;c.css({position:h,top:g,left:q,width:k+"px",marginTop:(f?f:0)+"px"})}})}}})})(jQuery);

// Initialize Sidebar Sticky
$(document).ready(function() {
    $(window).on('resize', function(){
        var win = $(this); //this = window
        var width = win.width()
        stickyFn(width);
    });
    function stickyFn(width) {
        if ($(window).width() >= 991) { 
            var footerHeight = $('footer').innerHeight();
            $.stickysidebarscroll(".news-side-right",{offset: {top: 100, bottom: (footerHeight - -50)}});
        }
    }
    stickyFn();
});

