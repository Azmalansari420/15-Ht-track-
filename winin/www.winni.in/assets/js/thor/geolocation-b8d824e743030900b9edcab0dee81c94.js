const options = {
	  	enableHighAccuracy: true,
	  	timeout: 10000,
	};
	const successCallback = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		fetchGeoAddress(latitude,longitude);
	};

	const errorCallback = (error) => {
	  	let errorMessage ;
	  	switch (error.code) {
	        case error.PERMISSION_DENIED:
	            console.error("User denied the request for geolocation.");
	            errorMessage = "Oops! It seems like you have denied location permission for Winni. Please allow location permission from browser settings.";
	            break;
	        case error.POSITION_UNAVAILABLE:
	            console.error("Location information is unavailable.");
	            errorMessage = "Location information is unavailable. Please try again.";
	            break;
	        case error.TIMEOUT:
	            console.error("The request to get user location timed out.");
	            errorMessage = "The request to get user location timed out. Please try again.";
	            break;
	        case error.UNKNOWN_ERROR:
	            console.error("An unknown error occurred.");
	            errorMessage = "Location information is unavailable. Please try again.";
	            break;
	    }

	    if(errorMessage) {
			$("#model-geolocaion-notification").html("<div class='location-notif-pop notif-sec-05'><div class='ntif-msg notif-sec-05'>"+errorMessage+"</div><div class='notif-btn-ok'><button class='notif-sec-03 notif-sec-02 notif-sec-04' onclick='hideLocationConfirmPopup()'>Ok, got it</button></div></div>");
			setTimeout(() => {
	            hideLocationConfirmPopup();
	        }, 5000 );

		}
	};

	function hideLocationConfirmPopup () {
	   $("#model-geolocaion-notification").html("");
	}
	function fetchCurrentLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
			  successCallback,
			  errorCallback,
			  options
			);
		} else {
		    console.error("Geolocation is not available in this browser.");
		}
	}

	function fetchGeoAddress(latitude,longitude) {
	    let geoLocationReqData = {"latitude" :latitude,"longitude" :longitude};
		$.ajax({
			url: fetchGeoAddressUri,
			type: "POST",
			data : JSON.stringify(geoLocationReqData),
			contentType: "application/json",
			success: function(data) {
				if(data.success ==="true") {
                getGeoAddresses(data);
				}else {
					console.log("Failed to fetch user geolocation",errorMessage);
				}
			},
			error: function(response) {
				console.log("fetchGeoAddress error response :",response)
				if(response.message) {
					console.log("Error while fetching user geolocation",response.message);
				}
			}
		});
	}

	function getGeoAddresses(data){
	     let geoAddress = data.geoAddress;
         if(geoAddress) {
            $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("address", geoAddress.address);
            $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("postalCode", geoAddress.postalCode);
            $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("cityName", geoAddress.cityName);
            $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("cityId", geoAddress.city.id);
            $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("countryId", geoAddress.city.countryId);
            $("#btn-model-confirm-geo-address").trigger('click');
            $("#address-line-1").text(geoAddress.address);
            let addressLine2= geoAddress.cityName;
            if(geoAddress.postalCode) {
                addressLine2 = addressLine2 +"-"+geoAddress.postalCode;
            }
             if(geoAddress.country && geoAddress.country.name) {
                addressLine2 = addressLine2 +", "+geoAddress.country.name;
            }
            $("#address-line-2").text(addressLine2);
         }
	}
	function fillSuggestedGeoAddress() {
		let address = $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("address");
		let postalCode = $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("postalCode");
		let cityName = $("#bt-confirm-suggested-address,#ckPin,.bt-confirm-suggested-address-ckPin").data("cityName");
		$("#newAddrAddress").val(address);
		$("#newAddrPinCode").val(postalCode);
		$("#newAddrCity").val(cityName);
        $('#newAddrCitySearchable').val(cityName);
	    $("#indiaSearchPin").val(postalCode);
	    $("#indiaCityByName").val(cityName);
	    setAddressPin(postalCode,cityName);
	    if($('.bt-confirm-suggested-address-ckPin').length>0){
	    setUserAreaForDetactLocation(postalCode,cityName);
	    }
		$('select#newAddrCountryId option[value="' + $("#bt-confirm-suggested-address,bt-confirm-suggested-address-ckPin,#ckPin").data("countryId") + '"]').attr('selected', true);
		$("#model-confirm-geo-address .modal-close").trigger('click');
	}

	function setAddressPin(pin,cityName) {
        $("#indiaSearchPin").val(pin);
         $("#indiaCityByName").val(cityName);
    }
    function setUserAreaForDetactLocation(pincode, cityName) {
            localStorage.setItem('selectedCtyNameSuggestion', true);
    		let selectedCountry = localStorage.getItem("selectedCountryStore");
    		localStorage.removeItem("countryCityDisable");
    		let redirectHostURL = $('#redirectHostURL').val();
    		$.ajax({
                url: setUserCityUri,
                type: "POST",
                contentType: "application/json",
                cache: false,
                data: JSON.stringify({
                    pinCode: pincode,
                    cityName: cityName,
                    requestUri: window.location.pathname,
                    currentCountryId: currentCountryId
                }),
                dataType: "json",
                success: function (response) {
                    if (response.success === true) {
    					localStorage.removeItem("selectedCountryCitySuggestion");
    					localStorage.removeItem("countryCitySearchId");
    					localStorage.removeItem("selectedCountryStore");
                        let requestUri = window.location.href;
    					let redirectUrl = "";
    					let isInternational = false;
    					if(typeof selectedCountry !== 'undefined' && selectedCountry !=null && selectedCountry !== "India"){
    						isInternational = true;
    					}
    					if ((requestUri.indexOf("?c=") > -1 && isInternational) || isInternational) {

    						if (response.redirectToCourier === false && requestUri.includes('/gift')) {
    							requestUri = requestUri.substring(0, requestUri.lastIndexOf("/gift"));
    						}
    						redirectUrl = requestUri.substring(0, requestUri.lastIndexOf("/"));
    						if(isInternational){
    							if(requestUri.includes("/"+selectedCountry.toLowerCase())){
    								redirectUrl = redirectHostURL;
    							} else{
    								redirectUrl = requestUri;
    							}
    						}
    					}
    					if(response.requestUri !== 'undefined' && response.requestUri !=null){
                         window.location.replace(response.requestUri);
                        } else if (redirectUrl != "") {
    	 					window.location.replace(redirectUrl);
                        } else if (response.redirectToCourier === true) {
                          window.location.replace(allGiftsPageUrl);
                        } else {
                           let countrySelect = $('.onEditCountry').text();
                            if (countrySelect != 'Select Country' && $('.internationalCountry').length > 0) {
                                window.location.replace("/");
                            } else {
                                window.location.reload();
                            }
                        }
                    }
                }
            });
        }
