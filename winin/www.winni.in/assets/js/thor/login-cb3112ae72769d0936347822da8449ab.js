let enablePhoneNumberValidation = true;
let findAllowFillOtp = false;
$(function () {
    $("#ckDynContentWrapperLogin").on("submit", "#ckLoginFormL", loginFromMainLogin);
    $("#ckDynContentWrapperLogin").on("click", "#changeEmailLink", changeEmail);
    $("#ckDynContentWrapperLogin").on("change", "input[name='loginWhatsappNotify']", whatsappNotify);
    $("#ckDynContentWrapperLogin").on("click", "#changePhoneNum", changeMobile);
    $("#ckDynContentWrapperLogin").on("click", "#changeSocialPhoneNum", changeSocialMobile);
    $("#ckDynContentWrapperLogin").on("click", "#loginWithOtp", loginWithOtp);
    $("#ckDynContentWrapperLogin").on("click", "#verifyLoginWithOtp", verifyLoginWithOtp);
    $("#ckDynContentWrapperLogin").on("input", "#loginEmail", switchVerifyAccount);
    $("#ckDynContentWrapperLogin").on("input", "#loginMobile", switchVerifyAccount);
    $("#ckDynContentWrapperLogin").on("input", "#forgotEmail", switchVerifyAccountForgetPassword);
        $("#ckDynContentWrapperLogin").on("input", "#forgotMobile", switchVerifyAccountForgetPassword);
   $("#ckDynContentWrapper").on("input", "#forgotEmail", switchVerifyAccountForgetPassword);
  $("#ckDynContentWrapper").on("input", "#forgotMobile", switchVerifyAccountForgetPassword);
    $("#ckDynContentWrapperLogin").on("click", ".showPassword", switchPasswordWindow);
    $("#signupFormId").on("submit", signupFromMain);
    $("#ckDynContentWrapperLogin").on("input", ".loginOtp", verifyAutoReadOtp);
    $("#ckDynContentWrapperLogin").on("click", ".forgot-password-text", clearForgotPasswordInputsOnModalOpen);
    $("#ckDynContentWrapperLogin").on("input", ".login-otp", allowOnlyDigits);
     $("#ckDynContentWrapperLogin").on("input", ".forgot-otp", allowOnlyDigits);
    if ($('body').hasClass("init-authentication")) {
        loadLoginViewLogin();
    }
    bindAjaxLoadingEvents();
    function handler404() {
        alert("404 Error");
    }
    function handler500() {
        alert("500 Error");
    }
    function handler502() {
        M.toast({html: 'Something went wrong, please try after some time'});
    }
    var interval;
    function startTimer(duration) {
		clearInterval(interval);
		$(".verify-otp-field .otp-container").removeClass('hide');
        let timer = duration;
        interval = setInterval(function () {
            if (timer !== 0) {
                $('#OtpcountdownTimer').css({"font-size": "14px", "border": "none", "padding": "3px 10px 3px", "border-radius": "unset", "color": "#E30D68"});
                $('#OtpcountdownTimer').text('OTP Valid for ' + --timer + ' Sec');
                $('#OtpcountdownTimer').addClass('pointerNone');
                $("#OtpcountdownTimer").show();
            } else if (timer == 0) {
                $('#OtpcountdownTimer').css({"background-color": "transparent", "color": "#E30D68", "padding": "6px 16px", "border-radius": "6px", "font-size": "14px", "border": "2px solid #E30D68"});
                $('#OtpcountdownTimer').text('Resend OTP');
                $('#OtpcountdownTimer').removeClass('pointerNone');
                if(OtpcountdownTimer2Shown===true && logInViaOtp===false){
					 $('#OtpcountdownTimer2').css({"font-size": "14px", "border": "2px solid #E30D68", "padding": "6px 16px", "border-radius": "6px", "color": "#E30D68"});
                        $('#OtpcountdownTimer2').text('Resend OTP ');
                        $('#OtpcountdownTimer2').removeClass('pointerNone');
                        $("#OtpcountdownTimer2").removeClass('hide');
                        $("#OtpcountdownTimer2").show();
				}
                clearInterval(interval);
                logInViaOtp=false;
            }
        }, 1000);
    }
    $("#custEmail").on("keyup", mailcheckjs);
    $(".init-authentication").on("keyup", mailcheckjs);
    function loadLoginViewLogin() {
        var isSocial = $("#isSocial").val();
        var isSocialSuccess = $("#isSocialSuccess").val();
        var isVerifiedMobileSocial = "";
        var isVerifiedOtpSocial = "";
        var attmptUuidSocial = "";
        var tempUuidSocial = "";
        var emailSocial = "";
        var nameSocial = "";
        var idSocial = "";
        if (isSocial !== "undefined" && isSocialSuccess !== "undefined" && isSocial === "true" && isSocialSuccess === "true") {
            isVerifiedMobileSocial = $("#isVerifiedMobileSocial").val();
            isVerifiedOtpSocial = $("#isVerifiedOtpSocial").val();
            attmptUuidSocial = $("#attmptUuidSocial").val();
            tempUuidSocial = $("#tempUuidSocial").val();
            emailSocial = $("#emailSocial").val();
            nameSocial = $("#nameSocial").val();
            idSocial = $("#idSocial").val();
        }

        var jqxhr = $.ajax({
            //url: webApp.loginViewUri,
            url: webAppL.loginViewUri,
            type: "GET",
            cache: false,
            data: {},
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            $("#ckDynContentWrapperLogin").html(data.html);
            $("#dghfjsgfs").removeClass("addMarg");
            $("#fullPageLoader").addClass("hide");
            $("#loginEmail").val("");
            $("#loginMobile").val("");
//        $('.modal-trigger').leanModal();
            if (isSocial !== "undefined" && isSocialSuccess !== "undefined" && isSocial === "true" && isSocialSuccess === "true") {
                $('.ck-login-email-wrapper').removeClass('hide');
                $('.ck-login-mobile-wrapper').removeClass('hide');
                $('.ck-login-name-wrapper').removeClass('hide');
                $('#phoneNumberTab').addClass("displayNumberSc");
                $("#loginTab").addClass('hide');
//                    $("#loginTab").style.display = "none";
                $('#loginWithOtp').addClass("hide");
                $(".login-title").text("Sign Up");
                $(".forpass").addClass("hide");
                $(".existingUser").css('float', 'none');
                $(".signupAlign").css('text-align', 'center');
                $("#isRegistered").val("true");
                $("#isSocialCheck").val("true");
                $("#emailVerified").val("true");
                $("#loginEmail").val(emailSocial);
                $("#loginEmail").attr("readonly", "true");
                $('label[for=loginEmail]').hide();
                if (nameSocial !== null && nameSocial !== '') {
                    $("#loginName").val(nameSocial);
                    $('label[for=loginName]').hide();
                }
                $("#isVerifiedMobile").val(isVerifiedMobileSocial);
                $("#attmptUuid").val(attmptUuidSocial);
                $("#tempUuid").val(tempUuidSocial);
                $(".waves-light").text("CONTINUE");
            }
        });
        jqxhr.fail(function (data) {

        });
//    jqxhr.complete(function (data) {
//        //  $('#fullPageLoader').addClass('hide');
//    });
    }
    function loginFromMainLogin(e) {
        e.preventDefault();

        $('#adbLogInFail').val("");
        $('#adbSignUpFail').val("");
        $('#adbRegisterFail').val("");

        if ($('#phoneNumberTab').hasClass('active') || $('#phoneNumberTab').hasClass('showMobile')) {
            if ($('.output1 span').length > 0) {
                M.toast({html: 'Please enter valid mobile number'});
                $(".fl-remove button").removeClass("disabled btn_loader");
                return false;
            }
        }

        var email = $(this).find("#loginEmail").val();
        var mobile = $(this).find("#loginMobile").val();
        var countryCode = $('#loginCountryCode').val();
        if ($(this).find("#emailVerified").val() === "false") {

            $('#adbEnterPassInitate').val("adbEnterPassInitate");
            checkEmailForLogin(this, email, mobile, countryCode); //Verify whether email is registered on not

        } else {
            var offer = '';
            $("#focusOnDiv").focus();
            var password = $(this).find("#loginPassword").val();
            var name = $(this).find("#loginName").val();
            var whatsappNotify = $(this).find("#loginWhatsappNotify").val();
            var tempUuid = $(this).find("#tempUuid").val();
            var attmptUuid = $(this).find("#attmptUuid").val();
            var otpElment = document.getElementsByClassName("loginOtp");
            var userTitle = $(this).find("#userTitle option:selected").val();
            let existCusName =$(this).find("#existCusName").val();
            var otp = '';
            for (var i = 0; i < otpElment.length; i++) {
                otp += otpElment[i].value;
            }
            if ($(this).find("#isSocialCheck").val() === "true") {

                doSocialMobile(this, otp, tempUuid, attmptUuid, name, mobile, countryCode, userTitle);
            } else if ($(this).find("#isRegistered").val() === "false") {
                doSignup(this, email, password, name, mobile, countryCode, userTitle);
            } else if ($(this).find("#isVerifiedOtp").val() === "false") {
                doVerifyOtp(e, otp, tempUuid, attmptUuid, whatsappNotify, offer, existCusName);
            } else {
                doLogin(this, email, password, mobile, countryCode, existCusName);
            }
        }
        $(".fl-remove button").click(function () {
            $(this).addClass("disabled btn_loader");
        });
    }
    function signupFromMain(e) {
        e.preventDefault();

        $('#adbLogInFail').val("");
        $('#adbRegisterFail').val("");
        $('#adbSignUpFail').val("")
        $('.existingUser').removeClass('hide');
        var offer = $(this).find("#offer").val();
        var email = $(this).find("#custEmail").val();
        var mobile = $(this).find("#custMobile").val();
        var countryCode = $('#loginCountryCode').val();
        var password = $(this).find("#custPassword").val();
        var name = $(this).find("#custName").val();
        var tempUuid = $(this).find("#tempUuid").val();
        var attmptUuid = $(this).find("#attmptUuid").val();
        var otpElment = document.getElementsByClassName("loginOtp");
        var whatsappNotify = $(this).find("#loginWhatsappNotify").val();
        var userTitle = $(this).find("#userTitle option:selected").val();

        var otp = '';
        for (var i = 0; i < otpElment.length; i++) {
            otp += otpElment[i].value;
        }
        if ($(this).find("#isRegistered").val() === "false") {
            doSignupFromPopup(this, email, password, name, mobile, countryCode, offer, userTitle);
        } else if ($(this).find("#isVerifiedOtp").val() === "false") {
            doVerifyOtp( e, otp, tempUuid, attmptUuid, whatsappNotify, offer);
        }
    }
    function doSignupFromPopup(form, email, password, name, mobile, countryCode, offer, userTitle) {
        $(".fl-remove button").addClass("disabled btn_loader");
        let captchaUuid = $("#captchaUuid").val();
        let captchaRes = $("#g-recaptcha-response").val();
        var jqxhr = $.ajax({
            url: webAppL.signupUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password,
                name: name,
                mobile: mobile,
                countryCode: countryCode,
                offer: offer,
                userTitle: userTitle,
                cptchAttmpt: captchaUuid,
                gRecaptchaResponse: captchaRes
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {

                var $submitBtn = $(form).find(':submit');
                var tempUuid = $(form).find("#tempUuid").val(data.tempUuid);
                var attmptUuid = $(form).find("#attmptUuid").val(data.attmptUuid);
                $(form).find("#loginEmail").attr("readonly", "true");
                $(form).find("#loginMobile").attr("readonly", "true");
                $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                if (data.isVerifiedOtp === "false") {
                    if (!$('.cptcha').hasClass('hide')) {
                        $('.cptcha').addClass('hide');
                        $('#captchaUuid').val('');
                    }
                    $(".signupAlign").css('text-align', 'right');
                    var seconds = 30;
                    startTimer(seconds);
                    $('.ck-signup-otp-wrapper').removeClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $('#otc-1').focus();
                    $('h1').text('Verify OTP');
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field,#changeSignupMob,.ck-login-mobile-wrapper").removeClass('hide');
                    $(form).find("#changeEmailLink").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#semailhint").addClass('hide');
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $("#custMobile").attr("readonly", "true");
                    $("#countryCode").attr('disabled', 'disabled');
                    $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                    $(form).find("#changePhoneNum").show();
                    $("#phoneNumberTab").show();
                    $("#emailTab,.forgotPwdM").hide();
                    $("#otpMobileMsg").css('display', 'block');
                    $('.ck-signup-email-wrapper').removeClass('show');
                    $submitBtn.text("Continue");
                    M.toast({html: data.message});

                }
                checkScore();
            } else {
                M.toast({html: data.message});
                $('#adbSignUpFail').val(data.message);
				grecaptchaEnterprise();
            }
        });
        jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            // $('#fullPageLoader').addClass('hide');
//        });
    }
    $("#changeSignupMob").click(function () {

        window.location.reload();
    });
    function checkEmailForLogin(form, email, mobile, countryCode) {
		$('#OtpcountdownTimer').hide();
        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        var jqxhr = $.ajax({
            url: webAppL.loginEmailVerifyUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500
            }
        });
        jqxhr.done(function (data) {

            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                $(form).find("#emailVerified").val("true");
                if (data.email !== '') {
                    $(form).find("#loginEmail").attr("readonly", "true");
                    $(form).find("#changeEmailLink").removeClass('hide');
                  $('#loginMobile').on('input', validatePhoneNumber);
                }
                if (data.mobile !== '') {
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                    $(form).find("#changePhoneNum,#loginWithOtp").removeClass('hide');
                    $('#loginMobile').on('input', validatePhoneNumber);
                }
                $(form).find("#loginEmail").val(data.email);
                $(form).find("#loginMobile").val(data.mobile);
                $(form).find("#loginCountryCode").val(countryCode);
//                $('.custom-select').val(data.countryCode);
                if (data.isRegistered === "false") {
					$(".showLoginPassword").addClass('hide');
                    if (data.email === '') {
                        $("#loginEmail").removeAttr("readonly");
                    }
                    if (data.email !== "") {
                        $('#phoneNumberTab').addClass('showMobile');

                    }
                    $(form).find(".signup-field").removeClass('hide');
                    $('.existingUser').removeClass('hide');
                    $(".login-title").text("Sign Up");
					$('.ck-login-email-wrapper').removeClass('hide');
                    $(".forpass").addClass("hide");
                    $(".existingUser").css('float', 'none');
                    $(".signupAlign").css('text-align', 'center');
                    $(form).find("#isRegistered").val("false");
                    //$('.ck-login-conf-password-wrapper').removeClass('hide');
                    $('.ck-login-password-wrapper label').text("Password");
                    $('#loginEmail').attr("placeholder", "Enter your Email");
                    $("#loginTab,#loginWithOtp").addClass("hide");
                    $("#loginEmail").removeClass("hide");
                    $("#phoneNumberTab").removeClass("hide");
                    //hide tab when redirest from change email or numeber
                    $(".whatsapp_subscription,.existingUser").show();
                    if (countryCode !== '+91') {
                        onCapcthaEvent(countryCode);
                    }
                    //Coming here after email check
                    $submitBtn.text("Continue");

                } else if (data.isVerifiedMobile === "false") {
					if(data.name !== null){
						$(form).find("#existCusName").val(data.name);
					}
                    if (data.email !== "") {
                        $('.ck-login-email-wrapper').removeClass('hide');
                        $('#phoneNumberTab').addClass('showMobile');
                        $('#phoneNumberTab').removeClass('hide');
                         $('.forgetPasswordMargin').addClass('hide');
                           $('#phoneNumberTab').addClass('paddingForNumberTab');
                            $('#phoneNumberTab').addClass('marginBottomBelowMobileFeild');

                    }
                    if (data.mobile !== "") {
                        $("#loginWithOtp").removeClass('hide');
                        $('.forgetPasswordMargin').addClass('hide');
                    }
                      $('.nameFeildClass').addClass('setMarginNameFeild');
                       $('#emailTab').addClass('marginBottomBelowEmail');
                    $('.ck-login-mobile-wrapper').removeClass('hide');
                    $(".login-title").text("Login");
                    $(".whatsapp_subscription,.existingUser").hide();
                    $(form).find("#isRegistered").val("true");
                    $('.ck-login-password-wrapper label').text("Winni Password");
                    $(".forpass").removeClass("hide");
                    $(".signupAlign").css('text-align', 'right');
                    if (countryCode !== '+91') {
                        onCapcthaEvent(countryCode);
                    }
                    $submitBtn.text("Login");

                } else {
						if(data.name !== null){
							$(form).find("#existCusName").val(data.name);
						}
                        if(data.attemptUuid !== null && data.attemptUuid!==''){
						if (data.email !== "") {
	                        $('.ck-login-email-wrapper').removeClass('hide');
	                        $('.ck-login-mobile-wrapper').addClass('hide');
	                        $('#phoneNumberTab').addClass('hide');
	                         $("#changeEmailLink").removeClass('hide');
	                          $('#emailTab').addClass('hide');
	                            $("#phoneNumberTab").addClass('hide');


	                    } else if (data.mobile !== "") {
	                        $('.ck-login-mobile-wrapper').removeClass('hide');
	                        $('.ck-login-email-wrapper,.whatsapp_subscription').addClass('hide');
	                        $("#changePhoneNum").removeClass('hide');
	                         $("#changeEmailLink").addClass('hide');
	                        $("#phoneNumberField").addClass('hide');

	                    }
						let seconds = data.leftTime;
		                logInViaOtp=true;
		                startTimer(seconds);
		                $('form').find("#isLoginWithOtp").val("true");
		                $('.ck-login-otp-wrapper').removeClass('hide');
		                $(".signup-field").addClass('hide');
		                $(".login-title").text("Verify OTP");
		                $(".existingUser").hide();
		                $("#isRegistered").val("true");
		                $("#isVerifiedOtp").val("false");
		                $("#attmptUuid").val(data.attemptUuid);
		                $("#tempUuid").val(data.userUid);
		                $(".verify-otp-field").removeClass('hide');
		                $("#phoneNumberTab").addClass('hide');
		               $("#emailTab").addClass('hide');
		              	$("#verifyLoginWithOtp").addClass('hide');
		                $("#otpMobileMsg").removeClass('hide');
		                $("#login-link-container").removeClass('hide');
		                $("#otpMobileMask").text(data.mobile);
		                $("#emailhint").addClass('hide');
		                $("#isSocialCheck").val("false");
		                $("#verifyLoginWithOtp").removeClass('hide');
		                $("#loginWithOtp").addClass('hide');
		                $(".waves-light").addClass('hide');
		                $("#otpMobileMsg").css('display', 'block');
		                $('#otc-1').focus();
		                $('#paddingForVerifyOtp').addClass("byContinueOnVerify");
                        $('#paddingForVerifyOtp').removeClass('paddingForPassWordFeild');
		                M.toast({html: data.message});
		                $('.privacyCheck').addClass('termsAndCondition');
		                $('.paddingBelowContinueBtn').addClass('paddingForVerifyBtn');
		                $('.loginWithGoogle').addClass('hide');
		                $(".showLoginPassword").addClass('loginUsingPasswordDesign');
		                $(".forgetPasswordMargin").addClass('removeMarginFromVerifyButton');
		                $(".addDeviceMargin").addClass('deviceMarginTop');
		                $('#adbLogInFail').val("");
		                $('#adbRegisterFail').val("");
		                $('#adbSignUpFail').val("");
		                $(".showLoginPassword").removeClass('hide');
		                $(".orAndLoginWithGoogle").addClass('hide');
		                $("#changePhoneNum").addClass('hide');
		                $("#verifyLoginWithOtp").addClass('buttonDisable');
                        $("#paddingForVerifyOtp").addClass('paddingForVerifyOtp');
                        $('.privacyCheck').addClass('privacyCheckDesign');
                        $("#mobileValue").text(data.mobileTemp);
                        $("#emailValue").text(data.emailTemp);
                        $("#ckLoginFormL").addClass('paddingForVerifyOtp');

                  } else {
						if (data.email !== "") {
	                        $('.ck-login-email-wrapper').addClass('hide');
	                        $('.ck-login-mobile-wrapper').addClass('hide');
	                        $('#phoneNumberTab').addClass('hide');
	                    } else if (data.mobile !== "") {
	                        $('.ck-login-mobile-wrapper,.existingUser').removeClass('hide');
	                        $('.ck-login-email-wrapper,.whatsapp_subscription').addClass('hide');
	                        $("#phoneNumberTab").addClass('hide');
	                        $("#changePhoneNum").removeClass('hide');
	                        $("#loginWithOtp").addClass('hide');
	                        $("#emailTab").addClass('hide');
	                    } else {
		                    $(".login-title").text("Login");
		                    $(form).find("#isRegistered").val("true");
		                    $(".signupAlign").css('text-align', 'right');
		                    $submitBtn.text("Login");

						}
					}

                }
                 $('.ck-login-password-wrapper').addClass('hide');
            } else {
				let message = data.message;
				if(message !== null && message !== 'undefined' && message.indexOf('otp limit has been reached') !== -1){
					$(".showLoginPassword").removeClass('hide'); 
					$(".showLoginPassword").addClass('showLogPass');
					$(".verifyEmailD").addClass('showLogPassH');
						$(".existingUser").hide();
				}
                M.toast({html: data.message});
                $(".ck-login-password-wrapper input[type='password']").val("");

                $("#adbLogInFail").val(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            //  $('#fullPageLoader').addClass('hide');
//        });
    }
    function doSignup(form, email, password, name, mobile, countryCode, userTitle) {
        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        let captchaUuid = $("#captchaUuid").val();
        let captchaRes = $("#g-recaptcha-response").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        var jqxhr = $.ajax({
            url: webAppL.signupUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password,
                name: name,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst,
                userTitle: userTitle,
                cptchAttmpt: captchaUuid,
                gRecaptchaResponse: captchaRes
            },
            success: function (data) {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function (data) {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                //var mobile = $(form).find("#loginMobile").val(data.mobile);
//                var countryCode = $(form).find("#countryCode").val(data.countryCode);
                $(form).find("#emailVerified").val("true");
                if (!$('.cptcha').hasClass('hide')) {
                    $('.cptcha').addClass('hide');
                    $('#captchaUuid').val('');
                }
                if (data.isVerifiedOtp === "false" && data.message === '') {
                      $(form).find("#forgetPasswordRemove").removeClass('displayForget');
                    var seconds = data.leftTime;
                    startTimer(seconds);
                    $(form).find("#loginEmail").attr("readonly", "true");
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                    var tempUuid = $(form).find("#tempUuid").val(data.tempUuid);
                    var attmptUuid = $(form).find("#attmptUuid").val(data.attmptUuid);

                    $('.ck-login-otp-wrapper').addClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP");
                    $('.existingUser').removeClass('hide');
                    $(".fl-remove").addClass('hide');
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink,#loginWithOtp").addClass('hide');
                    $(form).find("#loginEmail").addClass('hide');
                    $(form).find("#otpMobileMsg,.fl-remove").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#changePhoneNum").show();
                    $(".phoneNumberTabClass").addClass('hide');
                     $('.ck-login-email-wrapper').removeClass('showMobile');
                     $("#paddingForVerifyOtp").addClass('buttonDisable');
                    $("#emailTab").addClass('hide');
                    $(".forgotPwdM").hide();
                   $("#phoneNumberTab").addClass('hide');
                    $("#otpMobileMsg").css('display', 'block');
                    $(".whatsapp_subscription").show();
                    $('#otc-1').focus();
                    $('.ck-login-email-wrapper').removeClass('show');
                    M.toast({html: data.otpMessage});
                    $submitBtn.text("Continue");
                        $(".phoneNumberTabClass").addClass('hide');
                           $('#buttonDisableVerify').addClass("buttonDisable");
                            $("#mobileValue").text(data.mobileTemp);
                               $("#emailValue").text(data.emailTemp);

                } else if (data.isRegistered === "true" && data.isVerifiedOtp === "false" && data.message !== '') {

                    if (data.email !== '') {
                        $(form).find("#loginEmail").attr("readonly", "true");
                        $(form).find("#changeEmailLink").removeClass('hide');
                    }
                    if (data.mobile !== '') {
                        $(form).find("#loginMobile").attr("readonly", "true");
                        $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                        $(form).find("#changePhoneNum,#loginWithOtp").removeClass('hide');
                    }
                    $(form).find("#loginEmail").val(data.email);
                    $(form).find("#loginMobile").val(data.mobile);
                    if (data.email !== "") {
                        $('.ck-login-email-wrapper').removeClass('hide');
                        $('.ck-login-mobile-wrapper').addClass('hide');
                        $('#phoneNumberTab').addClass('showMobile');
                    }
                    if (data.mobile !== "") {
                        $('.ck-login-mobile-wrapper').removeClass('hide');
                        $('.ck-login-email-wrapper,.whatsapp_subscription,.existingUser').addClass('hide');
                        $("#phoneNumberTab").addClass('showNum');
                        $("#changePhoneNum").removeClass('hide');
                        $("#loginWithOtp").removeClass('hide');
                        $("#emailTab").removeClass('hide');
                    }
                    if (data.email !== "" && data.mobile !== "") {
                        $('#loginWithOtp,.ck-login-name-wrapper,#changeEmailLink').addClass('hide');
                    }
                    $('.existingUser').removeClass('hide');
                    $(".login-title").text("Login");
                    $(form).find("#isRegistered").val("true");
                    $('.ck-login-password-wrapper label').text("Winni Password");
                    $(".forpass").removeClass("hide");
                    $(".existingUser").css('float', 'left');
                    $(".signupAlign").css('text-align', 'right');
                    $submitBtn.text("Login");
                    M.toast({html: data.message});
                }
            } else {
                M.toast({html: data.message});
                $(".ck-login-password-wrapper input[type='password']").val("");
                $('#adbSignUpFail').val(data.message);
				grecaptchaEnterprise();
            }
        });
        jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            // $('#fullPageLoader').addClass('hide');
//        });
    }
     var failedAttempts = 0;
    function doLogin(form, email, password, mobile, countryCode, existCusName) {
    if(!$('.ck-login-password-wrapper').hasClass('hide') && $('#loginPassword').val() === ''){
        M.toast({html: 'Please enter valid Password'});
        $(".forEnablePassword ").removeClass('disabled');
        return;
    }
        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        let captchaUuid = $("#captchaUuid").val();
        let captchaRes = $("#g-recaptcha-response").val();
        $(".fl-remove button").addClass("disabled btn_loader");
// $('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webAppL.loginUri,
            type: "POST",
            cache: false,
            data: {
                email: email,
                password: password,
                mobile: mobile,
                countryCode: countryCode,
                scrval: scrval,
                isvlexst: isvlexst,
                cptchAttmpt: captchaUuid,
                gRecaptchaResponse: captchaRes,
                existCusName: existCusName
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                failedAttempts = 0;
                dataLayer.push({
                    'event': 'userLogin',
                    'userDetail': {
                        'email': email
                    }
                });
                if (data.isVerifiedOtp === "false") {

                    var seconds = data.leftTime;
                    startTimer(seconds);
                    var $submitBtn = $(form).find(':submit');
                    $('.ck-login-otp-wrapper').addClass('hide')
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP ");
                    $(".existingUser").hide();
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink").addClass('hide');
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#loginEmail").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#loginMobile").attr("readonly", "true");
                    $('#phoneNumberTab').addClass('hide');
                      $('#phoneNumberTab').removeClass('showMobile');
                        $('.forgetPasswordMargin').addClass('hide');
                    $('#otpMobileMsg').show();
                    $('.custom-select').css({"pointer-events": "none", "cursor": "none"});

                    $("#emailTab").addClass("hide");
                    $('#otc-1').focus();
                    if (!$('.cptcha').hasClass('hide')) {
                        $('.cptcha').addClass('hide');
                        $('#captchaUuid').val('');
                    }
                    M.toast({html: data.message});
                    $submitBtn.text("Continue");
                    $(".phoneNumberTabClass").addClass('hide');
                     $(".phoneNumberTabClass").removeClass('showMobile');
                      $("#mobileValue").text(data.mobileTemp);
                     $("#emailValue").text(data.emailTemp);

                } else {
					mixpanelLoginSucess(data.mixpanelLoginEventDto);
                    if (data.redirectUrl != null && data.redirectUrl != '') {
                        window.location.href = data.redirectUrl;
                    } else {
                        window.location.reload();
                    }

                }

            } else {
                if (data.resetPassword === "true") {
                    $("#wrongAttemptPassword").show();
                } else {
                    $("#wrongAttemptPassword").hide();
                }
                M.toast({html: data.message});
                $(".ck-login-password-wrapper input[type='password']").val("");

                $("#adbLogInFail").val(data.message);
                 failedAttempts++;
            if (failedAttempts >= 2) {
		$("#wrongAttemptPassword").show();
		}
       }
        });

         jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            //  $('#fullPageLoader').addClass('hide');
//        });
    }
    function doVerifyOtp(e, otp, tempUuid, attmptUuid, whatsappNotify, offer, existCusName) {
     if (typeof findAllowFillOtp !== "undefined" && findAllowFillOtp !== true) {
           if(e.type === "submit") return;
         }

        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        $(".fl-remove button").addClass("disabled btn_loader");
        var jqxhr = $.ajax({
            url: webAppL.verifyOtpUri,
            type: "POST",
            cache: false,
            data: {
                otp: otp,
                tempUuid: tempUuid,
                attmptUuid: attmptUuid,
                scrval: scrval,
                isvlexst: isvlexst,
                whatsappNotify: whatsappNotify,
                offer: offer,
                existCusName: existCusName
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
				mixpanelLoginSucess(data.mixpanelLoginEventDto);
                if (data.redirectUrl != null && data.redirectUrl != '') {
                    window.location.href = data.redirectUrl;
                } else {
                    window.location.reload();
                }
            } else {

                if (data.resetPassword === "true") {
                    $("#wrongAttemptPassword").show();
                } else {
                    $("#wrongAttemptPassword").hide();
                }
                $(".fl-remove button").removeClass("disabled btn_loader");
                M.toast({html: data.message});
                $('#adbRegisterFail').val(data.message);
            }
        });
        jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            //  $('#fullPageLoader').addClass('hide');
//        });
    }

    function doSocialMobile(form, otp, tempUuid, attmptUuid, name, mobile, countryCode, userTitle) {
        var scrval = $("#scrval").val();
        var isvlexst = $("#isvlexst").val();
        let email=$("#loginEmail").val();
        //$('#fullPageLoader').removeClass('hide');
        var jqxhr = $.ajax({
            url: webAppL.socialMblUri,
            type: "POST",
            cache: false,
            data: {
                otp: otp,
                name: name,
                mobile: mobile,
                countryCode: countryCode,
                attmptUuid: attmptUuid,
                tempUuid: tempUuid,
                userTitle: userTitle,
                email:email
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
                var $submitBtn = $(form).find(':submit');
                //var mobile = $(form).find("#loginMobile").val(data.mobile);
                var tempUuid = $(form).find("#tempUuid").val(data.tempUuid);
                var attmptUuid = $(form).find("#attmptUuid").val(data.attmptUuid);
                //var countryCode = $(form).find("#countryCode").val(data.countryCode);
                $("#mobileValue").text(data.mobileTemp);
                $("#emailValue").text(data.emailTemp);
                $(form).find("#emailVerified").val("true");
                $(form).find("#loginEmail").attr("readonly", "true");
                $(form).find("#loginMobile").attr("readonly", "true");
                $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                if (data.isVerifiedOtp === "false") {
                    $('.ck-login-otp-wrapper').addClass('hide');
                    $(form).find(".signup-field").addClass('hide');
                    $(".login-title").text("Verify OTP");
                    $(".existingUser").hide();
                    $(form).find("#isRegistered").val("true");
                    $(form).find("#isVerifiedOtp").val("false");
                    $(form).find("#attmptUuid").val(data.attmptUuid);
                    $(form).find("#tempUuid").val(data.tempUuid);
                    $(form).find(".verify-otp-field").removeClass('hide');
                    $(form).find("#changeEmailLink").addClass('hide');
                    $(form).find("#loginEmail").addClass('hide');
                    $(form).find("#otpMobileMsg").removeClass('hide');
                    $(form).find("#otpMobileMask").text(data.mobile);
                    $(form).find("#emailhint").addClass('hide');
                    $(form).find("#isSocialCheck").val("false");
                    $(form).find("#changePhoneNum").removeClass('hide');
                    $(form).find("#changePhoneNum").show();
                    $("#changeSocialPhoneNum").removeClass("hide");
                    $("#changePhoneNum").addClass("hide");
                    $("#phoneNumberTab").addClass('hide');
                    $("#phoneNumberTab").removeClass('displayNumberSc');
                     $("#emailTab").addClass('hide');
                     $("#mobileValue").text(data.mobileTemp);
                      $("#emailValue").text(data.emailTemp);
                    $submitBtn.text("Continue");

                }
            } else {

                M.toast({html: data.message});

            }
        });
        jqxhr.fail(function (data) {

        });
//        jqxhr.complete(function (data) {
//            // $('#fullPageLoader').addClass('hide');
//        });
    }



    function loginWithOtp(e) {
        e.preventDefault();
        $('.loginOtp').val('');
        var mobile = $("#loginMobile").val();
        var countryCode = $('#loginCountryCode').val();
        var jqxhr = $.ajax({
            url: webAppL.otpLoginUri,
            type: "POST",
            cache: false,
            data: {
                mobile: mobile,
                countryCode: countryCode
            },
            success: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            complete: function () {
                $(".fl-remove button").removeClass("disabled btn_loader");
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {

                var seconds = data.leftTime;
                logInViaOtp=true;
                startTimer(seconds);
                $('form').find("#isLoginWithOtp").val("true");
                $('.ck-login-otp-wrapper').removeClass('hide');
                $(".signup-field").addClass('hide');
                $(".login-title").text("Verify OTP");
                $(".existingUser").hide();
                $("#isRegistered").val("true");
                $("#isVerifiedOtp").val("false");
                $("#attmptUuid").val(data.attemptUuid);
                $("#tempUuid").val(data.userUid);
                $(".verify-otp-field").removeClass('hide');
                $("#changeEmailLink").addClass('hide');
                $("#loginEmail").addClass('hide');
                $("#otpMobileMsg").removeClass('hide');
                $("#login-link-container").removeClass('hide');
                $("#otpMobileMask").text(data.mobile);
                $("#emailhint").addClass('hide');
                $("#isSocialCheck").val("false");
                $("#verifyLoginWithOtp").removeClass('hide');
                $("#loginWithOtp").addClass('hide');
                $(".waves-light").addClass('hide');

                $("#otpMobileMsg").css('display', 'block');
                $('#otc-1').focus();


                M.toast({html: data.message});


                $('#adbLogInFail').val("");
                $('#adbRegisterFail').val("");
                $('#adbSignUpFail').val("");
            } else {
                M.toast({html: data.message});


                $('#adbLogInFail').val("");
                $('#adbRegisterFail').val("");
                $('#adbSignUpFail').val("");
            }
        });
        jqxhr.fail(function (data) {

            $('#adbLogInFail').val("");
            $('#adbRegisterFail').val("");
            $('#adbSignUpFail').val("");
        });

    }

    function verifyLoginWithOtp(e, existCusName) {
        e.preventDefault();

        if (typeof findAllowFillOtp !== "undefined" && findAllowFillOtp !== true) {
          if(e.type === "click") return;
        }
        var userUid = $("#tempUuid").val();
        var attmptUuid = $("#attmptUuid").val();
        var otpElment = document.getElementsByClassName("loginOtp");
        $("#verifyLoginWithOtp").addClass("disabled btn_loader");
        var otp = '';
        for (var i = 0; i < otpElment.length; i++) {
            otp += otpElment[i].value;
        }
        var jqxhr = $.ajax({
            url: webAppL.verifyOtpLoginUri,
            type: "POST",
            cache: false,
            data: {
                otp: otp,
                userUid: userUid,
                attmptUuid: attmptUuid,
                existCusName: existCusName
            },
            dataType: "json",
            /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
            statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
                404: handler404,
                500: handler500,
                502: handler502
            }
        });
        jqxhr.done(function (data) {
            if (data.success === "true") {
				mixpanelLoginSucess(data.mixpanelLoginEventDto);
                if (data.redirectUrl != null && data.redirectUrl != '') {
                    window.location.href = data.redirectUrl;
                } else {
                    window.location.reload();
                }

            } else {
                if (data.resetPassword === "true") {
                    $("#wrongAttemptPassword").show();
                } else {
                    $("#wrongAttemptPassword").hide();
                }
                M.toast({html: data.message});
                $("#verifyLoginWithOtp").removeClass("disabled btn_loader");
                $('#adobeLogInWithOtpFail').val(data.message);


            }
        });
        jqxhr.fail(function (data) {
            $("#verifyLoginWithOtp").addClass("disabled btn_loader");
        });
    }
    function changeSocialMobile(e) {
        loadLoginViewLogin();
    }
    function changeMobile(e) {
		$("#paddingForVerifyOtp").removeClass('paddingForVerifyOtp byContinueOnVerify paddingForPassWordFeild');
		$('.privacyCheck').removeClass('termsAndCondition privacyCheckDesign marginBtmForOR');
  $(".addDeviceMargin").removeClass('deviceMarginTop');
    $('#emailTab').removeClass('marginBottomBelowEmail');
      $('.emailIcon').hide();
    $('.orDiv').removeClass("marginTopForOR");
        clearInterval(interval);
        clearTimeout(timerId);
        $('#buttonDisableVerify').removeClass("buttonDisable");
        $('#paddingForVerifyOtp').removeClass('buttonDisable');
        $(".forgetPasswordDiv").addClass('hide');
        $('.privacyCheck').removeClass('hide');
        $("#forgetPasswordRemove").addClass('hide');
        $(".login-title").text("Login");
        $(".ck-login-password-wrapper input[type='password']").val("");
        var $submitBtn = $("#ckLoginFormL").find(':submit');
        $submitBtn.text("CONTINUE");
        $("#loginMobile").removeAttr("readonly");
        $("#loginEmail").removeAttr("readonly");
        $('.custom-select').css({"pointer-events": "auto", "cursor": "pointer"});
        $('.ck-login-password-wrapper').addClass('hide');
        $('.signup-field').addClass('hide');
        $("#emailVerified,#isLoginWithOtp").val("false");
        $("#isRegistered,.loginOtp").val("");
        $("#isVerifiedOtp").val("");
        $("#loginEmail").attr('type', 'text');
        $(this).addClass("hide");
        $("#wrongAttemptPassword").hide();
        $('.ck-login-mobile-wrapper,.fl-remove').removeClass('hide');
        $('.ck-login-email-wrapper').removeClass('show');
         $('.ck-login-email-wrapper').addClass('hide');
        $('.ck-login-otp-wrapper').addClass('hide');
        $("#otpMobileMsg").hide();
        $('#phoneNumberTab').show();
        $("#loginWithOtp,#verifyLoginWithOtp,.verify-email-otp-field,#otpEmailMsg").addClass("hide");
        $("#phoneNumberTab").removeClass('hide');
        $("#phoneNumberTab").removeClass('showNum showMobile');
        //when loginwith otp
        $(".waves-light").removeClass('hide');
//        $('#loginWithOtp').show();
        $("#loginEmail").val("");
        $("#loginMobile").val("");
        $(".showLoginPassword").addClass('hide');
//when show tab

        $("#OtpcountdownTimer2").addClass('hide');
        $("#loginEmail").removeClass('hide');
        $(".whatsapp_subscription,.existingUser ").hide();
        //redirect from mail verify otp
        $("#deactivateTab").click(function () {
            $(".numberTab").removeClass('active');
            $('#phoneNumberTab').hide();
        });
        if (!$('.cptcha').hasClass('hide')) {
            $('.cptcha').addClass('hide');
            $('#captchaUuid').val('');
        }
        $(".forpass").addClass("hide");

        $('#adbRegistatitionFail').val("");
        $('#adbSignUpFail').val("");
        $("#loginMobile").focus();
		$("#loginMobile").css({"readonly" : "false"});
        $('#loginMobile').off('input', validatePhoneNumber);
        $(".orAndLoginWithGoogle").removeClass('hide');
        $(".forgetPasswordMargin").removeClass('removeMarginFromVerifyButton');
    }
    function whatsappNotify(e) {
        if (this.checked) {
            $(this).prop('checked', true);
            $(this).val('true');
        } else {
            $(this).prop('checked', false);
            $(this).val('false');
        }
    }
    function changeEmail(e) {
		$("#paddingForVerifyOtp").removeClass('paddingForVerifyOtp byContinueOnVerify paddingForPassWordFeild');
		$('.privacyCheck').removeClass('termsAndCondition privacyCheckDesign marginBtmForOR');
    $(".addDeviceMargin").removeClass('deviceMarginTop');
      $('#emailTab').addClass('marginBottomBelowMobileFeild');
      $('.emailIcon').hide();
     $('.orDiv').removeClass("marginTopForOR");
	  failedAttempts=0;
	  	$('.privacyCheck').removeClass('hide');
  		$("#forgetPasswordRemove").addClass('hide');
        $(".login-title").text("Login");
        $(".ck-login-password-wrapper input[type='password']").val("");
        var $submitBtn = $("#ckLoginFormL").find(':submit');
        $submitBtn.text("Continue");
        $("#loginMobile").removeAttr("readonly");
        $("#loginEmail").removeAttr("readonly");
        $('.custom-select').css({"pointer-events": "auto", "cursor": "pointer"});
        $('.ck-login-password-wrapper').addClass('hide');
        $('.signup-field').addClass('hide');
        $("#emailVerified").val("false");
        $("#isRegistered").val("");
        $("#isVerifiedOtp").val("");
        $(this).addClass("hide");
        $("#wrongAttemptPassword").hide();
        $('.ck-login-mobile-wrapper,.fl-remove').removeClass('hide');
        $('.ck-login-email-wrapper').removeClass('show');
        $('.ck-login-otp-wrapper').addClass('hide');
        $("#otpMobileMsg").hide();
        $("#loginWithOtp").addClass("hide");
        $("#phoneNumberTab").removeClass('showMobile');
        $("#phoneNumberTab").addClass("hide");
        //when loginwith otp
        $(".waves-light").removeClass('hide');
//        $('#loginWithOtp').show();
        $("#loginEmail").val("");
        $("#loginMobile").val("");
//when show tab

        $("#loginEmail").removeClass('hide');

        $(".whatsapp_subscription,.existingUser ").hide();
        if (!$('.cptcha').hasClass('hide')) {
            $('.cptcha').addClass('hide');
            $('#captchaUuid').val('');
        }

        $('#adbLogInFail').val("");
        $('#adbRegistatitionFail').val("");
        $('#adbSignUpFail').val("");
        $("#emailhint").removeClass('hide');
		$("#loginEmail").focus();
		$("#loginEmail").css({"readonly" : "false"});
		$(".showLoginPassword").addClass('hide');
		$('#loginMobile').off('input', validatePhoneNumber);
		$("#verifyLoginWithOtp").addClass("hide");
		$('#buttonDisableVerify').removeClass("buttonDisable");
        $(".forgetPasswordDiv").addClass('hide');
         $(".orAndLoginWithGoogle").removeClass('hide');
        $('#buttonDisableVerify').removeClass('buttonDisable');
        $('#paddingForVerifyOtp').removeClass('buttonDisable');
         $(".forgetPasswordMargin").removeClass('removeMarginFromVerifyButton');
    }
    $('body').on('click', '.forgotPwdM', function (event) {
        $("#forgotPwdModalL").removeClass("upward-position");
        $('#isVrfdFrgt').val(false);
         $(".mobile-hide-part").addClass('hide');
        $('.password-hide-part,.otp-hide-part-email,.otp-hide-part-mobile,.alert,.changeFpwd').hide();
        $('.caption-hide-part').show();
        $("#loginTabf").removeClass("hide");
        $(".forgot-title").text("Send OTP");
        $(".otp-content-box input").val("");
        $("#forgotEmail").val("");
        $("#forgotEmail,#forgotMobile").removeAttr("readonly");
        $("#forgotCountryCode").removeAttr('disabled');
        $('.custom-select').css({"pointer-events": "auto", "cursor": "pointer"});
       $("#phoneNumberTabff").css("display", "none!important");
                 $("#phoneNumberTabff").addClass('hide');
                 	$("#inputFieldff").addClass('hide');
                  $("#emailTabff").removeClass('hide');
                 $("#emailTabff").show();
                 	$(".mobile-hide-part").removeClass('numberFieldShow');
                   $('#fgtPwdSndMailBut').removeClass('buttonDisable');
                  $('.emailIcon').hide();
                  $('.forgetToRecover').html(`<div style="margin-bottom:29px">Forgot Password?</div>`);
                   $('.forgetToRecoverMobile').html(`<div style="margin-bottom:14px">Forgot Password?</div>`);
                    $('#newPassword').html("New Password");
                   $('#confirmPasswordForForget').html("Confirm Password");

    });
        $('body').on('click', '#changeMobileFpwd', function (event) {
            $('#isVrfdFrgt').val(false);
             $(".mobile-hide-part").addClass('hide');
            $('.password-hide-part,.otp-hide-part-email,.otp-hide-part-mobile,.alert,.changeFpwd').hide();
            $('.caption-hide-part').show();
            $("#loginTabf").removeClass("hide");
            $(".forgot-title").text("Send OTP");
            $(".otp-content-box input").val("");
            $("#forgotEmail,#forgotMobile").removeAttr("readonly");
            $("#forgotCountryCode").removeAttr('disabled');
            $('.custom-select').css({"pointer-events": "auto", "cursor": "pointer"});
           $("#phoneNumberTabff").css("display", "none!important");
             $("#phoneNumberTabff").addClass('hide');
                $("#inputFieldff").addClass('hide');
              $("#emailTabff").addClass('hide');
             $("#emailTabff").hide();
             $(".email-hide-part").removeClass('numberFieldShow');
                $(".mobile-hide-part").addClass('numberFieldShow');
                    $(".mobile-hide-part").removeClass('hide');
               $('#fgtPwdSndMailBut').removeClass('buttonDisable');
                 $("#forgotPwdModalL").removeClass("upward-position");
        });
    $('body').on('click', '.changeFpwd', function (event) {
            $('#isVrfdFrgt').val(false);
            $('.password-hide-part,.otp-hide-part-email,.otp-hide-part-mobile,.alert,.changeFpwd').hide();
            $('.caption-hide-part').show();
            $("#loginTabf").removeClass("hide");
            $(".forgot-title").text("Send OTP");
            $(".otp-content-box input").val("");
            $("#forgotEmail,#forgotMobile").removeAttr("readonly");
            $("#forgotCountryCode").removeAttr('disabled');
            $('.custom-select').css({"pointer-events": "auto", "cursor": "pointer"});
           $("#emailTabff").removeClass('hide');
             $("#phoneNumberTabff ").addClass('hide');
                  $("#otpMessage").hide();
                     $(".email-hide-part").addClass('numberFieldShow');
                       $('#fgtPwdSndMailBut').removeClass('buttonDisable');
                          $("#forgotPwdModalL").removeClass("upward-position");
        });

    $('body').on('click', '#fgtPwdSndMailBut', function (event) {
        event.preventDefault();

        var otpfElment = document.getElementsByClassName("forgotLoginOtp");
        if (otpfElment !== null && otpfElment.length > 0) {

            var fotp = '';
            for (var i = 0; i < otpfElment.length; i++) {
                fotp += otpfElment[i].value;
            }
            $("#forgotLoginOtp").val(fotp);
        }
        var uri = $(this).closest('form').attr('action');
        var data = $(this).closest('form').serialize();
        $('#forgotPwdModalL .alert-success').addClass('hidden');
        $('#forgotPwdModalL .alert-danger').addClass('hidden');
        $(this).addClass("disabled btn_loader");
        $.ajax({
            cache: false,
            url: uri,
            data: data,
            type: 'post',
            success: function (response) {
                if (response.success === "true") {
                    $('#forgotPwdModalL .alert-successL').removeClass('hide');
                    $('#forgotPwdModalL .alert-dangerL').addClass('hide');
                    $('#forgotPwdModalL .alert-successL').text(response.message);
                    $('#fgtPwdSndMailBut').removeClass('disabled btn_loader');
                    $("#isVrfdFrgt").val(response.isVrfdFrgt);
                    $("#isVrfdFrgtOtp").val(response.isVrfdFrgtOtp);
                    $("#isVrfdFrgtPss").val(response.isVrfdFrgtPss);
                    $(".forgot-title").text("Send OTP");
                    $('.caption-hide-part').show();
                    if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "false" && response.isVrfdFrgtPss === "false") {
                        $("#requestUuid").val(response.requestUuid);
                        $("#identifierType").val(response.identifierType);
                        if (response.email !== "") {
                          $('.email-hide-part').addClass('hide');
                            $('.email-hide-part').show();
                            $("#forgotEmail").attr("readonly", "true");
                            $('.mobile-hide-part,#emailhint1').hide();
                            $('.otp-hide-part-email,.changeFpwd').show();
                            $('#fgtPwdSndMailBut').addClass('buttonDisable');
                            $('.email-hide-part').removeClass('numberFieldShow');
                          if (response.mobileTemp.trim() === "") {
                             $("#emailForgetValue").text(response.emailTemp);
                               $("#forMailForgetValue").text(" Email - " + response.emailTemp);
                                $("#mobileForgetValue").hide();
                                 $("#forMobileForgetValue").hide();
                                   $("#emailForgetValue").show();
                                   $("#forMailForgetValue").show();

                           }

                        } else {

                            $('.email-hide-part').hide();
                            $("#forgotMobile").attr("readonly", "true");
                            $('.custom-select').css({"pointer-events": "none", "cursor": "none"});
                            $('.mobile-hide-part,.changeFpwd').show();
                            $('.otp-hide-part-mobile').show();
                             $("#inputFieldff").addClass('hide');
                                $('#fgtPwdSndMailBut').addClass('buttonDisable');
                               $(".otpMobileNumberff").addClass('hide');
                               $(".mobile-hide-part").addClass('hide');
                                $(".mobile-hide-part").removeClass('numberFieldShow');


                                 $(".forgetOtpInfo").show();
                                 $("#otpMessage").show();
                                  $("#verifyLoginWithOtp").addClass('buttonDisable');
                                   if(response.emailTemp.trim()===""){
                                     $("#mobileForgetValue").text(" Mobile- " +response.mobileTemp);
                                    $("#forMobileForgetValue").text(response.mobileTemp);
                                     $("#emailForgetValue").hide();
                                     $("#forMailForgetValue").hide();
                                      $("#mobileForgetValue").show();
                                      $("#forMobileForgetValue").show();
                                    }

                        }
                        $("#loginTabf").addClass("hide");
//                    $('.otp-hide-part').show();
                        $('.password-hide-part').hide();
                        $("#forgotLoginOtp").val("");
                        $("#resetPassword").val("");
                        $("#resetPasswordConfirm").val("");
                        $(".forgot-title").text("Verify OTP");
                        $('.caption-hide-part').hide();

                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "false") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile,.changeFpwd').hide();
                        $('.password-hide-part').show();
                        $("#forgotLoginOtp").val("");
                        $("#resetPassword").val("");
                        $("#resetPasswordConfirm").val("");
                        $(".forgot-title").text("Save and Login");
                        $('.caption-hide-part').hide();
                        $('#newPassword').html("New Password");
                        $('#confirmPasswordForForget').html("Confirm Password");
                        $('#newPassword').removeClass("active");
                        $('#confirmPasswordForForget').removeClass("active");
                        $('.forgetToRecover').html(`<div style="margin-bottom:29px">New Password</div>`);
                        $('.forgetToRecoverMobile').html(`<div style="margin-bottom:18px">New Password</div>`);
                         $("#forgotPwdModalL").removeClass("upward-position");

                        $('#otpMessage').addClass('hide');
                        $('.email-hide-part').removeClass('numberFieldShow');
                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "true" && response.isPssCng === "true") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile').hide();
                        $('.password-hide-part').hide();
                        $('.caption-hide-part').hide();
                        $(".forgot-title").hide();
                        $('#forgotPwdModalL').modal('close');
                        $('.model-confirm-bt-info').addClass('modal-confirm-background-color-pink');
                         modalBackgroundDisabledClick();
                        $('#infoModal').modal('open');
                        $(".info-response-message").text(response.message);
                    } else if (response.isVrfdFrgt === "true" && response.isVrfdFrgtOtp === "true" && response.isVrfdFrgtPss === "true" && response.isPssCng === "false") {
                        $('.otp-hide-part-email').hide();
                        $('.otp-hide-part-mobile').hide();
                        $('.password-hide-part').hide();
                        $('.caption-hide-part').hide();
						mixpanelLoginSucess(response.mixpanelLoginEventDto);
                        $('#forgotPwdModalL').modal('close');
                        window.location.reload();
                    }


//
                } else {
                    if (response.message !== '') {
                        $('#forgotPwdModalL .alert-dangerL').text(response.message);
                    } else {
                        $('#forgotPwdModalL .alert-dangerL').text("Invalid Request");
                    }

                    $('#forgotPwdModalL .alert-dangerL').removeClass('hide');
                    $('#forgotPwdModalL .alert-successL').addClass('hide');
                    $('.alert-dangerL').show();
                }
            },
            complete: function (response) {
                //$('#plzw').modal('hide');
                $('#fgtPwdSndMailBut').removeClass('disabled btn_loader');
            },
            error: function (response) {
                alert("something went wrong");
            }
        });
    });
    $("#ckDynContentWrapperLogin").on("click", ".confirm-info-btn",function() {
      window.location.reload();
    })
