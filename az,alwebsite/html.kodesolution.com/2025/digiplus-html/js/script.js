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

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	$(document).ready(function () {
    $(".preloader-loaded").addClass("loaded");
    if ($(".preloader-loaded").hasClass("loaded")) {
      $("#preloader").delay(750).queue(function () {
        $(this).remove();
      });
    }
  });

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

	// Backtotop Js
	function back_to_top() {
	var btn = $('#back_to_top');
	var btn_wrapper = $('.back-to-top-wrapper');
	var windowOn = $(window); // Define windowOn properly

	windowOn.on('scroll', function () {
		if (windowOn.scrollTop() > 300) {
			btn_wrapper.addClass('back-to-top-btn-show');
		} else {
			btn_wrapper.removeClass('back-to-top-btn-show');
		}
	});

	btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 300); // Removed quotes from 300, since it's a number
	});
	}

	back_to_top();

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
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

	//service-carousel One
	if ($('.banner-slider-one').length) {
		var swiper = new Swiper(".banner-slider-one", {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	//service-carousel One
	if ($('.work-carousel').length) {
		var swiper = new Swiper(".work-carousel", {
			slidesPerView: 6,
			spaceBetween: 0,
			speed: 500,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					spaceBetween: 30,
					slidesPerView: 1,
				},
				476: {
					spaceBetween: 30,
					slidesPerView: 2,
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 3,
				},
				991: {
					spaceBetween: 30,
					slidesPerView: 4,
				},
				1200: {
					spaceBetween: 30,
					slidesPerView: 5,
				},
				1500: {
					spaceBetween: 50,
					slidesPerView: 6,
				},
			},
		});
	}



	// Four Item Swiper
	if ($('.team-item-h1_swiper').length) {  
		var swiper = new Swiper(".team-item-h1_swiper", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			//centeredSlides: true,
			navigation: {
				nextEl: ".team-h1-item_button-next",
				prevEl: ".team-h1-item_button-prev",
			},
			breakpoints: {
				1500: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1000: {
					slidesPerView: 2,
				},
				970: {
					slidesPerView: 2,
				},
				770: {
					slidesPerView: 2,
				},
				650: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	if ($('.claint-swiper').length) {
		var swiper = new Swiper(".claint-swiper", {
			speed:1500,
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,
			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1023: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 5,
				},
			},
		});
	}

	if ($('.claint-swiper-h2').length) {
		var swiper = new Swiper(".claint-swiper-h2", {
			speed:1500,
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1023: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 5,
				},
			},
		});
	}
	
	
	// Section Title Animation
    if ($('.char-animation').length > 0) {
      let char_come = gsap.utils.toArray(".char-animation");
      char_come.forEach(splitTextLine => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: false,
            markers: false,
            toggleActions: 'play none none none'

          }
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
        gsap.set(splitTextLine, { perspective: 300 });
        itemSplitted.split({ type: "chars, words" })
        tl.from(itemSplitted.chars,
          {
            duration: 1,
            delay: 0.5,
            x: 100,
            autoAlpha: 0,
            stagger: 0.05
          });
      });
    }

	// split text animation
	if ($('.split-text').length > 0) {
		var st = $(".split-text");
		if(st.length == 0) return;
		gsap.registerPlugin(SplitText);
		st.each(function(index, el) {
			el.split = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			gsap.set(el, { perspective: 400 });

			if( $(el).hasClass('split-in-right') ){
				gsap.set(el.split.chars, {
					opacity: 0,
					x: "50",
					ease: "Back.easeOut",
				});
			}
			if( $(el).hasClass('split-in-left') ){
				gsap.set(el.split.chars, {
					opacity: 0,
					x: "-50",
					ease: "circ.out",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
				},
				x: "0",
				y: "0",
				rotateX: "0",
				scale: 1,
				opacity: 1,
				duration: 1.0,
				stagger: 0.02,
			});
		});	
	}


    

	if ($('.testi-swiper-h1').length) {
		const swiper = new Swiper('.testi-swiper-h1', {
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

	//service-carousel One
	if ($('.clients-swiper').length) {
		var swiper = new Swiper(".clients-swiper", {
			slidesPerView: 5,
			spaceBetween: 0,
			speed: 500,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				476: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 5,
				}
			},
		});
	}

	//testimonial-carousel One
	if ($('.testimonial-swiper-one').length) {
		var swiper = new Swiper(".testimonial-swiper-one", {
			slidesPerView: 1,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: ".testimonial-arry-next",
				prevEl: ".testimonial-arry-prev",
			},
		});
	}

	//testimonial-carousel Two
	if ($('.testimonial-swiper-two').length) {
		var swiper = new Swiper(".testimonial-swiper-two", {
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: ".testimonial-arry-next",
				prevEl: ".testimonial-arry-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	}


	/* ==================================================
		Overlay Animation
	================================================== */

	gsap.registerPlugin(ScrollTrigger);

	let ofsetHeight = document.querySelector(".project-h2_inner-container");
	if (ofsetHeight) {
		ScrollTrigger.matchMedia({
			"(min-width: 575px)": function () {
				let pbmitpanels = gsap.utils.toArray(".project-block-h2");
				const spacer = 0;

				let pbmitheight = pbmitpanels[0].offsetHeight + 0;
				pbmitpanels.forEach((pbmitpanel, i) => {
					TweenMax.set(pbmitpanel, {
						top: i * 0,
						marginBottom: "30px"
					});
					const tween = gsap.to(pbmitpanel, {
						scrollTrigger: {
							trigger: pbmitpanel,
							start: () => `top bottom-=100`,
							end: () => `top top+=40`,
							scrub: true,
							invalidateOnRefresh: true
						},
						ease: "none",
						scale: () => 1 - (pbmitpanels.length - i) * 0
					});
					ScrollTrigger.create({
						trigger: pbmitpanel,
						start: () => "top 40px",
						endTrigger: '.project-h2_inner-container',
						end: `bottom top+=${pbmitheight + (pbmitpanels.length * spacer)}`,
						pin: true,
						pinSpacing: false,
					});
				});
			},
			"(max-width:1025px)": function () {
				ScrollTrigger.getAll().forEach(pbmitpanels => pbmitpanels.kill(true));
			}
		});
	}

	const boxes = document.querySelectorAll('.why-choose-us-block-h2 .inner-box');

	boxes.forEach(box => {
	  box.addEventListener('mouseenter', () => {
	    boxes.forEach(item => item.classList.remove('active')); // অন্যসব থেকে active remove
	    box.classList.add('active'); // hover করা box active হবে
	  });
	});

	//Testimonial Swiper Three
	if ($('.testimonial-swiper-three').length) {
		var slider = new Swiper(".testimonial-swiper-three", {
			slidesPerView: 1,
			navigation: true,
			centeredSlides: true,
			loop: true,
			loopedSlides: 3,
			navigation: {
				nextEl: ".testimonial-arry-next",
				prevEl: ".testimonial-arry-prev",
			},
		});
		var thumbs = new Swiper ('.testimonial-thumbs', {
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			loop: true,
			slideToClickedSlide: true,
		});
		slider.controller.control = thumbs;
		thumbs.controller.control = slider;
	}

	// Testinomials Slider With Thumb
	if ($('.testimonial-content-two').length) {
		var testimonial_thumbs = new Swiper('.testimonial-thumbs-two', {
			spaceBetween: 10,
			mousewheel: true,
			loop: false,
			slidesPerView: 3,
			breakpoints: {
				320: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 3,
					direction: 'vertical',
				},
			}
		});

		var testimonial_content = new Swiper('.testimonial-content-two', {
			spaceBetween: 0,
			effect: 'fade',
			loop: true,
			thumbs: {
				swiper: testimonial_thumbs
			},
			navigation: {
				nextEl: ".testi-button-next",
				prevEl: ".testi-button-prev",
			},
			pagination: {
				el: ".testimonial-pagination-two",
				clickable: true
			},
		});
	}




	var testi_author = new Swiper(".ks-testi-author-active", {
		loop: true,
		speed: 1200,
		spaceBetween: 0,
		slidesPerView: 1,
		freeMode: true,
		watchSlidesProgress: true,
    });

    var testi_content = new Swiper(".ks-testimonial-active", {
      loop: true,
			speed: 1200,
			spaceBetween: 0,
			slidesPerView: 1,
			centeredSlides: true,
			autoplay: {
			  delay: 2000,
			  disableOnInteraction: true,
			},
			navigation: {
				prevEl: '.arrow-prev',
				nextEl: '.arrow-next',
			},
				
			thumbs: {
				swiper: testi_author,
			},
    });

	if ($('.project-tab-slider').length) {
		var swiper = new Swiper('.project-tab-slider', {
	    loop: true,
	    slidesPerView: "auto",
	    allowTouchMove: false,
	    spaceBetween: 5,
	    mousewheel: true,
	    slideToClickedSlide: true,
	    centeredSlides: false,
	    navigation: {
	      nextEl: '.slider-next',
	      prevEl: '.slider-prev',
	    }
	  });
	}

	//Projects Swiper One
	if ($('.projects-swiper-one').length) {
		var swiper = new Swiper(".projects-swiper-one", {
			slidesPerView: 3,
			spaceBetween: 40,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: ".projects-arry-next",
				prevEl: ".projects-arry-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	//Projects Swiper One
	if ($('.services-swiper-one').length) {
		var swiper = new Swiper(".services-swiper-one", {
			slidesPerView: 3,
			spaceBetween: 0,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: ".swiper-arry-next",
				prevEl: ".swiper-arry-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	

	// Home 1 blog 
	var swiper = new Swiper(".service-active-h3", {
		speed:1000,
		loop: true,
		spaceBetween: 30,
		slidesPerView: 1,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			'1399': {
				slidesPerView: 4,
			},
			'1250': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	// //Services Swiper One
	// if ($('.services-swiper-one').length) {
	// 	var swiper = new Swiper(".services-swiper-one", {
	// 		slidesPerView: 3,
	// 		spaceBetween: 30,
	// 		speed: 600,
	// 		loop: true,
	// 		pagination: {
	// 			el: ".swiper__dots",
	// 			clickable: true,
	// 		},
	// 		breakpoints: {
	// 			320: {
	// 				slidesPerView: 1,
	// 			},
	// 			576: {
	// 				slidesPerView: 1,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 			},
	// 			992: {
	// 				slidesPerView: 2,
	// 			},
	// 			1200: {
	// 				slidesPerView: 3,
	// 			},
	// 		},
	// 	});
	// }

	//Services Swiper Two
	if ($('.services-swiper-two').length) {
		var swiper = new Swiper(".services-swiper-two", {
			slidesPerView: 4,
			spaceBetween: 0,
			speed: 600,
			loop: true,
			autoplay: true,
			pagination: {
				el: ".swiper__dots",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	}

	//service-carousel One
	if ($('.services-slider-four').length) {
		var swiper = new Swiper(".services-slider-four", {
			slidesPerView: 4,
			spaceBetween: -1,
			speed: 600,
			loop: true,
			pagination: {
				el: ".swiper__dots",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1023: {
					slidesPerView: 4,
				},
			},
		});
	}

	//Service Block Four Hover
	if ($('.service-block-four').length) {
		var $service_block = $('.service-block-four .inner-box');
		$($service_block).on('mouseenter', function (e) {
			$(this).find('.content-box .content-innner').stop().slideDown(300);
			return false;
		});
		$($service_block).on('mouseleave', function (e) {
			$(this).find('.content-box .content-innner').stop().slideUp(300);
			return false;
		});
	}

	//Case Studies Section
	if ($('.casestudies-slider-four').length) {
		var swiper = new Swiper(".casestudies-slider-four", {
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: ".swiper-arry-next",
				prevEl: ".swiper-arry-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
	}

	//Case Studies Section
	if ($('.casestudies-block-one').length) {
		var $casestudies_block = $('.casestudies-block-one .inner-box');
		$($casestudies_block).on('mouseenter', function (e) {
			$(this).find('.content-inner .link-btn').stop().slideDown(300);
			return false;
		});
		$($casestudies_block).on('mouseleave', function (e) {
			$(this).find('.content-inner .link-btn').stop().slideUp(300);
			return false;
		});
	}
	
	if ($('.features-list-slider').length) {
		var swiper = new Swiper(".features-list-slider", {
			direction: "vertical",
			slidesPerView: 3,
			spaceBetween: 50,
			mousewheel: true,
			loop: false,
			speed: 600,
			freeMode: true,
			scrollbar: {
				el: ".swiper-scrollbar",
				draggable: true,
				hide: false,
			},
		});
		swiper.slideTo(0, 0);
	}
	//service-carousel Two
	if ($('.service-two-slider').length) {
		var swiper = new Swiper(".service-two-slider", {
			slidesPerView: 3,
			spaceBetween: 24,
			speed: 600,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1023: {
					slidesPerView: 3,
				},
			},
		});
	}

	//service-carousel
	if ($('.service-three-slider').length) {
		var swiper = new Swiper(".service-three-slider", {
			slidesPerView: 3,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	//service-carousel
	if ($('.service-four-slider').length) {
		var swiper = new Swiper(".service-four-slider", {
			slidesPerView: 3,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			navigation: {
				nextEl: '.swiper-service-four-button-next',
				prevEl: '.swiper-service-four-button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1023: {
					slidesPerView: 3,
				},
			},
		});
	}

	//service-carousel
	if ($('.service-five-slider').length) {
		var swiper = new Swiper(".service-five-slider", {
			slidesPerView: 3.35,
			spaceBetween: 30,
			speed: 600,
			loop: true,
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3.35,
				},
			},
		});
	}


	// Testimonial Carousel
	if ($('.testimonial-carousel-one').length) {
		$('.testimonial-carousel-one').owlCarousel({
			rtl: THEMEMASCOT.isRTL.check(),
			loop: true,
			margin: 30,
			nav: true,
			items: 1,
			smartSpeed: 700,
			autoplay: false,
			navText: ['<span class="icon-arrow-left"></span>', '<span class="icon-arrow-right"></span>'],
		});
	}

	
	
	////////////////////////////////////////////////////
	//  Counter Js
	if ($(".purecounter").length) {
		new PureCounter({
			filesizing: true,
			selector: ".filesizecount",
			pulse: 2,
		});
		new PureCounter();
	}


	//Clients Carousel
	if ($('.clients-carousel').length) {
		$('.clients-carousel').owlCarousel({
			rtl: THEMEMASCOT.isRTL.check(),
			loop: true,
			margin: 30,
			nav: false,
			smartSpeed: 400,
			autoplay: true,
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 2
				},
				600: {
					items: 3
				},
				768: {
					items: 4
				},
				1023: {
					items: 5
				},
				1400: {
					items: 5
				},
			}
		});
	}

  function show_secondary_price(pricing_tables){
    pricing_tables.addClass('show-secondary-price');
    var pricing_btn = pricing_tables.find('.btn');
    var secondary_btn_url = pricing_btn.data("secondary-link");
    pricing_btn.attr("href", secondary_btn_url);
  }
  function hide_secondary_price(pricing_tables){
    pricing_tables.removeClass('show-secondary-price');
    var pricing_btn = pricing_tables.find('.btn');
    var normal_btn_url = pricing_btn.data("normal-link");
    pricing_btn.attr("href", normal_btn_url);
  }

  //smart btn
  var TM_Pricing_Switcher_Smart = function ($scope) {
    var pricing_smart_switcher = $('.tm-pricing-smart-switcher, .tm-pricing-plan-switcher');
    if( pricing_smart_switcher.length > 0 ) {
      pricing_smart_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var $self = $(e.target);
        $self.toggleClass("secondary-active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if( $self.hasClass( 'secondary-active' ) ) {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };

  //round, flat btn
  var TM_Pricing_Switcher_Btn = function ($scope) {
    var pricing_btn_switcher = $('.tm-pricing-smart-switcher-button');
    if( pricing_btn_switcher.length > 0 ) {
      pricing_btn_switcher.find("[data-pricing-trigger]").on("click", function (e) {
        var target_id = $(this).data('show');
        var $self = $(e.target);
        pricing_btn_switcher.find("[data-pricing-trigger]").removeClass("active");
        $(this).addClass("active");
        var pricing_tables = $self.parents("section").find(".tm-pricing-table");

        if( target_id == "year" ) {
          show_secondary_price(pricing_tables);
        } else {
          hide_secondary_price(pricing_tables);
        }
      });
    }
  };
	

	//Service Block Hover
	if ($('.srvice-block-eleeven222').length) {
		var $service_block = $('.service-block-eleven .inner-box');
		$($service_block).on('mouseenter', function (e) {
			$(this).find('.info-box .text').stop().slideDown(400);
			return false;
		});
		$($service_block).on('mouseleave', function (e) {
			$(this).find('.info-box .text').stop().slideUp(400);
			return false;
		});
  	}

	// Team Award Content Active
	if($('.team-award-block-two .inner-box').length) {
		$('.team-award-block-two .inner-box').on('mouseenter', function() {
		$(this).addClass('active');
		$('.inner-box').removeClass('active');
		});
		$('.team-award-block-two .inner-box').on('mouseleave', function() {
		$(this).addClass('active');
		});
	}

  if($('.service-block-three .inner-box').length) {
  const $boxes = $('.service-block-three .inner-box');

  if ($boxes.length) {
    // Activate the first box on load
    // const $firstBox = $boxes.first();
    // $firstBox.addClass('active');
    // $firstBox.find('.content-box').addClass('active').slideDown();

    // Click logic
    $boxes.on('click', function () {
      $boxes.removeClass('active');
      $('.service-block-three .content-box').slideUp().removeClass('active');

      $(this).addClass('active');
      $(this).find('.content-box').slideDown().addClass('active');
    });
  }
}


 // Project Content Active
 if($('.service-block-seven .inner-box').length) {
    $('.service-block-seven .inner-box').on('click', function() {
       $('.inner-box').removeClass('active');
       $(this).addClass('active');
    });
  }

  if ($('.services-section-eight .outer-box').length) {
    const serviceImage = document.getElementById('service-image');
    const serviceItems = document.querySelectorAll('.services-list .service-block-eight');
    // Set the default active item
    const defaultItem = document.querySelector('.services-list .service-block-eight.active');
    if (defaultItem) {
        const defaultImage = defaultItem.getAttribute('data-image');
        if (defaultImage) {
            serviceImage.src = defaultImage;
        }
    }
    // Handle hover effect and active state change
    serviceItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const newImage = item.getAttribute('data-image');
            if (newImage) {
                serviceImage.src = newImage;
            }
            // Remove active class from all items and add to the hovered one
            serviceItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

  // Project Content Active
	if ($('.service-block-eleven').length) {
		var $service_block = $('.service-block-eleven .inner-box');
		$($service_block).on('mouseenter', function (e) {
			$(this).parent().parent().find('.inner-box').removeClass('active');
			$(this).addClass('active');
			$(this).parent().parent().find('.info-box .text').stop().slideUp(200);
			$(this).find('.info-box .text').stop().slideDown(200);
			return false;
		});
		$($service_block).on('mouseleave', function (e) {
			return false;
		});
	}

	//Fact Counter + Text Count
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

	//Distance Range Slider
	if ($('.distance-range-slider').length) {
		$(".distance-range-slider").slider({
			range: true,
			min: 0,
			max: 2000,
			values: [0, 1500],
			slide: function (event, ui){
				$("input.range-amount").val(ui.values[0] + " - " + ui.values[1]);
			}
		});
		$("input.range-amount").val($(".distance-range-slider").slider("values", 0) + " - " + $(".distance-range-slider").slider("values", 1));
	}

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

	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

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
			});
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

	document.querySelectorAll(".scroll-text").forEach((section) => {
		let tl = gsap.timeline({
			scrollTrigger: {
			trigger: section,
			start: "top 100%",
			end: "bottom top",
			scrub: 1,
			markers: false,
			},
		});
		tl.from(section.querySelector(".text1"), { xPercent: 20 })
		.from(section.querySelector(".text2"), { xPercent: -20 }, 0);
		tl.from(section.querySelector(".scroll-anim-top"), { yPercent: 10 }, 0)
		.from(section.querySelector(".scroll-anim-bottom"), { yPercent: -10 }, 0);
	});

	//Bg Parallax
	if($('.bg-parallax').length){
		gsap.to(".bg-parallax", {
			backgroundPosition: "70% 75%",
			ease: "ease1",
			scrollTrigger: {
			trigger: ".bg-parallax",
			start: "top bottom",
			end: "bottom top",
			scrub: 1
			}
		});
	}

		// Select2 Dropdown
	$('.custom-select').select2({
		minimumResultsForSearch: 7,
	});

	//Gallery Filters
	 if($('.filter-list').length){
	 	 $('.filter-list').mixItUp({});
	 }

	//Custom Data Attributes
	if($('[data-tm-bg-color]').length){
		$('[data-tm-bg-color]').each(function() {
		  $(this).css("cssText", "background-color: " + $(this).data("tm-bg-color") + " !important;");
		});
	}

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
		TM_Pricing_Switcher_Smart();
  	TM_Pricing_Switcher_Btn();
	});

})(window.jQuery);
