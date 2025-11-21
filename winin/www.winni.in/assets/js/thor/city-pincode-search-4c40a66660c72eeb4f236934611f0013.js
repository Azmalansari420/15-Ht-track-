$(document).ready(function () {
  $('.citySearchContainer').removeClass('hide');
	let setReverseCityPincode;
	    let indiaCountryId=41; //country code for india
	    let outsideIndiaCoutryCode=0 //country code for outsideindia
    window.onload = function () {
		var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
	    $(document).ajaxSend(function (e, xhr, options) {
	        if (options.type == "POST") {
	            xhr.setRequestHeader(header, token);
	        }
	    });

        var editLocText = $('.editLoc').text();
        if (typeof editLocText !== 'undefined' && editLocText.includes(",")) {
			$('.imgTopEdit').removeClass('hide');
			$('.imgTopNormal').addClass('hide');
			reverseCityPincode();
		} else if (editLocText === " Deliver to" || editLocText === " Delivery Location" ) {
            $('.imgTopNormal').removeClass('hide');
            $('.imgTopEdit').addClass('hide');
        } else {
            $('.imgTopEdit').removeClass('hide');
            $('.imgTopNormal').addClass('hide');
        }
        $('.citySearchContainer').removeClass('hide');
         let textCheckCity = $(".citySearchSecondCmn.editLoc").data('sessioncity');
       if (textCheckCity !== '') {
           $('.addClass__citySearchLoc').removeClass('add-margin__citySearchLoc');
           $('#editIconOnTarget').removeClass('hide');
         }else{
            $('.addClass__citySearchLoc').addClass('add-margin__citySearchLoc');
            $('#editIconOnTarget').addClass('hide');
         }
    };

    function setUserArea(pincode, cityName) {
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
					    if(requestUri.includes("/stores")){
                           window.location.replace('/');
                        }else{
				        	 window.location.replace(response.requestUri);
                       }
					}else if (redirectUrl != "") {
	 					window.location.replace(redirectUrl);
                    } else if (response.redirectToCourier === true) {
                      window.location.replace(allGiftsPageUrl);
                    } else {
                       let countrySelect = $('.onEditCountry').text();
                        if (countrySelect != 'Select Country' && $('.internationalCountry').length > 0) {
                            window.location.replace("/");
                        } else {
                            window.location.reload();
                            updateSelectedCity();
                        }
                    }
                }
            }
        });
    }
    let errorMsg = 0;
    $("#ckPin").click(function () {
      $('#wrPinMsg').show();
      $("#wrPinMsg").html('');
        localStorage.setItem("crossClicked", false);
        localStorage.setItem("viaCheck", 'viaCheck');
        let pincode = $("#indiaSearchPin").val();
        let cityName = $("#indiaCityByName").val();
        if(pincode.includes(",")){
			pincode = pincode.substring(0,pincode.indexOf(","));
		}
        let url = checkUserPin + "?pinCode=" + pincode+"&cityName="+cityName;
        errorMsg = 0;
        $('.shoppingIndia').css({"opacity": "1", "pointer-events": "auto","cursor":"pointer"});
        $.ajax({
            url: url,
            type: 'get',
            success: function (response) {
                if (response.success === true) {
                    $('.shoppingIndia').css({"opacity": "1", "pointer-events": "auto","cursor":"pointer"});
                    if (response.isAvailable === false) {
                        $("#wrPinMsg").removeClass("hide");
                        $("#wrPinMsg").html(response.message);
                         $('#unselected').addClass('marginTopPincode');
                               $('.unselected').addClass("checkMarginTop");
                    } else {
                        $("#wrPinMsg").addClass("hide");
                        localStorage.setItem("selectedCtyNameSuggestion", false);
                        localStorage.setItem("selectedPincodeSuggestion", true);
                        localStorage.setItem("selectedSuggestion", response.pinCity);
                        localStorage.setItem("selectedCityPostal", pincode);
                        localStorage.removeItem("viaCheck");
			            localStorage.setItem('modalCloseViaContinue', true);
			            var selectedCtyNameSuggestion = localStorage.getItem('selectedCtyNameSuggestion');
			            var selectedPincodeSuggestion = localStorage.getItem('selectedPincodeSuggestion');
			            var selectedCityPostal = localStorage.getItem("selectedCityPostal");
			            localStorage.setItem('cityRemove', false);
			            let userCity = $(".onEdit").text();
			            if (selectedCtyNameSuggestion === "true") {
			                if (userCity.indexOf(",") >0) {
			                    userCity = userCity.substring(userCity.indexOf(",") + 1);
			                }
			                if($(".strip-delivery-in-desktop").length>0){
			                  $('.editLoc').text(userCity);
			                }else{
			                   $('.editLoc').text("Deliver to " + userCity);
			                }
			                $('.expresss-delivery-city').text(userCity);

							if ($("#openCitySearchModal").is(":visible")) {
								$("#openCitySearchModal").hide();
							}
			                setUserArea(null, userCity);
			                localStorage.setItem("crossClicked", false);
			            }
			            if (selectedPincodeSuggestion === "true") {
			                $('.editLoc').text("Deliver to " + selectedCityPostal + ", " + cityName);
			                 $('.expresss-delivery-city').html(cityName+"-"+selectedCityPostal);
			                if ($("#openCitySearchModal").is(":visible")) {
								$("#openCitySearchModal").hide();
							}
			                setUserArea(selectedCityPostal, cityName);
			                localStorage.setItem("crossClicked", false);
			            }
			            instanceDeliveryLoc.close();
			            designChange();
                        cityIndiaSelected();
                    }

                } else {
                    $("#wrPinMsg").removeClass("hide");
                    $('.shoppingIndia').css({"opacity": "0.5", "pointer-events": "none"});
                    $("#wrPinMsg").html(response.message);
                     $('#unselected').addClass('marginTopPincode');
                    $('.unselected').addClass("checkMarginTop");
                    errorMsg = 1;
                }
            }
        });
    });
    $(".backButton").click(function (e) {
        if (errorMsg === 1) {
            $('.shoppingIndia').css({"opacity": "1", "pointer-events": "auto","cursor":"pointer"});
        }
    });
	$(".shoppingCountry").click(function(e) {
	 localStorage.setItem('deliveryInModalShown', 'true');
		e.preventDefault();
		setUserForCountryCitySearch();
	});
