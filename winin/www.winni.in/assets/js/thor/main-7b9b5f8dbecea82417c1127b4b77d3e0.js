function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
/**
* Perform action on browser back button press
*/
let selectedGender = null;
let selectedAgeGroup = null;
let selectedOccasion = null;
$(document).ready(function(){
window.addEventListener("pageshow", function (event) {
    let historyTraversal = event.persisted || (typeof window.performance !== "undefined" && typeof window.performance.getEntriesByType('navigation') !== "undefined"
    && typeof window.performance.getEntriesByType('navigation')[0] !== "undefined" && typeof window.performance.getEntriesByType('navigation')[0].type !== "undefined"
     && window.performance.getEntriesByType('navigation')[0].type === 'back_forward');

    if (historyTraversal && $(".price-filter-selection").length > 0) {
        setPageDefaults();
    }
});

 if ($(".init-authentication").length===0 && !localStorage.getItem('modalShown') && isEnabledUserDemographic) {
    if ($("#userPersonalInfo").length > 0) {
        setTimeout(function() {
            if($(".open").length == 0) {
                 let instanceModalId = document.getElementById('userPersonalInfo');
                 let instancePersonalize = M.Modal.init(instanceModalId, {
                     onCloseEnd: function() {
                         localStorage.setItem('modalShown', 'true');
                     }
                 });
                 $('.modal-close').on('click', function() {
                     instancePersonalize.close();
                     localStorage.setItem('modalShown', 'true');
                 });

                 instancePersonalize.open();
            }
        }, 5000);
     }
}
$("#step-form").on("click", "input[name='gender']", function() {
    selectedGender = $("input[name='gender']:checked").val();
    saveUserDemographicResponse();
    setTimeout(function() {
        $(".user-gender__selection").hide();
        $(".user-age__selection").removeClass("hide");
        $(".select-gender-title").addClass("hide");
        $(".select-age-title").removeClass("hide");
    }, 500);
});

$("#step-form").on("click", "input[name='ageGroup']", function() {
    selectedAgeGroup = $("input[name='ageGroup']:checked").val();
    saveUserDemographicResponse();
    setTimeout(function() {
        $(".user-age__selection").addClass("hide");
        $(".user-occasion__selection").removeClass("hide");
        $(".select-gender-title").addClass("hide");
        $(".select-age-title").addClass("hide");
        $(".select-occasion-title").removeClass("hide");
    }, 500);
});

$("#step-form").on("click", "input[name='occasion']", function() {
    selectedOccasion = $("input[name='occasion']:checked").val();
    saveUserDemographicResponse();
    setTimeout(function() {
        $(".user-occasion__selection").addClass("hide");
        $(".submitStatement").removeClass("hide");
        $(".thanks__title").removeClass("hide");
        $(".personalize__title").addClass("hide");
        $(".select-occasion-title").addClass("hide");
        $(".select-gender-title").addClass("hide");
          $(".done-button").prop('disabled',false);
    }, 500);
});

  $("#step-form").on("submit", function(event) {
     event.preventDefault();
  });

$(".edit-details").on("click", function() {
    $(".user-gender__selection").show();
    $(".user-age__selection, .user-occasion__selection, .submitStatement").addClass("hide");
    $(".select-gender-title").removeClass("hide");
    $(".personalize__title").removeClass("hide");
    $(".thanks__title").addClass("hide");
    $(".done-button").prop('disabled',true);
    if (selectedGender) {
        $("input[name='gender'][value='" + selectedGender + "']").prop('checked', true);
        $("input[name='gender'][value='" + selectedGender + "']").next("img").addClass("scaled-gender__img");
    }
    if (selectedAgeGroup) {
        $("input[name='ageGroup'][value='" + selectedAgeGroup + "']").prop('checked', true);
    }
    if (selectedOccasion) {
        $("input[name='occasion'][value='" + selectedOccasion + "']").prop('checked', true);
    }
});

});

// IIFE - Immediately Invoked Function Expression
(function (yourcode) {
	$("#filterDate").datepicker({
	        minDate: new Date(),
     	    format: 'dd-mm-yyyy',
            onOpen: function () {
                let filterDateSelected = $("#filterDate").val();
            $(".datepicker-calendar-container .close-datePicker").remove();
                if ($(".datepicker-calendar-container").length) {
                    $(".datepicker-calendar-container").prepend($('#datepickerCloseBtn').html());
                }
                if(filterDateSelected) {
                    let parts = filterDateSelected.split("-");
                    let selectedDate = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
                     $('.datepicker').datepicker("setDate", selectedDate);
                }

                if($(".datepicker-done").length > 0 && $(".my-winni-reminder").length === 0 && $(".my-winni-profile").length === 0){
                   $(".datepicker-done").on("click", function() {
                       $('.datepicker-modal').modal('close');
                       window.location.href =generateUrl();
                   });
                }
            }
        });
      $(".datepicker-cancel").on("click", function() {
          $('.datepicker-modal').modal('close');
          $("#filterDate").val("").datepicker("setDate", null);
          window.location.href = addOrReplaceParam(generateUrl(), "resetDateFilter", true);
      });

    $(document).on('click', '.close-datePicker', function () {
       $("#filterDate").datepicker("close");
   });

// The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);
}(function ($, window, document) {
    const userNav = navigator.userAgent.match(/(iPhone|iPod)/g);
    if(userNav) {
        $("#dateAtt").attr("type", "date");
        $("#occasionLabel").show();
        $("#dateAtt").prop("readonly", false);
        $("#dateAtt").removeClass("occasiondatepicker");
        $("#dateAtt").css("padding-left","47px");
    } else {
      if($(".occasiondatepicker").length > 0){
          $('.occasiondatepicker').datepicker({
               format: 'dd-mm-yyyy',
          });
          if($(".occasiondatepicker-done").length > 0){

             $(".occasiondatepicker-done").on("click", function() {
                 $('.occasiondatepicker-modal').modal('close');
             });
          }
      }
    }
    $('.tabs').tabs();
    // code for landscape view
    function doOnOrientationChange() {
        switch (window.orientation) {
            case - 90:
            case 90:
                $("body").addClass('landscape');
                break;
            default:
                $('body').removeClass('landscape');
                break;
        }
    }
    if ($(".desk_banners-new").length > 0) {
        var desktopOffer = new Swiper(".desk_banners-new", {
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            }
        });
        var bannerLength = desktopOffer.slides.length;
        if (bannerLength === 3) {
            desktopOffer.autoplay.stop();
            $(".swiper-pagination").hide();
            $(".swiper-button-prev, .swiper-button-next").hide();
            desktopOffer.allowSlideNext = false;
            desktopOffer.allowSlidePrev = false;
            desktopOffer.allowTouchMove = false;
        }
    }
    if ($(".mbl_banner-new").length > 0) {
        var mobileOffer = new Swiper(".mbl_banner-new", {
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            }
        });
        var bannerLength = mobileOffer.slides.length;
        if (bannerLength === 3) {
            mobileOffer.autoplay.stop();
            $(".swiper-pagination").hide();
            $(".swiper-button-prev, .swiper-button-next").hide();
            mobileOffer.allowSlideNext = false;
            mobileOffer.allowSlidePrev = false;
            mobileOffer.allowTouchMove = false;
        }
    }

  if ($(".mbl_banner-new-rakhi").length > 0) {
             new Swiper(".mbl_banner-new-rakhi", {
                  slidesPerView: 1,
                  centeredSlides: true,
                  loop: true,
                  pagination: {
                      el: ".swiper-pagination",
                      clickable: true
                  },
                  autoplay: {
                      delay: 3000,
                      disableOnInteraction: false
                  }
              });
          }
    if ($(".desk_banners").length > 0) {
        var desktopBanner = new Swiper(".desk_banners", {
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            }
        });
        var bannerLength = desktopBanner.slides.length;
        var isSliderDisabled = (bannerLength === 3);
        if (isSliderDisabled) {
            desktopBanner.autoplay.stop();
            $(".swiper-pagination").hide();
            desktopBanner.allowSlideNext = false;
            desktopBanner.allowSlidePrev = false;
            desktopBanner.allowTouchMove = false;
        } else {
            $(".swiper-button-next, .swiper-button-prev").show();
        }
        $(".swiper-container").click(function () {
            if (isSliderDisabled) {
                desktopBanner.autoplay.stop();
            } else if (!desktopBanner.autoplay.running) {
                desktopBanner.autoplay.start();
            }
        });

    }


  if ($(".mbl_banner").length > 0) {

    var mobileBanner = new Swiper(".mbl_banner", {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        on: {
            init: function () {
                $(".first-image-banner").hide(); 
                $(".mobile-homepage-banner").removeClass("hide");
            }
        }
    });

    var bannerLength = mobileBanner.slides.length;
    if (bannerLength === 3) {
        mobileBanner.autoplay.stop();
        $(".swiper-pagination").hide();
        $(".swiper-button-prev, .swiper-button-next").hide();
        mobileBanner.allowSlideNext = false;
        mobileBanner.allowSlidePrev = false;
        mobileBanner.allowTouchMove = false;
    }
   
  }


    window.addEventListener('orientationchange', doOnOrientationChange);