//Mailcheck JS Integration
    function mailcheckjs() {
        var email = $("#loginEmail");
        var email1 = $("#forgotEmail");
        var email2 = $("#custEmail");
        var hint = $("#emailhint");
        var hint1 = $("#emailhint1");
        var hint2 = $("#semailhint");
        var typingTimer;
        var doneTypingInterval = 200;

        $("#loginEmail").keyup(function () {
            hint.css("display", "none").empty();
            clearTimeout(typingTimer);
            $(this).mailcheck({
                suggested: function (element, suggestion) {
                    if (!hint.html()) {
						let filterSuggestion = emailHintText(suggestion.address, suggestion.domain);
                        typingTimer = setTimeout(function () {
                            hint.html(filterSuggestion).fadeIn(150);
                        }, doneTypingInterval);
                    } else {
                        $(".domain").html(suggestion.domain);
                    }
                }
            });
        });
        hint.on("click", ".domain", function () {
            email.val($(".domain").text());
            hint.fadeOut(200, function () {
                $(this).empty();
            });
            return false;
        });
        $("#forgotEmail").keyup(function () {
            hint1.css("display", "none").empty();
            clearTimeout(typingTimer);
            $(this).mailcheck({
                suggested: function (element, suggestion) {
                    if (!hint1.html()) {
						let filterSuggestion = emailHintText(suggestion.address, suggestion.domain);
                        typingTimer = setTimeout(function () {
                            hint1.html(filterSuggestion).fadeIn(150);
                        }, doneTypingInterval);
                    } else {
                        $(".domain").html(suggestion.domain);
                    }
                }
            });
        });
        hint1.on("click", ".domain", function () {
            email1.val($(".domain").text());
            hint1.fadeOut(200, function () {
                $(this).empty();
            });
            return false;
        });
        $("#custEmail").keyup(function () {
            hint2.css("display", "none").empty();
            clearTimeout(typingTimer);
            $(this).mailcheck({
                suggested: function (element, suggestion) {
                    if (!hint2.html()) {
                        let filterSuggestion = emailHintText(suggestion.address, suggestion.domain);
                        typingTimer = setTimeout(function () {
                            hint2.html(filterSuggestion).fadeIn(150);
                        }, doneTypingInterval);
                    } else {
                        $(".domain").html(suggestion.domain);
                    }
                }
            });
        });
        hint2.on("click", ".domain", function () {
            email2.val($(".domain").text());
            hint2.fadeOut(200, function () {
                $(this).empty();
            });
            return false;
        });
    }
    
    function verifyAutoReadOtp(e) {
		let otpElment = document.querySelectorAll(".ck-login-otp-wrapper .loginOtp");
		let otp = '';
		for (let i of otpElment) {
			otp += i.value;
		}
		if (otp.length == otpElment.length) {
			let whatsappNotify = $("#ckLoginFormL").find("#loginWhatsappNotify").val();
			let tempUuid = $("#ckLoginFormL").find("#tempUuid").val();
			let attmptUuid = $("#ckLoginFormL").find("#attmptUuid").val();
			let offer = '';
			let existCusName =$("#existCusName").val();
			if(!$('#verifyLoginWithOtp').hasClass('hide')){
				verifyLoginWithOtp(e, existCusName);
			} else{
				doVerifyOtp(e, otp, tempUuid, attmptUuid, whatsappNotify, offer, existCusName);
			}
		}
	}
});
var timerId;
var OtpcountdownTimer2Shown=false;
var logInViaOtp=false;
function forgotResndOtp() {
    $('#forgotResndOtp').addClass('pointerNone');
    var requestUuid = $("#requestUuid").val();
    var identifierType = $("#identifierType").val();
    var email = $("#forgotEmail").val();
    var mobile = $("#forgotMobile").val();
    $(".forgotLoginOtp").val("");
//    var countryCode = $("#forgotCountryCode").val();
    var countryCode = $('#loginCountryCode').val();
    $('#forgotPwdModalL .alert-success').addClass('hidden');
    $('#forgotPwdModalL .alert-danger').addClass('hidden');
    var jqxhr = $.ajax({
        url: webAppL.rsendForgotOtpUri,
        type: "POST",
        cache: false,
        data: {
            email: email,
            mobile: mobile,
            countryCode: countryCode,
            requestUuid: requestUuid,
            identifierType: identifierType
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var timeInSeconds = data.leftTime;
             timerId = setInterval(countdown, 1000);
            function countdown() {
                if (timeInSeconds === -1 ) {
                    clearTimeout(timerId);
                    $('.forgotResndOtp').css({"font-size": "14px", "border": "2px solid #E30D68", "padding": "6px 16px", "border-radius": "6px", "color": "#E30D68"});
                    $('.forgotResndOtp').text('Resend OTP');
                    $('.forgotResndOtp').removeClass('pointerNone');
                } else {
                    $('.forgotResndOtp').css({"background-color": "transparent", "color": "#E30D68", "border-radius": "unset", "font-size": "14px", "border": "none"});
                    $('.forgotResndOtp').text('Resend OTP in ' + timeInSeconds + ' Sec');
                    $('.forgotResndOtp').addClass('pointerNone');
                    timeInSeconds--;
                }
            }
            $('#forgotPwdModalL .alert-successL').addClass('hide');
            $('#forgotPwdModalL .alert-dangerL').addClass('hide');
            $('#forgotPwdModalL .alert-successL').text(data.message);
            $('.alert-successL').hide();
        } else {
            if (data.message !== '') {
                $('#forgotPwdModalL .alert-dangerL').text(data.message);
            } else {
                $('#forgotPwdModalL .alert-dangerL').text("Invalid Request");
            }
            $('#forgotPwdModalL .alert-dangerL').removeClass('hide');
            $('#forgotPwdModalL .alert-successL').addClass('hide');
            $('.alert-dangerL').show();
        }

    });
    jqxhr.fail(function (data) {

    });
}
function resndVerifyOtp() {
    $('#OtpcountdownTimer').addClass('pointerNone');
    var tempUuid = $("#tempUuid").val();
    var attmptUuid = $("#attmptUuid").val();
    $(".otp-container input").val("");
    $('#otc-1').focus();
    $(".verify-otp-field .otp-container, #otpMobileMsg").removeClass('hide');
    $(".verify-email-otp-field,#otpEmailMsg").addClass('hide');
    var jqxhr = $.ajax({
        url: webAppL.rsendOtpUri,
        type: "POST",
        cache: false,
        data: {
            tempUuid: tempUuid,
            attmptUuid: attmptUuid
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
	        clearInterval(timerId);
            var timeInSeconds = data.leftTime;
             timerId = setInterval(countdown, 1000);
            $(".otp-container input").val("");
            function countdown() {
                if (timeInSeconds === -1) {
                    clearTimeout(timerId);
                    $('#OtpcountdownTimer').css({"font-size": "14px", "border": "2px solid #E30D68", "padding": "6px 16px", "border-radius": "6px", "color": "#E30D68"});
                    $('#OtpcountdownTimer').text('Resend OTP');
                    $('#OtpcountdownTimer').removeClass('pointerNone');
                    var tcnt = data.tcnt;
                    var intrlUr = data.intrlUr;
                    var varMbl = $("#isLoginWithOtp").val();
                    if (tcnt >= 3 && intrlUr === true && varMbl !== "true") {
                        $('#OtpcountdownTimer2').css({"font-size": "14px", "border": "2px solid #E30D68", "padding": "6px 16px", "border-radius": "6px", "color": "#E30D68"});
                        $('#OtpcountdownTimer2').text('Resend OTP');
                        $('#OtpcountdownTimer2').removeClass('pointerNone');
                        $("#OtpcountdownTimer2").removeClass('hide');
                        $("#OtpcountdownTimer2").show();
                        OtpcountdownTimer2Shown=true;
                    }
                } else {
                    $('#OtpcountdownTimer').css({"background-color": "transparent", "color": "#E30D68", "border-radius": "unset", "font-size": "14px", "border": "none"});
                    $('#OtpcountdownTimer').text('OTP Valid for ' + timeInSeconds + ' Sec');
                    $('#OtpcountdownTimer').addClass('pointerNone');
                    $('#OtpcountdownTimer2').hide();
                    timeInSeconds--;
                }
            }
            M.toast({html: data.message});
        } else {
            M.toast({html: data.message});
            $('#OtpcountdownTimer').removeClass('pointerNone');
        }

    });
    jqxhr.fail(function (data) {

    });
}
function checkScore() {
    if ($("#loginTab").length > 0) {
        $('#loginTab').tabs();
        $('#loginTab .numberTab').click(function () {
            document.getElementById("loginEmail").value = "";
        });
        $('#loginTab  .emailTab').click(function () {
            document.getElementById("loginMobile").value = "";
        });
    }
    if ($("#loginTabf").length > 0) {
        $('#loginTabf').tabs();
        $('#loginTabf .numberTab').click(function () {
            document.getElementById("forgotEmail").value = "";
        });
        $('#loginTabf .emailTab').click(function () {
            document.getElementById("forgotMobile").value = "";
        });
    }

      $('#forgotMobile').on('input', function (e) {
         $(this).val($(this).val().replace(/\D/g, '').replace(/(\..*)\./g, '$1'));
      });


function setupOtpFields($otpInputs, $submitButton) {
    $otpInputs.on('input', function () {
        if (this.value.length > this.maxLength) {
            this.value = this.value.slice(0, this.maxLength);
        }

        let allFieldsFilled = true;

        $otpInputs.each(function () {
            if ($(this).val().trim() === '') {
                allFieldsFilled = false;
                return false;
            }
        });

        if (allFieldsFilled) {
            $submitButton.removeClass('buttonDisable');

        } else {
            $submitButton.addClass('buttonDisable');

        }
    });

    $otpInputs.on('paste', function (e) {
        // Prevent default paste behavior
        e.preventDefault();


        let clipboardData = e.originalEvent.clipboardData || window.clipboardData;
        let pastedText = clipboardData.getData('text');

        let currentInput = $(this);
        let currentIndex = $otpInputs.index(currentInput);


        for (let i = 0; i < pastedText.length; i++) {
            if (currentIndex + i < $otpInputs.length) {
                $otpInputs.eq(currentIndex + i).val(pastedText[i]);
            }
        }

        if (currentIndex + pastedText.length < $otpInputs.length) {
            let nextInput = $otpInputs.eq(currentIndex + pastedText.length);
            nextInput.focus();
            nextInput.select();
        }


        currentInput.trigger('input');
    });


    $otpInputs.on('input', function (event) {
        let lastField = $otpInputs.last();
        let findOtp = $(event.target).attr('class');
        if(typeof findOtp !== "undefined" && findOtp === 'loginOtp'){
            if (lastField.val().trim() !== '') {
                $submitButton.addClass('buttonDisable');
            }
        } else{
            if (lastField.val().trim() !== '') {
                $submitButton.removeClass('buttonDisable');
            }
        }
    });

    $otpInputs.on('input', function () {
        let prevValue = '';
        $otpInputs.each(function () {
            let value = $(this).val().trim();
            if (prevValue && !value) {
                $submitButton.addClass('buttonDisable');

                return false;
            }
            prevValue = value;
        });
    });
}


let $otpInputs1 = $('.loginOtp');
let $submitButton1 = $('#verifyLoginWithOtp, #buttonDisableVerify, #paddingForVerifyOtp');
setupOtpFields($otpInputs1, $submitButton1);


let $otpInputs2 = $('.forgetOTP');
let $submitButton2 = $('#fgtPwdSndMailBut');
setupOtpFields($otpInputs2, $submitButton2);


let $otpInputs3 = $('.forgetOTPMail');
let $submitButton3 = $('#fgtPwdSndMailBut');
setupOtpFields($otpInputs3, $submitButton3);

$(".forgetOTP,.forgetOTPMail").on("click", function () {
  $("#forgotPwdModalL").addClass("upward-position");
});

    $('#forgotMobile').on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
    });
