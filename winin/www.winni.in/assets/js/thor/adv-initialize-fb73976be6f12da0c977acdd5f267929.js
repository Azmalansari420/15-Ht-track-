    let add_wishList = $("#add_wishlist").val();
    let delete_wishList = $("#delete_wishlist").val();
function updateWishlist(itemCount) {
    $("#wishlist_item").html(itemCount);
    if (itemCount !== 0) {
        $("#setImageWithHeart, #setImageWithHeartDesktop").attr("src", add_wishList);
    } else {
        $("#setImageWithHeart, #setImageWithHeartDesktop").attr("src", delete_wishList);
    }
}

function adVtrInt() {
    $.ajax({
        type: "GET",
        url: advstit,
        data: {
            lp: document.URL,
            rf: document.referrer
        },
        dataType: "json",
        success: function (response) {
            if (response.status === true) {
				let xcrtkn = getCookie("XSRF-TOKEN");
				if (xcrtkn != null) {
					$("meta[name='_csrf']").attr("content", xcrtkn);
				}
                $("#cart_item").html(response.cartItemCount);
                updateWishlist(response.itemCount);
                if (response.currentCity !== null && response.currentCity !== 'undefined') {
                    $("#current_city").html( response.currentCity.currentCityName);
                           if(response.currentCity.currentCityCountryId===41){
                            $(".current_city_desktop").html("Deliver to " + response.currentCity.currentCityPincode + "," + response.currentCity.currentCityName);
                            $(".editLoc").attr("data-sessionCity", response.currentCity.currentCityPincode + "," + response.currentCity.currentCityName);
                            $(".editLoc").attr("data-sessionState", response.currentCity.currentCityName);
                           }else{
                            $(".current_city_desktop").html("Deliver to " + response.currentCity.currentCityName);
                             setCityForInternational(response);
                          }
                    if(response.currentCity.currentCityPincode){
                       $("#current_city_detail").html(response.currentCity.currentCityName +", "+response.currentCity.currentStateName +" - " + response.currentCity.currentCityPincode );
                       $("#currentCityDetailMobile").html(response.currentCity.currentCityName +" - " + response.currentCity.currentCityPincode );
                    }else{
                        $(".current_city_desktop").html("Deliver to " + response.currentCity.currentCityName);
                        setCityForInternational(response);
                     }
                }
                let item_carts = response.cartItemCount;
                if (item_carts > 0 && $('#cartItemsAjaxWrapper') !== null && $('#cartItemsAjaxWrapper').length) {
                    loadCartItems();
                    $("#cartItemsAjaxWrapper").show();
                }
                if (response.userName !== null && response.userName !== 'undefined') {
                    $(".loggedUser").show();
                    $(".isAnonymous").hide();
                    $("#userName").html(response.userName);
                    $("#userEmailId").html(response.userEmailId);
                } else {
                    $(".loggedUser").hide();
                    $(".isAnonymous").show();
                }
				if (response.currentSelectedPincode !== null && typeof response.currentSelectedPincode !== 'undefined') {
					if (!$(".editLoc").hasClass('internationalCountry')) {
					     $(".editLoc").attr("data-sessionCity", response.currentSelectedPincode);
                        if($(".strip-delivery-in-desktop").length>0){
                          $('.editLoc').text("Deliver to " + response.currentSelectedPincode);
                        }else{
                          $('.editLoc').text("Deliver to " + response.currentSelectedPincode);
                        }
						$('.imgTopEdit').removeClass('hide');
						$('.imgTopNormal').addClass('hide');
					}
				}
            }
        },
        error: function (response) {
        },
        complete: function (response) {
        }
    });
}
function setCityForInternational(response) {
    let currentStateName = response.currentCity.currentStateName;
    if (response.currentCity.currentStateName === 'Saudi Arabia') {
        currentStateName = 'Saudi-Arabia';
    }
    let sessionCity = response.currentCity.currentCityCountryName + "," + currentStateName +"," + response.currentCity.currentCityName.split(",")[0];
    if (response.currentCity.currentCityCountryName.toLowerCase() === currentStateName.toLowerCase()) {
        sessionCity = response.currentCity.currentCityName;
    };
    $(".editLoc").attr("data-sessionCity", sessionCity);
    $(".editLoc").attr("data-sessionState", response.currentCity.currentCityStateCode);
}
function bindAjaxLoadingEvents() {
	$(document).ajaxStart(function() {
		$('#fullPageLoader').removeClass('hide');
	});

	$(document).ajaxStop(function() {
		$('#fullPageLoader').addClass('hide');
	});
}

function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  let xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}
function modalBackgroundDisabledClick() {
    $('#infoModal').modal({
        dismissible: false,
        opacity: 0.5
    });
}