function setUserForCountryCitySearch() {
        localStorage.setItem('modalCloseViaContinue', true);
        let countryCity = $(".onEditCountryCity").text();
        let countryId = localStorage.getItem("sCountryId");
         if(typeof countryId=== 'undefined' || countryId===null || countryId==='null' || countryId.trim()===''){
        countryId = localStorage.getItem("countryCitySearchId");
        }
        countryCity=countryCity.trim();
         let modifyCountryCity = countryCity;
         if (countryCity.trim() === 'Select Delivery City') {
             modifyCountryCity = "";
         } else{
             let selectedCountry = localStorage.getItem("selectedCountryStore");
             if (!$('.internationalCountry').hasClass('internationalCityExist')) {
                 let sessionCity = $(".editLoc").attr("data-sessionCity");
                 if (typeof selectedCountry != "undefined" && selectedCountry != null && sessionCity.toLowerCase().includes(selectedCountry.toLowerCase())) {
                    modifyCountryCity = "";
                 }
             }
        }
        $.ajax({
            url: setCountryUri,
            type: "GET",
            cache: false,
            data: {
                countryId: countryId.trim(),
                countryCity: modifyCountryCity,
            },
            dataType: "json",
            success: function (response) {
                if (response.success === true && modifyCountryCity != "" && countryCity.toUpperCase() != 'Select Delivery City'.toUpperCase()) {
                       localStorage.removeItem("internationalCourierCountryHref");
                       localStorage.removeItem("sCountryId");
                       let showEnterCityCheck = response.showEnterCity;
                       if(showEnterCityCheck) {
                            localStorage.setItem("showEnterCityCheck", 'true');
                            localStorage.removeItem("countryCityDisable");
                       }else {
                            localStorage.removeItem("showEnterCityCheck");
                            localStorage.setItem("countryCityDisable", 'true');
                       }
                       let requestUri = window.location.href;
                       if(currentCountryId!=null && currentCountryId==countryId){
                       location.href = requestUri;
                       }else{

                       let jumpTo = $(".shoppingCountry").attr("href");

                       if(jumpTo.includes("?c=")){
                          jumpTo = jumpTo.substring(0,jumpTo.indexOf("?c="));
                      }
                      if(requestUri.includes("?c=")){
                          requestUri = requestUri.substring(0,requestUri.indexOf("?c="));
                      }
                      if(requestUri.includes(jumpTo))
                      {
                          jumpTo = requestUri;
                      }
                       let currentInternationalCity = jumpTo+ '?c='+countryCity;
                         if(countryCity.indexOf(",") > -1) {
                          currentInternationalCity = jumpTo+ '?c='+countryCity.substring(0, countryCity.indexOf(","));
                       }
                       location.href = currentInternationalCity;
                       }
                      } else if(response.success === true) {
                          localStorage.removeItem("sCountryId");
                              let jumpTo = $(".shoppingCountry").attr("href");
                                if (modifyCountryCity === "") {
                                    if (jumpTo.includes("?c=")) {
                                        jumpTo = jumpTo.substring(0, jumpTo.indexOf("?c="));
                                    }
                                }
                              localStorage.setItem("internationalCourierCountryHref", jumpTo);
                               location.href = jumpTo;
                      } else {
                        $("#wrPinMsg").removeClass("hide");
                        $("#wrPinMsg").html(response.message);
                        $('#unselected').addClass('marginTopPincode');
                }
                localStorage.setItem("previousCountryId",countryId);
            }
        });
    }
    var showEnterCity = true;
    $('.city-navbar-bottom-link').click(function () {
        localStorage.setItem("crossClicked", false);
        localStorage.setItem("cityRemove", false);
    });
    if ($('#openCitySearchModal').length > 0) {
        function designChange() {
            var selectedCtyNameSuggestion = localStorage.getItem("selectedCtyNameSuggestion");
            var selectedPincodeSuggestion = localStorage.getItem("selectedPincodeSuggestion");
            let textCheckCity = $(".citySearchSecondCmn.onEdit").text();
            $("#wrPinMsg").addClass("hide");
            $('.shoppingIndia').removeClass('hide');
            if($('.mobileDeliveryInMobalInit').length>0){
               $('.shoppingIndia').addClass('modal-close');
            }else if (textCheckCity === '' || textCheckCity.trim() === 'Enter Pincode'){
              $('.shoppingIndia').css({"background-color": "#9E9999","pointer-events": "none"});
            }
            $('.shoppingIndia').css({"background-color": "#318800", "pointer-events": "auto","cursor":"pointer"});
            $('.selectedbt').removeClass('hide');
            $('.selectedbt').addClass('modal-close');
            $('.selectedbt').css({"background-color": "#318800", "pointer-events": "auto"});
            $('.imgEdit').removeClass('hide');
            $('.imgNormal').addClass('hide');
             if($('.mobileDeliveryInMobalInit').length>0){
                $('#ckPin').css("pointer-events", "none");
                $('.unselected').addClass('hide');
            }
            $('.clearCitySearch').removeClass('hide');
            if($(".desktop-deliveryIn-modal__main").length>0){
               $('#indiaSearchPin').attr('type', 'number');
            }else{
              $('#indiaSearchPin').attr('type', 'text');
            }
            if (selectedPincodeSuggestion === "true") {
                $('#indiaSearchPin').prop('readonly', true);
                $('#indiaSearchPin').prop('disabled', true);
                $('.byName').addClass('hide');
                $('.byPincode').removeClass('hide');
            }
            if (selectedCtyNameSuggestion === "true") {
                $('#indiaCityByName').attr('type', 'text');
                $('.byName').removeClass('hide');
                $('.byPincode').addClass('hide');
            }
        }
        function cityIndiaSelected() {
            var selectedSuggestion = localStorage.getItem("selectedSuggestion");
            var selectedCtyNameSuggestion = localStorage.getItem("selectedCtyNameSuggestion");
            var selectedPincodeSuggestion = localStorage.getItem("selectedPincodeSuggestion");
            if (selectedPincodeSuggestion === "true") {
                $('#indiaSearchPin').val(selectedSuggestion);
                $('.onEdit').text(selectedSuggestion);
                $('.onEditCity').text(selectedSuggestion);
            }
            if (selectedCtyNameSuggestion === "true") {
                $('#indiaCityByName').val(selectedSuggestion);
                $('.onEdit').text(selectedSuggestion);
                $('.onEditCity').text(selectedSuggestion);
            }
        }
        var deliveryLocModalId = document.getElementById('deliveryLocModal');
        var instanceDeliveryLoc = M.Modal.init(deliveryLocModalId);
        let popularCitiesModalId = document.getElementById('popularCitiesModal');
        let instancePopularCitiesModal = M.Modal.init(popularCitiesModalId);
        let openCitySearchModalIdDesktop=document.getElementById("openCitySearchModal")
        let instanceOpenCitySearchModalDesktop=M.Modal.init(openCitySearchModalIdDesktop);
		$(".shoppingIndia").click(function() {
			let selectedCtyNameSuggestion = localStorage.getItem('selectedCtyNameSuggestion');
			let userCity = $(".onEdit").text();
			if (selectedCtyNameSuggestion === "true") {
				localStorage.setItem('cityRemove', false);
				let pincode =null;
				if (userCity.indexOf(",") > 0) {
					pincode =  userCity.substring(0,userCity.indexOf(","));
					userCity = userCity.substring(userCity.indexOf(",") + 1);
				}
				if(pincode===null){
				  $('.editLoc').text("Deliver to " + userCity);
				}else{
				  $('.editLoc').text("Deliver to " + pincode +","+ userCity);
				}

				if ($("#openCitySearchModal").is(":visible")) {
					$("#openCitySearchModal").hide();
				}
				setUserArea(pincode, userCity);
				localStorage.setItem("crossClicked", false);
			} else {
				localStorage.setItem('modalCloseViaContinue', true);
				 if($('.mobileDeliveryInMobalInit').length>0){
                   $('.shoppingIndia').addClass('modal-close');
                }
			}
		});
		$('.countryCityContainer').removeClass('hide');
        if ($(".editLoc").length>0) {
           reverseCityPincode();
        }
function reverseCityPincode() {
   let sessionCity = $(".editLoc").attr("data-sessionCity");
   let sessionState = $(".editLoc").attr("data-sessionState");
   let sessionCountryId = $(".editLoc").attr("data-sessionCountryId");
   if(typeof sessionCity !='undefined' && sessionCity != ""){
      let selectedCtyNameSuggestion = localStorage.getItem('selectedCtyNameSuggestion');
      let selectedPincodeSuggestion = localStorage.getItem('selectedPincodeSuggestion');
      let crossClicked = localStorage.getItem('crossClicked');
      let cityRemove = localStorage.getItem('cityRemove');
      if (typeof sessionCity != 'undefined' && sessionCity.length >= 2) {
         designChange();
         let splitSessionCity;
         if (sessionCity.match(/^\d/)) {
            splitSessionCity = sessionCity.split(",");
         } else {
            splitSessionCity = sessionCity.split(",").reverse();
         }
         let reverseSessionCity = splitSessionCity.join(", ");
         setReverseCityPincode = reverseSessionCity;
         let onlyInternalCityName = setReverseCityPincode.split(",")[0];
         let selectedCityPostal = sessionCity.substring(sessionCity.indexOf(",") + 1)
         localStorage.setItem("selectedCityPostal", selectedCityPostal);
         localStorage.setItem("selectedSuggestion", reverseSessionCity);
             if($(".strip-delivery-in-desktop").length > 0) {
                let deliveryCity;
                if (sessionState) {
                    deliveryCity = (onlyInternalCityName === sessionState) ? sessionCity : onlyInternalCityName;
                    deliveryCity += ", " + ((sessionState === onlyInternalCityName) ? sessionCity : sessionState);
                } else {
                    deliveryCity = onlyInternalCityName;
                }
                $('.editLoc').text("Deliver to " + deliveryCity);
             } else {
                 let deliveryText;
                    if (sessionState) {
                        if (sessionCountryId) {
                            deliveryText = onlyInternalCityName + ", " + sessionState;
                        } else {
                            deliveryText = sessionCity;
                        }
                    } else {
                        deliveryText = onlyInternalCityName;
                    }
                    $('.editLoc').text("Deliver to " + deliveryText);
             }
         presentCity = false;
         localStorage.removeItem("addressSelected");
      } else {
         if (selectedPincodeSuggestion === "true" || selectedCtyNameSuggestion === "true") {
            localStorage.removeItem("selectedSuggestion");
            localStorage.removeItem('crossClicked');
            crossClicked = localStorage.getItem('crossClicked');
         }
         if ((crossClicked === null || crossClicked === "null" || typeof crossClicked === 'undefined' || crossClicked === 'false') && (cityRemove === null || cityRemove === "null" || typeof cityRemove === 'undefined' || cityRemove === false || cityRemove === "false") && selectedCtyNameSuggestion === "true") {
            presentCity = true;
            if (selectedCtyNameSuggestion === "true") {
               designChange();
            }
         }
      }
   }
}
        var selectedCountryCitySuggestion = localStorage.getItem("selectedCountryCitySuggestion");
        var selectedSuggestion = localStorage.getItem("selectedSuggestion");
        $(document).on('click', '.unselected', function () {
            $("#wrPinMsg").addClass("hide");
            localStorage.setItem("dontKnowPinClicked", true);
            $('.unselected').addClass("hide");
            $('.byName').removeClass('hide');
            $('#detectLocationText').addClass('hide');
            $('.byPincode').addClass('hide');
            $('#popularCities').removeClass('hide');
            $('.hide-detect-location').addClass('hide');
            if($(".desktop-deliveryIn-modal__main").length>0){
            instanceOpenCitySearchModalDesktop.close();
             $('#openCitySearchModal').modal({closeOnClick: true});
            }
            clearIndiaCity();

        });
        function clearIndiaCity(){
            $('#indiaSearchPin').val('');
            $('#indiaCityByName').val('');
        }
        $(document).on('click', '.delLocClose', function () {
            var dontKnowPinClicked = localStorage.getItem("dontKnowPinClicked");
            let indiaCityByName = $('#indiaCityByName').val();
             let textCheckCity = $(".citySearchSecondCmn.onEdit").text();
            if (dontKnowPinClicked === "true" && indiaCityByName === '') {
                $('.unselected').removeClass("hide");
                $('.byName').addClass('hide');
                $('.byPincode').removeClass('hide');
                localStorage.removeItem("dontKnowPinClicked");
            }
            let cityAlreadyExist= $(".citySearchSecondCmn.onEdit").text();
            if(cityAlreadyExist != 'Enter Delivery Area or Pincode' || cityAlreadyExist != 'Enter Pincode' ){
				if(indiaCityByName === '' && textCheckCity===''){
					$('.shoppingIndia').css({"background-color": "#9E9999", "pointer-events": "none"});
				} else{
					let sessionCity = $(".editLoc").attr("data-sessionCity");
					if (sessionCity.includes(",")) {
						sessionCity = sessionCity.substring(0,sessionCity.indexOf(","));
						cityAlreadyExist  = cityAlreadyExist.trim();
						if(sessionCity === cityAlreadyExist){
							$('.shoppingIndia').css({"background-color": "#318800", "pointer-events": "auto","cursor":"pointer"});
						}
					}
				}
			}
            $(document).on("click", ".adobDynamicCityName a", adbCityLocationSearchMob);
            $('.adbCitySelect').find('a').on("click", selectCityClick);
            $('#wrPinMsg').hide();

        });
        $('.withInIndia').on('click', function () {
                $('.unselected').removeClass("hide");
                $('.onEdit').addClass("ramrahim");
                $('.byName').addClass('hide');
                $('.byPincode').removeClass('hide');
                $('#detectLocationText').removeClass('hide');
                $('#indiaSearchPin').removeAttr('disabled');
                $('#indiaSearchPin').removeAttr('readonly');
                $('.indiaSearchPin').css({ "pointer-events": "auto"});
        });
        $('#deliveryLocModal').removeClass('modal-close');
        $('#openCitySearchModal').modal({closeOnClick: false});
        function getCountryId(clickedElement) {
            var getCountryName = clickedElement.find(".contryText").text().trim().replace(/-/g, " ");
            if (getCountryName.toLowerCase() === 'usa') {
                getCountryName = "United States";
            }
            if (getCountryName.toLowerCase() === 'uae') {
                getCountryName = "United Arab Emirates";
            }
            if (getCountryName.toLowerCase() === 'uk') {
                getCountryName = "United Kingdom";
            }
            $.ajax({
                url: getCountryIdUri + '/' + getCountryName,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.success === true) {
                        var countryCitySearchId = data.countryId;
                        showEnterCity = data.showEnterCity;
                        if(getCountryName != 'India'){
							let usaCountry ='United States';
							if (getCountryName.toLowerCase() === usaCountry.toLowerCase()) {
								getCountryName = "usa";
							}
							let uaeCountry ='United Arab Emirates';
							if (getCountryName.toLowerCase() === uaeCountry.toLowerCase()) {
								getCountryName = "uae";
							}
							let ukCountry ='United Kingdom';
							if (getCountryName.toLowerCase() === ukCountry.toLowerCase()) {
								getCountryName = "uk";
							}
							let saCountry ='Saudi Arabia';
							 if(getCountryName.toLowerCase() === saCountry.toLowerCase()){
                                getCountryName = 'saudi-arabia';
                            }
							$('#selectedCountrySearch').removeClass('hide');
							$('.allCountrySelected .hide').removeClass('hide');
							$("#"+getCountryName.toLowerCase()).addClass('hide');
							$("#india").addClass('hide');
							if (showEnterCity === false) {
	                            localStorage.setItem("showEnterCityCheck", 'false');
	                            localStorage.setItem("internationalCourierCountryHref", '/'+getCountryName);
	                            $('.outSideCountryCity').addClass('hide');
	                            localStorage.setItem("countryCityDisable", true);
	                             $('.shoppingCountry').css({"background-color": "#318800", "pointer-events": "auto"});
	                        } else {
								localStorage.setItem("showEnterCityCheck", 'true');
	                            $('.outSideCountryCity').removeClass('hide');
	                            $('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
	                        }
	                        localStorage.setItem("countryCitySearchId", countryCitySearchId);
	                        localStorage.setItem("sCountryId", countryCitySearchId);
	                        $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
	                         $('.onEditCountryCity').text('Select Delivery City');
						}
                    }
                },
                error: function (response) {
                    alert(response.message);
                }
            });
        }
        function setSelectedCountry(selectedCountry, hrefValue) {
            localStorage.setItem("selectedHrefValue", hrefValue);
            localStorage.setItem("selectedCountryStore", selectedCountry);
            localStorage.removeItem("selectedCountryCitySuggestion");
            $('.shoppingCountry').attr('href', hrefValue);
            $('.onEditCountry').text(selectedCountry);
            if(selectedCountry === 'Saudi Arabia'){
				selectedCountry = 'Saudi-Arabia';
			}
            $('#countrySelected').html($('#' + selectedCountry.toLowerCase()).html());
            $('#countrySelected').find(".contryText").css("color", "#222222");
            $('#countrySelected').find("a").css("pointer-events", "none");
            $('#selectedCountrySearch').removeClass('hide');
            $('.allCountrySelected .hide').removeClass('hide');
            $('#' + selectedCountry.toLowerCase()).addClass('hide');
            $("#india").addClass('hide');
            $('#noResultFound').addClass('hide');
            if (selectedCountry === 'India') {
				withIndia.checked = true;
                $('.imgNormalCountry').removeClass('hide');
                $('.imgEditCountry').addClass('hide');
                $('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
                $('.outSideCountryCity').css({"opacity": "0.5", "pointer-events": "none"});
                 withinIndiaClick();
                 $('.outSideCountryCity').addClass('hide');
            } else {
                $('.imgNormalCountry').addClass('hide');
                $('.imgEditCountry').removeClass('hide');
                $('.outSideCountryCity').css({"opacity": "1", "pointer-events": "auto"});
                  $('.outSideCountryCity').removeClass('hide');
            }
        }

             $('.countrySpace').find('.d-space').on("click", function (event) {
			         let currentEvent =$(this);
                     setselectedCountryFlag(currentEvent);
                     $('#noResultFound').addClass('hide');
                     $('#countryListForDesktop').removeClass('show-dropdown');
                    if($(".desktop-deliveryIn-modal__main").length>0){
                        $('.replace-country-city-input').removeClass('hide');
                        $('.country-city-search-div').addClass('hide');
                        $('.country-search-div').hide();
                        $('.replace-country-input').show();
                          $('#noResultFoundDesktop').hide();
                        emptyCountrySearchInput();

                    }
            });
            function setselectedCountryFlag(currentEvent){
				getCountryId(currentEvent);
                let selectedCountry = currentEvent.find(".contryText").text().trim();
                localStorage.setItem("selectedCountryStore",selectedCountry);
                let countryFlag = currentEvent.find(".contryImg").attr("src");
                let replaceGlobeImage = document.getElementById('replaceGlobeImage');
                let newSrc = countryFlag; // Use the countryFlag as the new source
                replaceGlobeImage.setAttribute('src', newSrc);
                $("#replaceGlobeImage").addClass('countryFlagDesign');
                let hrefValue = currentEvent.find('a').attr('href');
                let countryPath = currentEvent.find('div').attr('data-countryPath');
                $('.countrySpace').find('.d-space').each(function () {
                    let prevSelectedCountry = currentEvent.attr("id").toLowerCase();
					if (selectedCountry === 'Saudi Arabia') {
						selectedCountry = 'Saudi-Arabia';
					}
                    if (prevSelectedCountry !== selectedCountry.toLowerCase() && $('#' + prevSelectedCountry).hasClass('hide')) {
                        clearCountryCitySearch();
                        $('#' + prevSelectedCountry).removeClass('hide');
                    }
                });
				$('.onEditCountry').addClass('fontWeightText');
				if($("#countryCitySearch").length>0){
                  setSelectedCountry(selectedCountry,   hrefValue);
				}else{
				 setSelectedCountry(selectedCountry,  countryPath);
				}
			}

        window.addEventListener('beforeunload', function () {
            localStorage.removeItem("viaCheck");
            localStorage.removeItem("selectedHrefValue");
            localStorage.removeItem("selectedCountryStore");
            localStorage.removeItem('modalCloseViaContinue');
            localStorage.removeItem('crossClicked');
        });
        let selectedCountry = localStorage.getItem("selectedCountryStore");
        let hrefValue = localStorage.getItem("selectedHrefValue");
        if (selectedCountry !== null) {
			if (selectedCountry === 'Saudi Arabia') {
				selectedCountry = 'Saudi-Arabia';
			}
            setSelectedCountry(selectedCountry, hrefValue);
        } else {
            selectedCountry = 'india';
            $('.onEditCountry').text('Select Country');
            $('.onEditCountryCity').text('Select Delivery City');
        }
        if ($('#countrySelected').length > 0) {
            $('#countrySelected').html($('#' + selectedCountry.toLowerCase()).html());
            $('#countrySelected').find(".contryText").css("color", "#222222");
            $('#countrySelected').find("a").css("pointer-events", "none");
            $('#' + selectedCountry.toLowerCase()).addClass('hide');
        }
		  function setGlobeImage(sessionCity) {
				let currentEvent = $('#' + sessionCity.toLowerCase());
				let countryFlag = currentEvent.find(".contryImg").attr("src");
				let countryThreeLetterIsoCode = currentEvent.find(".contryImg").attr("data-countryThreeLetterName");
				let newSrc = countryFlag; // Use the countryFlag as the new source
				let replaceMainGlobeImage = document.getElementById('countryFlagIcon');
				let replaceMainGlobeCountryThreeLetterIsoCode = document.getElementById('countryThreeLetterIsoCode');
				replaceMainGlobeImage.setAttribute('src', newSrc);
				replaceMainGlobeCountryThreeLetterIsoCode.innerHTML=countryThreeLetterIsoCode;
				$('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
			}
        if ($(".deliveryInSearchCity").length > 0) {
            var defultCheck;
            let defaultInterSelection=false;
            $('#countryFlagIcon').removeClass('hide');
            $('#countryThreeLetterIsoCode').removeClass('hide');
            if($(".internationalCountry").length > 0){
				defultCheck = document.querySelector('input[type=radio][name=outside-india]');
				defaultInterSelection=true;
				let sessionCity = $(".editLoc").attr("data-sessionCity");
			  	 if(sessionCity.includes(",")){
					sessionCity = sessionCity.substring(0,sessionCity.indexOf(","));
				}
				setGlobeImage(sessionCity);
			} else {
				defultCheck = document.querySelector('input[type=radio][name=with-india]');
			}

            defultCheck.checked = true;
            let onOpenEndWork=false;
            $('#openCitySearchModal',).modal({
                onOpenEnd: function () {
                setCode();
                },
                onCloseEnd: function () {
                $("#openCitySearchModal").removeClass("login-section-length-check")
                $('#openCitySearchModal').modal({ closeOnClick: true });
                    var modalCloseViaContinue = localStorage.getItem('modalCloseViaContinue');
                    var selectedCtyNameSuggestion = localStorage.getItem('selectedCtyNameSuggestion');
                    var selectedPincodeSuggestion = localStorage.getItem('selectedPincodeSuggestion');
                    var crossClicked = localStorage.getItem('crossClicked');
                    var viaCheckBtn = localStorage.getItem("viaCheck");
                    var onEdit = $('.onEdit').text();
                    if ((selectedCtyNameSuggestion === "true" && modalCloseViaContinue !== "true" && (crossClicked === "true")) ||
                           (selectedPincodeSuggestion === "true" && modalCloseViaContinue !== "true" && (crossClicked === "true")))
                    {
                        clearCitySearch();
                        clearlocalSuggestion();
                    } else if ((selectedCtyNameSuggestion === "true" || selectedPincodeSuggestion === "true") && (onEdit !== 'Enter Delivery Area or Pincode') && (crossClicked !== "true") && (modalCloseViaContinue !== "true") && (viaCheckBtn === "viaCheck")) {
                        location.reload();
                    }
                    $('#openCitySearchModal input[name=outside-india]').prop('checked', true);
					let countryCityDisable = localStorage.getItem("countryCityDisable");
					let sessionCity = $(".editLoc").attr("data-sessionCity");
					if (typeof countryCityDisable != "undefined" && countryCityDisable != null && countryCityDisable && !sessionCity.includes(',')) {
						  let showEnterCityCheck = localStorage.getItem("showEnterCityCheck");
						  if (showEnterCityCheck !== null && showEnterCityCheck != 'true') {
						    localStorage.setItem("showEnterCityCheck",'false');
						  }

					}
					outSideIndiaClick();
                }
            });

            var withIndia = document.getElementById('withIndia');
            var outSideIndia = document.getElementById('outSideIndia');
            outSideIndia.addEventListener('click', function () {
                outSideIndiaClick();
            });
             $('.citySearchSecondCmn__desktop,.change-location').on("click",setCode);
            function setCode(){
                  if(onOpenEndWork===false){
                  $("#openCitySearchModal").addClass("login-section-length-check")
                        let $citySpan = $(".citySearchSecondCmn.onEdit");
                        if(defaultInterSelection){
                            getAddressList(outsideIndiaCoutryCode);
                            let sessionCountryCity = $('.citySearchSecondCmn').data('sessioncity');
                            $('.shoppingIndia').addClass('hide');
                            $('.shoppingIndia').css({ "background-color": "#9E9999", "opacity": "0.5", "pointer-events": "none" });
                            $('#openCitySearchModal input[name=outside-india]').prop('checked', true);
                            withIndia.checked = false;
                            outSideIndia.checked = true;
                            if (sessionCountryCity!==null && outSideIndia.checked && $('.internationalCountry').hasClass('internationalCityExist' )) {
                                $('.outSideCountryCity').removeClass('hide');
                            }
                          if($("#countryCitySearch").length>0){
                            $(".citySearchSecondCmn.onEdit").text('Enter Delivery Area or Pincode');
                          }else{
                            $(".citySearchSecondCmn.onEdit").text('Enter Pincode');
                          }
                            $('.withInIndia').addClass('hide');
                            $('.outSideCountry').removeClass('hide');
                             let internationalCourierCountry = localStorage.getItem("countryCityDisable");
                           if(internationalCourierCountry != null && typeof internationalCourierCountry != "undefined" && internationalCourierCountry){
                                $('.onEditCountryCity').text('Select Delivery City');
                                  if($("#countryCitySearch,#countryCitySearchDesktop").length>0){
                                    $('.outSideCountryCity ').addClass('hide');
                                 }
                                let redirectUrl = localStorage.getItem("internationalCourierCountryHref");
                                $('.shoppingCountry').attr('href', redirectUrl);
                                 $('.shoppingCountry').css({"background-color": "#318800", "pointer-events": "auto"});
                            } else{
                                $('.outSideCountryCity').removeClass('hide');

                            }
                            let showEnterCityCheck = localStorage.getItem("showEnterCityCheck");
                            if (typeof showEnterCityCheck != 'undefined' && showEnterCityCheck != null && showEnterCityCheck === 'true') {
                                $('.outSideCountryCity').removeClass('hide');
                                if ($('.onEditCountryCity').text() !== 'Select Delivery City') {
                                     $('.shoppingCountry').css({"background-color": "#318800", "pointer-events": "auto"});
                                    $('.imgEditCountryCity').removeClass('hide');
                                    $('.imgNormalCountryCity').addClass('hide');
                                }
                            }
                            if (!$('.internationalCountry').hasClass('internationalCityExist')) {
                                      if($("#countryCitySearch,#countryCitySearchDesktop").length>0){
                                          $('.outSideCountryCity ').addClass('hide');
                                      };
                            } else if ($('.internationalCountry').hasClass('internationalCityExist') && $('.onEditCountryCity').text() === 'Select Delivery City') {
                                $('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
                                $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
                                $("#buildingHideShow").addClass('buildingHideShow');
                                $('.outSideCountryCity ').removeClass('hide');
                                 localStorage.setItem("showEnterCityCheck",'true');
                            }
                            let sessionCity = $(".editLoc").attr("data-sessionCity");
                            if ($('.internationalCountry').hasClass('internationalCityExist') && $('.onEditCountryCity').text() !== 'Select Delivery City' &&
                                !sessionCity.includes(",")) {
                                $('.shoppingCountry').css({ "background-color": "#9E9999", "pointer-events": "none" });
                                $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
                                $("#buildingHideShow").addClass('buildingHideShow');
                                $('.outSideCountryCity ').removeClass('hide');
                                $('.onEditCountryCity').text('Select Delivery City');
                                localStorage.setItem("showEnterCityCheck", 'true');
                            }
                        } else{
                        localStorage.setItem("previousCountryId",indiaCountryId);
                        let textCheckCity = $(".citySearchSecondCmn.onEdit").text();
                        if (textCheckCity === '' || textCheckCity.trim() === 'Enter Pincode'|| textCheckCity.trim() ==='Enter Delivery Area or Pincode'){
                                localStorage.removeItem("selectedCtyNameSuggestion");
                               $('.shoppingIndia').css({"background-color": "#9E9999","pointer-events": "none"});
                             }else{
                               localStorage.setItem("selectedCtyNameSuggestion", true);
                                 $('.shoppingIndia').css({"background-color": "#318800","pointer-events": "auto","cursor":"pointer"});
                             }
                            $(".static-text-deliveryIn").removeClass('hide');
                            getAddressList(indiaCountryId);
                            $('#openCitySearchModal input[name=with-india]').prop('checked', true);
                            let sessionCity = $(".editLoc").attr("data-sessionCity");
                            if(typeof sessionCity === 'undefined' || sessionCity === ''){
                                if($(".strip-delivery-in-desktop").length>0){
                                 $citySpan.text('Enter  Pincode');
                                }else{
                                $citySpan.text('Enter Delivery Area or Pincode');
                                }
                            } else if (sessionCity.startsWith(",")) {
                                let newText = sessionCity.substring(1);
                                $citySpan.text(newText);
                            } else if (sessionCity.endsWith(", ")) {
                                let newText = sessionCity.substring(0, sessionCity.length - 2);
                                $citySpan.text(newText);
                            } else if (sessionCity.endsWith(",")) {
                                let newText = sessionCity.substring(0, sessionCity.length - 1);
                                $citySpan.text(newText);
                            } else {
                                $citySpan.text(sessionCity);
                            }
                            withinIndiaClick();
                            clearPartialCity();
                            selectedCountry = 'india';
                            clearCountryCitySearch();
                            let selectedCtyNameSuggestion=localStorage.getItem("selectedCtyNameSuggestion");
                           if(selectedCtyNameSuggestion==='true' && textCheckCity !=='' && textCheckCity !=="Enter Delivery Area or Pincode"){
                                   $('.shoppingIndia').css({"background-color": "#318800","pointer-events": "auto","cursor":"pointer"});
                              }
                        }
                        onOpenEndWork=false;
                }
            }
            function outSideIndiaClick() {

             let sessionCityCountry = $('.citySearchSecondCmn.onEditCountry').data('sessioncity');
                               if(outSideIndia.checked && sessionCityCountry !==null && sessionCityCountry !==undefined ){
                                  $('.outSideCountryCity').removeClass("hide");
                               }
                let selectedCountry = localStorage.getItem("selectedCountryStore");

                let selectedCountryCitySugg = localStorage.getItem("selectedCountryCitySuggestion");
                let showEnterCityCheck = localStorage.getItem("showEnterCityCheck");
                let countryCityDisable = localStorage.getItem("countryCityDisable");
                let sessionCity = $(".editLoc").attr("data-sessionCity");

                if((typeof selectedCountryCitySugg !== 'undefined' || selectedCountryCitySugg===null) && (typeof selectedCountry !== 'undefined' && selectedCountry!=null && selectedCountry.trim() !== "")){
                let currentEvent =$('#'+selectedCountry.toLowerCase());
                let countryFlag = currentEvent.find(".contryImg").attr("src");
                let replaceGlobeImage = document.getElementById('replaceGlobeImage');
                let newSrc = countryFlag; // Use the countryFlag as the new source
                replaceGlobeImage.setAttribute('src', newSrc);
               $("#replaceGlobeImage").addClass('countryFlagDesign');
               }
                $('.shoppingIndia').addClass('hide');
                $('.shoppingCountry').removeClass('hide');
                $('.shoppingCountry').css("display", "block");
                if (selectedCountry !== null || $('.onEditCountry').text().trim() !== 'Select Country') {
                    if (selectedCountryCitySugg !== null && $('.onEditCountryCity').text().trim() !== 'Select Delivery City') {
                        countryCitySuggestionSelected(selectedCountryCitySugg);
                        $('imgEditCountryCity').removeClass('hide');
                        $('.imgNormalCountryCity').addClass('hide');
                    } else {
                       if($("#countryCitySearch").length>0){
                         let hrefValue = $('#' + selectedCountry.toLowerCase()).find('a').attr('href');
                         $('.shoppingCountry').attr('href',hrefValue);
                       }else{
                         let dataPath=$('#' + selectedCountry.toLowerCase()).find('div').attr('data-countryPath');
                        $('.shoppingCountry').attr('href', dataPath);
                       }
						if (showEnterCityCheck === null || showEnterCityCheck == 'false') {
							clearCountryCitySearch();
							$('.imgEditCountryCity').addClass('hide');
							$('.imgNormalCountryCity').removeClass('hide');
						}
                    }
                    if (selectedCountry !== null && $('.onEditCountryCity').text().trim() !== 'Select Delivery City') {
						let countryCity = $(".onEditCountryCity").text();
                         if($("#countryCitySearch").length>0){
						   let hrefValue = $('#' + selectedCountry.toLowerCase()).find('a').attr('href');
						   	hrefValue = hrefValue + '?c=' + countryCity;
						   	$('.shoppingCountry').attr('href', hrefValue);
                         }else{
						   let dataPath=$('#' + selectedCountry.toLowerCase()).find('div').attr('data-countryPath');
						    	dataPath = dataPath + '?c=' + countryCity;
                           		$('.shoppingCountry').attr('href', dataPath);
                         }
						$('.shoppingCountry').css({ "background-color": "#318800", "pointer-events": "auto" });
					}
                    $('.imgNormalCountry').addClass('hide');
                    $('.imgEditCountry').removeClass('hide');
                    if(outSideIndia.checked && sessionCity !==null){
                       $('.outSideCountryCity').removeClass("hide");
                    }
                    $('.outSideCountryCity').css({"opacity": "1", "pointer-events": "auto"});
                    if (typeof showEnterCityCheck !== 'undefined') {
						if (showEnterCityCheck === 'true') {
							if ($('.onEditCountryCity').text().trim() === 'Select Delivery City') {
								if (typeof countryCityDisable != "undefined" && countryCityDisable != null && countryCityDisable) {
									if (selectedCountry !== null && !sessionCity.toLowerCase().includes(selectedCountry.toLowerCase())) {
											$('.shoppingCountry').css({ "background-color": "#9E9999", "pointer-events": "none" });
									}
								}
							} else{
								$('.shoppingCountry').css({ "background-color": "#318800", "pointer-events": "auto" });
							}
						} else if (showEnterCityCheck === 'false') {
							$('.shoppingCountry').css({ "background-color": "#318800", "pointer-events": "auto" });
						}
					}
                } else {
                    $('#countryCitySearch').removeAttr('disabled');
                    $('#countryCitySearch').removeAttr('readonly');
                    $('#countryCitySearchDesktop').removeAttr('disabled');
                    $('#countryCitySearchDesktop').removeAttr('readonly');
                    $('.imgEditCountryCity').addClass('hide');
                    $('.imgNormalCountryCity').removeClass('hide');
                    $('.imgNormalCountry').removeClass('hide');
                    $('.imgEditCountry').addClass('hide');
                    $('.outSideCountryCity').css({"opacity": "0.5", "pointer-events": "none"});
                    $('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
                }
                if (withIndia.checked) {
                    withIndia.checked = false;
                    $('.withInIndia').addClass("hide");
                    $('.outSideCountry').removeClass('hide');
                }
				if (typeof countryCityDisable != "undefined" && countryCityDisable != null && countryCityDisable) {
					if (selectedCountry !== null && !sessionCity.toLowerCase().includes(selectedCountry.toLowerCase())) {
						if (showEnterCityCheck === null || showEnterCityCheck === "false") {
							$('.outSideCountryCity').addClass('hide');
						} else {
							$('.outSideCountryCity').removeClass('hide');
						}
					}
				} else {
                    $('.outSideCountryCity').removeClass('hide');
				}
				if (typeof selectedCountry === "undefined" || selectedCountry === null || sessionCity.toLowerCase().includes(selectedCountry.toLowerCase())) {
					if (!$('.internationalCountry').hasClass('internationalCityExist')) {
						$('.outSideCountryCity ').addClass('hide');
						$('.shoppingCountry').css({ "background-color": "#318800", "pointer-events": "auto" });
						withIndia.checked = false;
						outSideIndia.checked = true;
					}
				}
				if ($('.internationalCountry').hasClass('internationalCityExist') && $('.onEditCountryCity').text() === 'Select Delivery City'
					&& typeof selectedCountry !== "undefined" && selectedCountry !== null && sessionCity.toLowerCase().includes(selectedCountry.toLowerCase())) {
					$('.shoppingCountry').css({ "background-color": "#9E9999", "pointer-events": "none" });
					$("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
					$("#buildingHideShow").addClass('buildingHideShow');
					$('.outSideCountryCity ').removeClass('hide');
				}
				if (selectedCountry === null || $('.onEditCountry').text().trim() === 'Select Country') {
					$('.shoppingCountry').css({ "background-color": "#9E9999", "pointer-events": "none" });
				}
            }
            withIndia.addEventListener('click', function () {
                withinIndiaClick();
            });
            function withinIndiaClick() {
                $('.shoppingIndia').removeClass('hide');
                $('.shoppingCountry').addClass('hide');
                if (outSideIndia.checked) {
                    outSideIndia.checked = false;
                    $('.withInIndia').removeClass("hide");
                    $('.outSideCountry').addClass('hide');
                    $('.outSideCountryCity').addClass('hide');
                    $('.outSideCountryCity').css("pointer-events", "none");
                    $('.shoppingCountry').attr('href', "/");
                }
				let textCheckCity = $(".citySearchSecondCmn.onEdit").text();
				if (textCheckCity === '' || textCheckCity.trim() === 'Enter Delivery Area or Pincode' || textCheckCity.trim() === 'Enter  Pincode') {
					$('.shoppingIndia').css({ "background-color": "#9E9999", "pointer-events": "none" });
					$('.imgEdit').addClass('hide');
					$('.imgNormal').removeClass('hide');
					clearCitySearch();
				}
            }
            $('.outSideCountry').addClass('hide');
            $('.outSideCountryCity').addClass('hide');
            let inputPincode = document.querySelector('#indiaSearchPin');
            let inputFieldName = document.querySelector('#indiaCityByName');
            let inputFieldInternational = document.querySelector('#countryCitySearch');
            let countryCitySearchDesktop = document.querySelector('#countryCitySearchDesktop');
            $('.countryCityContainer').on("click", function () {
                if ($('.onEditCountryCity').text().trim() === 'Select Delivery City') {
                    var countryCityId = localStorage.getItem("countryCitySearchId");
                    $('.selectDeliverTxt').html('Select City');
                    internationalCitySearch(countryCityId);
                }
				let shoppingCountryHref = $('.shoppingCountry').attr('href');
				if (shoppingCountryHref != null && typeof shoppingCountryHref != 'undefined' && shoppingCountryHref.includes("?c=")) {
					shoppingCountryHref = shoppingCountryHref.substring(0, shoppingCountryHref.indexOf("?c="));
					$('.shoppingCountry').attr('href', shoppingCountryHref);
				}
            });
            $('.enterDeliveryLocation').click(function(){
               $('.selectDeliverTxt').html('Select Delivery Location');
            });
            searchCountryList();

            var checkCountryText = $('.onEditCountry').text().trim();
            if (selectedCountryCitySuggestion !== '' && selectedCountryCitySuggestion !== undefined && selectedCountryCitySuggestion !== null && checkCountryText !== 'Select Country') {
                countryCitySuggestionSelected(selectedCountryCitySuggestion);
            }

            function countryCitySuggestionSelected(suggestionClicked) {
              let countryCityIdAb = localStorage.getItem("countryCitySearchId");
                if(countryCityIdAb!==null){
                 $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/11/02/red-building.png");
                 $('.onEditCountryCity').addClass('fontWeightText');
                }
                $('.shoppingCountry').removeClass('hide');
                $('.shoppingCountry').css("display", "block");
                $('.shoppingCountry').addClass('modal-close');
                $('.shoppingCountry').css("background-color", "#318800");
                $('#countryCitySearch').attr('type', 'text');
                $('#countryCitySearch').prop('readonly', true);
                $('#countryCitySearch').prop('disabled', true);
                $('#countryCitySearch').val(suggestionClicked);
                $('#countryCitySearchDesktop').attr('type', 'text');
                $('#countryCitySearchDesktop').prop('readonly', true);
                $('#countryCitySearchDesktop').prop('disabled', true);
                $('#countryCitySearchDesktop').val(suggestionClicked);
                $('.clearCountryCitySearch').removeClass('hide');
                $('.selectedCountryCity').removeClass('hide');
                $('.selectedCountryCity').addClass('modal-close');
                $('.selectedCountryCity').css("background-color", "#318800");
                $('.onEditCountryCity').text(suggestionClicked);
                $('.imgEditCountryCity').removeClass('hide');
                $('.imgNormalCountryCity').addClass('hide');
                $('.inputBorderInter').css({"pointer-events": "none", "caret-color": "transparent", "background-color": "#FFFFFF", "border": "1px solid #D5D5D5", "box-shadow": "0 0 5px #fafafa"});
            }
            $('.clearCountryCitySearch').click(function () {
                clearCountryCitySearch();
            });
            function clearCountryCitySearch() {
             $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
                localStorage.removeItem("selectedCountryCitySuggestion");
                clearPartialCountryCity();

            }
            if (selectedSuggestion !== '' && selectedSuggestion !== undefined && selectedSuggestion !== null) {
                var selectedPincode = localStorage.getItem("selectedPincodeSuggestion");
                var selectedCityPostal = localStorage.getItem("selectedCityPostal");

                if (selectedPincode === "true" && typeof setReverseCityPincode !=='undefined') {
                      $('.editLoc').text("Deliver to " + setReverseCityPincode);
                }
                designChange();
                cityIndiaSelected();
            }
            $('.clearCitySearch').click(function () {
                clearCitySearch();
            });
            $(".citySearchSecondCmn.onEdit" ).click(function(){
             $('#indiaSearchPin').val('');
			  	let selectSearchText = $(".citySearchSecondCmn.onEdit");
			  	if(typeof selectSearchText !== "undefined"){
					let selectText = selectSearchText.text();
					if(typeof selectText !== "undefined" && selectText.trim() === "Enter Delivery Area or Pincode" || selectText.trim() === "Enter Pincode" ){
						clearCitySearch();
					}
					clearPartialCity();
				}
			});

            $(".citySearchSecondCmn" ).click(function(){
                 $('#indiaSearchPin').val('');
            });

			$(".internationalCountry" ).click(function(){
			  	 let sessionCity = $(".editLoc").attr("data-sessionCity");
			  	 let sessionCountryId = $(".editLoc").attr("data-sessionCountryId");
			  	 let redirectUrl=sessionCity.toLowerCase();
			  	 if(sessionCity.includes(",")){
					let countryCity =sessionCity.substring(sessionCity.lastIndexOf(",")+1);
					countryCity=countryCity.trim();
					$('.onEditCountryCity').text(countryCity);
					sessionCity = sessionCity.substring(0,sessionCity.indexOf(","));
					if(sessionCity != countryCity){
						redirectUrl = sessionCity.toLowerCase() +'?c='+countryCity;
					} else{
						redirectUrl = sessionCity.toLowerCase();
					}
					$("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/11/02/red-building.png");
            	 	$('.onEditCountryCity').addClass('fontWeightText');
            	 	localStorage.setItem("showEnterCityCheck",'true');
            	 	$('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
            	 	localStorage.removeItem("countryCityDisable");
				}
			  	 let currentEvent =$('#'+sessionCity.toLowerCase());
                let selectedCountry = currentEvent.find(".contryText").text().trim();
                let countryFlag = currentEvent.find(".contryImg").attr("src");
                let replaceGlobeImage = document.getElementById('replaceGlobeImage');
                let newSrc = countryFlag; // Use the countryFlag as the new source
                replaceGlobeImage.setAttribute('src', newSrc);
               $("#replaceGlobeImage").addClass('countryFlagDesign');

               let replaceMainGlobeImage = document.getElementById('countryFlagIcon');
                replaceMainGlobeImage.setAttribute('src', newSrc);

               if (selectedCountry !== null) {
				   if (selectedCountry === 'Saudi Arabia') {
					   selectedCountry = 'Saudi-Arabia';
				   }
		            setSelectedCountry(selectedCountry, redirectUrl);
		        }
		        $('.shoppingCountry').attr('href', '/' + redirectUrl);
		         localStorage.setItem("sCountryId", sessionCountryId);
		          localStorage.setItem("countryCitySearchId", sessionCountryId);
		          outSideIndiaClick();
			});
			$(".citySearchSecondCmn.onEditCountryCity.dropdown-country-list" ).click(function(){
				countryCityEditClick();
			});
			function clearPartialCity(){
					$('.unselected').addClass('marginTopForPinCode');
	                $('#ckPin').css("pointer-events", "auto");
	                $('.byName').addClass('hide');
                	$('.byPincode').removeClass('hide');
	                $('.inputBorder').css({"pointer-events": "auto", "caret-color": "auto", "background-color": "#FAFAFA", "border": "1px solid #707070"});
	                $('.clearCitySearch').addClass('hide');
	                $('#indiaSearchPin').val('');
	                $('.unselected').removeClass('hide');
	                $('#indiaCityByName').val('');
			}
			function clearPartialCountryCity(){
				 let countryCityId = localStorage.getItem("countryCitySearchId");
                $("#replaceBuildingImage").addClass('buildingDisplayBlock');
                $("#buildingHideShow").addClass('buildingHideShow');
                  internationalCitySearch(countryCityId);
                $('.shoppingCountry').css({"background-color": "#9E9999", "pointer-events": "none"});
                $('#countryCitySearch').removeAttr('disabled');
                $('#countryCitySearch').removeAttr('readonly');
                $('#countryCitySearch').val('');
                 $('#countryCitySearchDesktop').removeAttr('disabled');
                                $('#countryCitySearchDesktop').removeAttr('readonly');
                                $('#countryCitySearchDesktop').val('');
                $('.clearCountryCitySearch').addClass('hide');
                $('.selectedCountryCity').addClass('hide');
                $('.selectedCountryCity').css({"background-color": "rgba(243,127,10,1", "pointer-events": "auto"});
                let showEnterCityCheck = localStorage.getItem("showEnterCityCheck");
				if (showEnterCityCheck != null && typeof showEnterCityCheck != "undefined" && showEnterCityCheck === 'false') {
					$("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/11/02/red-building.png");
					$('.onEditCountryCity').addClass('fontWeightText');
					$('.outSideCountryCity ').addClass('hide');
				} else {
					$("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
                	$("#buildingHideShow").addClass('buildingHideShow');
					$('.onEditCountryCity').text('Select Delivery City');
				}
                $('.imgEditCountryCity').addClass('hide');
                $('.imgNormalCountryCity').removeClass('hide');

                if($("#countryCitySearch").length>0){
                inputFieldInternational.autocomplete = "off";
                $('.inputBorderInter').css({"pointer-events": "auto", "caret-color": "auto", "background-color": "#FFFFFF", "border": "1px solid #ff9212", "box-shadow": "0 0 5px #DA0E68"});
                }else{
                  countryCitySearchDesktop.autocomplete = "off";
                    $('.inputBorderInter').css({"pointer-events": "auto", "caret-color": "auto", "background-color": "rgb(239, 239, 239)", "border": "1px solid #33333", "box-shadow": "0 0 5px #33333"});
                }
			}
            function  clearCitySearch() {
                localStorage.setItem("crossClicked", true);
                $("#wrPinMsg").addClass("hide");
                $("#wrPinMsg").text('');
                $('.unselected').removeClass('hide');
                $('.selectedbt').addClass('hide');
                $('.selectedbt').css({"background-color": "#9E9999", "pointer-events": "none"});
                $('#indiaSearchPin').attr('type', 'number');
                let isCityExist ="";
				let cityAlreadyExist = $(".citySearchSecondCmn.onEdit").text();
				if (cityAlreadyExist != 'Enter Delivery Area or Pincode' || cityAlreadyExist != 'Enter Pincode' ) {
						let sessionCity = $(".editLoc").attr("data-sessionCity");
						if (sessionCity.includes(",")) {
							sessionCity = sessionCity.substring(0, sessionCity.indexOf(","));
							cityAlreadyExist = cityAlreadyExist.trim();
							if (sessionCity === cityAlreadyExist) {
								$('.shoppingIndia').css({ "background-color": "#318800", "pointer-events": "auto","cursor":"pointer" });
								$('.onEdit').text(" "+ cityAlreadyExist);
								isCityExist = "true";
							}
					}
				}
				if (isCityExist === "") {
					$('.shoppingIndia').css({ "background-color": "#9E9999", "pointer-events": "none" });
					            if($(".strip-delivery-in-desktop").length>0){
				                 	$('.onEdit').text("Enter Pincode");
					            }else{
					               $('.onEdit').text("Enter Delivery Area or Pincode");
					            }
				}
                $('.onEditCity').text("Select Delivery City");
                $('.imgEdit').addClass('hide');
                $('.imgNormal').removeClass('hide');

                clearPartialCity();
            }
            function  clearlocalSuggestion() {
                if(!$('.editLoc').hasClass('internationalCountry')){
					$('.editLoc').text("Deliver to ");
				}
                localStorage.removeItem("selectedSuggestion");
                presentCity = false;
                $('#current_city').text('City');
                localStorage.removeItem("addressSelected");
                localStorage.removeItem('selectedCtyNameSuggestion');
                localStorage.removeItem("crossClicked");
                localStorage.removeItem("addressSelected");
            }

            inputPincode.addEventListener('input', () => {
                if (inputPincode.value !== '') {
                    $('.clearCitySearch').removeClass('hide');
                    $('.tt-menu').removeClass('hide');
                } else {
                    $('.clearCitySearch').addClass('hide');
                    $('.tt-menu').addClass('hide');
                }
            });
            inputPincode.addEventListener('focus', () => {
                $('.tt-menu').addClass('hide');
            });
            inputFieldName.addEventListener('input', () => {
                if (inputFieldName.value !== '') {
                    $('.clearCitySearch').removeClass('hide');
                    $('.tt-menu').removeClass('hide');
                } else {
                    $('.clearCitySearch').addClass('hide');
                    $('.tt-menu').addClass('hide');
                }
            });
            inputFieldName.addEventListener('focus', () => {
                $('.tt-menu').addClass('hide');
            });
            $('#indiaSearchPin, #countryCitySearch','#countryCitySearchDesktop').on("keypress", function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                }
            });
            if($("#countryCitySearch").length>0){
                 inputFieldInternational.addEventListener('input', () => {
                      if (inputFieldInternational.value !== '') {
                          $('.clearCountryCitySearch').removeClass('hide');
                          $('.tt-menu').removeClass('hide');
                      } else {
                          $('.clearCountryCitySearch').addClass('hide');
                          $('.tt-menu').addClass('hide');
                      }
                });
            }else{
              countryCitySearchDesktop.addEventListener('input', () => {
                 if (countryCitySearchDesktop.value !== '') {
                     $('.clearCountryCitySearch').removeClass('hide');
                     $('.tt-menu').removeClass('hide');
                 } else {
                     $('.clearCountryCitySearch').addClass('hide');
                     $('.tt-menu').addClass('hide');
                 }
              });
            }
             if($("#countryCitySearch").length>0){
                inputFieldInternational.addEventListener('focus', () => {
                      $('.tt-menu').addClass('hide');
                 });
            }else{
              countryCitySearchDesktop.addEventListener('focus', () => {
                $('.tt-menu').addClass('hide');
              });
            }


            indianCitySearch();
            function indianCitySearch() {
                var states = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: searchIndianCity + '%QUERY',
                        wildcard: '%QUERY'
                    }
                });

                $('#indiaCityByName,#indiaSearchPin').typeahead(
                        {
                            hint: true,
                            highlight: true,
                            minLength: 2
                        },
                        {
                            name: 'states',
                            source: states,
                            autocomplete: "off",
                            limit: 8,
                            display: function (item) {
                                return item.areaName;
                            },
                            'updater': function (item) {
                                return item;
                            },
                            templates: {
                                suggestion: Handlebars.compile('<div areaName={{areaName}} class="citySearchSuggestionList">{{areaName}}</div>'),
                                empty: [
                                    '<div class="empty-message adbNoResultDesk">',
                                    'Sorry, we do not have this location covered',
                                    '</div>'
                                ].join('\n'),
                                  footer: function(query,settings) {
                                    if (!isNaN(query.query)) {
                                        return [
                                            '<div  data-target="popularCitiesModal" class="unselected withInIndia modal-trigger" id="suggestion-footer-dont-know-pincode" style="cursor:pointer;margin-left: 2px; padding: 5px 5px 0; color: #039BE5; font-size: 15px; text-align: left; align-items: flex-end;border-bottom: 1px solid #cdcccc !important; padding: 17px !important; padding-left: 0px !important;margin-left: -4px">',
                                            '<span class="desktop-d-know-pincode" style="font: var(--unnamed-font-style-normal) normal bold 50px/66px var(--unnamed-font-family-roboto);letter-spacing: var(--unnamed-character-spacing-0);text-align: left;font: normal normal bold 17px/17px Roboto;letter-spacing: 0px;color: #565656;opacity: 1;">?</span>',
                                            '<span class="span-text_d-pincode" style="margin-left: 12px;" > Don\'t Know Pincode?</span>',
                                            '</div>',
                                            '<div   data-target="popularCitiesModal" class="unselected withInIndia modal-trigger" id="suggestion-footer-dont-see-pincode modal-trigger" style="cursor:pointer;margin-left: 2px; padding: 5px 5px 0; color: #039BE5; font-size: 15px; text-align: left; align-items: flex-end;border-bottom: 1px solid #cdcccc !important; padding: 17px !important; padding-left: 0px !important;margin-left: -4px">',
                                            '<img class="desktop-d-see-pincode" style="width: 14px;" src="https://winni-sf-img-assets.s3.ap-south-1.amazonaws.com/groot/2024/04/mobile/Icon-ionic-md-eye-off.png" alt="eye">',
                                            '<span  class="span-text_d-pincode" style="margin-left: 8px;"> Don\'t see your Pincode? </span>',
                                            '</div>'
                                        ].join('\n');
                                    }
                                }
                            },

                        }
                ).on('typeahead:selected', function (e, suggestion) {
                    instanceDeliveryLoc.close();
                   if($(".desktop-deliveryIn-modal__main").length>0){
                    $('#popularCitiesModal').modal({closeOnClick: true});
                      instancePopularCitiesModal.close();
                     instanceOpenCitySearchModalDesktop.open();
                      $(".popular-city-overlay .modal-overlay").remove();
                    }
                   	localStorage.removeItem("countryCitySearchId");
                    localStorage.setItem("viaCheck", 'viaCheck');
                    localStorage.setItem("crossClicked", false);
                    localStorage.setItem("selectedCtyNameSuggestion", true);
                    localStorage.setItem("selectedPincodeSuggestion", false);
                    localStorage.setItem("selectedSuggestion", suggestion.areaName);
                    localStorage.setItem("selectedCityPostal", suggestion.adobeSearchSuggestedPostal);
                    designChange();
                    popularCitiesHide();
                    cityIndiaSelected();
                    $(".static-text-deliveryIn").removeClass("hide")
                    $('.pincode-search__div').addClass("hide");
                    $('.replace-indiaSearch-input').removeClass("hide");
                    let countrySelect = $('.onEditCountry').text();
					if (countrySelect != 'Select Country' && $('.internationalCountry').length > 0) {
                        localStorage.setItem("selectedCountryStore", "India");
						let pincode = null;
						let userCity = $(".onEdit").text();
						if (userCity.indexOf(",") > 0) {
							pincode = userCity.substring(0, userCity.indexOf(","));
							userCity = userCity.substring(userCity.indexOf(",") + 1);
						}
						setUserArea(pincode, userCity);
						if ($("#openCitySearchModal").is(":visible")) {
							$("#openCitySearchModal").hide();
						}
						localStorage.setItem("crossClicked", false);
					}
                });
            }

            function internationalCitySearch(counCityId) {
              searchCountryList();
                var countryCityId = localStorage.getItem("countryCitySearchId");
                if((typeof countryCityId === 'undefined' || countryCityId===null || countryCityId==='') && localStorage.getItem("sCountryId")!==null){
                countryCityId=localStorage.getItem("sCountryId");
                localStorage.setItem("countryCitySearchId",countryCityId);
                }
                $('#countryCitySearch').typeahead('destroy');
                $('#countryCitySearch').typeahead('val', '');
                $('#countryCitySearchDesktop').typeahead('destroy');
                $('#countryCitySearchDesktop').typeahead('val', '');
                let states = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: {
                        url: searchInternationalCity + '/' + countryCityId + '/%QUERY',
                        wildcard: '%QUERY'
                    }
                });

            function countryCitySearchTypeHead(deviceId,deviceType){
                 $(deviceId).typeahead(
                     {
                         hint: false,
                         highlight: true,
                         minLength: 3
                     },
                     {
                         name: 'states',
                         source: states,
                         autocomplete: "off",
                         limit: 20,
                         display: function (item) {
                             if (item.id === '-1' || item.id === '-2') {
                                 return item.searchString;
                             } else {
                                 return item.nameWithStateCode;
                             }
                         },
                         'updater': function (item) {
                             return item;
                         },
                         templates: {
                             suggestion: function (item) {
                                 if (item.id === '-1') {
                                    if (deviceType === "mobile") {
                                       return '<div data-target="deliveryCountry" class="checkTcp outSideCountry modal-trigger" style="color:blue">' + item.message + '</div>';
                                   } else {
                                       return '<div style="display:none;"></div>';
                                   }
                                 } else if (item.id === '-2') {
                                     return '<div class="clearCountryCitySelect" style="pointer-events:none;">' + item.message + '</div>';
                                 } else {
                                     return '<div class="handlerCountrySearch">' + item.nameWithStateCode + '</div>';
                                 }
                             }
                         }
                     }
                 ).on('typeahead:selected', function (e, suggestion) {
                     localStorage.setItem("selectedCountryCitySuggestion", suggestion.nameWithStateCode);
                     countryCitySuggestionSelected(suggestion.nameWithStateCode);
                       if(deviceType==="mobile"){
                              $('.handlerCountrySearch').addClass('modal-close');
                              $('.checkTcp').addClass('modal-close');
                               let selectedCountry = localStorage.getItem("selectedCountryStore");
                               let countryLowerCase=selectedCountry.toLowerCase()
                               $('.shoppingCountry').attr({ "href": `${'/'+ countryLowerCase}` });
                       }else{
                        $('.replace-country-city-input').removeClass("hide");
                        $('.country-city-search-div').addClass("hide");
                           let selectedCountry = localStorage.getItem("selectedCountryStore");
                           let countryLowerCase=selectedCountry.toLowerCase()
                           if($(".header-primary").length>0){
                              $('.shoppingCountry').attr({ "href": `${'/'+ countryLowerCase}` });
                           }
                      }

                     if ($('.shoppingCountry').css('pointer-events') == 'none') {
                         $('.shoppingCountry').css({ "pointer-events": "auto" });
                              if(deviceType==="mobile"){
                          $('.shoppingCountry').attr({ "href": "" });
                          }
                     }
                     let message = suggestion.message;
                     if (message && message.includes(' Delivery?')) {
                         clearCountryCitySearch();
                     }
                 });


            }


                if($("#countryCitySearch").length>0){
                    countryCitySearchTypeHead('#countryCitySearch',"mobile");
                }
                if($("#countryCitySearchDesktop").length>0){
                   countryCitySearchTypeHead('#countryCitySearchDesktop',"desktop");
                }

            }
        }
    }