//Email OTP Paste
    const $inp = $(".eforgotLoginOtp");
    $inp.on({
        input(ev) {

            const i = $inp.index(this);
            if (this.value)
                $inp.eq(i + 1).focus();
        },
        keydown(ev) {
            const i = $inp.index(this);
            if (!this.value && ev.key === "Backspace" && i)
                $inp.eq(i - 1).focus();
        }
    });


//Mobile OTP
    let in1 = document.getElementById('otc-1'),
            in2 = document.getElementById('fotc-1'),
            ins = document.querySelectorAll('input[type="number"].loginOtp, input[type="number"].forgetOTP');
            if($(".login-section-length-check").length==0){
             ins.forEach(function (input) {
                    input.addEventListener('keyup', function (e) {
                        if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
                            return;
                        }
                        if ((e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT") {
                            this.previousElementSibling.select();
                        } else if (e.keyCode !== 8 && this.nextElementSibling) {
                            this.nextElementSibling.select();
                        }
                    });
                    input.addEventListener('focus', function (e) {
                        if (this === in1)
                            return;
                        if (this === in2)
                            return;
                        if (in1.value == '' && this.value === '') {
                            in1.focus();
                        }
                        if (in2.value == '') {
                            in2.focus();
                        }
                     if (this.previousElementSibling && this.previousElementSibling.value === '' && this.value === '') {
                                this.previousElementSibling.focus();
                            }

                    });
                });
            }

    in1.addEventListener('input', function (e) {
        let data = e.data || this.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data)
            return; // Shouldn't happen, just in case.
        if (data.length === 1)
            return; // Here is a normal behavior, not a paste action.
        var ins = document.querySelectorAll('input[class="loginOtp"]');
        for (i = 0; i < data.length; i++) {
            ins[i].value = data[i];
        }
    });
    in2.addEventListener('input', function (e) {
        let data = e.data || this.value; // Chrome doesn't get the e.data, it's always empty, fallback to value then.
        if (!data)
            return; // Shouldn't happen, just in case.
        if (data.length === 1)
            return; // Here is a normal behavior, not a paste action.
        var ins2 = document.querySelectorAll('input[class="forgotLoginOtp"]');
        for (i = 0; i < data.length; i++) {
            ins2[i].value = data[i];
        }
    });
    if ($(window).width() < 767 && $(".login-container").length > 0 && $('.ck-login-password-wrapper').hasClass('hide')) {
        if ('OTPCredential' in window) {
            let input = document.querySelector('input[autocomplete="one-time-code"]');
            if (!input)
                return;
            let signal = new AbortController();
            setTimeout(() => {
                signal.abort();
            }, 1 * 40 * 1000);
            let ac = new AbortController();
            navigator.credentials.get({
                otp: {transport: ['sms']},
                signal: ac.signal
            }).then(otp => {
                var pasteData = otp.code;
                var arrayOfText = pasteData.toString().split('');
                for (var i = 0; i < arrayOfText.length; i++) {
                    if (i >= 0) {
                        if (document.getElementById("loginEmail").value.length !== 0 || document.getElementById("loginMobile").value.length !== 0) {
                            document.getElementById('otc-' + (i + 1)).value = arrayOfText[i];
                        }
                        document.getElementById('fotc-' + (i + 1)).value = arrayOfText[i];
                    } else {
                        alert("Invalid OTP");
                        $(".fl-remove button,#verifyLoginWithOtp").removeClass('disabled btn_loader');
                        $(".otp-content-box input,.otp-container input").val("");
                    }
                }
                if (document.getElementById("loginEmail").value.length !== 0 || document.getElementById("loginMobile").value.length !== 0) {
                    if ($("button").is(".submitBtn.hide")) {
						findAllowFillOtp = true;
                        $("#verifyLoginWithOtp").trigger('click');
                        $("#verifyLoginWithOtp").addClass('disabled btn_loader');
                    }
                    if ($("#verifyLoginWithOtp").is(".hide")) {
						findAllowFillOtp = true;
                        $("#ckLoginFormL").submit();
                        $(".fl-remove button").addClass('disabled btn_loader');
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
function resndEmailOtp() {
    $('#OtpcountdownTimer2').addClass('pointerNone');
    var tempUuid = $("#tempUuid").val();
    var attmptUuid = $("#attmptUuid").val();
    $(".verify-otp-field .otp-container, #otpMobileMsg").addClass('hide');
    $(".verify-email-otp-field,#otpEmailMsg").removeClass('hide');
    $(".otp-container input").val("");
//    $('#OtpcountdownTimer').addClass('pointerNone');
    var jqxhr = $.ajax({
        url: webAppL.rsendEmailOtpUri,
        type: "POST",
        cache: false,
        data: {
            tempUuid: tempUuid,
            attmptUuid: attmptUuid
        },
        dataType: "json",
        /*jsonp: "callback", // only specify this to match the name of callback parameter your API is expecting for JSONP requests.*/
        statusCode: {// if you want to handle specific error codes, use the status code mapping settings.
            404: handler404,
            500: handler500,
            502: handler502
        }
    });
    jqxhr.done(function (data) {
        if (data.success === "true") {
            var timeInSeconds = data.leftTime;
             timerId = setInterval(countdown, 1000);
            $(".otp-container input").val("");
            function countdown() {
                if (timeInSeconds === -1) {
                    clearTimeout(timerId);
                    $('#OtpcountdownTimer2').css({"font-size": "14px", "border": "1px solid #FF236E", "padding": "3px 10px 3px", "border-radius": "12px", "color": "#FF236E"});
                    $('#OtpcountdownTimer2').text('Resend OTP on Email');
                    $('#OtpcountdownTimer2').removeClass('pointerNone');
                    $('#OtpcountdownTimer').show();
                } else {
                    $('#OtpcountdownTimer2').css({"background-color": "transparent", "color": "#EA4335", "border-radius": "unset", "font-size": "14px", "border": "none"});
                    $('#OtpcountdownTimer2').text('Resend OTP on Email in ' + timeInSeconds + ' Sec');
                    $('#OtpcountdownTimer2').addClass('pointerNone');
                    $('#OtpcountdownTimer').hide();
                    timeInSeconds--;
                }
            }
            M.toast({html: data.message});
        } else {
            M.toast({html: data.message});
            $('#OtpcountdownTimer2').removeClass('pointerNone');
        }

    });
    jqxhr.fail(function (data) {

    });
}

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
        jqxhr.done(function (data) {
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
        jqxhr.fail(function (data) {

        });
    }
}

function switchVerifyAccount(e){
	if ($("#emailTab").hasClass("hide") || $("#phoneNumberTab").hasClass("hide")){
		 let start = e.target.selectionStart;
	    let end = e.target.selectionEnd;
		let searchInput = "";
		let currentValue= e.target.value;
		currentValue = currentValue.trim();
		let regex= /^\d+$/;
		let isnum = regex.test(currentValue);
		$(".showLoginPassword").addClass('hide');
		if(isnum) {
			$("#phoneNumberTab").removeClass('hide');
	        $("#emailTab").addClass('hide');
	        $("#loginEmail").val("");
	        $("#loginMobile").val(currentValue);
	        searchInput = $("#loginMobile");
		} else {
		$(".emailIcon").show();
        $(".faceIcon").show();
			$("#phoneNumberTab").addClass('hide');
	        $("#emailTab").removeClass('hide');
	        $('#loginEmail').attr("placeholder", "Email ID / Mobile Number");
	        $("#loginEmail").val(currentValue);
	        $("#loginMobile").val("");
	         $("#emailhint").removeClass('hide');
	        searchInput = $("#loginEmail");
		}
		searchInput.focus();
		searchInput[0].setSelectionRange(start, end);
	}
}

function switchPasswordWindow() {
	$('.existingUser').addClass('hide');
	$(".showLoginPassword").removeClass('showLogPass');
	$(".verifyEmailD").removeClass('showLogPassH');
	$(".forgetPasswordDiv").addClass('showLogPassR');
	$(".verifyEmailD").addClass('marginBtmForOR');
	$(".login-title").text("Login");
	$('.ck-login-password-wrapper').removeClass('hide');
	$("#loginPassword").text("Password");
	$('.ck-login-otp-wrapper').addClass('hide');
	$("#loginWithOtp,#verifyLoginWithOtp,.verify-email-otp-field,#otpEmailMsg,#otpMobileMsg").addClass("hide");
	  $('#buttonDisableVerify').removeClass('buttonDisable');
	    $('#paddingForVerifyOtp').removeClass('buttonDisable');

	let email=$("#loginEmail").val();
	let mobile=$("#loginMobile").val();
	if (email !== "") {
		$('.ck-login-email-wrapper').removeClass('hide');
		$('.ck-login-mobile-wrapper').addClass('hide');
		$('#phoneNumberTab').addClass('hide');
		$("#changeEmailLink").removeClass('hide');
	} else if (mobile !== "") {
		$('.ck-login-mobile-wrapper,.existingUser').removeClass('hide');
		$('.ck-login-email-wrapper,.whatsapp_subscription').addClass('hide');
		$("#phoneNumberTab").addClass('showNum');
		$("#changePhoneNum").removeClass('hide');
	}
	$("#emailVerified").val("true");
	$('.loginWithGoogle').removeClass('hide');
	$('.ForPasswordDesign').addClass('passwordContinueMargin');
	$(".forgetPasswordMargin").removeClass('removeMarginFromVerifyButton');
	$("#isRegistered").val("true");
	$("#forgetPasswordRemove").removeClass('hide');
	$(".signupAlign").css('text-align', 'right');
	$(".waves-light").removeClass('hide');
	$("#isVerifiedOtp").val("true");
	$(".showLoginPassword").addClass('hide');
	$(".forgetPasswordDiv").removeClass('hide');
    $("#changeSocialPhoneNum").addClass('hide');
    $('.orAndLoginWithGoogle').removeClass('hide');
    $('.orDiv').addClass('marginTopForOR');
     $('#paddingForVerifyOtp').addClass('paddingForPassWordFeild');
    $('.login-or').addClass('loginWithGoogleForPassword');
     $('.orAndLoginWithGoogle').addClass('loginWithGoogleForPassword');
}

function validatePhoneNumber(event) {
  if (!enablePhoneNumberValidation) {
    return;
  }
  let inputValue = event.target.value;
  let sanitizedValue = inputValue.replace(/\D/g, '');
  event.target.value = sanitizedValue;
}
                function switchVerifyAccountForgetPassword(e){
                	if ($("#emailTab").hasClass("hide") || $("#phoneNumberTab").hasClass("hide")){
                		 let startff = e.target.selectionStart;
                	    let endff = e.target.selectionEnd;
                		let searchInputff = "";
                		let currentValueff= e.target.value;
                		let regexMobile= /^\d+$/;
                		let isnumber = regexMobile.test(currentValueff);
                		$(".faceIcon").show();
                		if(isnumber) {
                		  $("#emailTabff").addClass('hide');
                		  	$("#inputFieldff").removeClass('hide');
                		  		$(".mobile-hide-part").addClass('numberFieldShow');
                		  		 $(".mobile-hide-part").removeClass('hide');
                				$("#phoneNumberTabff").show();
                            $("#forgotEmail").val("");
                	        $("#forgotMobile").val(currentValueff);
                	        searchInputff = $("#forgotMobile");
                	            $(".email-hide-part").removeClass('numberFieldShow');
                		}
                			else {
                                $(".mobile-hide-part").removeClass('numberFieldShow');
                    			$("#otpMessage").addClass("hide");
                    			 $(".mobile-hide-part").addClass('hide');
                    			$("#inputFieldff").addClass('hide');
                    		     $("#emailTabff").removeClass('hide');
                    			$("#emailTabff").show();
                    			$(".emailIcon").show();
                    			$(".faceIcon").show();
                    	        $('#forgotEmail').attr("placeholder", "Email ID / Mobile Number");
                    	        $("#forgotEmail").val(currentValueff);
                    	        $("#forgotMobile").val("");
                    	        $("#emailhint").removeClass('hide');
                    	        searchInputff = $("#forgotEmail");
                    		}
                		searchInputff.focus();
                		searchInputff[0].setSelectionRange(startff, endff);
                	}
                }
                
  function grecaptchaEnterprise() {
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LffrDQpAAAAAAdJSbgVUcL7-4643gjXzCcIv7e1', {action: 'LOGIN/SIGNUP'});
      $("#g-recaptcha-response").val(token);
    });
  }
  
  function removeUrlSpaceCharFromText(text){
	//remove url specific space character from string 
	if(typeof text !== "undefined" && text.includes("%20")){
		text = text.replaceAll("%20","");
	}
	return text;
  }
  
function emailHintText(emailAddress, domain) {
	let email = removeUrlSpaceCharFromText(emailAddress);
	// First error - fill in/show entire hint element
	return "<span class='suggestion'>Did you mean: </span>" +
		"<span class='address'><a href='#' class='domain'>" +
		email + "@" + domain + "</a></span>" + "?";
}

function allowOnlyDigits() {
  this.value = this.value.replace(/\D/g, ''); // remove anything that's not a digit
}

function clearForgotPasswordInputsOnModalOpen() {
    $('#ckDynContentWrapperLogin, #forgotPwdModalL').modal({
        onOpenEnd: function () {
            $('#forgotPwdModalL').find('input[type="text"]').val('');
        }
    });
}

