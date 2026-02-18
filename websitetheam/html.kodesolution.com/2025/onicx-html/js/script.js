var THEMEMASCOT = {};
(function($) {

	"use strict";


	/* ---------------------------------------------------------------------- */
	/* --------------------------- Start Demo Switcher  --------------------- */
	/* ---------------------------------------------------------------------- */
	var showSwitcher = true;
	var $body = $('body');
	var $style_switcher = $('#style-switcher');
	if( !$style_switcher.length && showSwitcher ) {
	      $.ajax({
	          url: "color-switcher/style-switcher.html",
	          success: function (data) { $body.append(data); },
	          dataType: 'html'
	      });
	}

	/* ---------------------------------------------------------------------- */
	/* ----------------------------- En Demo Switcher  ---------------------- */
	/* ---------------------------------------------------------------------- */


	THEMEMASCOT.isRTL = {
	    check: function() {
	      if( $( "html" ).attr("dir") === "rtl" ) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	};

	THEMEMASCOT.isLTR = {
	    check: function() {
	      if( $( "html" ).attr("dir") !== "rtl" ) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	};

    /* ---------------------------------------------------------------------- */
    /* ----------------------------- En Demo Switcher  ---------------------- */
    /* ---------------------------------------------------------------------- */

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.header-style-one');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			}else {
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
			if (windowpos > 1) {
				siteHeader.addClass("fixed-header");
			}else {
				siteHeader.removeClass("fixed-header");
			}
		}
	}
	headerStyle();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
		//Megamenu Toggle
	}

	//Hidder bar
	if ($('.hidden-bar').length){
		//Menu Toggle Btn
		$('.toggle-hidden-bar').on('click', function() {
			$('body').addClass('active-hidden-bar');
		});

		//Menu Toggle Btn
		$('.hidden-bar-back-drop, .hidden-bar .close-btn').on('click', function() {
			$('body').removeClass('active-hidden-bar');
		});
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){

		var mobileMenuContent = $('.main-header .main-menu .navigation').html();

		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
			$(this).toggleClass('active');
			$(this).prev('.mega-menu').slideToggle(500);
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});

	}

	//Header Search
	if($('.search-btn').length) {
		$('.search-btn').on('click', function() {
			$('.main-header').addClass('moblie-search-active');
		});
		$('.close-search, .search-back-drop').on('click', function() {
			$('.main-header').removeClass('moblie-search-active');
		});
	}



	// Banner Swiper
	if ($('.banner-swiper').length) {  
		var swiper = new Swiper(".banner-swiper", {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}


	// Banner Swiper Two
	if ($('.banner-swiper-two').length) {  
		var swiper = new Swiper(".banner-swiper-two", {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	// Banner Swiper Three
	if ($('.banner-swiper-three').length) {  
		var swiper = new Swiper(".banner-swiper-three", {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	// Banner Swiper four
	if ($('.banner-swiper-four').length) {  
		var swiper = new Swiper(".banner-swiper-four", {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}


	// Banner Swiper five
	if ($('.banner-swiper-five').length) {  
		var swiper = new Swiper(".banner-swiper-five", {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	// Service Swiper
	if ($('.service-swiper').length) {  
		var swiper = new Swiper(".service-swiper", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1200: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}
		// Service Swiper-two
	if ($('.service-swiper-two').length) {  
		var swiper = new Swiper(".service-swiper-two", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}


	// News Swiper
	if ($('.news-swiper').length) {  
		var swiper = new Swiper(".news-swiper", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				970: {
					slidesPerView: 3,
				},
				650: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}


	// Testi Swiper Two
	if ($('.news-swiper-two').length) {  
		var swiper = new Swiper(".news-swiper-two", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				970: {
					slidesPerView: 3,
				},
				650: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}


	// Testi Swiper Two
	if ($('.testi-swiper-two').length) {  
		var swiper = new Swiper(".testi-swiper-two", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	// Testi Swiper Three
	if ($('.testi-swiper-three').length) {  
		var swiper = new Swiper(".testi-swiper-three", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}
	// Testi Swiper Four
	if ($('.testi-swiper-four').length) {  
		var swiper = new Swiper(".testi-swiper-four", {
			slidesPerView: 2,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
	}

	
	if ($('.project-swiper').length) {  
		var swiper = new Swiper(".project-swiper", {
		grabCursor: true,
		loop: true,
		spaceBetween: 10,
		centeredSlides: true,
		effect: 'coverflow',
		coverflowEffect: {
		  rotate: 20,       // Less extreme tilt for cleaner look
		  stretch: 0,       // No stretch, consistent size
		  depth:10,       // Good depth for 3D feel
		  modifier: 1.5,    // Stronger perspective effect
		  slideShadows: true
		},

		pagination: {
		  el: ".swiper-pagination",
		  clickable: true
		},
		breakpoints: {
		1600: {
			slidesPerView: 5,
		  },
		  1200: {
			slidesPerView: 4,
		  },
		  768: {
			slidesPerView: 2,
		  },
		  580: {
			slidesPerView: 2,
		  },
		  0: {
			slidesPerView: 1,
		  },
		},
	  });
	}

	
	if ($('.project-swiper2').length) {  
		var swiper = new Swiper(".project-swiper2", {
		grabCursor: true,
		loop: true,
		spaceBetween: 10,
		centeredSlides: true,
		effect: 'coverflow',
		coverflowEffect: {
		  rotate: 20,       // Less extreme tilt for cleaner look
		  stretch: 0,       // No stretch, consistent size
		  depth:10,       // Good depth for 3D feel
		  modifier: 1.5,    // Stronger perspective effect
		  slideShadows: true
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
		1600: {
			slidesPerView: 5,
		  },
		  1200: {
			slidesPerView: 4,
		  },
		  768: {
			slidesPerView: 2,
		  },
		  580: {
			slidesPerView: 2,
		  },
		  0: {
			slidesPerView: 1,
		  },
		},
	  });
	}


	// Project Swiper Two
	if ($('.project-swiper-two').length) {  
		var swiper = new Swiper(".project-swiper-two", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
				970: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

		// Project Swiper Three
	if ($('.project-swiper-three').length) {  
		var swiper = new Swiper(".project-swiper-three", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
				970: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 1,
				},
				480: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	if ($('.testi-swiper').length) {
		const swiper = new Swiper('.testi-swiper', {
		  slidesPerView: 1,
		  spaceBetween: 30,
		  loop: true,
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		  on: {
			slideChange: function () {
			  const currentRealIndex = this.realIndex;
			  $('.author-image').removeClass('active');
			  $('.author-image[data-index="' + currentRealIndex + '"]').addClass('active');
			}
		  }
		});
	
		$('.author-image').on('click', function () {
		  const index = $(this).data('index');
		  swiper.slideToLoop(index); // jumps to correct slide even if looping
		});
	
		// Initial active state
		$('.author-image[data-index="0"]').addClass('active');
	  }



	//product bxslider
	if ($('.product-details .bxslider').length) {
		$('.product-details .bxslider').bxSlider({
        nextSelector: '.product-details #slider-next',
        prevSelector: '.product-details #slider-prev',
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        mode: 'fade',
        auto: 'true',
        speed: '700',
        pagerCustom: '.product-details .slider-pager .thumb-box'
	    });
	};

	//MixItup Gallery
	if ($('.filter-list').length) {
		$('.filter-list').mixItUp({});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($('.dial').length) {
		$('.dial').appear(function () {
			var elm = $(this);
			var color = elm.attr('data-fgColor');
			var perc = elm.attr('value');

			elm.knob({
				'value': 0,
				'min': 0,
				'max': 100,
				'skin': 'tron',
				'readOnly': true,
				'thickness': 0.15,
				'dynamicDraw': true,
				'displayInput': false
			});
			$({ value: 0 }).animate({ value: perc }, {
				duration: 2000,
				easing: 'swing',
				progress: function () {
					elm.val(Math.ceil(this.value)).trigger('change');
				}
			});
			//circular progress bar color
			$(this).append(function () {
				// elm.parent().parent().find('.circular-bar-content').css('color',color);
				//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
			});

		}, { accY: 20 });
	}


	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	//Accordion Box-two
	if ($('.accordion-box-two').length) {
		$(".accordion-box-two").on('click', '.acc-btn', function () {
			var outerBox = $(this).parents('.accordion-box-two');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	//Accordion Box-three
	if ($('.accordion-box-three').length) {
		$(".accordion-box-three").on('click', '.acc-btn', function () {
			var outerBox = $(this).parents('.accordion-box-three');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

		//Accordion Box-four
	if ($('.accordion-box-four').length) {
		$(".accordion-box-four").on('click', '.acc-btn', function () {
			var outerBox = $(this).parents('.accordion-box-four');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);

			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
		},{accY: 0});
	}

	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

	//product bxslider
	if ($('.product-details .bxslider').length) {
		$('.product-details .bxslider').bxSlider({
        nextSelector: '.product-details #slider-next',
        prevSelector: '.product-details #slider-prev',
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>',
        mode: 'fade',
        auto: 'true',
        speed: '700',
        pagerCustom: '.product-details .slider-pager .thumb-box'
	    });
	};

	//Quantity box
   $(".quantity-box .add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
   });
   $(".quantity-box .sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
   });

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 10,
			max: 99,
			values: [ 10, 60 ],
			slide: function( event, ui ) {
			$( "input.property-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});

		$( "input.property-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );
	}

    // count Bar
    if ($(".count-bar").length) {
        $(".count-bar").appear(
            function () {
                    var el = $(this);
                    var percent = el.data("percent");
                    $(el).css("width", percent).addClass("counted");
                }, {
                    accY: -50
            }
        );
    }

  // Horizontal accordion js area start here ***
    // $(".hztab__item").on("click", function () {
    //     $(this).addClass("active").siblings().removeClass("active");
    // });

	
	// Horizontal accordion js area start here ***
	// $(".hzAccordion__item").on("click", function () {
	// 	$(this).addClass("active").siblings().removeClass("active");
	// });
	// Horizontal accordion js area end here ***


	//Tabs Box
	if ($('.tabs-box').length) {
		$('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));

			if ($(target).is(':visible')) {
				return false;
			} else {
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

     
// img hide //
	$(".option").click(function(){
		$(".option").removeClass("active");
		$(this).addClass("active");
		
	 });


	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

	//Progress Bar circle
	document.querySelectorAll(".circle").forEach(circle => {
		const percent = circle.getAttribute("data-percent");
		circle.style.background = `conic-gradient(#7a3cf1 ${percent * 3.6}deg, #e0e0e0 ${percent * 3.6}deg)`;
	});



	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}


	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 0);

		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


	//Image Reveal Animation
	if($('.reveal').length){
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
				trigger: container,
				toggleActions: "play none none none"
				}
			});
			tl.set(container, { autoAlpha: 1 });
			tl.from(container, 1.5, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1.5, {
				xPercent: 100,
				scale: 1.3,
				delay: -1.5,
				ease: Power2.out
			});
		});
	}



	// Text Invert
	function initTextReveal() {
		const tagetedElementContainer =
			document.querySelectorAll(".text-reveal-anim");
		if (tagetedElementContainer?.length) {
			tagetedElementContainer.forEach(e => {
				var t = new SplitType(e, {
					types: "chars",
				});
				gsap.from(t.chars, {
					scrollTrigger: {
						trigger: e,
						start: "top 75%",
						end: "top 25%",
						scrub: !0,
						duration: 0.5
					},
					opacity: 0.1,
					stagger: 5,
					ease: "back.out",
				});
			});
		}
	}
	initTextReveal();



  /* ---------------------------------------------------------------------- */
  /* ----------- Activate Menu Item on Reaching Different Sections ---------- */
  /* ---------------------------------------------------------------------- */
  var $onepage_nav = $('.onepage-nav');
  var $sections = $('section');
  var $window = $(window);
  function TM_activateMenuItemOnReach() {
	  if( $onepage_nav.length > 0 ) {
	    var cur_pos = $window.scrollTop() + 2;
	    var nav_height = $onepage_nav.outerHeight();
	    $sections.each(function() {
	      var top = $(this).offset().top - nav_height - 80,
	        bottom = top + $(this).outerHeight();

	      if (cur_pos >= top && cur_pos <= bottom) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $sections.removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
	      }

	      if (cur_pos <= nav_height && cur_pos >= 0) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#header"]').parent().addClass('current').addClass('active');
	      }
	    });
	  }
	}

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	$(window).on('scroll', function() {
		headerStyle();
		TM_activateMenuItemOnReach();
	});


/* ==========================================================================
   When document is loading, do
   ========================================================================== */

	$(window).on('load', function() {
		handlePreloader();
	});

})(window.jQuery);