// Initial execution if needed
    doOnOrientationChange();// The $ is now locally scoped

	//Exit Intent Popup
	if ($("#exitIntentPopup").length > 0) {
        setTimeout(function () {
            triggerExitIntentPopup();
        }, 30000);
    }
    $("#ckDynContentWrapper").on("click", "#nextButtonToSave,#finish-btn", saveQuestionResponse);
    $("#ckDynContentWrapper").on("click", "#last-btn", saveLastDemographicSectionResponse);
    $("#ckDynContentWrapper").on("click", "#nextButtonToSaveResponseReason", saveQuestionResponseReason);

	function triggerExitIntentPopup() {
		localStorage.removeItem('checkExitIntentAboutToOpen');
		document.addEventListener("mouseout", function(event) {
			// If the mouse leaves the viewport from the top edge
			if (event.clientY <= 0) {
				var showExitIntentPopup = true;
				if (typeof (Storage) !== "undefined") {
					var nextPopup = localStorage.getItem('popupExpires');
					if (nextPopup > new Date()) {
						showExitIntentPopup = false;
					}
				} else {
					showExitIntentPopup = false;
				}
				if (showExitIntentPopup === true) {
					localStorage.setItem('checkExitIntentAboutToOpen', true);
					if (localStorage.getItem('checkAskUserLocPopupOpen')) {
						$('#exitIntentPopup').modal('close');
					} else if (localStorage.getItem('checkFuserModalPopupOpen')) {
						$('#exitIntentPopup').modal('close');
					} else {
						$('#exitIntentPopup').modal('open');
					}
					$('.modal-overlay').css("pointer-events", "auto");
					$('.modal-overlay').css("position", "fixed");
					if (typeof (Storage) !== "undefined") {
						var expires = new Date();
						expires = expires.setHours(expires.getHours() + 24);
						localStorage.setItem('popupExpires', expires);
					}
				}
			}
		});
	}


	//Add for gift finder
	var relationlist = $('.choose_relation');
	var arr = $('#relationId option').map(function() {
		return { text: $(this).text(), value: $(this).val() };
	});
	$.each(arr, function(i) {
		$('<li>', { text: arr[i].text }).data('val', arr[i].value).appendTo(relationlist);
	});

	$('.choose_relation li').click(function() {
		$('#relationId').val($(this).data('val'));
	});
	//choose occassion
	$(".select_occasn").click(function() {
		$('.choose_occassion li').remove();
		var occassionList = $('.choose_occassion');
		var arr = $('#occasionId option').map(function() {
			return { text: $(this).text(), value: $(this).val() };
		});
		$.each(arr, function(i) {
			$('<li>', { text: arr[i].text }).data('val', arr[i].value).appendTo(occassionList);
		});
		$('.choose_occassion li').click(function() {
			$('#select_occasn').modal('close');
			$('#occasionId').val($(this).data('val'));
			var occasionTxt = $("#occasionId option:selected").text();
			$(".select_occasn span").text(occasionTxt).addClass('selected');
		});
	});
	var occasionTxt = $("#occasionId option:selected").text();
	$(".select_occasn span").text(occasionTxt).addClass('selected');
	var relationTxt = $("#relationId option:selected").text();
	$(".select_relation span").text(relationTxt).addClass('selected');
	$(".choose_relation li").click(function() {
		$('#select_relation').modal('close');
		var relationTxt = $("#relationId option:selected").text();
		$(".select_relation span").text(relationTxt).addClass('selected');
	});
	var occName = $('#occasionId :selected').text();
	if (occName == "Birthday, Anniversary, Diwali etc") {
		$(".select_occasn span").removeClass('selected');
	}
	var relName = $('#relationId :selected').text();
	if (relName == "Father, Mother, Sister etc") {
		$(".select_relation span").removeClass('selected');
	}
	$(function() {
		if ($("main").find("gfscroll") && $(".gfscroll").length > 0 && $(".gift_finter_catg").length > 0) {
			$('html, body').stop().animate({
				'scrollTop': $('.gfscroll').offset().top - 50
			}, 900);
		}
	});

	// Listen for the jQuery ready event on the document
	$(function() {
		adVtrInt();
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		$(document).ajaxSend(function(e, xhr, options) {
			if (options.type == "POST") {
				xhr.setRequestHeader(header, token);
			}
		});
		$(document).ajaxComplete(function(event, xhr, settings) {
			if (xhr.status == 401 || xhr.status == 403) {
				window.location.reload();
			}
		});
		// The DOM is ready!
		if ($("#clockdiv").length > 0) {
			initializeClock('clockdiv', deadline);
		}
		//$('select').material_select();
		if ($("#homeCarousel").length > 0) {
			$("#homeCarousel").carousel({
				fullWidth: true,
				indicators: false,
				duration: 200
			});
			// move next carousel
			$('.moveNextCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#homeCarousel').carousel('next');
			});
			// move prev carousel
			$('.movePrevCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#homeCarousel').carousel('prev');
			});
			setInterval(function() {
				$('.carousel').carousel('next');
			}, 4500); // every 2 seconds
		}


		//   Franchise Crousel
		if ($("#franchiseCarousel").length > 0) {
			$("#franchiseCarousel").carousel({
				fullWidth: true,
				indicators: false,
				duration: 200

			});
			// move next carousel
			$('.moveNextCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#franchiseCarousel').carousel('next');
			});
			// move prev carousel
			$('.movePrevCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#franchiseCarousel').carousel('prev');
			});
			setInterval(function() {
				$('.carousel').carousel('next');
			}, 4500); // every 2 seconds
		}
		//   Franchise Crousel mobile
		if ($("#franchiseMobileCarousel").length > 0) {
			$("#franchiseMobileCarousel").carousel({
				fullWidth: true,
				indicators: false,
				duration: 200

			});
			// move next carousel
			$('.moveNextCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#franchiseMobileCarousel').carousel('next');
			});
			// move prev carousel
			$('.movePrevCarousel').click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				$('#franchiseMobileCarousel').carousel('prev');
			});
			setInterval(function() {
				$('.carousel').carousel('next');
			}, 4500); // every 2 seconds
		}



		if ($("#mLoginOverlay").length > 0) {
			setTimeout(function() {
				triggerLoginOverlay();
			}, 1000);
		}
		if ($("#fuserModal").length > 0) {
			setTimeout(function() {
				triggerfuserOverlay();
				var fuserModalOpenElement = document.querySelector('#fuserModal');
				// Check if the modal is in open stage
				var isfuserModalOpen = fuserModalOpenElement.M_Modal.isOpen;
				if (isfuserModalOpen) {
					localStorage.setItem('checkFuserModalPopupOpen', true);
				} else {
					localStorage.removeItem('checkFuserModalPopupOpen');
				}
			}, 12000);
		}
		if ($("#fuserMobileModal").length > 0) {
			setTimeout(function() {
				triggerfuserMobileOverlay();
			}, 10000);
		}
		//        if ($("#userWalletModal").length > 0) {
		//            setTimeout(function () {
		//                userWalletModalOverlay();
		//            }, 3000);
		//        }else{
		//            localStorage.removeItem('_plog');
		//        }
		var counterNetCore = 0;
		var looper = setInterval(function() {
			counterNetCore++;
			WriteCookie();
			if (counterNetCore >= 8) {
				clearInterval(looper);
			}

		}, 10000);

		$("#mLoginOverlay").click(closeMobileLoginOverlay);
		$("#mLoginOverlayCloseBtn").click(closeMobileLoginOverlay);
		$(".mLoginOverlayActionableContent").click(function() {
			location.href = "/customer/signup";
		});
		if ($('#mobileHomeCarousel').length > 0) {
			$('#mobileHomeCarousel').slick(
				{
					dots: false,
					prevArrow: false,
					nextArrow: false,
					autoplay: true,
					autoplaySpeed: 3000
				}
			);
		}

		generateRatingStars();

		if ($(".pagination__next").length) {
			$('.cat-products-wrapper').infiniteScroll({
				// options
				path: '.pagination__next',
				append: '.post',
				history: false
			});
			$('.search-products-wrapper').infiniteScroll({
				// options
				path: '.pagination__next',
				append: '.post',
				history: false
			});
		}
		$('.cat-products-wrapper').on('append.infiniteScroll', function(event, response, path, items) {
			generateRatingStars();
			var currency = localStorage.getItem('userCurrency');
			changeCurrecies(currency);
		});
		$('.search-products-wrapper').on('append.infiniteScroll', function(event, response, path, items) {
			var currency = localStorage.getItem('userCurrency');
			changeCurrecies(currency);
		});
		$('#doLogout').click(function() {
			dataLayer.push({ 'event': 'userLogout' });
			var uri = $(this).data('uri');
			var data = {
				'_csrf': token
			};
			postIt("lgOutFrm", uri, data);
		});
		$("#logoutFromProfile").click(function() {
			dataLayer.push({ 'event': 'userLogout' });
			var uri = $("#logoutFromProfile").data('uri');
			var data = {
				'_csrf': token
			}
			postIt("lgOutFrm", uri, data);
		});
		$('body').on('click', '#goTop', function(e) {
			$("html, body").animate({ scrollTop: $("#top").offset().top }, 5500);
		});

		//Winni Order Detail
		$(".shpimentDetails .shpimentDtlInfo .prdAttr a[target='_BLANK']").text("View Img");

		$('#filterOrder').change(function() {
			$('#filter_order').submit();
		});
		$(".orderTabs .tabs .orderTab").click(function() {
			$("#filter_order").show();
		});
		$(".orderTabs .tabs .paymentTab,.orderTabs .tabs .cancelTab").click(function() {
			$("#filter_order").hide();
		});
		$('.sidenav').sidenav({
			//            menuWidth: 270, // Default is 300
			edge: 'left',
			closeOnClick: true,
			draggable: false,
		});

		if ($('#navigation').length > 0) {
			var elementPosition = $("#navigation").offset();
			var pc = $(".product-canvas").offset();
			var ra = $('.product-canvas').height();
			var eh = $("#navigation").height();
			var htd = ((pc.top + ra) - 30);
			var width = $("#navigation").width() + 22.5;
			var rightOffset = $('.product-left').offset().left + $('.product-left').width();
			var leftOffsetForRightPane = rightOffset + 23;
			$(window).scroll(function() {
				var topScroll = $(window).scrollTop() + eh;
				if ($(window).scrollTop() > elementPosition.top) {
					if (topScroll > htd) {
						$('#navigation').css('position', 'sticky');
					} else {
						$('#navigation').css('position', 'fixed').css('top', '0').css('left', leftOffsetForRightPane).css('width', width);
					}
				} else {
					$('#navigation').css('position', 'static');
				}
			});
		}
		if ($(".personalised-gifts-desktop").length > 0 && $(".pagination__next").length) {
			var elem = document.querySelector('.cat-products-wrapper');
			var infScroll = new InfiniteScroll(elem, {
				// options
				path: '.pagination__next',
				append: '.product',
				status: '.page-load-status',
				history: false,
				prefill: false
			});
			infScroll.on('last', function(response, path) {
				$(".infinite-scroll-request").hide();
				$(".infinite-scroll-last").show();
			});
		}
		if ($(".page-category").length > 0 && $(".pagination__next").length) {
			var elem = document.querySelector('.cat-products-wrapper');
			var infScroll = new InfiniteScroll(elem, {
				// options
				path: '.pagination__next',
				append: '.product',
				status: '.page-load-status',
				history: false,
				prefill: false
			});
			infScroll.on('load', function() {
				var shown = localStorage.getItem('feedbackModalShown');
				if (!shown) {
					var totalPages = $("#totalPages").val();
					if (Math.floor(totalPages / 2) >= 2 && Math.floor(totalPages / 2) === infScroll.pageIndex) {
						$('#userfeedback').modal({ dismissible: false });
						localStorage.setItem('feedbackModalShown', 1);
					}
				}
			});
			infScroll.on('last', function(response, path) {
				$(".infinite-scroll-request").hide();
				$(".infinite-scroll-last").show();
			});
			
		}
		if ($(".search-mobile").length > 0 && $(".pagination__next").length) {
			var elem = document.querySelector('.cat-products-wrapper');
			var infScroll = new InfiniteScroll(elem, {
				// options
				path: '.pagination__next',
				append: '.product',
				status: '.page-load-status',
				history: false,
				prefill: false
			});
			infScroll.on('last', function(response, path) {
				$(".infinite-scroll-request").hide();
				$(".infinite-scroll-last").show();
			});
		}

		if ($(".search-list-bc").length > 0 && $(".pagination__next").length) {
			var elem = document.querySelector('.search-products-wrapper');
			var infScroll = new InfiniteScroll(elem, {
				// options
				path: '.pagination__next',
				append: '.product',
				status: '.page-load-status',
				history: false,
				prefill: false
			});
			infScroll.on('last', function(response, path) {
				$(".infinite-scroll-request").hide();
				$(".infinite-scroll-last").show();
			});
		}
		$("#hiddenAttsToggle").click(function() {
			if ($("#hiddenAtts").is(":visible")) {
				$("#hiddenAtts").hide();
				$("#hiddenAttsToggle").text("+ More")
			} else {
				$("#hiddenAtts").show();
				$("#hiddenAttsToggle").text("- Less")
			}
		});

		$('#searchDelCity').keyup(function() {
			if ($(this).val().length > 0) {
				$('#popularDelCities').addClass("hide");
			} else {
				$('#popularDelCities').removeClass("hide");
			}
		});
		
		$('.category-sort-store select').change(function() {
			window.location.href = $(".category-sort-store select option:selected").data("uri");
		});
		
		$('.category-sort select').change(function() {
			let seletectIndex = this.value;
			let sortBy;
			switch (seletectIndex)
			{
			   case "1":
				   sortBy = "popular";
				   break;
			   case "2":
				   sortBy = "priceLowHigh";
				   break;
			   case "3":
				   sortBy = "priceHighLow";
			       break;
			   case "4": 
				   sortBy = "bestseller";
			       break;
			   case "5": 
				   sortBy = "premium";
			       break;
			   case "6": 
				   sortBy = "trending";
				   break;
			   default: 
			   	   sortBy = "popular";
			}
			$('#sortByAttrName').val(sortBy);
			window.location.href = generateUrl();

		});

		$('.price-filter select').change(function() {
			let seletectIndex = this.value;
			let priceFilterRange = $(this).find(':selected').data('inr');
			let priceRange;
			if(priceFilterRange) {
				if(priceFilterRange.includes("-")) {
					priceRange = priceFilterRange.split("-");
				}
				if(priceFilterRange.includes("&")) {
					priceRange = priceFilterRange.split("&");
				}
			}
			let minPrice;
			let maxPrice;
			switch (seletectIndex)
			{
			   case "1":
				   minPrice="";
				   maxPrice=priceRange[0];
				   break;
			   case "2":
			   case "3":
			   case "4": 
				   minPrice=priceRange[0];
				   maxPrice=priceRange[1];
				   break;
			   case "5": 
				   minPrice=priceRange[0];
				   maxPrice="";
			       break;
			   default: 
			   	   minPrice="";
				   maxPrice="";
			       console.log("Default price filter is selected");
			}
			$('#minPrice').val(minPrice);
			$('#maxPrice').val(maxPrice);
			localStorage.setItem('selectedtem', seletectIndex);
			window.location.href = generateUrl();
		});
		if (localStorage.getItem('selectedtem')) {
			if (!(window.location.href.indexOf("?sort") > -1)) {
				localStorage.removeItem('selectedtem')
			} else {
				document.getElementById('desk-price-filter').options[localStorage.getItem('selectedtem')].selected = true;
			}
		}

		if ($('body').hasClass("page-new-product")) {
			rcpdCookie();
		}
		else if ($('body').hasClass("city-home")) {
			getRecentViewProduct();
		}

		if ($('body').hasClass("choose-city-mobile")) {
			getAllCitiesName();
		}

		if ($("#mobileSearchInput").length > 0 && $(".moneyCal").length < 1) {
			$(window).on('load', function() {
				$("#mobileSearchInput").focus();
				$("#mobileSearchInput").trigger("click");
			});
			$("#clearSearch").click(function() {
				$(this).hide();
				$("#mobileSearchInput").val("");
			});
			$("#mobileSearchInput").keyup(function() {
				$(".search-dropdown-by-category-mobile").hide();
				var query = $(this).val();
				if (query !== "") {
					$("#clearSearch").show();
				} else {
					$("#clearSearch").hide();
				}
			});
			$("#mobileSearchInput").keydown(function(e) {
				if (e.keyCode === 13) {
					var query = $(this).val();
					if (query !== "") {
						$('#adbSearchQueryKey').val(query);
						$('.mobile-search').submit();
						initiateSearchEvent();
					}
				}
			});
			var query = $('#mobileSearchInput').val();
			if (query !== "") {
				$("#clearSearch").show();
			} else {
				$("#clearSearch").hide();
			}


			// constructs the suggestion engine
			var productCategoriesMobile = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: searchQueryUrl,
					wildcard: '%QUERY'
				}
			});
			$('#mobileSearchInput').typeahead(
				{
					hint: true,
					highlight: true,
					minLength: 2
				},
				{
					name: 'productCategoriesMobile',
					source: productCategoriesMobile,
					autocomplete: "off",
					limit: 10,
					display: function(item) {
						localStorage.setItem("searcheventcat", "yes");
						return item.name
					},
					'updater': function(item) {
						return item;
					},
					templates: {
						suggestion: Handlebars.compile('<div class="dynamicMobSuggest"><a href="{{uri}}">{{name}}</a></div>')

					}
				}

			);
		}
        function adjustSliderHeight() {
			let slideClass = document.getElementsByClassName('swiper-slide');
			let sliderClass = document.getElementsByClassName('adbInternationalBannerSlider');
			if(slideClass.length>0 && sliderClass.length>0){
            let slide = document.querySelector('.swiper-slide');
            let image = slide.querySelector('.carousel-image');
            let slider = document.querySelector('.adbInternationalBannerSlider');
            slider.style.height = image.offsetHeight + 'px';
            slider.style.width = image.offsetWidth  + 'px';
            }
        }
        window.addEventListener('load', function () {
            adjustSliderHeight();
        });
        
		if ($("#deliveryLocationSearchInput").length > 0) {
			$("#clearSearch").click(function() {
				$(this).hide();
				$("#mobileSearchInput").val("");
			});
			$("#deliveryLocationSearchInput").keyup(function() {
				var query = $(this).val();
				if (query !== "") {
					$("#clearSearch").show();
				} else {
					$("#clearSearch").hide();
				}
			});
			$("#deliveryLocationSearchInput").keydown(function(e) {
				if (e.keyCode === 13) {
					$('.mobile-search').submit();
				}
			});
			var query = $('#deliveryLocationSearchInput').val();
			if (query !== "") {
				$("#clearSearch").show();
			} else {
				$("#clearSearch").hide();
			}


			// constructs the suggestion engine
			var states = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: '/search/location/queries/%QUERY',
					wildcard: '%QUERY'
				}
			});
			$('#deliveryLocationSearchInput').typeahead(
				{
					hint: true,
					highlight: true,
					minLength: 3
				},
				{
					name: 'states',
					source: states,
					autocomplete: "off",
					limit: 10,
					display: function(item) {
						return item.name
					},
					'updater': function(item) {
						return item;
					},
					templates: {
						empty: [
							'<div class="empty-message adbNoResultDesk">',
							'Sorry, we do not have this location covered',
							'</div>'
						].join('\n'),
						suggestion: Handlebars.compile('<div class="adobeCityDesSerch"><span adbNormalSuggest="{{name}}"   adbNorm="{{uri}}"  adbCityPostal="{{adobeSearchSuggestedPostal}}" adbCityNameSel="{{adobeSelectedLocation}}">{{name}}</span></div>')
					}
				}
			).on('typeahead:selected', function(e,suggestion) {
				//e.target.form.submit();
				let cityName = suggestion.adobeSelectedLocation;
				changeCurrentCity(cityName);
			});
		}

		if ($("#search-input-in-desktop").length > 0) {

			$("#search-input-in-desktop").keyup(function(e) {
				$(".search-dropdown-by-category").hide();
			});
			$("#search-input-in-desktop").keydown(function(e) {
				if (e.keyCode === 13) {
					var query = $(this).val();
					if (query !== "") {
						$('.category-search').submit();
						$('#adbSearchQueryKey').val(query);
						initiateSearchEvent();

					}
				}
			});
			$(".search-icon-image").click(function() {
				var searchInputValue = $("#search-input-in-desktop").val();
				if (searchInputValue !== "") {
					$('.category-search').submit();
					$('#adbSearchQueryIcon').val(searchInputValue);
					initiateSearchEvent();
				}
			})

			// constructs the suggestion engine
			var categories = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote: {
					url: searchQueryUrl,
					wildcard: '%QUERY'
				}
			});
			$('#search-input-in-desktop').typeahead(
				{
					hint: true,
					highlight: true,
					minLength: 2
				},
				{
					name: 'categories',
					source: categories,
					autocomplete: "off",
					limit: 10,
					display: function(item) {
						return item.name;

					},
					'updater': function(item) {
						return item;
					},
					templates: {
						suggestion: Handlebars.compile('<div class="dynamicSuggest dropdown-suggestion-text" style="padding-left: 35px" ><a href="{{uri}}">{{name}}</a></div>')
					}
				}
			).on('typeahead:selected', function(e) {
				e.target.form.submit();
				localStorage.setItem("searcheventcat", "yes");
			});
		}

		$('.modal').modal();


		if ($('body').hasClass("search-list-bc") || $('body').hasClass("search-mobile")) {
			dataLayer.push({
				'event': 'productSearch',
				'data': {
					'searchKeyword': searchDL.keyword,
					'itemCount': searchDL.count
				}
			});
		}

		if ($('body').hasClass("page-category") && typeof categoryDL !== 'undefined') {
			dataLayer.push({
				'event': 'categoryView',
				'data': {
					'categoryId': categoryDL.id,
					'categoryName': categoryDL.name,
					'categoryItemCount': categoryDL.itemCount
				}
			});
		}
		if ($('body').hasClass("search-list-bc") && typeof categoryDL !== 'undefined') {
			dataLayer.push({
				'event': 'categoryView',
				'data': {
					'categoryId': categoryDL.id,
					'categoryName': categoryDL.name,
					'categoryItemCount': categoryDL.itemCount
				}
			});
		}

		if ($('body').hasClass("page-cart")) {
			dataLayer.push({
				'event': 'cartView',
				'data': {
					'cartItemCount': cartViewDL.cartItemCount,
					'cartTotal': cartViewDL.cartTotal,
					'cartItems': cartViewDL.cartItems
				}
			});
		}

		$(".search-field-mobile").on('click', function() {
			var searchInputValue = document.getElementById("mobileSearchInput").value;
			if (searchInputValue.length === 0 || searchInputValue.length === undefined) {
				$(".search-dropdown-by-category-mobile").show();
			}
		});
		$(".search-field").on('click', function() {
			var searchInputValue = document.getElementById("search-input-in-desktop").value;
			if (searchInputValue.length === 0 || searchInputValue.length === undefined) {
				$(".search-dropdown-by-category").show();
			}
		});

		window.onclick = function(event) {
			if ($(".search-input-desktop").length) {
				if (!event.target.matches('.search-input-desktop')) {
					$(".search-dropdown-by-category").hide();
				}
			} else if ($(".search-field-mobile").length) {
				if (!event.target.matches('.search-field-mobile')) {
					$(".search-dropdown-by-category-mobile").hide();
				}
			}
		}

		$(window).blur(function() {
			if ($(".search-dropdown-by-category").length) {
				$(".search-dropdown-by-category").hide();
			} else if ($(".search-dropdown-by-category-mobile").length) {
				$(".search-dropdown-by-category-mobile").hide();
			}
		});

		var sortId = localStorage.getItem("sortId");
		var filterId = localStorage.getItem("filterId");
		if (sortId !== null) {
			$('.selected-sort-category').removeClass('selected-sort-category');
			$("#" + sortId).addClass('selected-sort-category');
		}
		if (filterId !== null) {
			$('.selected-filter-category').removeClass('selected-filter-category');
			$("#" + filterId).addClass('selected-filter-category');
		} else {
			$(".circle-dot-filter").hide();
		}

		if ($(".sort-category").hasClass("selected-sort-category")) {
			$(".circle-dot-sort").show();
		} else {
			$(".circle-dot-sort").hide();
		}
		if ($(".price-range-category").hasClass("selected-filter-category")) {
			$(".circle-dot-filter").show();
		} else {
			$(".circle-dot-filter").hide();
		}

		if ($(".price-range-category").length < 1 && $(".prod-images").length < 1) {
			localStorage.removeItem("sortId");
			localStorage.removeItem("filterId");
			$(".price-range-category").removeClass("selected-filter-category");
			$(".sort-category").removeClass("selected-sort-category");
		}

		if ($(".sort-category").length) {
			var lastScrollTop = 0;
			$(window).scroll(function(e) {
				var st = $(this).scrollTop();
				if (st > lastScrollTop) {
					// downscroll code
					$(".slideUp").slideUp(500);
				} else {
					// upscroll code
					$(".slideUp").slideDown(500);
				}
				lastScrollTop = st;
			});
		}
		if(isLimeChatEnabled){
	    	setTimeout(initLimeChat, 6000);
		}else{
		    setTimeout(initSupportChat(), 8000);
		}

	});

	$(".banner-img-bg").click(function() {
		var targetUri = $(this).data("targeturi");
		if (targetUri == undefined || targetUri.trim().length == 0) {
			window.location.href = "/cake";
		} else {
			window.location.href = targetUri;
		}
	});

	$(".sort-category").click(function() {
		var id = $(this).attr("id");
		localStorage.setItem("sortId", id);
	});

	$(".price-range-category").click(function() {
		var id = $(this).attr("id");
		localStorage.setItem("filterId", id);
	});

	$(".clear-filter-price").click(function() {
		localStorage.removeItem("filterId");
	});

	$(".clear-filter-sort").click(function() {
		localStorage.removeItem("sortId");
	});

	$(".corporate-page-banner").click(function() {
		var formPosition = $("#corporate-form").position();
		window.scrollTo({
			top: formPosition.top - 105,
			behavior: 'smooth'
		});
	});

	$(".corporate-page-banner-mobile").click(function() {
		var formPosition = $("#corporate-form").position();
		window.scrollTo({
			top: formPosition.top - 50,
			behavior: 'smooth'
		});
	});

	$(".explore-more-cakes").click(function() {
		$(this).hide();
		$(".hidden-cake-img").show();
	});

	$(".kids-cake-bg-img").click(function() {
		window.location.href = "/cake/kids-cakes";
	});

	$(".flower-by-type-img").click(function() {
		window.location.href = "/flowers";
	});

	function logEvent(name, params) {
		if (!name) {
			return;
		}

		if (window.AnalyticsWebInterface) {
			// Call Android interface
			window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
		} else if (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.firebase) {
			// Call iOS interface
			var message = {
				command: 'logEvent',
				name: name,
				parameters: params
			};
			window.webkit.messageHandlers.firebase.postMessage(message);
		} else {
			// No Android or iOS interface found
			// console.log("No native APIs found.");
		}
	}

	function triggerLoginOverlay() {
		var show = true;
		if (typeof (Storage) !== "undefined") {
			var closed = sessionStorage.getItem('loShown');
			if (closed === '1') {
				show = false;
			}
		} else {
			show = false;
		}

		if (show === true) {
			$("#mLoginOverlay").show();
			$("#mLoginOverlayContent").show("slow");
			if (typeof (Storage) !== "undefined") {
				sessionStorage.setItem('loShown', '1');
			}
		}
	}

	function triggerfuserOverlay() {
		var show = true;
		if (typeof (Storage) !== "undefined") {
			localStorage.removeItem('checkFuserModalAboutToOpen');
			var closed = localStorage.getItem('popShown');
			if (closed === '1') {
				show = false;
			}
		} else {
			show = false;
		}
		if (show === true) {
			localStorage.setItem('checkFuserModalAboutToOpen', true);
			if ((localStorage.getItem('checkAskUserLocPopupOpen') && localStorage.getItem('checkFuserModalAboutToOpen'))) {
				$('#fuserModal').modal('close');
			} else {
//				    $('#fuserModal').modal("open");
			}
			if (typeof (Storage) !== "undefined") {
				localStorage.setItem('popShown', '1');
			}
		}
	}
	function triggerfuserMobileOverlay() {
		var show = true;
		if (typeof (Storage) !== "undefined") {
			var closed = sessionStorage.getItem('Shown');
			if (closed === '1') {

				show = false;
			}
		} else {
			show = false;
		}

		if (show === true) {
			$('#fuserMobileModal').modal("open");
			if (typeof (Storage) !== "undefined") {
				sessionStorage.setItem('Shown', '1');
			}
		}
	}
	function userWalletModalOverlay() {
		var plog = localStorage.getItem('_plog');
		var custID = $('#ntCustId').val();
		if (custID > 0) {
			var now = new Date().getTime();
			var walletSetupTime = localStorage.getItem('_wstime');
			if (walletSetupTime === null) {
				localStorage.setItem('_wstime', now);
				localStorage.setItem('_plog', true);
				loadCustomerGiftcard(custID);
			} else {
				if (plog === null && now - walletSetupTime > 24 * 60 * 60 * 1000) {
					localStorage.removeItem('_wstime');
					localStorage.setItem('_wstime', now);
					loadCustomerGiftcard(custID);
				} else {
					localStorage.removeItem('_wstime');
					localStorage.setItem('_wstime', now);
				}
			}
		} else {
			localStorage.removeItem('_plog');
		}
	}
	function closeMobileLoginOverlay(e) {
		$("#mLoginOverlay").hide();
		$("#mLoginOverlayContent").hide();
	}

	function generateRatingStars() {
		$.fn.stars = function() {
			return $(this).each(function() {
				var rating = parseFloat($(this).data("rating"));
				var percent = Math.round(rating * 2) * 10;
				var span = $("<span class='stars-container'>")
					.addClass("stars-" + percent)
					.text("★★★★★");
				$(this).html(span);
			});
		};
		$('span.stars').stars();
	}

	/*Utility Function start*/
	function postIt(formId, url, data) {
		$('body').append($('<form/>', {
			id: formId,
			method: 'POST',
			action: url
		}));
		for (var i in data) {
			$('#' + formId).append($('<input/>', {
				type: 'hidden',
				name: i,
				value: data[i]
			}));
		}
		$('#' + formId).submit();
		$('#' + formId).remove();
	}

	if ($('.showUserCurrency').length > 0) {
		var currency = localStorage.getItem('userCurrency');
		if (currency == null) {
			currency = "INR";
		}
		$('.showUserCurrency').text(currency);
	}
}));
$("#initInvoicePayForm").submit(function(e) {
	var $btn = $('#initInvoicePayForm').find("button");
	$btn.attr("disabled", "");
	$btn.addClass("disabled");
	e.preventDefault();
	var uri = $('#initInvoicePayForm').data("uri");
	$.ajax({
		url: uri,
		type: 'post',
		success: function(response) {
			if (response.success === "true") {
				$(".dyn-invoice-payment").html(response.html);
				$(".invoice-breakup").hide();
			} else {
				alert(response.message);
			}
		},
		complete: function(response) {

		},
		error: function(response) {
		}
	});
});