function searchCountryList() {
     $("#searchTheCountryListMobile,#searchTheCountryListDesktop,#searchTheCountryList").click(function () {
          $("#selectedCountrySearch").removeClass("countryShowHide");
          $(".allCountrySelected").removeClass("countryShowHide");
          let checkCountryText = $('.onEditCountry').text().trim();
          if (checkCountryText === 'Select Country') {
               $('#selectedCountrySearch').addClass('hide');
          }
     });
}
    $('.clearCountryCitySearch').click(function(){
        $("#replaceBuildingImage").attr("src", "https://assets.winni.in/groot/2023/10/25/mobile/building.png");
    });

	if($(".desktop-deliveryIn-modal__main").length>0){
        $('.country-city-edit-click').click(function() {
            countryCityEditClick();
        });
	}else{
	$('.imgEditCountryCity').click(function() {
    		countryCityEditClick();
    	});
	}
	function countryCityEditClick(){
		let countryCityId = localStorage.getItem("countryCitySearchId");
		let sessionCity = $(".editLoc").attr("data-sessionCity");
		let checkCountryText = $('.onEditCountry').text().trim();
		if (($('.internationalCountry').hasClass('internationalCityExist') && $('.onEditCountryCity').text() !== 'Select Delivery City'
			&& typeof checkCountryText !== "undefined" && checkCountryText !== null && checkCountryText !== 'Select Country'
			&& sessionCity.toLowerCase().includes(checkCountryText.toLowerCase()) &&
			sessionCity.includes(','))) {
			$('.selectDeliverTxt').html('Select City');
			internationalCitySearch(countryCityId);
			clearCountryCitySearchInput();
		} else {
			clearPartialCountryCity();
		}
	}
	function clearCountryCitySearchInput() {
		$('#countryCitySearch').removeAttr('disabled');
		$('#countryCitySearch').removeAttr('readonly');
		$('#countryCitySearch').val('');
		$('#countryCitySearchDesktop').removeAttr('disabled');
        $('#countryCitySearchDesktop').removeAttr('readonly');
        $('#countryCitySearchDesktop').val('');
		$('.clearCountryCitySearch').addClass('hide');
		$('.selectedCountryCity').addClass('hide');
		$('.selectedCountryCity').css({ "background-color": "rgba(243,127,10,1", "pointer-events": "auto" });
		if($('#countryCitySearch').length>0){
		$('.inputBorderInter').css({ "pointer-events": "auto", "caret-color": "auto", "background-color": "#FFFFFF", "border": "1px solid #ff9212", "box-shadow": "0 0 5px #DA0E68" });
		  inputFieldInternational.autocomplete = "off";
		}else{
		  countryCitySearchDesktop.autocomplete = "off";
		  $('.inputBorderInter').css({ "pointer-events": "auto", "caret-color": "auto", "background-color": "#FFFFFF", "border": "none", "box-shadow": "none" });
		}
	}
