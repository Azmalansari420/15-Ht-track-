$(document).ready(function () {
    fx.base = "INR";
    fx.settings = {
        from: "INR"
    };
    fx.base = {"INR": 1};
    var currency = localStorage.getItem('userCurrency');
    if (currency === null || currency === "undefined" || currency === "") {
        localStorage.setItem('userCurrency', "INR");
    }else{
    changeCurrecies(currency);
    }
    let url_string = window.location.href;
    let url = new URL(url_string);
    let currencyUrl = url.searchParams.get("currency");
    if (currencyUrl !== undefined && currencyUrl !== null && currencyUrl !== "") {
        currencyUrl = currencyUrl.toUpperCase();
        localStorage.setItem('userCurrency', currencyUrl);
        $('.showUserCurrency').text(currencyUrl);
        if (currencyUrl != "INR") {
            changeCurrecies(currencyUrl);
        } else {
            INRRateGet();
        }
    }
    $('.currency').on('click', function () {
        var currency = $(this).data('value');
        localStorage.setItem('userCurrency', currency);
        $('.showUserCurrency').text(currency);
        if (currency != "INR") {
            changeCurrecies(currency);
        } else {
            INRRateGet();
        }

    });

    if ($('body').hasClass("page-product")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-cart")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("mobile-cart")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-category")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("page-product")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("search-list-bc")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("search-mobile")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("personalised-gifts-desktop")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("rcpd_page")) {
        var currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("international-courier-home-page")) {
        let currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("init-authentication")) {
        let currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("zippy-delivery")) {
        let currency = localStorage.getItem('userCurrency');
        changeCurrecies(currency);
    }
    if ($('body').hasClass("checkoutCompleted")) {
        let currency = localStorage.getItem('userCurrency');
        $('.showUserCurrency').text(currency);
        changeCurrecies(currency);
    }
    if ($('body').hasClass("mywinni-orders")) {
       let currency = localStorage.getItem('userCurrency');
        $('.showUserCurrency').text(currency);
        changeCurrecies(currency);
    }

});
function changeCurrecies(currency) {
    var currencySymbol = "₹";
    if (currency == null) {
        currency = "INR";
    }
	let currencyConSymbl=window.currConSymble;
	$.each(currencyConSymbl, function(key, value) {
    	if(currency === key){
			if(key === 'INR' || key === 'USD' || key === 'EUR' || key === 'GBP'){
				currencySymbol = value;
			} else{
				currencySymbol = key;
			}
		}
	});
	let currencyCon=window.exchangemoney;
	let factorcurr="1";
	$.each(currencyCon, function(key, value) {
    	if(currency === key){
			factorcurr = value;
		}
	});
    if (currency == "INR") {
        INRRateGet();
    } else {
        $(".moneyCal").each(function () {
            var amount = $(this).data('inr');
            amount = accounting.unformat(amount);
            var changeAmount = amount * factorcurr;
            $(this).text(
                    accounting.toFixed(changeAmount, 2)
                    );
        });
            
            if((".filterMoneyCal").length){   
            $(".filterMoneyCal").each(function () {
            var amount = $(this).data('inr');
            if(amount.indexOf('-')>-1){
				var startAmount =amount.substring(0,amount.indexOf('-'));
				var endAmount=amount.substring(amount.indexOf('-')+1);
				startAmount = accounting.unformat(startAmount);
                endAmount= accounting.unformat(endAmount);
                var changeAmount = startAmount * factorcurr;
                var changeAmount2=endAmount * factorcurr;
                $(this).text( ' '+ accounting.toFixed(changeAmount, 2) +' - '+ accounting.toFixed(changeAmount2, 2));
			}else{
				var lastString;
				 if(amount.indexOf("above")>-1){
					lastString=" and Above";
				}else{
					lastString=" and Below";
				}
				amount= amount.substring(0,amount.indexOf('&'));
				amount = accounting.unformat(amount);
                var changeAmount = amount * factorcurr;
                $(this).text( ' '+ accounting.toFixed(changeAmount, 2)+lastString);
			}
        });
       }

        $(".discountRate").each(function () {
            var discountAmount = $(this).data('inr');
            discountAmount = accounting.unformat(discountAmount);
            var changeAmount =  discountAmount * factorcurr;

            $(this).text(
                    accounting.toFixed(changeAmount, 2)
                    );
        });
        $(".moneySymbol").each(function () {
            $(this).text(currencySymbol);
        });
        if ($(".line-through-price").length || $(".card-content-mobile").length || $(".line-through-price-other").length || $(".line-through-price-desktop").length) {
            if ($(window).width() < 500) {
                $(".new-line-recently-viewed").show();
            }
            $(".new-line").show();
            $(".card-content-mobile").addClass("currency-card-content-height");
            $(".card-content-desktop").addClass("currency-card-content-height");
            $('.gifts-discount-price').css('display', 'inline-block');
            $('.gifts-discount-price-desktop').css('display', 'inline-block');
            $('.discount-price-margin').css('top', "-4px");
            $(".line-through-price").css('font-size', "13px");
            $(".line-through-price-other").css('font-size', "11px");
            $(".line-through-price-desktop").css('font-size', "14px");
        }
    }

    if ($('.currencyRadio').length > 0) {
//        change paypal currencies
        //usa
        var usaCurr = $('.paypalUSAAmount').data('inr');
        usaCurr = accounting.unformat(usaCurr);
        var amount1 = fx.convert(usaCurr, {to: 'USD'});
        $('.paypalUSAAmount').text(accounting.toFixed(amount1, 2));
        //gbp
        var gbpCurr = $('.paypalGBPAmount').data('inr');
        gbpCurr = accounting.unformat(usaCurr);
        var amount2 = fx.convert(gbpCurr, {to: 'GBP'});
        $('.paypalGBPAmount').text(accounting.toFixed(amount2, 2));
        //cad
        var cadCurr = $('.paypalCADAmount').data('inr');
        cadCurr = accounting.unformat(cadCurr);
        var amount3 = fx.convert(cadCurr, {to: 'CAD'});
        $('.paypalCADAmount').text(accounting.toFixed(amount3, 2));
        //THB
        var thbCurr = $('.paypalTHBAmount').data('inr');
        thbCurr = accounting.unformat(thbCurr);
        var amount4 = fx.convert(thbCurr, {to: 'THB'});
        $('.paypalTHBAmount').text(accounting.toFixed(amount4, 2));
        //aud
        var audCurr = $('.paypalAUDAmount').data('inr');
        audCurr = accounting.unformat(audCurr);
        var amount4 = fx.convert(audCurr, {to: 'AUD'});
        $('.paypalAUDAmount').text(accounting.toFixed(amount4, 2));
        //sgd
        var sgdCurr = $('.paypalSGDAmount').data('inr');
        sgdCurr = accounting.unformat(sgdCurr);
        var amount3 = fx.convert(sgdCurr, {to: 'SGD'});
        $('.paypalSGDAmount').text(accounting.toFixed(amount3, 2));
        //eur
        var eurCurr = $('.paypalEURAmount').data('inr');
        eurCurr = accounting.unformat(eurCurr);
        var amount7 = fx.convert(eurCurr, {to: 'EUR'});
        $('.paypalEURAmount').text(accounting.toFixed(amount7, 2));
    }
    if ($('.currencySelection').length > 0) {
        let curr=window.exchangemoney;
	$.each(curr, function(key, value) {
            if(key.length === 3){
                var usaCurr = $('.card'+key+'Amount').data('inr');
                usaCurr = accounting.unformat(usaCurr);
                var amount1 = fx.convert(usaCurr, {to: key});
                $('.card'+key+'Amount').text(accounting.toFixed(amount1, 2));
            }
	});
    }
}