function initSupportChat() {
	let showChat = true;
	if (showChat === true && $(window).width() > 300) {
	if($('body').hasClass('contact-us')){
	   window.ymConfig = { bot: 'x1599120792185'};
	}else{
	  window.ymConfig = { bot: 'x1599120792185',"hideChatButton": true};
	}
		(function() {
           var w = window, ic = w.YellowMessenger;
			if ("function" === typeof ic)
				ic("reattach_activator"), ic("update", ymConfig);
			else {
				var d = document, i = function() {
					i.c(arguments)
				};
				function l() {
					var e = d.createElement("script");
					e.type = "text/javascript", e.async = !0,
						e.src = "https://app.yellowmessenger.com/widget/main.js";
					var t = d.getElementsByTagName("script")[0];
					t.parentNode.insertBefore(e, t);

				}
				i.q = [], i.c = function(e) {
					i.q.push(e)
				}, w.YellowMessenger = i,
					w.attachEvent ? w.attachEvent("onload", l) : w.addEventListener("load", l, !1)
			}
		})();
	}

}


$('#productDeliverySearchForm').submit(function(e) {
	e.preventDefault();
	var uri = $(this).attr('action');
	var data = $(this).serialize();
	$.ajax({
		url: uri,
		type: 'POST',
		data: data,
		success: function(response) {
			if (response.success === "true") {
				$("#respPincode").html(response.message);
			} else {
				$("#respPincode").html(response.message);
			}
		},
		complete: function(response) {
			// $('#fullPageLoader').addClass('hide');
		},
		error: function(response) {
		}
	});
});
//$('#deleteAddress').click(function (e) {
$('#ckDynContentWrapper').on('click', '.deleteAddress', function(e) {
	var result = confirm("Want to delete?");
	if (result) {
		var url = $(this).data('uri');
		e.preventDefault();
		$.ajax({
			cache: false,
			url: url,
			type: 'post',
			success: function(response) {
				if (response.success === "true") {
					location.reload();
				}

			},
			complete: function(response) {

			},
			error: function(response) {
				alert("some error occured");
			}
		});
	}
});
$('.editUpdateAddressForm').click(function(e) {
	var url = $(this).data('uri');
	var addId = $(this).data('cid');
	$('#currentAddressId').val(addId);
	$.ajax({
		cache: false,
		url: url,
		type: 'get',
		success: function(response) {
			if (response.success === "true") {
				$('#addressUpdateForm').attr('data-id', response.address.id);
				$('#addressUpdateForm [name="name"]').val(response.address.name);
				$('#addressUpdateForm [name="address"]').val(response.address.address);
				$('#addressUpdateForm [name="landmark"]').val(response.address.landmark);
				$('#addressUpdateForm [name="phoneNumber"]').val(response.address.phoneNumber);
				$('#addressUpdateForm [name="alternatePhoneNumber"]').val(response.address.alternateNumber);
				$('#addressUpdateForm [name="postalCode"]').val(response.address.postalCode);
				$('#addressUpdateForm [name="cityId"]').val(response.address.city.name);
			} else {
				$('.message').text(response.message);
			}
		},
		complete: function(response) {

		},
		error: function(response) {
			alert("some error occured");
		}
	});
});
$('#addressPin').keyup(function(e) {

	var pincode = $(this).val();
	if ($.isNumeric(pincode) && pincode.length === 6) {

		var uri = webApp.checkCityOfPincodeUri.replace("{pincode}", pincode);
		//     $('#fullPageLoader').removeClass('hide');
		var jqxhr = $.ajax({
			url: uri,
			type: "GET",
			cache: false,
			dataType: "json",
		});
		jqxhr.done(function(data) {
			if (data.result.success) {
				$("#newAddrCity").val(data.result.city);
				M.updateTextFields();
			} else if (data.message === "session expired") {
				showSessionExpired();
			} else {
				$("#newAddrCity").val("");
				M.toast({ html: "Delivery not available at this location" });
			}
		});
		jqxhr.fail(function(data) {

		});
	}
});
$('#addressUpdateForm').submit(function(e) {
	e.preventDefault();
	var action = $(this).attr('action');
	action = action + "/" + $('#currentAddressId').val();
	var data = $(this).serialize();
	$.ajax({
		type: 'POST',
		url: action, //Defined in HTML body
		data: data,
		success: function(response) {
			if (response.success === "true") {
				location.reload();
			} else {
				console.log("failed" + response.message);
				M.toast({ html: response.message });
			}
		}, error: function(response) {
		}
	});
});
(function($) {
	$(function() {
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		$(document).ajaxSend(function(e, xhr, options) {
			if (options.type == "POST") {
				xhr.setRequestHeader(header, token);
			}
		});

		$("#review-box, #nameField").click(function() {
			$('#review-box').removeClass('box-review');
			$('#review-alert').text('');

		});

		var reviewImages = [];
		function dataURItoBlob(dataURI) {
			var byteString = atob(dataURI);
			var ab = new ArrayBuffer(byteString.length);
			var ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: 'image/png' });
		}
		$('#sub-rating-form').click(function() {
			for (let i = 0; i < AttachmentArray.length; i++) {
				let blob = dataURItoBlob(AttachmentArray[i].Content)
				reviewImages.push(blob);
			}
			var fd = new FormData(document.forms[0]);
			fd.append("rating", $("#rating").val());
			fd.append("nickName", $("#nameField").val());
			fd.append("reviewText", $("#review-box").val());
			for (var i = 0; i < reviewImages.length; i++) {
				fd.append('reviewImage', reviewImages[i]);
			}
			var uri = $('#reviewPageRatingUrl').val();
			submitCustomerReview(fd, uri);
		});
		function submitCustomerReview(fd, uri) {
          $('.loader-on-review-page').show();
		  $(".submit-rating-btn").text("Processing...");
			$.ajax({
				url: uri,
				data: fd,
				type: 'post',
				contentType: false,
				processData: false,
				success: function(response) {
					reviewImages = [];
					if (response.success === true) {
					    $('.model-confirm-bt-info').addClass('modal-confirm-background-color-green');
					      modalBackgroundDisabledClick();
                        $('#infoModal').modal('open');
				 		$(".info-response-message").text(response.message);
						$('#review-box').removeClass('box-review');
						$('#review-alert').text('');
					} else if (response.reviewText === false) {
						if (response.reviewTextAlertMsg !== undefined) {
							$('#review-alert').text(response.reviewTextAlertMsg);
							$('#review-box').addClass('box-review');
						} else {
							$('#review-alert').text('');
						}
					}else if(response.reviewRating === false){
					 $('#review-rating-alert').text(response.reviewRatingErrorMsg);
					}else {
						alert(response.message);
					}
				 $('.loader-on-review-page').hide();
				 $(".submit-rating-btn").text("Submit Review");
				},
				complete: function(response) {
					reviewImages = [];
				},
				error: function(response) {
					reviewImages = [];
				}
			});
		}

	});
})(jQuery);

$('.confirm-info-btn').click(function() {
  location.href = $('#prductPageUrl').val();
})

document.addEventListener("DOMContentLoaded", init);
var AttachmentArray = [];
var arrCounter = 0;
var filesCounterAlertStatus = false;
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

function init() {
	if ($("#files").length > 0) {
		document
			.querySelector("#files")
			.addEventListener("change", handleFileSelect, false);
	}
}
var typeTostShown;
var sizeTostShown
function handleFileSelect(e) {
	typeTostShown = false;
	sizeTostShown = false;
	if (!e.target.files)
		return;
	var files = e.target.files;
	for (var i = 0, f; (f = files[i]); i++) {
		var fileReader = new FileReader();
		fileReader.onload = (function(readerEvt) {
			return function(e) {
				let processFurther = ApplyFileValidationRules(e, readerEvt);
				if (processFurther != false) {
					RenderThumbnail(e, readerEvt);
					FillAttachmentArray(e, readerEvt);
				}
			};
		})(f);

		fileReader.readAsDataURL(f);
	}
	document
		.getElementById("files")
		.addEventListener("change", handleFileSelect, false);
}

jQuery(function($) {
	$("div").on("click", ".img-wrap .close", function() {
		var id = $(this)
			.closest(".img-wrap")
			.find("img")
			.data("id");

		$(this)
			.closest(".img-wrap")
			.find("img").attr("src", " ");

		$("#files").val("");
		$(".fileinput-button").show();

		var elementPos = AttachmentArray.map(function(x) {
			return x.FileName;
		}).indexOf(id);
		if (elementPos !== -1) {
			AttachmentArray.splice(elementPos, 1);
			arrCounter = arrCounter - 1;
		}

		$(this).parent().find("img").not().remove();

		$(this).parent().find("div").not().remove();

		$(this).parent().parent().find("div").not().remove();

		var lis = document.querySelectorAll("#imgList li");
		for (var i = 0; (li = lis[i]); i++) {
			if (li.innerHTML == "") {
				li.parentNode.removeChild(li);
			}
		}
	});
}

);

function ApplyFileValidationRules(e, readerEvt) {

	if (CheckFileType(readerEvt.type) == false) {
		if (typeTostShown === false) {
			M.toast({ html: "You can only upload jpg/png" });
			typeTostShown = true;
		}
		e.preventDefault();
		return false;
	}

	if (CheckFileSize(readerEvt.size) == false) {
		if (sizeTostShown === false) {
			M.toast({ html: "Maximum file size for uploads should not exceed 20 MB" });
			sizeTostShown = true;
		}
		e.preventDefault();
		return false;
	}

	if (CheckFilesCount(AttachmentArray) == false) {
		if (!filesCounterAlertStatus) {
			filesCounterAlertStatus = true;
		}
		e.preventDefault();
		return false;
	}
}

function CheckFileType(fileType) {
	if (fileType == "image/jpeg") {
		return true;
	} else if (fileType == "image/png") {
		return true;
	} else {
		$("#files").val("");
		return false;
	}
}