function setUserCity(city) {
    instanceDeliveryLoc.close();
    localStorage.removeItem("countryCitySearchId");
    localStorage.setItem("viaCheck", 'viaCheck');
    localStorage.setItem("crossClicked", false);
    localStorage.setItem("selectedCtyNameSuggestion", true);
    localStorage.setItem("selectedPincodeSuggestion", false);
    localStorage.setItem("selectedSuggestion", city);

    designChange();
    cityIndiaSelected();
    popularCitiesHide();
    let countrySelect = $('.onEditCountry').text();
    if (countrySelect != 'Select Country' && $('.internationalCountry').length > 0) {
        localStorage.setItem("selectedCountryStore", "India");
        let pincode = null;
        let userCity = $(".onEdit").text();
        if (userCity.indexOf(",") > 0) {
            pincode = city.substring(0, city.indexOf(","));
            userCity = city.substring(city.indexOf(",") + 1);
        }
        setUserArea(pincode, userCity);
        if ($("#openCitySearchModal").is(":visible")) {
            $("#openCitySearchModal").hide();
        }
        localStorage.setItem("crossClicked", false);
    }
}
    if($('#popularCities').length > 0){
        let popularCities = document.querySelectorAll(".popular-city");
            popularCities.forEach(function (popularCity) {
                popularCity.addEventListener("click", function () {
                    let userArea = this.querySelector(".city-name").innerText;
                    let userCity;
                    if (userArea.includes("Bengaluru")) {
                        userCity = userArea.replace("Bengaluru", "Bangalore");
                    } else if (userArea.includes("Delhi-NCR")) {
                        userCity = userArea.replace("Delhi-NCR", "Delhi");
                    } else {
                        userCity = userArea;
                    }
                    setUserCity(userCity);
                });
            });
    }