function INRRateGet() {
    $(".moneyCal").each(function () {
        var amount = $(this).data('inr');
        $(this).text(
                amount
                );
    });
	if ((".filterMoneyCal").length) {
		$(".filterMoneyCal").each(function() {
			var amount = $(this).data('inr');
			if (amount.indexOf('-') > -1) {
				var startAmount =amount.substring(0,amount.indexOf('-'));
				var endAmount=amount.substring(amount.indexOf('-')+1);
                 $(this).text(accounting.toFixed(startAmount, 0) +' - '+ accounting.toFixed(endAmount, 0));
			}else{
				 var lastString;
				if(amount.indexOf("above")>-1){
					lastString=" and Above";
				}else{
					lastString=" and Below";
				}
				amount= amount.substring(0,amount.indexOf('&'));
                $(this).text( accounting.toFixed(amount, 0)+lastString);
			}
		});
	}

    $(".discountRate").each(function () {
        var discountAmount = $(this).data('inr');
        $(this).text(
                discountAmount
                );
    });
    $(".moneySymbol").each(function () {
        $(this).text("₹");
    });
    if ($(".line-through-price").length || $(".card-content-mobile").length || $(".line-through-price-other").length || $(".line-through-price-desktop").length) {
        if ($(window).width() < 500) {
            $(".new-line-recently-viewed").hide();
        }
        $(".new-line").hide();
        $('.gifts-discount-price').css('display', 'block');
        $('.gifts-discount-price-desktop').css('display', 'inline-block');
        $('.discount-price-margin').css('top', "0px");
        $(".line-through-price").css('font-size', "14px");
        $(".line-through-price-other").css('font-size', "14px");
        if ($(".currency-card-content-height").length) {
            $(".card-content").removeClass("currency-card-content-height");
        }
    }
}