function CheckFileSize(fileSize) {
	if (fileSize <= 20000000) {
		return true;
	} else {
		$("#files").val("");
		return false;
	}
}

function CheckFilesCount(AttachmentArray) {

	var len = 0;
	for (var i = 0; i < AttachmentArray.length; i++) {
		if (AttachmentArray[i] !== undefined) {
			len++;
		}
	}
	if (len > 4) {
		return false;
	} else {
		return true;
	}
}


function RenderThumbnail(e, readerEvt) {
	var li = document.createElement("li");
	ul.appendChild(li);
	li.innerHTML = [
		'<div class="img-wrap"> <span class="close">&times;</span>' +
		'<img class="thumb" style="border-radius: 8%;" src="',
		e.target.result,
		'" title="',
		escape(readerEvt.name),
		'" data-id="',
		readerEvt.name,
		'"/>' + "</div>"
	].join("");
	$("#files").val("");
	document.getElementById("Filelist").insertBefore(ul, null);
}

function FillAttachmentArray(e, readerEvt) {
	AttachmentArray[arrCounter] = {
		AttachmentType: 1,
		ObjectType: 1,
		FileName: readerEvt.name,
		FileDescription: "Attachment",
		NoteText: "",
		MimeType: readerEvt.type,
		Content: e.target.result.split("base64,")[1],
		FileSizeInBytes: readerEvt.size
	};
	arrCounter = arrCounter + 1;
	if (AttachmentArray.length >= 5) {
		$(".fileinput-button").hide();
	}
}
$("#Xbutton").bind({
	click: function() {
		var catUrl = $('#giftBoxUrlId').val();

		var checkUrl = $('#checkUrlId').val();
		if (actionValue === 'AddtoCart') {
			location.href = catUrl;
		} else {
			location.href = checkUrl;
		}
	}
});


//function checkForCustomerLogin() {
//    var uri = $('#prdctReviewUrl').val();
//    var auth = $('.writeReviwShow').data('auth');
//    if (auth === false) {
//        $('#loginModal').openModal();
//    } else {
//        location.href = uri;
//    }
//}
$(document).ready(function() {

           if ($('.recently-view-slider').length > 0) {
           $('.recently-view-slider').slick({
                     slidesToShow: 6,
                     slidesToScroll: 1,
                     arrows: true,
                     dots: true,
                     speed: 300,
                     infinite: false,
                     autoplay: false,
                     responsive: [
                        {
                           breakpoint: 991,
                           settings: {
                              slidesToShow: 6,
                              slidesToScroll: 1
                           }
                        },
                        {
                           breakpoint: 767,
                           settings: {
                              slidesToShow: 6,
                              slidesToScroll: 1
                           }
                        }
                     ]
                  });
                  }
           ;

  if ($('.observerForCategory').length > 0) {
         function dynamicViewPortFunction(categoryId, size, tabId) {
           let element = document.getElementById(tabId);

           if (!element) {
             console.error(`Element with ID '${tabId}' not found.`);
             return;
           }

           let animationTriggered = false;

           let observer = new IntersectionObserver(function (entries, observer) {
             entries.forEach(function (entry) {
               if (entry.isIntersecting && !animationTriggered) {

               if(categoryId===9999999999){
                 getRecentlyViewProducts(size);
               }else{
                 getCategoryProducts(categoryId, size);
               }

                 animationTriggered = true;
               }
             });
           });


           observer.observe(element);
         }

        // This function sets the dynamic viewport in home page for the 'Cakes' element with a category of 4 and a size of 16.
       if ($('#bestSeller-div').length > 0) {
            dynamicViewPortFunction(415, 16, 'bestSeller-div');
        }
        if ($('#bestSeller-div').length > 0) {
            // This function sets the dynamic viewport in home page for the 'Flowers' element with a category of 12 and a size of 16.
            dynamicViewPortFunction(416, 16, 'bestSeller-div');
        }
        if ($('#colorChange').length > 0) {
            // This function sets the dynamic viewport in home page for the 'Plants' element with a category of 959 and a size of 16.
            dynamicViewPortFunction(959, 16, 'colorChange');
        }
        if ($('#trending-gifts').length > 0) {
            // This function sets the dynamic viewport in home page for the 'Trending Gift' element with a category of 2044 and a size of 16.
            dynamicViewPortFunction(2047, 16, 'trending-gifts');
        }
        if ($('#personalized-bestseller').length > 0) {
            // This function sets the dynamic viewport in home page for the 'personalized-bestseller' category with a width of 2045 and a size of 16.
            dynamicViewPortFunction(2041, 16, 'personalized-bestseller');
        }
        if ($('#colorChange').length > 0) {
            // This function sets the dynamic viewport in home page for the 'Chocolate' element with a category of 1197 and a size of 16.
            dynamicViewPortFunction(1197, 16, 'colorChange');
        }
        if ($('#colorChange').length > 0) {
            // This function sets the dynamic viewport in home page for the 'Combo' element with a category of 690 and a size of 16.
            dynamicViewPortFunction(690, 16, 'colorChange');
        }
         if ($('.recentlyViewProductsSection').length > 0) {
        dynamicViewPortFunction(9999999999, 16, 'recentlyViewProductsSection');
        }
 }

	if ($('.about-us-slider').length > 0) {
		$('.about-us-slider').slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			arrows: true,
			dots: true,
			speed: 300,
			infinite: true,
			autoplaySpeed: 5000,
			autoplay: true,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	}
	;

	$(".toggle-password").click(function() {
		$(this).toggleClass("fa-eye-show");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
	if ($('.modal').hasClass('open')) {
		$('.CountryCodeList li').show();
	}
	$('.CountryCodeList li').click(function() {
		$(".searchTheKey").val('');
		var countryCode = $(this).attr('data-id');
		let countryLetter = $(this).attr('data-value');
		$('#loginCountryCode').val(countryCode);
		$('.countrySelect').text(countryCode);
		$('.countrySelect').attr('data-value', countryLetter);
		$('.signUpMb').val('');
		$('.output1').html('');
		$('.countryListModal').modal('close');
		if ($(".CountryCodeList").hasClass("counCodeLogin") && $("#emailTab").css('display') !== 'none' && countryCode !== 'undefined' && countryCode !== undefined) {
			onCapcthaEvent(countryCode);
		}
	});
	$('.modal-close1').click(function() {
		$('.countryListModal').modal('close');
	});
	$('.forgotPwdM').click(function() {
		$('#countryModalf').modal('close');
	})
	$(".searchTheKey").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".CountryCodeList > li,.CountryCodeList > li span").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	/* 1. Visualizing things on Hover - See next part for action on click */
	$('#stars li').on('mouseover', function() {
		var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
        $('#review-rating-alert').text('');
		// Now highlight all the stars that's not after the current hovered star
		$(this).parent().children('li.star').each(function(e) {
			if (e < onStar) {
				$(this).addClass('hover');
			} else {
				$(this).removeClass('hover');
			}
		});
	}).on('mouseout', function() {
		$(this).parent().children('li.star').each(function(e) {
			$(this).removeClass('hover');
		});
	});
	/* 2. Action to perform on click */
	$('#stars li').on('click', function() {
		var onStar = parseInt($(this).data('value'), 10); // The star currently selected
		var stars = $(this).parent().children('li.star');
		for (let i = 0; i < stars.length; i++) {
			$(stars[i]).removeClass('selected');
		}

		for (let i = 0; i < onStar; i++) {
			$(stars[i]).addClass('selected');
		}

		// JUST RESPONSE (Not needed)
		var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
		sendData(ratingValue);
	});
	$("#customerFeedbackForNo").hide();
	$("#ecustomerFeedbackForNo").hide();
	$("#customerFeedBackYes").click(customerFeedBackYes);
	$("#showCustomerFeedBackForNo").click(showCustomerFeedbackForNo);
	$("#saveCustomerFeedbackNo").click(saveCustomerFeedback);
	$(".mobileFeedback").click(showCustomerFeedbackForNo);
	$("#ecustomerFeedBackYes").click(eCustomerFeedBackYes);
	$("#eshowCustomerFeedBackForNo").click(eshowCustomerFeedbackForNo);
	$("#esaveCustomerFeedbackNo").click(saveCustomerFeedback);
	$("#recipientFeedback").click(saveRecipientFeedback);
});
function sendData(ratingValue) {
	//document.getElementById("rating").value = ratingValue;
	document.getElementById("rating").setAttribute('value', ratingValue);
}

$('#corporateQueryForm').submit(function(e) {
	e.preventDefault();
	var urlEdit = $('#url').val();
	var data = $('#corporateQueryForm').serialize();
	$.ajax({
		type: 'POST',
		url: urlEdit,
		data: data,
		success: function(response) {
			if (response.success === "true") {
				$('#message').html('<div style="background-color:#e6f7d2;padding:8px;font-size:15px;margin-bottom:16px;">' + response.message + '</div>');
				document.getElementById("company").value = "";
				document.getElementById("name").value = "";
				document.getElementById("email").value = "";
				document.getElementById("query").value = "";
				document.getElementById("mobileNumber").value = "";
				$(".submit_corporate_form").trigger("click");

				$(".card-image-size").css({ "height": "701px" });
			} else {
				$('#message').html('<div style="background-color:#ffb3b3;padding:8px;font-size:15px;margin-bottom:16px;">' + response.message + '</div>');
				$(".card-image-size").css({ "height": "701px" });
			}
		}
	});
});
$(document).ready(function() {
	var maxLength = 300;
	$(".show-read-more").each(function() {
		var myStr = $(this).text();
		if ($.trim(myStr).length > maxLength) {
			var newStr = myStr.substring(0, maxLength);
			var removedStr = myStr.substring(maxLength, (myStr).length);
			$(this).empty().html(newStr);
			$(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
			$(this).append('<span class="more-text">' + removedStr + '</span>');
		}
	});
	$(".read-more").click(function() {
		$(this).siblings(".more-text").contents().unwrap();
		$(this).remove();
	});
});
$(document).ready(function() {
	if ($(".thumbnail").length) {
		$('.myDIV img:first').addClass("small-img");
	}
	$(".thumbnail").hover(function() {
		var pId = $(this).data("bigurl");
		//        $(".bg-img").attr("src", pId);
		if ($(".myDIV img").hasClass("small-img")) {
			$(".myDIV img").removeClass("small-img");
		}
		$(this).addClass("small-img");
	});
});
function handler404() {
	alert("404 Error");
}
function handler500() {
	alert("500 Error");
}
function handler502() {
	M.toast({ html: 'Something went wrong, please try after some time' });
}
function loadDropzone() {
	Dropzone.autoDiscover = false;
	var myDropzone = new Dropzone("#imageContainer", {// Make the whole body a dropzone
		url: photoCakeUrl, // Set the url
		uploadMultiple: false,
		maxFilesize: 20,
		minFilesize: 50,
		timeout: 3000000000,
		maxThumbnailFilesize: 50,
		thumbnailWidth: 120,
		thumbnailHeight: 120,
		maxFiles: 1,
		clickable: true,
		acceptedFiles: "image/jpeg,image/png,image/jpg",
		addRemoveLinks: true,
		forceFallback: false,
		dictDefaultMessage: "Drop/select images here to upload",
		dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
		dictFileTooSmall: "File is too small ({{filesize}}MiB). Min filesize: {{minFilesize}}KB.",
		dictInvalidFileType: "Only image files are allowed (jpg, jpeg, png)",
		dictRemoveFile: "Remove",
		dictRemoveFileConfirmation: "Are you sure you want to remove this image",
		dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
		headers: {
			'X-XSRF-TOKEN': $("meta[name='_csrf']").attr("content")
		},
		success: function(file, response) {
			if (response.success === "true") {
				$("#imageURL").val(response.value);
				$("#imageURLError").hide();
				this.removeEventListeners();
			} else {
				if (file.previewElement !== null && file.previewElement.parentNode !== null) {
					file.previewElement.parentNode.removeChild(file.previewElement);
					var divset = document.getElementsByClassName("dz-default dz-message");
					for (var i = 0; i < divset.length; i++) {
						divset[i].style.display = "block";
					}

				}
				this.enable();
				this.removeAllFiles(true);
				$("#imageURLError").show();
				$("#imageURL").val("");
				$("#imageURLErrorMessage").text(response.errorMessage);
			}
		},
		removedfile: function(file) {
			this.enable();
			$("#imageURL").val("");
			$("#imageURLError").hide();
			if (file.previewElement != null && file.previewElement.parentNode != null) {
				file.previewElement.parentNode.removeChild(file.previewElement);
			}
			return this._updateMaxFilesReachedClass();
		},
		error: function(file, message) {
			$("#imageURLError").show();
			$("#imageURLErrorMessage").text("");
			$("#imageURLErrorMessage").text(message);
		}
	});
}

$(document).ready(function() {
	if ($(".header-secondary").length) {
		var lastScrollTop = 0;
		window.addEventListener('scroll', function(event) {
			var updateLastScrollTop = (window.pageYOffset || document.documentElement.scrollTop) - 50;
			if (updateLastScrollTop > lastScrollTop) {
				// downscroll code
				$(".header-secondary").hide(300);
			} else {
				// upscroll code
				$(".header-secondary").show(200);
			}
			lastScrollTop = updateLastScrollTop <= 0 ? 0 : updateLastScrollTop;
		}, false);
	}

	$("#same-day-content").show();
	var currentActive = sessionStorage.getItem('currentActiveNavigation');
	if (currentActive && currentActive !== null) {
		if ($(".homepage-content").length) {
			$(".mobile-navbar-bottom-link[name= home-navbar-bottom-link]").addClass("active");
			$(".home-outline").hide();
			$(".home-selected").show();
		} else if ($(".adobeMenuBanner").length) {
			$(".mobile-navbar-bottom-link[name= shop-navbar-bottom-link]").addClass("active");
			$(".shop-outline").hide();
			$(".shop-selected").show();
			$(".back-menu-button").show();
			$(".header-menu-button").hide();
		} else if ($(".city-content-mobile").length) {
			$(".mobile-navbar-bottom-link[name= city-navbar-bottom-link]").addClass("active");
			$(".city-outline").hide();
			$(".city-selected").show();
		} else if ($(".profile-content").length) {
			$(".mobile-navbar-bottom-link[name= account-navbar-bottom-link]").addClass("active");
			$(".account-outline").hide();
			$(".account-selected").show();
		}
	} else {
		$(".mobile-navbar-bottom-link[name= home-navbar-bottom-link]").addClass("active");
		$(".home-outline").hide();
		$(".home-selected").show();
	}
	if ($("#tabs-category-menu").length) {
		$('#tabs-category-menu').tabs();
	}
});
	if ($("#cityCountrySearchModel").length) {
		document.getElementById("scrollToNextFrame").style.zIndex = "1";
		}
$(document).ready(function() {
	var navbarHeight = ($(".white").height());
	if ($("#moreBelowButton").length) {
		$("#moreBelowButton").hide();
		var isScrolling;
		var scroll = false;
		var scrollPositionTop = 0;
		$("#moreBelowButton").hide();
		var bounding;
		var scrollHeight = window.innerHeight - navbarHeight;
		var testDiv = document.getElementById("hiddenDiv");
		setTimeout(function() {
			if (!scroll) {
				$("#moreBelowButton").show();
			}
		}, 3000);
		window.addEventListener('scroll', function(event) {
			scroll = true;
			$("#moreBelowButton").hide();
			scrollPositionTop = parseInt(document.documentElement.scrollTop);
			scrollHeight = window.innerHeight - navbarHeight;
			var element = document.getElementById('element');
			bounding = element.getBoundingClientRect();
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				scroll = false;
				$("#moreBelowButton").hide();
			} else {
				window.clearTimeout(isScrolling);
				isScrolling = setTimeout(function() {
					if (((window.innerHeight + window.scrollY) < document.body.offsetHeight) && bounding.bottom > window.innerHeight + 1) {
						$("#moreBelowButton").show();
					}
				}, 3000);
			}

			if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight + 600 || document.documentElement.clientHeight + 600)) {
				scrollHeight = bounding.bottom - window.innerHeight;
			}
		}, false);
		$("#scrollToNextFrame").click(function() {
			window.scrollTo({
				top: scrollPositionTop + scrollHeight,
				behavior: 'smooth'
			});
		});
	}
});
$(document).ready(function() {
	var popupHeightFromTop;
	var temporaryBlock = false;
	if ($("#callMePopUp").length) {
		$(window).on('load', function() {
			var pageHeight = $('body').height();
			var totalPages = $("#totalPagesInput").attr('value');
			totalPages = totalPages - 1;
			pageHeight = pageHeight * totalPages;
			popupHeightFromTop = pageHeight / totalPages;
			localStorage.setItem("closeCallUsPopup", "true");
		});
	}
	if ($(".corporate-product-card").length || $("#totalPagesInput").length) {
		window.addEventListener('scroll', function(event) {
			if (popupHeightFromTop && temporaryBlock) {
				var y = $(this).scrollTop();
				var openCallUsPopup = localStorage.getItem("closeCallUsPopup");
				if ((y > popupHeightFromTop) && openCallUsPopup === "true") {
					$('#callMePopUp').show();
				}
			}
			$(".corporate-product-card").click(function() {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		});
	}
});

function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
		var t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse('2020-02-13T23:59:59'));
//initializeClock('clockdiv', deadline);

$("#read-more").click(function() {
	var productDescriptionPosition = $("#productDescriptionHeading").position();
	window.scrollTo({
		top: productDescriptionPosition.top - 50,
	});
});

if ($("#search-mobile-input-home").length) {
	showHideSearchIcon("without-scroll");
	window.addEventListener('scroll', function(event) {
		showHideSearchIcon("with-scroll");
	});
}

function showHideSearchIcon(scroll) {
	var searchInput = document.getElementById("search-icon-mobile");
	var viewport = isAnyPartOfElementInViewport(searchInput);
	if (viewport) {
		if (scroll === "without-scroll") {
			$(".bg-mobile-search-icon").hide();
		} else {
			$(".bg-mobile-search-icon").hide(500);
		}
	} else {
		if (scroll === "without-scroll") {
			$(".bg-mobile-search-icon").show();
		} else {
			$(".bg-mobile-search-icon").show(500);
		}
	}
}
function isAnyPartOfElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	var rectTop = rect.top - 20;
	const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
	const vertInView = (rectTop <= windowHeight) && ((rectTop + rect.height) >= 0);
	const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
	return (vertInView && horInView);
}