$("#leftArrowIcon").on('click', function () {
   popularCitiesHide();
  $('#detectLocationText').removeClass('detect-loaction_postion');
});
function popularCitiesHide(){
$("#popularCities").addClass('hide');
}
$('.checkTcp,.outSideCountry').on('click',function (){
   $('#noResultFound').addClass('hide');
})
 let detectLocationModalClass = document.getElementById('model-confirm-geo-address');
 let instanceDetectLocationModal = M.Modal.init(detectLocationModalClass);
 $('.close-detect_location').on('click',function (){
   instanceDetectLocationModal.close();
   $('#model-confirm-geo-address').modal({closeOnClick: true});
 })
 $("#proceeded-button-set").click(function () {
         let proceededButton = document.getElementById("proceeded-button-set");
         let selectedAddressId=proceededButton.getAttribute("data-selectedAddressId");
         if(selectedAddressId) {
             processSelectedAddress()
         }
     });
     $("#ckPin,.address-conform").click(function () {
       processSelectedAddress();
     });
function processSelectedAddress() {
    $('#wrPinMsg').show();
    $("#wrPinMsg").html('');
    localStorage.setItem("crossClicked", false);
    localStorage.setItem("viaCheck", 'viaCheck');
    let pincode = $("#indiaSearchPin").val();
    if (pincode.includes(",")) {
        pincode = pincode.substring(0, pincode.indexOf(","));
    }
    let url = checkUserPin + "?pinCode=" + pincode;
    errorMsg = 0;
    $('.shoppingIndia').css({ "opacity": "1", "pointer-events": "auto","cursor":"pointer" });

    $.ajax({
        url: url,
        type: 'get',
        success: function(response) {
            if (response.success === true) {
                handleSuccessResponse(response, pincode);
            } else {
                handleErrorSelectedAddress();
                $("#wrPinMsg").html(response.message);
            }
        }
    });
}

