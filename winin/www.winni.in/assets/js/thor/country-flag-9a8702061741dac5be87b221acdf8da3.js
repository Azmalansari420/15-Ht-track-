function countryFlagJs() {
    $(document).ready(function () {
        if ($('.modal').length > 0) {
            $('.modal').modal();
        }
        $('.CountryCodeList li').click(function () {
            $("#showPerPhone").html("* This is required")
            $('.senderMob ').removeClass("dateInputDiv");
            $('.senderMob ').addClass("dateInputDivError");
            $('.senderMob ').removeClass("dateInputDivFocus");
            $('.output1').html('');
            $('.searchTheKey,#loginMobile,#senderPhoneNumber').val('');
            var countryCode = $(this).attr('data-id');
            let countryLetter = $(this).attr('data-value');
            $('#loginCountryCode').val(countryCode);
            $('.countrySelect').text(countryCode);
            $('#countryLetter').val(countryLetter);
            $('.countryListModal').modal('close');
            $('.countrySelect').attr('data-value', countryLetter);
            if($(".CountryCodeList").hasClass("counCodeLogin") && $("#emailTab").css('display') !== 'none' && countryCode!=='undefined' && countryCode!== undefined){
				onCapcthaEvent(countryCode);
			}
        });
        $(".loginOtp").keydown(function (event) {
            var verifyBtn = $('.ck-login-otp-wrapper').hasClass('hide');
            let submitBtn = $('.fl-remove .submitBtn').hasClass('hide');
            if (event.which === 13 && submitBtn && !verifyBtn) {
                $("#verifyLoginWithOtp").click();
                return false;
            }
        });
        $('.modal-close1').click(function () {
            $('.countryListModal').modal('close');
        });
        $('.forgotPwdM').click(function () {
            $('#countryModalf').modal('close');
        });
        $('.countrySelect').click(function () {
			$(".showLoginPassword").addClass('hide');
            $(".searchTheKey").val('');
            $('.CountryCodeList li').show();
        });
        $(".searchTheKey").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".CountryCodeList > li,.CountryCodeList > li span").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
        $(document).on('keypress', 'form input#searchTheKey', function (e) {
            if ($(this).val() == '' && e.keyCode == 13) {
                M.toast({html: 'Please select country code'});
            }
            if (e.keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
        $(".toggle-password").click(function () {
            $(this).toggleClass("fa-eye-show");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") === "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
let SendData,SendDataPhone;
       SendData=  function senderNameChk() {
            const senderNameData = $("#senderName").val();
                                  if(senderNameData.length < 1) {
                                      $("#showPerName").html("* This is required")
                                      $('#senderName').removeClass("dateInputDiv");
                                      $('#senderName').addClass("dateInputDivError");
                                      $('#senderName').removeClass("dateInputDivFocus");
                                  } else if(senderNameData.length < 3){
                                       $("#showPerName").html("Name is too short!")
                                       $('#senderName').removeClass("dateInputDiv");
                                       $('#senderName').addClass("dateInputDivError");
                                       $('#senderName').removeClass("dateInputDivFocus");
                                  }else if(senderNameData.length > 60) {
                                      $("#showPerName").html("Name is too long!")
                                      $('#senderName').removeClass("dateInputDiv");
                                      $('#senderName').addClass("dateInputDivError");
                                      $('#senderName').removeClass("dateInputDivFocus");
                                  }else {
                                  $("#showPerName").html("")
                                      $('#senderName').removeClass("dateInputDiv");
                                      $('#senderName').removeClass("dateInputDivError");
                                      $('#senderName').addClass("dateInputDivFocus");
                                  }
        }
        SendDataPhone=  function senderPhoneChk() {
        const senderPhoneDataChk = $("#senderPhoneNumber").val();
                                                  if(senderPhoneDataChk.length === 0) {
                                                      $("#showPerPhone").html("* This is required")
                                                      $('.senderMob ').removeClass("dateInputDiv");
                                                      $('.senderMob ').addClass("dateInputDivError");
                                                      $('.senderMob ').removeClass("dateInputDivFocus");
                                                  }
                                                  else {
                                    $("#showPerPhone").html("")
                                                  }
                        }

        $('#senderName').keyup(function (e) {
                      SendData()
                  })
                  $('#senderPhoneNumber').keyup(function (e) {
                                        SendDataPhone()
                                    })
        $('#editSenderInfo').click(function () {
SendData();
SendDataPhone();
            $('#editSenderInfo').addClass('hide');
            $('.senderMob').removeClass("dateInputDiv");
            $('.senderMob').addClass('dateInputDivFocus');
            $('#senderName,.senderMob').removeClass('disableField');
        });
        if ($('#senderPhoneNumber').val() === '' || $('#senderName').val() === '') {
            $('#editSenderInfo').addClass('hide');
            $('#senderName,.senderMob').removeClass('disableField');
        }
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
}
$(document).ready(function () {
    $("#ckDynContentWrapperLogin").on("input", "#loginMobile", parseNo);
    $("#ckDynContentWrapper").on("input", "#loginMobile", parseNo);
    $("#ckDynContentWrapper").on("input", "#senderPhoneNumber", parseNo);
    $(".signUpMb").on("input",  parseNo);
    
    let country;
    function parseNo(e) {
        country = $('.countrySelect').attr('data-value');
        let mblVal = $(this).val();
        try {
			let numberObjEvt = libphonenumber.parsePhoneNumber(mblVal, country);
			let isValid = numberObjEvt.isValid();
			if (country === 'IN') {
				 $(this).attr('maxLength', '10');
				if (!isValid) {
					document.querySelector('.output1').innerHTML = `<span>Please enter correct phone number</span>`;
                     $('.senderMob').removeClass("dateInputDiv");
                     $('.senderMob').addClass("dateInputDivError");
                     $('.senderMob').removeClass("dateInputDivFocus");
				} 
				else if(mblVal.length!=10){
					document.querySelector('.output1').innerHTML = `<span>Please enter a valid phone number for the selected country</span>`;
				}
				else if (!/^[6-9]/.test(mblVal)) { // Validation added here
					document.querySelector('.output1').innerHTML = `<span>Please enter a valid phone number for the selected country</span>`;
				}
				else {
				     $('.senderMob').removeClass("dateInputDiv");
                     $('.senderMob').removeClass("dateInputDivError");
                     $('.senderMob').addClass("dateInputDivFocus");
					document.querySelector('.output1').innerHTML = '';
				}
			}
			if(country != 'IN' ){
				if(mblVal.length>14){
				 $(this).attr('maxLength', '14');
				document.querySelector('.output1').innerHTML = `<span>Please enter correct phone number</span>`;
				}
			    else if(country != 'IN' && mblVal.length === 14){
				$(this).attr('maxLength', '14');
				document.querySelector('.output1').innerHTML = '';
			  }else{
				  $(this).attr('maxLength', '14');
				document.querySelector('.output1').innerHTML = '';
			  }
			}
		} catch (err) {
            if (e.value) {
                document.querySelector('.output1').innerHTML = ` ${err.message}`;
            } else {
                document.querySelector('.output1').innerHTML = '';
            }
        }
    }
    setTimeout(() => {
        country = $('.countrySelect').attr('data-value');
    }, 1000);
});