function loadCartItems() {
	var jqxhr = $.ajax({
		url: cartItemsByAjax,
		type: "GET",
		cache: false,
		dataType: "json",
	});
	jqxhr.done(function(data) {
		if (data.success === "true") {
			$('body').find('#cartItemsAjaxWrapper').html(data.html);
			var currency = localStorage.getItem('userCurrency');
			changeCurrecies(currency);
		} else {
			alert(data.message);
		}
	});
	jqxhr.fail(function(data) {

	});
	jqxhr.always(function(data) { });
}

//recntlyViewesProduct
function rcpdCookie() {
	$.ajax({
		type: "POST",
		url: cookieUri,
		success: function(response) {
			if (response.success === "true") {
				getRecentViewProduct();
			} else {
			}
		},
		complete: function(response) {
		},
		error: function(response) {
		}
	});
}
function getRecentViewProduct() {
	$.ajax({
		type: "get",
		url: recentViewedproductUri,
		success: function(response) {
			if (response.success === "true") {
				$("#recentViewedProduct").html(response.html);
				var currency = localStorage.getItem('userCurrency');
				changeCurrecies(currency);
			} else {
				alert(response.message);
			}
		},
		complete: function(response) {
			// $('#fullPageLoader').addClass('hide');
		},
		error: function(response) {
		}
	});
}
$('.dropdown-trigger').dropdown({
	inDuration: 300,
	outDuration: 225,
	constrain_width: false, // Does not change width of dropdown to that of the activator
	hover: true, // Activate on hover
	//            gutter: 0, // Spacing from edge
	coverTrigger: false, // Displays dropdown below the button
	alignment: 'left' // Displays dropdown with edge aligned to the left of button
});

$(document).ready(function() {
	$('.collapsible').collapsible();
    const inputElement = document.getElementById('msgOnCakeAtt');
   const maxCharacters = $("#msgOnCakeAtt").attr("maxlength");
   if(maxCharacters !== null && typeof maxCharacters !== "undefined") {
        inputElement.addEventListener('input', function() {
           const currentText = this.value;
           if (currentText.length > maxCharacters) {
               this.value = currentText.substring(0, maxCharacters);
           }
           let setMaxMsgText = parseInt(maxCharacters- currentText.length);
           if(setMaxMsgText < 0) {
            $("#setMsgText").html(0 + " character(s) remaining")
           }else {
            $("#setMsgText").html(setMaxMsgText + " character(s) remaining")
           }
        });
   }
	$('select').formSelect();
});
function getAllCitiesName() {
	$.ajax({
		type: "get",
		url: allCitiesUrl,
		success: function(response) {

			if (response) {
				var cityResponseLength = response.length;
				var cities = "";
				for (var i = 0; i < cityResponseLength; i++) {
					var name = response[i].cityName;
					cities = cities + '<div data-city-name="' + name.toLowerCase() + '" class="col s12 city-name" style="background: white">' + name + '</div>'
				}
				$(".cityName").html(cities);
				$('.city-name').click( function(event){
				  let cityName = $(this).data('city-name');
				  if(cityName) {
					changeCurrentCity(cityName);
				  }
				});
			} else {
				alert(response.message);
			}
		},
		complete: function(response) {

		},
		error: function(response) {
		}
	});
}

$('#deliveryLocationSearch').keyup(function() {
	var query = $(this).val();
	$('.city-name').each(function() {
		if ($(this).text().search(new RegExp(query, "i")) < 0) {
			$(".detect-col").hide();
			$(".popular-cities").hide();
			$(this).hide();
			$(".other-cities").hide();
			$(this).removeClass("show-it");
		} else {
			$(".detect-col").show();
			$(".popular-cities").show();
			$(this).show();
			$(".other-cities").show();
			$(this).addClass("show-it");
			$('.nocityName').html("");
			var city = $(this).text().toLowerCase();
			city = city.replace(query, '<span class="search-found" style="font-weight: 600">' + query + '</span>');
			$(this).html("<span style='text-transform: capitalize'>" + city + "<span>");
		}
	});
	if ($(".show-it").length === 0) {
		$('.nocityName').html("<div class='col s12 no-city-name' style='background: white'>No Result Found</div>")
	}
});
function showAll() {
	$('.hide-part').show();
	$('.alert-successL').hide();
	$('.alert-dangerL').hide();
}
function outletReviewLink(uri) {
	$.ajax({
		type: "GET",
		url: uri,
		success: function(response) {
			$('#outletReviewLink').html(response.html);
		},
		eroor: function(response) {
		}, complete: function(response) {
		}
	});
}
function storeReviewBy(index) {
	var url1 = webAppWOR.storeReviewByUri;
	var reviewLinkValue = $("#wstorevalue_" + index).val();
	var reviewLinkType = $("#wstorekey_" + index).val();
	var winniStoreReviewId = $("#winniStoreReviewId").val();
	url1 = url1.replace("{reviewLinkType}", reviewLinkType);
	url1 = url1.replace("{winniStoreReviewId}", winniStoreReviewId);
	url1 = url1.replace(" ", "-");
	$.ajax({
		type: "GET",
		url: url1,
		success: function(response) {
			if (response.success === true) {
				window.location.href = reviewLinkValue;
			}
		},
		eroor: function(response) {
		}, complete: function(response) {
		}
	});
}


$(".mobile-navbar-bottom-link").click(function(e) {
	var currentActive = $(this).attr('name');
	sessionStorage.setItem("currentActiveNavigation", currentActive);
	if ($(".header-menu-button").hasClass("active-navbar-navigation")) {
		window.location = $(this).attr("href");
	}
})

$(".mobile-category-navbar-side-div").click(function() {
	$('.selected-div').removeClass('selected-div');
	$(this).closest('.mobile-category-navbar-side-div').addClass('selected-div');
	var showContentId = $(this).attr('name');
	$(".category-menu-list").hide();
	$("#" + showContentId).show();
})

$(".mobile-menu-expand-list").click(function() {
    var header = $(this);
    var content = header.next();
    var otherDivs = header.parent().siblings().find(".mobile-menu-expand-list").next();
    otherDivs.slideUp(500, function() {
        // Reset styles for other headers
        $(this).parent().children().css("font-weight", "400");
        $(this).parent().children().find(".expand-icon-plus").addClass("show-content").removeClass("hide-content");
        $(this).parent().children().find(".expand-icon-minus").removeClass("show-content").addClass("hide-content");
    });
    content.slideToggle(500, function() {
        header.text(function() {
            if (content.is(":visible")) {
                header.css("font-weight", "600");
                header.find(".expand-icon-plus").addClass("hide-content").removeClass("show-content");
                header.find(".expand-icon-minus").removeClass("hide-content").addClass("show-content");
                header.siblings().find(".expand-icon-minus").show();
                header.siblings().find(".expand-icon-plus").hide();
            } else {
                header.css("font-weight", "400");
                header.find(".expand-icon-plus").addClass("show-content").removeClass("hide-content");
                header.find(".expand-icon-minus").removeClass("show-content").addClass("hide-content");
                header.siblings().find(".expand-icon-minus").hide();
                header.siblings().find(".expand-icon-plus").show();
            }
        });
    });
});


$(".CakeFlowerInternational").click(function() {
  $(".mobile-menu-expand-list-content").show();
  	$(".expand-icon-minus").show();
  	$(".expand-icon-plus").hide();
});

/*function checkScore() {
 grecaptcha.ready(function () {
 grecaptcha.execute('6LcOppMUAAAAADBY9a75avCRRIGe2d5LLbBpkD31', {action: 'submit'}).then(function (token) {
 $("#scrval").val(token);
 });
 });
 }*/

$(".header-menu-button").click(function() {
	$(this).addClass("active-navbar-navigation")
	$("#shop-navbar-bottom-link").trigger("click");
})

$("#close-callus-modal").click(function() {
	$("#callMePopUp").hide();
	localStorage.setItem("closeCallUsPopup", "false");
});

$(".callmepopupcontent").click(function() {
	$(".callus-popup-input-fields").show();
});
$(".callUsSubmit").click(function(e) {
	addCustomerCallBack(e)
});
$(".continue-browsing").click(function() {
	$(".post-form-submit").hide();
	$(".callmepopupcontent").css("padding", "0");
});
function addCustomerCallBack(e) {
	e.preventDefault();
	$('#categoryPageUrl').val(window.location.href);
	var data = $('#contactUsForm').serialize();
	var jqxhr = $.ajax({
		url: webAppC.addCustomerCallBackUri,
		type: "POST",
		cache: false,
		data: data,
		dataType: "json",
		statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
			404: handler404,
			500: handler500,
			502: handler502
		}
	});
	jqxhr.done(function(data) {
		if (data.success === "true") {
			$(".initialize-text").hide();
			$("#close-callus-modal").hide();
			$(".post-form-submit").show();
			$(".callus-popup-input-fields").hide();
		} else {
			Materialize.toast(data.message, 5000);
		}
	});
	jqxhr.fail(function(data) {
	});
}
$('input[name="gstCheckbox"]').click(function() {
	if ($('input[name="gstCheckbox"]:checked').length > 0) {
		$(".gst-registration-selectbox").show();
		$(".gstin-number").show();
	} else if ($('input[name="gstCheckbox"]:checked').length === 0) {
		$(".gst-registration-selectbox").hide();
		$(".gstin-number").hide();
	}
});
$("#gstInformationForm").submit(function(e) {
	e.preventDefault();
	var form = $(this);
	var uri = form.attr('action');
	$.ajax({
		url: uri,
		type: 'post',
		data: form.serialize(), // serializes the form's elements.
		success: function(response) {
			if (response.success === "true") {
				$('#errorMessage').hide();
				$('#gstInformationForm').hide();
				$('#successGstMessage').show();
				$('#successMessageText').html(response.message);

			} else {
				$('#errorMessage').show();
				$('#errorMessageText').text(response.message);
			}
		},

		complete: function(response) {

		},
		error: function(response) {

		}
	});
});
function WriteCookie() {
	if ($(".tm-pseudo").length > 0) {
		document.cookie = "asdfsnetdjjkdcore=1;max-age=" + (60 * 60 * 24 * 15) + ";path=/";
	}
}

var presentCity = false;


$(document).ready(function() {
	if ($('.scrollspy').length > 0) {
		$('.scrollspy').scrollSpy({
			scrollOffset: 250,
			addClass: "active"
		});
		// Add scroll view on error/success message
		$(function() {
			if ($('.card-panel').length > 0) {
				$(window).scrollTop($('.card-panel').offset().top - 250);
			}
		});

		//Add class on body on scrolling
		var lastScrollTop = 0;
		$(window).scroll(function(event) {
			var st = $(this).scrollTop();
			if (st > lastScrollTop) {
				$('body').addClass('scrolling_down');
				$('body').removeClass('scrolling_up');
			} else {
				$('body').addClass('scrolling_up');
				$('body').removeClass('scrolling_down');
			}
			lastScrollTop = st;
		});
	}
});

$('.saved-address-box').on('click', '.deleteAddress', function(e) {
	var result = confirm("Want to delete?");
	if (result) {
		var url = $(this).data('uri');
		e.preventDefault();
		$.ajax({
			cache: false,
			url: url,
			type: 'post',
			success: function(response) {
				if (response.success === "true") {
					location.reload();
				}

			},
			complete: function(response) {

			},
			error: function(response) {
				alert("some error occured");
			}
		});
	}
});

function customerFeedBackYes() {
	$('#userfeedback').modal('close');
}
function showCustomerFeedbackForNo() {
	$("#customerFeedbackForNo").show();
	$("#cfb").hide();
}
function eCustomerFeedBackYes() {
	$("#feedbackDiv").hide();
}
function eshowCustomerFeedbackForNo() {
	$("#ecustomerFeedbackForNo").show();
	$("#ecfb").hide();
}
function saveCustomerFeedback(e) {
	e.preventDefault();
	var form = $(this).parent("div").parent("form");
	var url = form.attr('action');
	var data = $(this).parent("div").parent("form").serializeArray();
	var jsonData = {}
	//iterate over form elements
	$.each(data, function(i, v) {
		if (v.value !== "") {
			jsonData[v.name] = v.value;
		}
		delete jsonData["undefined"];
	});
	$.ajax({
		contentType: 'application/json; charset=utf-8',
		url: url,
		type: "POST",
		cache: false,
		data: JSON.stringify(jsonData),
		dataType: "json",
		headers: {
			'pageUrl': window.location.href
		},
		success: function(response) {
			if (response.success === "true") {
				resetCustomerCategoryFeedbackForm();
				var toastHTML = "<div>Thank you for the valuable feedback.</div>";
				M.toast({ html: toastHTML });
			} else {
				toastHTML = "<div>" + response.message + "</div>";
				M.toast({ html: toastHTML });
			}
		},
		complete: function(response) {
		},
		error: function(response) {
			alert("something went wrong");
		}
	});
}
function resetCustomerCategoryFeedbackForm() {
	$('#userfeedback').modal('close');
	$("#customerFeedbackForNo").hide();
	$('#customerFeedbackNo').trigger("reset");
	$("#ecustomerFeedbackForNo").hide();
	$('#ecustomerFeedbackNo').trigger("reset");
	$("#feedbackDiv").hide();
}
function categoryHide(index) {
	$('.showSliderCatAddons_' + index).slick('unslick');
	$("#button-see_" + index).hide();
	$("#button-back_" + index).show();
}
function categoryShow(index) {
	$('.showSliderCatAddons_' + index).not('.slick-initialized').slick({
		slidesToShow: 5,
		slidesToScroll: 3,
		arrows: true,
		infinite: false,
		autoplay: false,
		lazyLoad: 'ondemand',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	})
	$("#button-see_" + index).show();
	$("#button-back_" + index).hide();
}