function handleSuccessResponse(response, pincode) {
    $('.shoppingIndia').css({ "opacity": "1", "pointer-events": "auto","cursor":"pointer" });

    if (response.isAvailable === false) {
        showError(response.message);
    } else {
        hideError();
        updateLocalStorage(response, pincode);
        updateUI(response, pincode);
    }
}

function handleErrorSelectedAddress() {
    $("#wrPinMsg").removeClass("hide");
    $('.shoppingIndia').css({ "opacity": "0.5", "pointer-events": "none" });
    errorMsg = 1;
    $('#unselected').addClass('marginTopPincode');
    $('.unselected').addClass("checkMarginTop");
}

function showError(message) {
    $("#wrPinMsg").removeClass("hide");
    $("#wrPinMsg").html(message);
    $('#unselected').addClass('marginTopPincode');
    $('.unselected').addClass("checkMarginTop");
}

function hideError() {
    $("#wrPinMsg").addClass("hide");
}

function updateLocalStorage(response, pincode) {
    localStorage.setItem("selectedCtyNameSuggestion", false);
    localStorage.setItem("selectedPincodeSuggestion", true);
    localStorage.setItem("selectedSuggestion", response.pinCity);
    localStorage.setItem("selectedCityPostal", pincode);
    localStorage.removeItem("viaCheck");
    localStorage.setItem('modalCloseViaContinue', true);
    localStorage.setItem('cityRemove', false);
}

