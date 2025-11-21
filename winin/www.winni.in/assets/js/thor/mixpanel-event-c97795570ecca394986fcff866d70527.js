function mixpanelLoginSucess(mixpanelLoginEventDto) {
	if(mixpanelLoginEventDto !== null && mixpanelLoginEventDto !== undefined && mixpanelLoginEventDto !== 'undefined'){
		if(mixpanelLoginEventDto.customerId!== null && mixpanelLoginEventDto.customerId !== undefined && mixpanelLoginEventDto.customerId !== 'undefined'){
			mixpanel.identify(mixpanelLoginEventDto.customerId); 
			mixpanel.people.set({ "$email": mixpanelLoginEventDto.email, "$name": mixpanelLoginEventDto.name});
		}
	}
}

function mixpanelSignupSucess(mixpanelSignupEventDto) {
	if(mixpanelSignupEventDto !== null && mixpanelSignupEventDto !== undefined && mixpanelSignupEventDto !== 'undefined'){
		if(mixpanelSignupEventDto.customerId!== null && mixpanelSignupEventDto.customerId !== undefined && mixpanelSignupEventDto.customerId !== 'undefined'){
			mixpanel.identify(mixpanelSignupEventDto.customerId); 
			mixpanel.people.set({ "$email": mixpanelSignupEventDto.email, "$name": mixpanelSignupEventDto.name});
		}
	}
}

let adobeSuccgoogleMix = $('#adobeSuccgoogle').val();
if (adobeSuccgoogleMix !== undefined && adobeSuccgoogleMix !== 'undefined' && adobeSuccgoogleMix !== '') {
	$('#adobeSuccgoogle').val('');
	let customerId = $('#customerId').val();
	let customerName = $('#customerName').val();
	let customerEmail = $('#customerEmail').val();
	if(customerName !== null && customerName !== undefined && customerName !== 'undefined'){
		mixpanel.identify(customerId); 
		mixpanel.people.set({ "$email": customerEmail, "$name": customerName});
	}
}

let logutCus= $('#logutCust').val();
if(logutCus !== undefined && logutCus !== '' && logutCus !== null && logutCus !== 'undefined'){
	$('#logutCust').val('');
	mixpanel.reset();
}

function mixpanelUpdateUserName(customerName) {
	if (customerName !== null && customerName !== undefined && customerName !== 'undefined') {
		mixpanel.people.set({ "$name": customerName});
	}
}