$('.choose_relation li').click(function() {
	var spec = $('#relationId').find(":selected").val();
	var uri = $('#relationId').data('uri');
	uri = uri + spec;
	$.ajax({
		type: 'GET',
		url: uri,
		success: function(response) {
			if (response.success === "true") {
				$('#occasionId').html(response.html);
			}
		},
		error: function(response) {
			alert("Server error encountered");
		},
		complete: function(response) {

		}
	});
});
$('#relationId').change(function() {
	let selectedOccTxt = $("#occasionId option:selected").text();
	let specRel = $('#relationId').find(":selected").val();
	let uriRel = $('#relationId').data('uri');
	uriRel = uriRel + specRel;
	$.ajax({
		type: 'GET',
		url: uriRel,
		success: function(response) {
			if (response.success === "true") {
				$('#occasionId').html(response.html);
				$("#occasionId option:first").text(selectedOccTxt);
			}
		},
		error: function(_responserror) {
			alert("Server error encountered");
		}
	});
});
//If in gift finder relation previously selected
if ($('#relationId option').is(':selected')) {
	let specPrel = $('#relationId').find(":selected").val();
	let uriPrel = $('#relationId').data('uri');
	uriPrel = uriPrel + specPrel;
	$.ajax({
		type: 'GET',
		url: uriPrel,

		success: function(response) {
			if (response.success === "true") {
				$('#occasionId').html(response.html);
			}
		},
		error: function(response) {
			alert("Server error encountered");
		},
		complete: function(response) {

		}
	});
}
//Automatically Move Cursor to Next Field When Textbox Full
function movetoNext(current, nextFieldID) {
	if (current.value.length >= current.maxLength) {
		document.getElementById(nextFieldID).focus();
	}
}
function saveRecipientFeedback() {
	var url = $('#feedbackResponseUrl').val();
	var data = $('.recipient-feedback-rating-form').serializeArray();
	var jsonData = {}
	//iterate over form elements
	$.each(data, function(i, v) {
		if (v.value !== "") {
			jsonData[v.name] = v.value;
		}
		delete jsonData["undefined"];
	});
	$.ajax({
		contentType: 'application/json; charset=utf-8',
		type: 'POST',
		url: url,
		data: JSON.stringify(jsonData),
		success: function(response) {
			if (response.success === "true") {
				$(".feedbackDiv").remove();
				$(".feedbackSuccessDiv").html(response.html)
				$(".feedbackSuccessDiv").show();

			} else {
				$('.error-message').html(response.message);
			}
		}
	});
}
function loadCustomerGiftcard(custID) {
	$.ajax({
		url: customerGiftcard,
		type: 'get',
		data: { custID: custID },
		success: function(response) {
			if (typeof (response.data.status) !== 'undefined' && response.data.status === true) {
				$('#amountLabel').html(response.data.giftcardValue);
				$('#amountSpan').html(response.data.giftcardValue);
				$('#expiryDate').html(response.data.expiryDate);
				$('#userWalletModal').modal('open');
			}
		}
	});
}
//Disable scroll on input type number
if ($("#addressPin").length > 0) {
	let addressPinInput = document.getElementById("addressPin");
	addressPinInput.addEventListener("mousewheel", function() {
		this.blur();
	});
}
$("#searchTheCountry,#searchTheCountryListMobile").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$(".countryList  .d-space").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
});