function updateUI(response, pincode) {
    let selectedCtyNameSuggestion = localStorage.getItem('selectedCtyNameSuggestion');
    let selectedPincodeSuggestion = localStorage.getItem('selectedPincodeSuggestion');
    let userCity = $(".onEdit").text();

    if (selectedCtyNameSuggestion === "true") {
        userCity = formatUserCity(userCity);
        if($(".strip-delivery-in-desktop").length>0){
           $('.editLoc').text(userCity);
        }else{
          $('.editLoc').text("Delivery To " + userCity);
        }
        closeCitySearchModal();
        setUserArea(null, userCity);
    }

    if (selectedPincodeSuggestion === "true") {
        $('.editLoc').text("Deliver to " + pincode);
        closeCitySearchModal();
        setUserArea(pincode, null);
    }

    localStorage.setItem("crossClicked", false);
    instanceDeliveryLoc.close();
    designChange();
    cityIndiaSelected();
}

function formatUserCity(userCity) {
    if (userCity.indexOf(",") > 0) {
        userCity = userCity.substring(userCity.indexOf(",") + 1);
    }
    return userCity;
}

function closeCitySearchModal() {
    if ($("#openCitySearchModal").is(":visible")) {
        $("#openCitySearchModal").hide();
    }
}


 $("#select-address-india").on('click', function () {
         $('.first-content-modal').hide();
         $('.second-content-modal').removeClass('hide');
         $('#openCitySearchModal').addClass("first-class-content");
         $('#return-arrow').removeClass('hide');
         $('#cross-icon-hide').addClass('hide');
         $('#modal-title-shift').addClass('shift-down-title');
         $('.forth-content-modal').addClass('hide');
         $('#modal-title-saved').addClass('hide');
  });

    function getAddressList(countryId) {
        let countryCheck = countryId;
        $.ajax({
            type: "GET",
            url: savedAdressedUri,
            success: function(response) {
                handleResponse(response, countryCheck);
            },
            error: handleError
        });
    }

function handleResponse(response, countryCheck) {
        if(response.existInterCity===true || response.existInterCity==='true'){
         $('.citySearchSecondCmn__desktop').addClass('internationalCityExist');
        }else{
          $('.citySearchSecondCmn__desktop').removeClass('internationalCityExist');
        }
    if (response.cutomerAddresses?.length > 0) {
        let addresses = response.cutomerAddresses;
        const addressLength = addresses.length;
        if(addressLength>0){
            $(".saved-address").html(`SAVED ADDRESSES (${addressLength})`);
        }else{
            $(".saved-address").html("SAVED ADDRESSES");
        }
        if (typeof addresses !== "undefined" && addresses !== null) {
        let addressList = $("#wrapperUserAddressWithinIndia");
        let outsideIndiaList = $("#wrapperUserAddressOutSideIndia");
        addressList.empty();
        outsideIndiaList.empty();
        let processedButton = $('.processed-button');
        processedButton.prop('disabled', true);
        addresses.forEach(address => appendAddress(address, addressList,outsideIndiaList, processedButton, countryCheck));
        }
    }else{
        $("#user-saved-addresses").addClass("hide");
    }
}

function handleError(xhr, status, error) {
    console.error(error);
}
function normalizeCountryName(city){
    	 let usaCountry = 'United States';
    	 if (city === usaCountry.toLowerCase()) {
    		 city = "usa";
    	 }
    	 let uaeCountry = 'United Arab Emirates';
    	 if (city === uaeCountry.toLowerCase()) {
    		 city = "uae";
    	 }
    	 let ukCountry = 'United Kingdom';
    	 if (city === ukCountry.toLowerCase()) {
    		 city = "uk";
    	 }
    	 let saCountry = 'Saudi Arabia';
    	 if (city === saCountry.toLowerCase()) {
    		 city = 'saudi-arabia';
    	 }
    	 let soaCountry = 'South Africa';
         if (city === soaCountry.toLowerCase()) {
             city = 'south-africa';
         }
    	  let oceaniaCountry = 'New Zealand';
             if (city === oceaniaCountry.toLowerCase()) {
                 city = 'new-zealand';
             }
    	 return city;
}


function appendAddress(address, addressList, outsideIndiaList, processedButton, countryCheck) {
     const first15Characters = address.address.substring(0, 20);
     const shortenedAddress = first15Characters + "...";
     let city=address.cityName.toLowerCase();
     if(address.cityName!=null){
        city = address.cityName.toLowerCase();
    }
   city=normalizeCountryName(city);
        let listItem = $(
            `<div class='set-address-details' style='margin-top:0px;caret-color:transparent;border: 1px solid #D5D5D5; margin-bottom: 15px;border-radius: 4px;background: white;padding:10px;height: auto;'>
                <div style='width:100%;'>
                    <label class="address-label" style='width: 100%; display: inherit; align-items: inherit;justify-content: inherit;color: #000;'>
                        <input type='radio' name='${city}' value='${address.id}' class="address-input" style='margin-right: 10px;visibility: hidden; position: absolute;'>
                        <span style='font-weight: 500; font-size: 16px;padding-left:0;'>
                            <span style='font-weight:bold;font-size: 16px;word-break: break-all;'>${address.name},</span> ${address.postalCode} - ${shortenedAddress} , ${address.cityName}
                        </span>
                    </label>
                </div>
            </div>`
        );
    if (address.countryId === countryCheck) {
        addressList.append(listItem);
    } else {
        outsideIndiaList.append(listItem);
    }
    listItem.click(() => handleAddressClick(listItem, address, processedButton,"mobile"));
}

function handleAddressClick(listItem, address, processedButton,device) {
        if(device === "mobile"){
            let userCity = address.cityName;
            let countryName=address.countryName.toLowerCase();
            const countryCityName=address.cityName;
            let proceededButton = $(".processing_btn");
            proceededButton.attr("data-selectedAddressId", address.postalCode);;
            proceededButton.attr("data-selectedCity", countryCityName);;
            proceededButton.attr("data-selectedId", address.countryId);
            proceededButton.attr("data-selectedCountryName", countryName);
            listItem.css("background-color", "#F0FFE8");
            processedButton.prop('disabled', false);
            $(".processing_btn").css({ "pointer-events": "auto", "background": "#5DA434 0% 0% no-repeat padding-box" }).removeClass("disabled");
            $("#clear-selection-active-button").removeClass("hide");
            $(".set-address-details").not(listItem).css("background-color", "white");
            $("#height-adjust_saved-addresses").css({"height": "calc(100dvh - 210px)"});
            if(userCity !=null){
             localStorage.setItem('selectedCtyNameSuggestion', true);
             }
        }else{
         	let userCity = address.cityName;
            let userCityPincode = address.postalCode;
         	let countryId = address.countryId;
            let countryName=address.countryName.toLowerCase();
            if (parseInt(countryId) === indiaCountryId) {
                 localStorage.removeItem("selectedCountryCitySuggestion");
                 localStorage.removeItem("countryCitySearchId");
                 localStorage.setItem("selectedCountryStore", "India");
                setUserArea(userCityPincode, userCity);
                if(userCity !=null){
                    localStorage.setItem('selectedCtyNameSuggestion', true);
                 }
                 if(address !=null){
                     localStorage.setItem('selectedPincodeSuggestion', address);
                 }
               localStorage.setItem("sCountryId",indiaCountryId);
               cityIndiaSelected();
               setUserArea(userCityPincode, userCity);
               localStorage.setItem("crossClicked", false);
            } else {
                 countryName =normalizeCountryName(countryName);
                  let hrfValue = "/"+countryName;
                  setSelectedCountry(countryName,hrfValue);
                  countryCitySuggestionSelected(userCity);
                  localStorage.setItem("selectedCountryCitySuggestion", userCity);
                  localStorage.setItem("sCountryId",countryId);
                  setUserForCountryCitySearch();
            }
        }
}

function clearSelectionBtn(button) {
    $(".processing_btn").removeAttr("data-selectedAddressId");
    $(".processing_btn").prop('disabled', true);
    $(".processing_btn").css({ "pointer-events": "none", "background":"#9E9999 0% 0% no-repeat padding-box" }).addClass("disabled");
    $(".set-address-details").css("background-color", "white");
    $(button).addClass("hide");
}

function clearClassAddresslistParentDiv(){
   $("#height-adjust_saved-addresses").css({"height": "calc(100dvh - 145px)"});
}

$("#clear-selection-active-button").click(function() {
    clearSelectionBtn(this);
    clearClassAddresslistParentDiv();

});