$("#searchTheCountryList,#searchTheCountryListMobile").on("keyup", function() {
	let value = $(this).val().toLowerCase();
	$(".countryListPageInternational div").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		$('.noresults').hide();
	    $('#noResultFound').addClass('hide');
	    $('#noResultFound').removeClass('noresult-found');
		let noResult = true;
		$(".countryListPageInternational").children('div').each(function() {
			if ($(this).children(':visible').length != 0) {
				noResult = false;
				$('.list-of-other-country').show();
			}
		});
		if (noResult) {
			$('.noresults').show();
			$('.list-of-other-country').hide();
			$('#noResultFound').removeClass('hide');
			$('#noResultFound').addClass('noresult-found');
		}
	});
});
//Apply franchise form on submit
$('#franchiseQueryFormCms ,#franchiseQueryFormCmsMobile').submit(function(e) {
	e.preventDefault();
	let urlFormSubmit = $('#url').val();
	let data;
	if ($(window).width() < 767 && $('#franchiseQueryFormCmsMobile').length > 0) {
		data = $('#franchiseQueryFormCmsMobile').serialize();
	} else {
		data = $('#franchiseQueryFormCms').serialize();
	}
	$.ajax({
		type: 'POST',
		url: urlFormSubmit,
		data: data,
		success: function(response) {
			if (response.success === "true") {
				$('#message , #messageMobile').html('<div id="franchiseQuerySubmitResponse" style="text-align: center;padding:10px; margin-bottom:10px;color:green;">' + response.message + '</div>');
		        if ($(window).width() < 767 && $('#franchiseQueryFormCmsMobile').length > 0) {
					window.location.reload();
					document.getElementById("fenamem").value = "";
					document.getElementById("feMobilem").value = "";
					document.getElementById("feEmailm").value = "";
					document.getElementById("feCitym").value = "";
					document.getElementById("feProfessionm").value = "";
					document.getElementById("budgetm").value = "";
				} else {
				    window.location.reload();
					document.getElementById("fename").value = "";
					document.getElementById("feMobile").value = "";
					document.getElementById("feEmail").value = "";
					document.getElementById("feCity").value = "";
					document.getElementById("feProfession").value = "";
					document.getElementById("budget").value = "";
				}
			} else {
				$('#message , #messageMobile').html('<div id="franchiseQuerySubmitResponse" style="text-align: center;padding:10px; margin-bottom:10px;color:red;">' + response.message + '</div>');
			}
		}
	});
});
function onCapcthaEvent(countryCode) {
	if (countryCode !== 'undefined' && countryCode !== undefined) {
		var jqxhr = $.ajax({
			url: valCounCode.validateCountryCodeUri,
			type: "POST",
			cache: false,
			data: {
				countryCode: countryCode
			},
			dataType: "json",
			/*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
			statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
				404: handler404,
				500: handler500,
				502: handler502
			}
		});
		jqxhr.done(function(data) {
			if (data.success === "true") {
				if (countryCode !== '+91') {
					$('.cptcha').removeClass('hide');
					$('#captchaUuid').val(data.captchaUuid);
				} else {
					$('.cptcha').addClass('hide');
					$('#captchaUuid').val('');
				}
			} else {
				$('.cptcha').addClass('hide');
				$('#captchaUuid').val('');
			}

		});
		jqxhr.fail(function(data) {

		});
	}
}


$("select.news-filter").change(function() {
	let selectedFilter = $(".news-filter option:selected").text();
	if (selectedFilter === "Show By Month") {
		$(".allMonths").val(0).change();
		$(".year-select").val(0).change();
		$("#month-select").show();
	} else if (selectedFilter === "Show By Year") {
		$(".allMonths").val(0).change();
		$(".year-select").val(0).change();
		$("#month-select").hide();
	}
});
$("select.year-select").change(function() {
	newsfilter();
});

$("select.allMonths").change(function() {
	newsfilter();
});

function newsfilter() {
	let selectedYear = $(".year-select option:selected").val();
	let selectedMonth = $(".allMonths option:selected").val();
	$.ajax({
		url: newsFilterUri + "?selectedYear=" + selectedYear + "&selectedMonth=" + selectedMonth,
		type: "GET",
		dataType: "json",
		success: function(data) {
			if (data.success === true) {
				$("#news-list").html(data.html);
			}
		},
		error: function(response) {
			alert(response.message);
		}
	});
}
;
let currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 2013; i--) {
	$('.year-select').append($('<option>',
		{
			value: i,
			text: i
		}));

}
function showHideNews(id, id1, id2, id3, value) {
	if (value === 'more') {
		$('#' + id).hide();
		$('#' + id1).show();
		$('#' + id2).hide();
		$('#' + id3).show();

	} else {
		$('#' + id).show();
		$('#' + id1).hide();
		$('#' + id2).show();
		$('#' + id3).hide();
	}
}
function addContent() {
	let text = document.getElementById("one").innerHTML;
	document.getElementById("count1").innerText = text;
}
function addContent() {
	let text = document.getElementById("two").innerHTML;
	document.getElementById("count2").innerText = text;
}
function addContent() {
	let text = document.getElementById("three").innerHTML;
	document.getElementById("count3").innerText = text;
}

$("ul#international ul li a").click(function() {
	let headerText = this.text;
	if (headerText.includes("India")) {
		this.href = this.href + "?countryFlag=india";
	}
});
if ($('#flowerCitiesTab').length > 0) {
	document.getElementById("flowerCitiesTab").addEventListener("click", function() {
		document.getElementById("cakeCitiesHeading").classList.add("hidden");
		document.getElementById("flowerCitiesHeading").classList.remove("hidden");
	});
}
if ($('#cakeCitiesTab').length > 0) {
	document.getElementById("cakeCitiesTab").addEventListener("click", function() {
		document.getElementById("cakeCitiesHeading").classList.remove("hidden");
		document.getElementById("flowerCitiesHeading").classList.add("hidden");
	});
}


//Show Self Purchase popup
if ($("#askUserLoc").length > 0) {
	setTimeout(function() {
		triggerSelfPurchasePoPup();
		var selfPurchaseModalodalElement = document.querySelector('#askUserLoc'); // Replace 'modalId' with the actual ID of your modal
		// Check if the modal is  in  open stage
		var isSelfPurchaseModalOpen = selfPurchaseModalodalElement.M_Modal.isOpen;
		if (isSelfPurchaseModalOpen) {
			localStorage.setItem('checkAskUserLocPopupOpen', true);
		} else {
			localStorage.removeItem('checkAskUserLocPopupOpen');
		}
	}, 1000);
}
function triggerSelfPurchasePoPup() {
	var showSelfPurchasePoPup = true;
	if (typeof (Storage) !== "undefined") {
		var checkTimeOut = localStorage.getItem('expires');
		if (checkTimeOut > new Date()) {
			showSelfPurchasePoPup = false;
		}
	} else {
		showSelfPurchasePoPup = false;
	}
	if (showSelfPurchasePoPup === true) {
		$('#askUserLoc').modal("open");
		localStorage.removeItem("pageOpen");
		$('.modal-overlay').css("pointer-events", "auto");
		$('.modal-overlay').css("position", "fixed");
		if (typeof (Storage) !== "undefined") {
			var popPupTimeOut = new Date();
			popPupTimeOut = popPupTimeOut.setHours(popPupTimeOut.getHours() + 24);
			localStorage.setItem('expires', popPupTimeOut);
		}
	}
}
//Get user location coordinates
function getLocation() {
	localStorage.removeItem("pageOpen");
	let selectedCategoryName = localStorage.getItem("selectedCategoryName");
	localStorage.removeItem("selectedCategoryName");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			let data = { "longitude": position.coords.longitude, "latitude": position.coords.latitude, "blocked": false, "self": true, "categoryName": selectedCategoryName };
			$.ajax({
				url: saveGoogleCoordinatesUri,
				type: "POST",
				data: JSON.stringify(data),
				contentType: 'application/json'
			});
		}, function() {
			let data = { "blocked": true, "self": true, "categoryName": selectedCategoryName };
			$.ajax({
				url: saveGoogleCoordinatesUri,
				type: "POST",
				data: JSON.stringify(data),
				contentType: 'application/json'
			});
		});
	}
}
$('.orderForMySelf').click(function() {
	$('.orderForMySelftxt').css('display', 'inline-block');
	$('.orderForSomeoneElsetxt').css('display', 'none');
	let data = { "self": true };
	$.ajax({
		url: saveGoogleCoordinatesUri,
		type: "POST",
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
	$('.initialContent').css('display', 'none');
	$('.categoryContent').css('display', 'block');
	$('#chooseCategory').find('a').on("click", selectCategoryViaOrderForMySelf);
});

$(".orderForSomeoneElse").click(function() {
	$('.orderForSomeoneElsetxt').css('display', 'inline-block');
	$('.orderForMySelftxt').css('display', 'none');
	let data = { "self": false };
	$.ajax({
		url: saveGoogleCoordinatesUri,
		type: "POST",
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
	$('.initialContent').css('display', 'none');
	$('.categoryContent').css('display', 'block');
	$('#chooseCategory').find('a').on("click", selectCategoryViaOrderForSomeoneElse);
});
//store Selected category name in DB
function selectCategoryViaOrderForSomeoneElse() {
	let selectedCategoryName = $(this).find('img').attr('alt');
	let data = { "categoryName": selectedCategoryName, "self": false };
	$.ajax({
		url: saveGoogleCoordinatesUri,
		type: "POST",
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
	localStorage.removeItem("pageOpen");
}
function selectCategoryViaOrderForMySelf() {
	let selectedCategoryName = $(this).find('img').attr('alt');
	localStorage.setItem("selectedCategoryName", selectedCategoryName);
	let data = { "categoryName": selectedCategoryName, "self": true };
	$.ajax({
		url: saveGoogleCoordinatesUri,
		type: "POST",
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
	localStorage.setItem("pageOpen", "true");
}
let productListingPage;
let categoryCheck = $('#categoryName').val();
if (categoryCheck !== undefined && categoryCheck !== 'undefined') {
	productListingPage = categoryCheck;
}
if (productListingPage.length > 0 || $('.adbHomePage').length > 0) {
	if (localStorage.getItem("pageOpen") === 'true') {
		getLocation();
		localStorage.removeItem("pageOpen");
	}
}
//handle multiple modals  overlapping
$(document).ready(function() {
	$('#askUserLoc').modal({
		onCloseStart: function() {
			localStorage.removeItem('checkAskUserLocPopupOpen');
		}
	});
	$('#fuserModal').modal({
		onCloseEnd: function() {
			$('.modalFuser').css('max-width', '600px');
			localStorage.removeItem('checkFuserModalPopupOpen');
		}
	});
	//add express delivery countdown



	if ($('#expressCountDown').length > 0) {
		var serverCurrentHour = $('#serverCurrentHour').val();
		var serverCurrentMinute = $('#serverCurrentMinute').val();
		var serverCurrentSecond = $('#serverCurrentSecond').val();
		var counterPart = 0;
		let hours ;
		let minutes;
		let seconds;
		function formatTime(timeInSec) {
			 hours = pad2(Math.floor(timeInSec / 3600));
			 minutes = pad2(Math.floor((timeInSec % 3600) / 60));
			 seconds = pad2(Math.floor((timeInSec % 60)));
			return hours + ":" + minutes + ":" + seconds;
		}
		function pad2(number) {
			return (number < 10 ? '0' : '') + number;
		}
		function startExpressCountdown() {
			if (serverCurrentHour >= 13 && serverCurrentHour < 22) {
				$('#expressCountDown').removeClass('hide');
				$('#expressCountDown').show();
				var timeRemaining = (22 * 3600 - (parseInt(serverCurrentHour) * 3600 + parseInt(serverCurrentMinute) * 60 + parseInt(serverCurrentSecond)));
				var timeUpdateInSeconds = timeRemaining - counterPart;
				if (counterPart <= timeRemaining) {
					counterPart++;
					var countdownString = formatTime(timeUpdateInSeconds);
					 $('#addMinutes').text(minutes);
                     $('#addSeconds').text(seconds);
                     $('#addHours').text(hours);
                     $("#expressCountDown p").html(countdownString);
				} else {
					$('#expressCountDown').addClass('hide');
					$('#expressCountDown').hide();
				}
			} else {
				$('#expressCountDown').addClass('hide');
				$('#expressCountDown').hide();
				clearInterval(intervalClear);
			}
		}
		var intervalClear = setInterval(startExpressCountdown, 1000);
	}
});
$("#gift_button").click(function(e) {
	let specPrel = $('#relationId').find(":selected").val();
	let occasionId = $('#occasionId').find(":selected").val();
	if ((specPrel === '0' && occasionId !== '0') || (specPrel !== '0' && occasionId === '0')) {
		$('#occasionId').html(response.html);

	} else if (specPrel == '0' && occasionId === '0') {
		$("#errorMessages").show();
		setTimeout(function() {
			$("#errorMessages").hide();
		}, 3000);
		e.preventDefault();
	} else {
		$('#occasionId').html(response.html);
	}
});

$(document).ready(function() {
	const currentPage = parseInt($('#currentPage').val());
	const totalPages = parseInt($('#totalPages').val());
	const categoryId = parseInt($('#categoryId').val());
	const prevPage = parseInt($('#prevPage').val());
	const nextPage = parseInt($('#nextPage').val());
	const pageRange = 10;
	const firstPage = 1;
	let startPage;

	if (currentPage <= totalPages && ![970, 971].includes(categoryId)) {
		const paginationContainer = document.getElementById('pagination-container');
		const pageCounter = document.getElementById('pagination__counter');
		pageCounter.innerText = `Page ${currentPage} of ${totalPages}`;

		if (prevPage !== -1 && prevPage !== 0) {
			const prevLink = createPaginationLink('pagination__prev1', 'Previous', '#ED217C', '0 45px 0 0', generateUrl(prevPage));
			prevLink.onclick = prevPage;
			paginationContainer.appendChild(prevLink);
		}

		if (totalPages <= pageRange) {
			startPage = 1;
		} else if (currentPage <= 5) {
			startPage = 1;
		} else if (currentPage >= totalPages - 4) {
			startPage = totalPages - (pageRange - 1);
		} else {
			startPage = currentPage - Math.floor(pageRange / 2);
		}
		const endPage = Math.min(startPage + pageRange - 1, totalPages);
		for (let i = startPage; i <= endPage; i++) {
			if (i == startPage && i != firstPage) {
				const prevLink = createPaginationLink('pagination__prev2', firstPage, 'black', '', generateUrl(1));
				prevLink.onclick = prevPage;
				paginationContainer.appendChild(prevLink);
				const prevLink1 = createPaginationLink('pagination__prev2', '....', 'black', '0px 0px 0px -17px');
				paginationContainer.appendChild(prevLink1);
			}
			let pageNumber = parseInt(this.innerText);
			const pageLink = createPaginationLink('pagination__number', i, '', '0', generateUrl(i));
			pageLink.onclick = pageNumber;

			if (i === currentPage) {
				$('.pagination__prev1').toggleClass("hide", i === 1);
				pageLink.style.color = 'White';
				pageLink.style.background = '#ED217C';
				pageLink.style.padding = '0';
			}

			paginationContainer.appendChild(pageLink);
			if (i == endPage && i != totalPages) {
				const nextLink = createPaginationLink('pagination__next2', '....', 'black', '0px -10px 0px -1px');
				paginationContainer.appendChild(nextLink);
				const nextLink1 = createPaginationLink('pagination__next2', totalPages, 'black', '0px 12px 0px 0px', generateUrl(totalPages));
				paginationContainer.appendChild(nextLink1);
			}
		}
		if (currentPage !== totalPages) {
			const nextLink = createPaginationLink('pagination__next1', 'Next', '#ED217C', '', generateUrl(nextPage));
			nextLink.onclick = nextPage;
			paginationContainer.appendChild(nextLink);
		}
	}

	function createPaginationLink(className, text, color, margin, href) {
		const link = document.createElement('a');
		link.className = className;
		link.innerText = text;
		link.style.color = color;
		link.style.margin = margin;
		if (typeof href !== "undefined") {
			link.href = href;
		}
		return link;
	}
});

function addParam(url, param, value) {
   param = encodeURIComponent(param);
   let a = document.createElement('a');
   param += (value ? "=" + encodeURIComponent(value) : "");
   a.href = url;
   a.search += (a.search ? "&" : "") + param;
   return a.href;
}

function addOrReplaceParam(url, param, value) {
   param = encodeURIComponent(param);
   let r = "([&?]|&amp;)" + param + "\\b(?:=(?:[^&#]*))*";
   let a = document.createElement('a');
   let regex = new RegExp(r);
   let str = param + (value ? "=" + encodeURIComponent(value) : "");
   a.href = url;
   let q = a.search.replace(regex, "$1"+str);
   if (q === a.search) {
      a.search += (a.search ? "&" : "") + str;
   } else {
      a.search = q;
   }
   return a.href;
}

function generateUrl(page) {
	const sortByAttrName = $('#sortByAttrName').val();
	const minPrice = $('#minPrice').val();
	const maxPrice = $('#maxPrice').val();
	const filterDate = $('#filterDate').val();
	const showMain = $('#showMain').val();
	const fjr = $('#filtersSelectedJson').val();
	let _url = $('#requestUri').val();
	if(filterDate) {
		_url = addOrReplaceParam(_url, "date", filterDate);
	}
	if(page) {
		_url = addOrReplaceParam(_url, "page", page);
	}
	if(sortByAttrName) {
		_url = addOrReplaceParam(_url, "sort", sortByAttrName);
	}
	if(minPrice) {
		_url = addOrReplaceParam(_url, "minPrice", minPrice);
	}
	if(maxPrice) {
		_url = addOrReplaceParam(_url, "maxPrice", maxPrice);
	}
	if(showMain) {
		_url = addOrReplaceParam(_url, "showMain", showMain);
	}
	if(fjr) {
		_url = addOrReplaceParam(_url, "fjr", fjr);
	}
	return _url;
}
function deleteList(productId) {
	$(".listImgBlur_" + productId).css("opacity", ".1");
	$(".wishlistImage_" + productId).hide();
	$(".showWishListData_" + productId).show();
}
function cancelPopupList(productId) {
	$(".listImgBlur_" + productId).css("opacity", "1");
	$(".wishlistImage_" + productId).show();
	$(".showWishListData_" + productId).hide();
}

function franchiseNumber() {
	let mblVal = $(".inputMobile").val();
	$(".inputMobile").attr('maxLength', '10');
	if (mblVal.length !== 10 && mblVal.length > 1) {
		$(".countryCode").css("bottom", "40px");
		document.querySelector('.validMobile').innerHTML = `<span>Please enter correct phone number</span>`;
	}
	else {
		$(".countryCode").css("bottom", "18px");
		document.querySelector('.validMobile').innerHTML = '';
	}
}

$('#feMobile , #feMobilem').keypress(function(event) {
	if (event.keyCode == 46 || event.keyCode == 8) {
		return;
	}
	else {
		if (event.keyCode < 48 || event.keyCode > 57) {
			event.preventDefault();
		}
	}
});

function franchiseNumberM() {
	let mblValOne = $(".inputMobileOne").val();
	$(".inputMobileOne").attr('maxLength', '10');
	if (mblValOne.length !== 10 && mblValOne.length > 1) {
		$(".countryCode").css("bottom", "38px");
		document.querySelector('.validMobileOne').innerHTML = `<span>Please enter correct phone number</span>`;
	}
	else {
		$(".countryCode").css("bottom", "17px");
		document.querySelector('.validMobileOne').innerHTML = '';
	}
}
if ($("#ckDynContentWrapper").length > 0) {
	let startingProgress = $('#startingProgress').val();
	fetchNextQuestionResponse(0, startingProgress);
}
function fetchNextQuestionResponse(nextQId, progress) {
    let firstQuestionId=$("#firstQuestionId").val();
    let isWhatsapp=$("#isWhatsapp").val();
	$("#preloderForImage").show();
	let jqxhr = $.ajax({
		url: webApp.fetchQuestionResponseUri + "?nextQuestionId=" + nextQId + "&progress=" + progress + "&firstQuestionId=" +firstQuestionId + "&isWhatsapp=" +isWhatsapp,
		type: "GET",
		cache: false,
		dataType: "json",
		statusCode: {
			404: handler404,
			500: handler500
		}
	});
	jqxhr.done(function(data) {
		if (data.success === "true") {
			$("#ckDynContentWrapper").html(data.html);
			let width = data.progress;
			const progressBarFill = document.querySelector('.progress-bar-fill');
			if (progressBarFill != 'undefined') {
				progressBarFill.style.width = width + '%';
				$(".percentage").html(width + "% Completed");
			}
			$("#preloderForImage").hide();
		}
	});
	jqxhr.fail(function(data) {
	});
	jqxhr.always(function(data) {
	});
}
function saveQuestionResponse(e) {

	let selectedResponse = $('input[name=responseValue]:checked').val();
	let surveyQuestionResponseType = $('#surveyQuestionResponseType').val();
	let surveyId= $('#surveyId').val();
	let customerSurveyId= $('#customerSurveyId').val();
	if (typeof selectedResponse === "undefined" && surveyQuestionResponseType === 'RADIO') {
		$(".selectResponse").show();
	}  else {
		$("#preloderForImage").show();
		let data = $('#questionAndResponseDetailsForm').serialize();
		let jqxhr = $.ajax({
			url: webApp.saveResponseUri,
			type: "POST",
			cache: false,
			data: data,
			dataType: "json",
			statusCode: {
				404: handler404,
				500: handler500,
				502: handler502
			}
		});
		jqxhr.done(function(data) {
			if (data.success === "true") {
				if (data.isExistResponseReason === true) {
					fetchNextQuestionSubResponse(data.nextQuestionId, data.progress, data.responseId);
				} else {
					if (data.isLast === "false") {
						fetchNextQuestionResponse(data.nextQuestionId, data.progress);
					} else {
						window.location.href=webApp.showDemographicPage+"/"+surveyId+"/"+customerSurveyId;
						$("#parentDiv").hide();
						if ($("#orderItemSection").length > 0) {
							$("#orderItemSection").hide();
						}
						if ($("#orderItemSectionM").length > 0) {
							$("#orderItemSectionM").hide();
						}
						$("#preloderForImage").hide();
					}
				}
			}
		});
		jqxhr.fail(function(data) {
		});
		jqxhr.always(function(data) {
		});
	}
}
function saveQuestionResponseReason(e) {
	let selectedResponse = "";
	if (typeof selectedResponse === "undefined") {
		$(".selectResponse").show();
	} else {
		let data = $('#questionAndResponseReasonDetailsForm').serialize();
		let jqxhr = $.ajax({
			url: webApp.saveResponseReasonUri,
			type: "POST",
			cache: false,
			data: data,
			dataType: "json",
			statusCode: {
				404: handler404,
				500: handler500,
				502: handler502
			}
		});
		jqxhr.done(function(data) {
			if (data.success === "true") {
				if (data.isLast === "false") {
					fetchNextQuestionResponse(data.nextQuestionId, data.progress);
				} else {
					$("#thankuPage").show();
					$("#parentDiv").hide();
					if ($("#orderItemSection").length > 0) {
						$("#orderItemSection").hide();
					}
					if ($("#orderItemSectionM").length > 0) {
						$("#orderItemSectionM").hide();
					}
					$("#preloderForImage").hide();
				}
			}
		});
		jqxhr.fail(function(data) {
		});
		jqxhr.always(function(data) {
		});
	}
}
function saveUserDemographicResponse() {
    const data = $('#step-form').serializeArray();
    const jsonData = {};
    $.each(data, function() {
        jsonData[this.name] = this.value;
    });
    $.ajax({
        url: saveUserDemographicResponseUri,
        type: "POST",
        cache: false,
        data: JSON.stringify(jsonData),
        contentType: "application/json", // Correct Content-Type for JSON
        dataType: "json",
        statusCode: {
            404: handler404,
            500: handler500,
            502: handler502
        }
    }).done(function(response) {
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed: " + textStatus, errorThrown);
    })
    .always(function() {
    });
}
function fetchPreviousQuestionResponse(prevQId, progress) {
	$("#preloderForImage").show();
	let jqxhr = $.ajax({
		url: webApp.fetchQuestionResponseUri + "?previousQuestionId=" + prevQId + "&progress=" + progress,
		type: "GET",
		cache: false,
		dataType: "json",
		statusCode: {
			404: handler404,
			500: handler500
		}
	});
	jqxhr.done(function(data) {
		if (data.success === "true") {
			$("#ckDynContentWrapper").html(data.html);
			let width = data.progress;
			const progressBarFill = document.querySelector('.progress-bar-fill');
			if (progressBarFill != 'undefined') {
				progressBarFill.style.width = width + '%';
				$(".percentage").html(width + "% Completed");
			}
			$("#thankuPage").hide();
			$("#parentDiv").show();
			if ($("#orderItemSection").length > 0) {
				$("#orderItemSection").show();
			}
			if ($("#orderItemSectionM").length > 0) {
				$("#orderItemSectionM").show();
			}
			$("#preloderForImage").hide();
		}
	});
	jqxhr.fail(function(data) {
	});
	jqxhr.always(function(data) {
	});
}
function fetchNextQuestionSubResponse(nextQId, progress, responseId) {
	$("#preloderForImage").show();
	let jqxhr = $.ajax({
		url: webApp.fetchNextQuestionSubResponse + "?currentQuestionId=" + nextQId + "&selectedResponseId=" + responseId + "&progress=" + progress,
		type: "GET",
		cache: false,
		dataType: "json",
		statusCode: {
			404: handler404,
			500: handler500
		}
	});
	jqxhr.done(function(data) {
		if (data.success === "true") {
			$("#ckDynContentWrapper").html(data.html);
			let width = data.progress;
			const progressBarFill = document.querySelector('.progress-bar-fill');
			if (progressBarFill != 'undefined') {
				progressBarFill.style.width = width + '%';
				$(".percentage").html(width + "% Completed");
			}
			$("#preloderForImage").hide();
		}
	});
	jqxhr.fail(function(data) {
	});
	jqxhr.always(function(data) {
	});
}
function fetchPreviousQuestionResponseOrReason(prevQId, progress, exists, previousQuestionSelectedResponseId) {
	if (exists === true) {
		fetchNextQuestionSubResponse(prevQId, progress, previousQuestionSelectedResponseId);
	} else {
		fetchPreviousQuestionResponse(prevQId, progress);
	}
}
function charCount() {
	$(".charCount").show();
	let textlen = 1000 - $('#finalResp').val().length;
	$('#rchars').text(textlen);
}

function getCourierOrderTrackingDetail(trackingNumber) {
            $.ajax({
                type: "post",
                url: courierOrderTrackingDetailsUri+trackingNumber,
                success: function (response) {
                    if (response.success === "true") {
                        $("#courierOrderShipmentDetails").html(response.html);
                    } else {
                        alert(response.message);
                    }
                }

          });
}


function saveLastDemographicSectionResponse() {
	        const age = document.getElementById("age").value;
			 const gender = document.getElementById("gender").value;
			 const education = document.getElementById("education").value;
   			 const occupation = document.getElementById("occupation").value;
			 const lifeStage = document.getElementById("lifeStage").value;
  			 const surveyId = document.getElementById("surveyId").value;
  			 const customerSurveyId = document.getElementById("customerSurveyId").value;
  			 const income = document.getElementById("income").value;
  			 let valueExists;
  			 if (age !== "" ||gender !== "" ||education !== "" ||occupation !== "" ||lifeStage !== ""||income !== "") {
	          valueExists= false; // At least one of them has a value
             } else {
               valueExists= true; // None of them have a value
             }
             if(valueExists){
				   $("#validation").show();
				   return
			 }
  			 const data = {
		     age: age,
		     gender: gender,
		     education: education,
		     occupation: occupation,
		     lifeStage: lifeStage,
		     income: income,
		     surveyId: surveyId,
		     customerSurveyId: customerSurveyId,
		    };
                     let jqxhr = $.ajax({
                       url: webApp.saveDemographicUri,
                       type: "POST",
                       cache: false,
                       data: data,
                       dataType: "json",
                       statusCode: {
                           404: handler404,
                           500: handler500,
                           502: handler502
                       }
                   });
                   jqxhr.done(function (data) {
                     if (data.success === true) {
                       $("#thankuPage").show();
                       $("#responseDiv").hide();
                       }
                   });
                   jqxhr.fail(function (data) {
                   });
                   jqxhr.always(function (data) {
                   });
               }

$("#surveyResponseDemographicData").click(function(){
	$("#validation").hide();
});

$(document).ready(function () {
    // Handle tab click event
    $('.myWinnisidebar .tabs a').on('click', function (e) {
        e.preventDefault(); // Prevent the default behavior of the link

        // Get the href attribute of the clicked tab
        const targetUrl = $(this).attr('href');

        // Redirect to the target URL
        window.location.href = targetUrl;
    });

     $("#editMyWinnMobileAccount").on("click", function(e) {
           $("#dob, #pincode,#mobileNo,#name").prop("disabled", false);
           $("#email").addClass("textColorName");
            $("#dob, #pincode,#mobileNo,#name").removeClass("textColorName");
           $(".editGender").css("pointer-events", "auto");
           $(".showEditSaveBtn").show();
             let countryCodeElement = document.getElementById("country-code");
                const countryCode = countryCodeElement.innerText;
                $('.countryCodew').css("pointer-events","none");
                $('.countryCodew').css("color","#cccc");
                if(countryCode != '+91'){
                $('#mobileNo').attr('disabled', 'disabled');
                }
           $("#editMyWinnMobileAccount").hide();
       });

       $("#cancelMyWinnMobileAccount").on("click", function(e) {
           $("#dob, #pincode,#mobileNo,#name").prop("disabled", true);
           $("#name, #email, #mobileNo").removeClass("textColorName");
           $(".editGender").css("pointer-events", "none");
           $(".showEditSaveBtn").hide();
           $("#editMyWinnMobileAccount").show();
           location.reload();
       });

    $("#editAddrDsktp").on("click", function(e) {
        $("#dob, #pincode").prop("disabled", false);

    });
});


   //Customer Review JS Start
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function selectOption(option) {
  document.getElementById("selectedOption").textContent = option;
   localStorage.setItem("sortBy",option);
  toggleDropdown(); // Close the dropdown
}

$(document).click(function(event) {
  let dropdown = document.getElementById("myDropdown");
  let button = document.getElementById("dropdownButton");
  if (dropdown != "undefined" && dropdown != null && !dropdown.contains(event.target) && !button.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

function toggleDropdownOne() {
  document.getElementById("myDropdownOne").classList.toggle("showData");
}

function selectOptionOne(option) {
  document.getElementById("selectedOptionOne").textContent = option;
  localStorage.setItem("sortByRate",option);
  toggleDropdownOne(); // Close the dropdown
}

$(document).click(function(eventOne) {
  let dropdownOne = document.getElementById("myDropdownOne");
  let buttonOne = document.getElementById("dropdownButtonOne");
  if (dropdownOne != "undefined" && dropdownOne != null && !dropdownOne.contains(eventOne.target) && !buttonOne.contains(eventOne.target)) {
    dropdownOne.classList.remove("showData");
  }
});

$(document).ready(function() {
 let currentPage=$('.currentPage').val();
 let sortByRate=localStorage.getItem("sortByRate");
 let sortBy=localStorage.getItem("sortBy");
  let platformType;
        let width = $(window).width();
        switch (true) {
            case(width <= 767):
                platformType = "Msite";
                break;
            case(width > 767):
                platformType = "web";
                break;
            default:

        }
        $(".click-photo").click(function () {
            $("#imgPreview").modal('open');
            $("#modal-img").attr('src', $(this).attr('data-uri'));

        });
if($(".customer-review").length>0){
if($('.sortByRate').val()!=='' && $('.sortByRate').val()!==null && $('.sortByRate').val()!==undefined){
 document.getElementById("selectedOptionOne").textContent = sortByRate;
 }else{
 	localStorage.removeItem("sortByRate");
 }
 if($('.sortBy').val()!=='' && $('.sortBy').val()!==null && $('.sortBy').val()!==undefined){
 	 document.getElementById("selectedOption").textContent = sortBy;
 }else{
 	 localStorage.removeItem("sortBy");
 }
 }
let initialLoopValue= platformType==="Msite" ? 5 : 7;
	if(parseInt(currentPage) >parseInt(initialLoopValue)){
		 hideOrShowPageButtons(currentPage,initialLoopValue,platformType);
	}
});

function hideOrShowPageButtons(currentPage,initialLoopValue,platformType){
let loopValue=parseInt(currentPage)-parseInt(initialLoopValue);
	for(let m=1;m<=parseInt(loopValue);m++){
		$('#productPageCount_'+m).css("display","none");
		}
		if(platformType==="Msite"){
		for(let n=parseInt(currentPage);n>parseInt(loopValue);n--){
		$('#productPageCount_'+n).css("display","initial");
		}
		}else{
		for(let n=(parseInt(loopValue)+1);n<=parseInt(currentPage);n++){
		$('#productPageCount_'+n).css("display","initial");
		}
		}
}
//Customer Review JS End


   function hoverImage(element) {
        element.src = "https://assets.winni.in/groot/2023/11/20/desktop/header-image/user-icon.png";
    }

    function unhoverImage(element) {
        element.src = "https://assets.winni.in/groot/2023/11/20/user-icon-grey.png";
    }
    function setPageDefaults() {
        let minPrice = $("#minPrice").val();
        let maxPrice = $("#maxPrice").val();
        let priceFilterIndex = calculatePriceFilterIndex(minPrice, maxPrice);
        let sortByAttrName = $("#sortByAttrName").val();

        setPriceFilterSelection(priceFilterIndex);
        setSortByFilterSelection(sortByAttrName);
    }

    function calculatePriceFilterIndex(minPrice, maxPrice) {
        // Switch is used here for distinct cases even though there are fewer than three cases
        switch (maxPrice) {
            case "499":
                return 1;
            case "999":
                return 2;
            case "1499":
                return 3;
            case "2499":
                return 4;
            default:
                return (minPrice == "2500") ? 5 : 0;
        }
    }

    function setPriceFilterSelection(priceFilterIndex) {
        // Use a default value if priceFilterIndex is 0
        $(".price-filter-selection").val(priceFilterIndex === 0 ? "0" : priceFilterIndex);
    }

    function setSortByFilterSelection(sortByAttrName) {
        // Switch is used here for distinct cases even though there are fewer than three cases
        switch (sortByAttrName) {
            case "":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                $(".sort-by-filter-selection").val(sortByAttrName || "1");
                break;
            default:
                $(".sort-by-filter-selection").val("1");
                break;
        }
    }


    function getDateByPLP() {
        $(".datepicker-done").on("click", function() {
           $('.picker-modal').modal('close');
           const filterDate = $("#deliveryDatePicker").val();
           $("#filterDate").val(filterDate);
            location.href = generateUrl();
       });
    }

    function openDatePickerModal(e) {
        $('.picker-modal').modal();
        $('.picker-modal').modal('open');
        $(".picker-modal-header-text").html("Select Delivery Date3");
        $(".picker__holder").show();
        $(".time-slot").remove();
        $(".collection").remove();
        $('.no-delivery').remove();
        let input = $('#deliveryDatePicker' ).datepicker({
                minDate: new Date(),
                format: 'dd-mm-yyyy',
                defaultDate: new Date(),
                hideName: true,
                closeText: 'Clear',

        });
            $('.datepicker-done').text('Continue');
            $(".is-selected").css("background-color", "#CEE4C2");
            $(".is-selected").css("background-color", "color: #000;");

            let filterDateSelected = $("#filterDate").val();
          	if(filterDateSelected) {
          		let parts = filterDateSelected.split("-");
          		let selectedDate = new Date(parseInt(parts[2], 10),parseInt(parts[1], 10) - 1,parseInt(parts[0], 10));
          		$('.modal-datePicker-input').datepicker("setDate",selectedDate);
          	}
        let picker = M.Datepicker.getInstance(input);
        picker.open();
        e.stopPropagation();
        getDateByPLP();
        const userDeviceType = navigator.userAgent.match(/(iPhone|iPod)/g);
        if (userDeviceType) {
            $(".selects-container").css("pointer-events", "none");
        }
    }

function backToPrevious() {
    $(".picker-modal").modal('close');
    location.reload();
};

$("#resetSortBy").on("click", function() {
     $('#sortByAttrName').val("");
     window.location.href = generateUrl();
});

if ($('#check-sort-filter').length > 0) {
    let radioButtons = document.querySelectorAll('input[name="sort-category"]');
     radioButtons.forEach(function(radioButton) {
       radioButton.addEventListener('click', function() {
         let selectedValue = document.querySelector('input[name="sort-category"]:checked').getAttribute('data-sort');
         $("#sortByAttrName").val(selectedValue);
          window.location.href = generateUrl();
       });
     });
}
    $(".sameDayCategoryExpend").click(function() {
      $(".mobile-menu-expand-list-content").show();
      	$(".expand-icon-minus").show();
      	$(".expand-icon-plus").hide();
    });

function bytesToBase64(bytes) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}
  function selectCurrency(selectedCurrencyKey) {
    const prevSelectedElement = document.querySelector('.currency.selected-currency');
    if (prevSelectedElement) {
      prevSelectedElement.classList.remove('selected-currency');
    }
    const selectedElement = document.querySelector(`.currency[data-value="${selectedCurrencyKey}"]`);
    if (selectedElement) {
      selectedElement.classList.add('selected-currency');

    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    const storedCurrency = localStorage.getItem('userCurrency');
    if (storedCurrency) {
      selectCurrency(storedCurrency);
    }
  });

    $(document).on('input', '#question', function(event) {
        const maxLength = 100;
        let inputValue = $(this).val();

        if (inputValue.length > maxLength) {
            $(this).val(inputValue.substring(0, maxLength));
            inputValue = $(this).val();
        }

        let remaining = maxLength - inputValue.length;
        $('#characterCount').text(Math.max(0, remaining) + ' character(s) remaining');
    });

    $("#informationIconId").on("click touchstart", function(event) {
        let productDescriptionPosition = $(".productContentAutoScroll").position();
        window.scrollTo({
            top: productDescriptionPosition.top - 60,  //  the number 60 is subtracted from the “productDescriptionPosition.top" value when scrolling to a particular position on the page. This subtraction is used to adjust the final scroll position.
            behavior: 'smooth'
        });
    });
    function loadDataEmptyWishList(url, params, className) {
        $(".preloderForImage").show();
        let jqxhr = $.ajax({
            url: `${url}?${params}`,
            type: "GET",
            cache: false,
            dataType: "json",
            statusCode: {
                404: handler404,
                500: handler500,
            },
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                $(".preloderForImage").hide();
                 $(className).html(data.html);
                let currency = localStorage.getItem("userCurrency");
                changeCurrecies(currency);
            }
        });
        jqxhr.fail(function (data) { });
        jqxhr.always(function (data) { });
    }

    function loadTrendingGifts(categoryId, size, viewType) {
        let url = webApp.getCategoryProducts;
        let params = `categoryId=${categoryId}&size=${size}&parentView=${viewType}`;
        loadDataEmptyWishList(url, params, ".trendingGiftsEmptyWishlist");
    }

    function getRecentlyViewProductsWishlist(size, viewType) {
        let url = webApp.getRecentlyViewProducts;
        let params = `size=${size}&parentView=${viewType}`;
        loadDataEmptyWishList(url, params, ".recentlyViewWishlistSection");
    }

    function getRecentViewProductForMobile(viewType) {
        let url = recentViewedproductUri;
        let params = `parentView=${viewType}`;
        $("#show-with-response-mobile").removeClass("hide");
        loadDataEmptyWishList(url, params, "#recentViewedProductEmptyWishlistMobile");
    }
    $(document).ready(function () {
        if ($(".empty-wishlist-observer").length > 0) {
            let element = document.getElementById('trending-gifts-empty-wishlist');
            if (element) {
                const categoryId = element.getAttribute('attr-categoryId');
                loadTrendingGifts(categoryId, 6, 'GRID_VIEW');
                getRecentlyViewProductsWishlist(6, 'GRID_VIEW');
                if ($("#recentViewedProductEmptyWishlistMobile").length > 0) {
                    getRecentViewProductForMobile("GRID_VIEW");
                }
            }
        }
    });
	
	$('#myDropdown a').click( function(event){
	  selectOption($(this).data('option'));
	  window.location.href = $(this).data("uri");
	});
	
	$('#myDropdownOne a').click( function(event){
	  selectOptionOne($(this).data('option'));
	  window.location.href = $(this).data("uri");
	});

$("#selectedMale, #selectedFemale").on('change', function() {
    if ($("#selectedMale").is(':checked')) {
        $(".selected-female").attr('src', $(".selected-female").data('src-non-selected')).removeClass('highlight').addClass("add-extra-space-female");
        $(".selected-male").attr('src', $(".selected-male").data('src-selected')).addClass('highlight').removeClass("add-extra-space");
    } else if ($("#selectedFemale").is(':checked')) {
        $(".selected-male").attr('src', $(".selected-male").data('src-non-selected')).removeClass('highlight').addClass("add-extra-space");
        $(".selected-female").attr('src', $(".selected-female").data('src-selected')).addClass('highlight').removeClass("add-extra-space-female");
    }
});
    let popularCitiesModalId = document.getElementById('popularCitiesModal');
    let instancePopularCitiesModal = M.Modal.init(popularCitiesModalId);
    let mainModalInDesktop = document.getElementById('openCitySearchModal');
    let instanceMainModalInDesktop= M.Modal.init(mainModalInDesktop);
	$('.bg-city').click( function(event){
	  if($("#countryCitySearchDesktop").length>0){
          instancePopularCitiesModal.close();
        }
	  let cityName = $(this).data('city-name');
	  if(cityName) {
		changeCurrentCity(cityName);
	  }
	});

function changeCurrentCity(cityName) {
   let routePath=window.location.href;
    $.ajax({
           url: changeCurrentCityUrl,
           type: "POST",
           data: {
         "cityName" :cityName,
         "requestUri" :window.location.pathname
      },
           success: function (res) {
               if (res.success === true) {
                   if($(".desktop-deliveryIn-modal__main").length>0){
                        if(routePath.includes("?c=") || currentCountryId!=41){ //41 is a country code for india
                           window.location.replace(cityUrl);
                           instanceMainModalInDesktop.close();
                       }else{
                        if(routePath.includes("/stores")){
                             window.location.replace('/');
                        }else{
                        if(res.requestUri !== 'undefined' && res.requestUri !=null){
                          window.location.href=res.requestUri;
                        }else{
                        window.location.reload();
                        }
                        }
                         instancePopularCitiesModal.close();
                       }
                   }else{
                    window.location.replace(cityUrl);
                    instanceMainModalInDesktop.close();
                   }
               }
           },
           error: function (err) {
               console.error(err.message);
           }
       });
}
	  if($(".desktop-deliveryIn-modal__main").length>0){
          $("#openCitySearchModalCloseIcon").on('click',function(){
            instanceMainModalInDesktop.close();
           $('#openCitySearchModal').modal({closeOnClick: true})
           $('#deliveryInCitySearcModal .modal-overlay').css({'display':'none'});
          })
      }
    let desktopSearchInput = document.getElementById('search-input-in-desktop');
    let mobileSearchInput = document.getElementById('mobileSearchInput');
    let searchIcon = document.getElementById('searchIconImg');
    let searchDropdowns = document.querySelectorAll('.search-dropdown-by-category,.search-dropdown-by-category-mobile');

    function handleRecentSearch(searchTerm) {
	    if (searchTerm) {
            let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            recentSearches.unshift(searchTerm);
            recentSearches = recentSearches.slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            updateRecentSearches();
            inputElement.value = '';
        }
    }

    function updateRecentSearches() {

        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        searchDropdowns.forEach(dropdown => {
            let header = dropdown.querySelector('.trending-shortcut__header');
            let searchItemsContainer = dropdown.querySelector('.trending-shortcut,.trending-shortcut-mobile');
            let existingItems = searchItemsContainer.querySelectorAll('.search-item,.search-item-mobile');
            if (recentSearches.length > 0) {
                header.classList.remove('hide');
            } else {
                header.classList.add('hide');
            }
            existingItems.forEach(item => item.remove());
         recentSearches.forEach(term => {
             let anchorTag = document.createElement('a');
              anchorTag.classList.add('user-search-item-tag');
              anchorTag.href = recentSearchUrl + term;
              anchorTag.addEventListener('click', function(event) {
                 event.preventDefault();
                 updateRecentSearchTerm(term);
                 window.location.href = this.href;
             });
             let searchItem = document.createElement('div');
             searchItem.className = 'search-item';
             let spanTag = document.createElement('span');
             spanTag.classList.add('align-span-tag');
             spanTag.textContent = term;
             const searchIconTemplateContent = document.getElementById('searchIconTemplate').innerHTML;
             searchItem.innerHTML = searchIconTemplateContent;
             searchItem.appendChild(spanTag);
             anchorTag.appendChild(searchItem);
             searchItemsContainer.appendChild(anchorTag);
         });
        });
    }
   function updateRecentSearchTerm(term) {
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        recentSearches = recentSearches.filter(item => item !== term);
        recentSearches.unshift(term);
        recentSearches = recentSearches.slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
    function handleSearchAction(event) {
        if (event.type === 'keypress' && event.key === 'Enter') {
            handleRecentSearch(event.target.value.trim());
            event.preventDefault();
        } else if (event.type === 'click') {
			let searchInputValue = $("#search-input-in-desktop").val();
            if (searchInputValue) {
                handleRecentSearch(searchInputValue);
            }
        }
    }
    if($("#search-input-in-desktop").length>0){
     searchIcon.addEventListener('click', handleSearchAction);
     desktopSearchInput.addEventListener('keypress', handleSearchAction);
    }
    if($("#mobileSearchInput").length>0){
     mobileSearchInput.addEventListener('keypress', handleSearchAction);
    }
     updateRecentSearches();


function toggleMenu(buttonClass, menuClass) {
    const button = $(buttonClass);
    const menu = $(menuClass);
    button.toggleClass("hide");
    menu.toggleClass("hide");
}

// Event listeners
$("#toggle-button, .clickable-circle").on('click', function() {
    toggleMenu(".eye-btn", ".action-menu");
});

$("#toggle-button-help, .clickable-circle-help").on('click', function() {
    toggleMenu(".eye-btn-help", ".action-menu-help");
});


 document.addEventListener('DOMContentLoaded', function() {
   document.querySelectorAll('.fixed-action-btn');
   M.FloatingActionButton.init( {
      direction: 'left',
      hoverEnabled: false,
      toolbarEnabled:false
    });
  });

      $('.phone-dialog-open').on('click touchstart', function(event) {    event.preventDefault();
        window.location.href = 'tel:+91-7829463510';
    });


    $('.open-whatsapp-application').on('click', function(event) {
        event.preventDefault();
        window.location.href = `https://api.whatsapp.com/send/?phone=7657853799`;
    });
$('.chatSectionOpen').click( function () {
     window.location.href = contactUsUrl;
  });
function initLimeChat() {
    if($('body').hasClass('contact-us')){
	  (function(d,t) {
              let BASE_URL="https://app.limechat.ai";
              let g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src="https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/LC_sdk/v1/sdk.js";
              g.defer = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                  window.chatwootSDK.run({
                      websiteToken: 'ZcjtoW14cRXCqhDNXhFYRiUx',
                      baseUrl: BASE_URL,
                      sound: false
                  })
              }
          })(document,"script");
	}
}

function cleanTextInput(value) {
    return (value || '')
        .replace(/[^\p{L} .'-]/gu, '')
        .trim()
        .replace(/\s+/g, ' ');
}

$('.corporate__name, .corporate__companyName').on('input blur', function () {
    this.value = cleanTextInput(this.value);
});
$('.corporate__mobileNumber,#ctcMobile').on('input', function () {
    this.value = this.value.replace(/\D/g, '').substring(0, 15); // only digits, max 15
});