let proceededButton = $(".processing_btn");
  proceededButton.on('click', function() {
  localStorage.setItem('deliveryInModalShown', 'true');
    let proceededButton = $(".processing_btn");
 	let address = proceededButton.attr("data-selectedAddressId");
 	let userCity = proceededButton.attr("data-selectedCity");
 	let countryId = proceededButton.attr("data-selectedId");
 	let countryName = proceededButton.attr("data-selectedCountryName");
 	if (parseInt(countryId) === indiaCountryId) {
 	    localStorage.removeItem("selectedCountryCitySuggestion");
        localStorage.removeItem("countryCitySearchId");
        localStorage.setItem("selectedCountryStore", "India");
 		setUserArea(address, userCity);
 		if(userCity !=null){
           localStorage.setItem('selectedCtyNameSuggestion', true);
        }
        if(address !=null){
            localStorage.setItem('selectedPincodeSuggestion', address);
        }
      localStorage.setItem("sCountryId",indiaCountryId);
      cityIndiaSelected();
      setUserArea(address, userCity);
      localStorage.setItem("crossClicked", false);
 	} else {
 	     countryName =normalizeCountryName(countryName);
         let hrfValue = "/"+countryName;
         setSelectedCountry(countryName,hrfValue);
         countryCitySuggestionSelected(userCity);
         localStorage.setItem("selectedCountryCitySuggestion", userCity);
         localStorage.setItem("sCountryId",countryId);
         setUserForCountryCitySearch();
 	}
});

function hideClearSelectionBtn(){
  $("#clear-selection-active-button").addClass("hide");
}

$("#openSavedAdd").click(function(){
  let outSideIndia= document.getElementById('outSideIndia');
    clearClassAddresslistParentDiv();
    if(outSideIndia.checked){
      clearSelectionBtn();
      hideClearSelectionBtn()
    }else{
     clearSelectionBtn();
     hideClearSelectionBtn();
    }
})
  $("#addressDetails").on('click', function () {
          addressSetIndiaAndOutSideIndia();
          getAddressListForCart();
          $('#country-button-continue').addClass('hide');
  });
  $("#openCityForMobile").on("click",function(){
       $("#addressDetails").removeClass("hide");
  })

if ($(".deliveryInSearchCity").length > 0) {
    let cityResponse = $("#currentCitySelected").val();
    let isModalShown = localStorage.getItem('deliveryInModalShown');
    let modalExpireTime = localStorage.getItem('deliveryInModalExpireTime');
    let currentTime = new Date().getTime();
    let outSideIndiaRadioButton = document.getElementById('outSideIndia');
    function shouldShowModal() {
        if (modalExpireTime && currentTime > parseInt(modalExpireTime)) {
            localStorage.removeItem('deliveryInModalShown');
            localStorage.removeItem('deliveryInModalExpireTime');
            return true;
        }
        return !isModalShown || isModalShown === 'false';
    }

    function setModalShown() {
        const expireTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('deliveryInModalShown', 'true');
        localStorage.setItem('deliveryInModalExpireTime', expireTime.toString());
    }
    if ($(".init-authentication").length === 0 && !localStorage.getItem('deliveryInModalShown') && shouldShowModal() && isEnabledUserDemographic && (!cityResponse || cityResponse.trim().length === 0) && $(".mobileDeliveryInMobalInit").length>0) {
        if ($(".open").length === 0) {
            const instanceModalId = document.getElementById('openCitySearchModal');
            const instanceOpenCitySearchModal = M.Modal.init(instanceModalId, {
                onCloseEnd: function() {
                    localStorage.setItem('deliveryInModalShown', 'true');
                    setModalShown();
                }
            });
            if(outSideIndiaRadioButton.checked){
               getAddressList(outsideIndiaCoutryCode);
                $('.shoppingCountry').removeClass("hide");
            }else{
               getAddressList(indiaCountryId);
                $('.shoppingCountry').addClass("hide");
            }

          $('#openCitySearchModal .modal-close').on('click', function() {
                 localStorage.setItem('deliveryInModalShown', 'true');
                 instanceOpenCitySearchModal.close();
                 setModalShown();
             });

            instanceOpenCitySearchModal.open();
                clearPartialCountryCity()
                 clearCitySearch();
                 clearCountryCitySearch();
            $('.shoppingIndia').css({ "background-color": "#9E9999", "pointer-events": "none" });
        }
    }
}
    $(".edit-icon").on("click", function (event) {
        $('.pincode-search__div').removeClass("hide");
        $('.replace-indiaSearch-input').addClass("hide");
        $('#indiaSearchPin').focus();
    });
    $(".replace-country-city-input").on("click",function (){
        $('.country-city-search-div').removeClass("hide");
        $('.replace-country-city-input').addClass("hide");
        $('#countryCitySearchDesktop').focus();
    })
     $(".replace-country-input").on("click",function (){
        $('.country-search-div').show()
        $('.replace-country-input').hide();
        $('#searchTheCountryDesktop').focus();
    })

      $(".open-dropdown-with-address").on("click",function (){
          $('.pincode-search-div').removeClass("hide");
        })

        $('#indianPincodeSearchInputDesktop').on('click', function(event) {
            event.stopPropagation();
            $('#showPincodeMsg').hide();
            fetchSavedAddresses();
        });

        function fetchSavedAddresses() {
            $.ajax({
                type: "get",
                url: savedAdressedUri,
                success: handleSavedAddressesResponse,
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }

        function handleSavedAddressesResponse(response) {
            if (response.success === true) {
                processAddresses(response.cutomerAddresses);
            } else {
                alert(response.message);
            }
        }

        function processAddresses(addresses) {
            let addressListDesktopDeliverIn = $("#addressList-desktop-deliveryIn");
            if (typeof addresses !== "undefined" && addresses !== null && addresses.length > 0) {
                let addressCount = 0;
                addressListDesktopDeliverIn.empty();
                addresses.forEach(function(address) {
                    addressCount++;
                    const listItem = createAddressListItem(address);
                    addressListDesktopDeliverIn.append(listItem);
                    listItem.click(function() {
                        handleAddressClick(listItem, address, null, "desktop");
                    });
                });
                $(".saved-delivery-address").html(`Select from saved addresses (${addressCount})`);
                if (addressCount > 0) {
                    $("#addressUserSavedDesktop").removeClass("hide");
                }
                updateSavedAddressUI();
            }
        }

        function createAddressListItem(address) {
            const first15Characters = address.address.substring(0, 20);
            const shortenedAddress = first15Characters + "...";
            let city = address.cityName != null ? address.cityName.toLowerCase() : "";
            city = normalizeCountryName(city);
            return $("<div class='listPinCode-desktop modal-close' data-id='" + address.id + "'></div>").html(
                "<div class='main-div-listPincode'>" +
                "<span class='bold-text user-name__saved-add_span' >" + address.name + "</span>, " +
                address.postalCode + " - " + shortenedAddress + " , " +
                address.cityName + " " + address.countryName +
                "</div>"
            );
        }

        function updateSavedAddressUI() {
            $(".saved-addressed-content").removeClass("addBorder");
            $(".saved-addressed-content").addClass("js-saved-address-margin");
            $(".saved-address").html("SAVED ADDRESSES");
            $('#addressListDiv').removeClass('hide');
            $(".add-savedAddress").show();
            $(".no-address-found-show").addClass("hide");
            $(".addBorder").css("margin-top", "0px");
        }

        $(".showCountryList").on('click', function(event) {
            event.stopPropagation();
            $('#countryListForDesktop').addClass('show-dropdown');
             $('#addressUserSavedDesktop').addClass('hide');
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.showCountryList, #countryListForDesktop').length) {
                $('#countryListForDesktop').removeClass('show-dropdown');
            }
        });
       $(document).on('click', function(event) {
           if (!$(event.target).closest('.replace-indiaSearch-input,.pincode-search__div').length) {
               $('.replace-indiaSearch-input').removeClass('hide');
               $('.pincode-search__div').addClass('hide');
           }
       });

       $(document).on('click', function(event) {
            if (!$(event.target).closest('.replace-country-city-input,.country-city-search-div').length) {
                $('.replace-country-city-input').removeClass('hide');
                 $('.country-city-search-div').addClass('hide');
            }
        });


         $(document).on('click', function(event) {
             if (!$(event.target).closest('#indianPincodeSearchInputDesktop, #addressUserSavedDesktop').length) {
                 $('#addressUserSavedDesktop').addClass('hide');
                 $(".saved-delivery-address").html(`Select from saved addresses`);
             }
         });

        $('#countryListForDesktop').on('click', function(event) {
            $('.list-country-desktop').removeClass('hide');
            event.stopPropagation();
        });
        function DontKnowTextShow(){
            $(".static-text-deliveryIn").removeClass("hide")
            $('.pincode-search__div').addClass("hide");
            $('.replace-indiaSearch-input').removeClass("hide");
        }
        $(".popular-cities-close-btn").on('click',function(){
           DontKnowTextShow();
        })
    if ($(".desktop-deliveryIn-modal__main").length > 0) {
        function getAddressListForDesktop() {
            $.ajax({
                type: "get",
                url: savedAdressedUri,
                success: function (response) {
                    let addresses = response.cutomerAddresses;
                    if (Array.isArray(addresses) && addresses.length > 0) {
                        $('#addressCountOne').removeClass("hide");
                    } else {
                        $('#addressCountOne').addClass("hide");
                    }
                    if(response.existInterCity===true || response.existInterCity==='true'){
                      $('.citySearchSecondCmn__desktop').addClass('internationalCityExist');
                    }else{
                       $('.citySearchSecondCmn__desktop').removeClass('internationalCityExist');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", error);
                }
            });
        }
        getAddressListForDesktop();
    }

       $(".popular-cities-close-btn").on("click", function() {
           $('body').css({'overflow':'auto'});
       });
   $(".clearCountryCityInput").on('click',function(){
        clearCountryCitySearch();
    });

$("#searchTheCountryDesktop").on("input", function () {

    let value = $(this).val().toLowerCase().trim();
    let countries = $(".countryListPageDI .d-space");

    if (value === "") {
        countries.removeClass("hide").show();
        $("#noResultFoundDesktop").css("display", "none");
        return;
    }
    let filtered = countries.filter(function () {
        return $(this).text().toLowerCase().includes(value);
    });
    countries.addClass("hide").hide();
    filtered.removeClass("hide").show();
    if (filtered.length === 0) {
        $("#noResultFoundDesktop").css("display", "block");
    } else {
        $("#noResultFoundDesktop").css("display", "none");
    }
});



    $("#searchTheCountryDesktop").on("focus", function () {
          emptyCountrySearchInput();
           $(".countryListPageDI .d-space").removeClass("hide").show();
           $("#noResultFoundDesktop").css("display", "none");
           $(".country-search-div").show();
           $(".countryListPageDI").show();
    });

    $(".replace-country-input").on("click", function () {
       emptyCountrySearchInput();
       $(".countryListPageDI .d-space").show();
    });

    $("#searchTheCountryDesktop").on("blur", function () {
            resetSearch();
    });

    function resetSearch() {
        emptyCountrySearchInput();
        $(".replace-country-input").show();
        $(".country-search-div").hide();
    }

    function emptyCountrySearchInput(){
       $("#searchTheCountryDesktop").val('');
    }
});

let inputField = document.getElementById('indiaCityByName');
let deliveryLocationSearch = document.getElementById('deliveryLocationSearch');

function sanitizeInput(inputValue) {
    return inputValue.replace(/[^a-zA-Z\s]/g, '');
}

function sanitizeAndLimitLength(event) {
    let inputValue = event.target.value;
    let sanitizedValue = sanitizeInput(inputValue);
    sanitizedValue = sanitizedValue.substring(0, 30);
    event.target.value = sanitizedValue;
}

if (inputField !== null) {
    inputField.addEventListener('input', sanitizeAndLimitLength);
}

if (deliveryLocationSearch !== null) {
    deliveryLocationSearch.addEventListener('input', sanitizeAndLimitLength);
}


$(document).on('click', '.checkTcp, .outSideCountry', function (event) {
    $('#noResultFound').addClass('hide');
});

  let mainModalInDesktopId = document.getElementById('openCitySearchModal');
  let instanceMainModalInDesktopM = M.Modal.init(mainModalInDesktopId);
  $("#closeOpenCitySearchModal").on("click", function() {
   $("#openCitySearchModal").removeClass("login-section-length-check")
    instanceMainModalInDesktopM.close();
    $("#deliveryInCitySearcModal .modal-overlay").remove();
    $("#openCitySearchModal").css("display", "none");
    $('body').css('overflow', 'auto');
  });

