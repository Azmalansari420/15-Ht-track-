let filterCleared = false;
let isFilterChanged = false;
// Init block
$(function() {
    initFilterValueClickEvent();
	initRestFilterEvent();
	if ($('#check-radio-filter').length > 0) {
		$("#chk-filter-price").on("click", function() {
	        applyFilterChange();
	    })
		initFilterChange();
	}
	$(":checkbox").attr("autocomplete", "off"); // Checkbox auto complete is disabled
});

/**
 * Generate category url for specification filters
 */
function generateCategoryUrl(baseUrl,selectedAttributeId,minPrice,maxPrice) {
	const sortByAttrName = $('#sortByAttrName').val();
	const filterDate = $('#filterDate').val();
	const totalProducts = $('#totalProducts').val();
	const showMain = $('#showMain').val();
	let _url = baseUrl;
	if(filterDate) {
		_url = addOrReplaceParam(_url, "date", filterDate);
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
	if(totalProducts) {
		_url = addOrReplaceParam(_url, "tc", totalProducts);
	}
	if(showMain) {
		_url = addOrReplaceParam(_url, "showMain", showMain);
	}
	if(selectedAttributeId) {
		_url = addOrReplaceParam(_url, "selectedAttributeId", selectedAttributeId);
	}
	return _url;
}

function initFilterChange() {
	$('.tablinks').click(function (event) {
		let selectedAttributeId = $(this).attr('data-attributeId');
		if(isFilterChanged) {
			loadCategoryFilters(selectedAttributeId);
		}
    });
	$('.specification-filter-value').change(function () {
        if ($(this).is(':checked')) {
            $("#chk-filter-price").css("background-color", "green");
            $("#chk-filter-price").css("pointer-events", "all");
            $("#resetFilter").text("RESET ALL");
            $("#link-reset-filter").show();
        }
    });
}

function initFilterValueClickEvent() {
	$('.specification-filter-value').change(function() { 
		let isChecked = $(this).is(':checked');
		let selectedAttributeId = $(this).attr('data-attributeId');
		if(selectedAttributeId === 'filter-by-price' ) {
			if(isChecked) {
				let selectedPriceOptionId = $(this).attr('id');
				$('.category-price-filter').find('input:checked').each(function () {
					if(selectedPriceOptionId != this.id){
						this.checked=false;
					}
				});
			}
		}
		isFilterChanged = true;
		priceFilterSelectedValues();
		$("#selectedFilterAttributeId").val(selectedAttributeId);
		if(isChecked) {
			loadCategoryFilters(selectedAttributeId, 'true');
		}else {
			loadCategoryFilters(selectedAttributeId, 'false');
		}
		markFilterAttributeSelected(selectedAttributeId,isChecked);
	});
}

function markFilterAttributeSelected(selectedAttributeId, isSelected) {
	if (isSelected) {
		$(".filter-tab-" + selectedAttributeId).addClass("filter-tab-btn-active");
	} else {
		let filterAttributeSelected = false;
		$('#tabcontent_' + selectedAttributeId).find('input:checked').each(function () {
			filterAttributeSelected = true;
		});
		if (!filterAttributeSelected) {
			$(".filter-tab-" + selectedAttributeId).removeClass("filter-tab-btn-active");
		}
	}
}

function initRestFilterEvent() {
	$("#resetFilter").on("click", function() {
		 evaluateFilterReset();
	});
}

function evaluateFilterReset() {
	 let resetButtonText = $("#resetFilter").text();
	 if(resetButtonText === "CLOSE") {
		 backToPreviousBtn();
	 }
	 if(resetButtonText === "RESET ALL") {
		 resetCatalogFilters();
		 filterCleared = true;
	 }
	 isFilterChanged = false;
}

function backToPreviousBtn() {
	if(filterCleared || isFilterChanged) {
		applyFilterChange();
	}else {
		$(".filter-modal").modal('close');
	}
};

function resetSelectedFilter(selectedFilterAttributeId) {
	$("#selectedFilterAttributeId").val(selectedFilterAttributeId);
	evaluateFilterReset();
}

function resetCatalogFilters() {
	$('#minPrice').val("");
	$('#maxPrice').val("");
	$('#filtersSelectedJson').val("");
	$('.category-price-filter').find('input:checked').each(function() {
		this.checked = false;
	});
	$('.radio-specification-filters').find('input:checked').each(function () {
		this.checked = false;
	});
	let selectedFilterAttributeId = $("#selectedFilterAttributeId").val();
	loadCategoryFilters(selectedFilterAttributeId);
	$("#resetFilter").text("CLOSE");
}

function getSelectedFilterValues() {
	let filterReq = [];
	const attributeValueMap = new Map();
    $('.radio-specification-filters').find('input:checked').each(function () {
        let attributeId = $(this).attr('data-attributeId');
        let name = $(this).attr('data-categoryName');
        let value = $(this).val();
        let catalogFilter  = attributeValueMap.get(attributeId);
        if(catalogFilter) {
			catalogFilter['values'].push(value);
		}else {
			catalogFilter = new CatalogFilter(attributeId,name,value);
			attributeValueMap.set(attributeId,catalogFilter);
		}
    });
    for (let catalogFilterSelected of attributeValueMap.values()){
	    filterReq.push(catalogFilterSelected);
	}
	return filterReq;
}
function loadCategoryFilters(selectedAttributeId,refreshCountOnly) {
	$("#selectedFilterAttributeId").val(selectedAttributeId);
	let priceRangeSelected = priceFilterSelectedValues();
	let minPriceSelected = priceRangeSelected['minValue'];
	let maxPriceSelected = priceRangeSelected['maxValue'];
	let filtersValueSelected = priceRangeSelected['filtersValueSelected'];
	let categoryUrl = generateCategoryUrl(specificationsFilterBaseUrl,selectedAttributeId,minPriceSelected,maxPriceSelected);
	let filterReq = getSelectedFilterValues();
	if(filterReq.length > 0) {
		filtersValueSelected = true;
	}
    const jsonReqData = JSON.stringify(filterReq);
	$.ajax({
		url: categoryUrl,
		type: "POST",
		headers:{'request-count': refreshCountOnly},
		data: jsonReqData,
		async:false,
		contentType: 'application/json',
		success: function(response) {
			if(response.success == "true") {
				if(refreshCountOnly === "true") {
					updateFilteredProductCount(response.totalProductCount);
				}else {
					$('#wrapper-category-filters').html(response.html);
					$("#filteredProductCount").val(response.totalProductCount);
					updateFilteredProductCount(response.totalProductCount);
					let currency = localStorage.getItem('userCurrency');
	    			changeCurrecies(currency);
	    			initFilterChange();
					initFilterValueClickEvent();
					$(".filter-tab-"+selectedAttributeId).addClass("active");
					$(".tabcontent").hide();
					$("#tabcontent_"+selectedAttributeId).show();
					if(filtersValueSelected) {
						$("#resetFilter").text("RESET ALL");
					}else {
						$("#resetFilter").text("CLOSE");
					}
				}
				
			}else {
				console.log("Failed to load category filters");
			}
		},
		error: function(err) {
			console.error(err.message);
		}
	});	
}

function CatalogFilter(attributeId, name, value) {
	this.attributeId = attributeId;
	this.name = name;
	this.values = [value];
}

function updateFilteredProductCount(totalProductCount) {
	let filterLabel ="Filter ";
	if(!isNaN(parseFloat(totalProductCount)) && isFinite(totalProductCount)) {
		filterLabel +=  " ("+totalProductCount+" Gifts available)";
	}
	$('#filter-product-count').text(filterLabel);
	
}

function applyFilterChange() {
	validatePriceFilterSelection();
    let filterReq = getSelectedFilterValues();
    if(filterReq.length > 0) {
		let filterJsonRequest = JSON.stringify(filterReq);
		if(filterJsonRequest) {
			let filterJsonRequestBase64 = bytesToBase64(new TextEncoder().encode(filterJsonRequest));
			$('#filtersSelectedJson').val(filterJsonRequestBase64);
		}
	}else {
		$('#filtersSelectedJson').val('');
	}
	window.location.href = generateUrl();
}

function priceFilterSelectedValues() {
	let minPriceSelected;
	let maxPriceSelected;
	let filtersValueSelected;
	$('.category-price-filter').find('input:checked').each(function () {
		filtersValueSelected =true;
        let minPrice = $(this).attr('data-min-price');
        let maxPrice = $(this).attr('data-max-price');
        if(minPrice) {
			if(minPriceSelected) {
				if(parseInt(minPrice) < parseInt(minPriceSelected)) {
					minPriceSelected = minPrice;
				}
			}else {
				minPriceSelected = minPrice;
			}
		}
		if(maxPrice) {
			if(maxPriceSelected) {
				if(parseInt(maxPrice) > parseInt(maxPriceSelected)) {
					maxPriceSelected = maxPrice;
				}
			}else {
				maxPriceSelected = maxPrice;
			}
		}
    });
    if(minPriceSelected == '1') {
		minPriceSelected = "";
	}
	if(maxPriceSelected == '100000') {
		maxPriceSelected = "";
	}
    return new PriceRangeSelected(minPriceSelected,maxPriceSelected,filtersValueSelected);
}

function PriceRangeSelected(minValue, maxValue, filtersValueSelected) {
	this.minValue = minValue;
	this.maxValue = maxValue;
	this.filtersValueSelected = filtersValueSelected;
}

function validatePriceFilterSelection() {
	let priceRangeSelected = priceFilterSelectedValues();
	let minPriceSelected = priceRangeSelected['minValue'];
	let maxPriceSelected = priceRangeSelected['maxValue'];
    if(minPriceSelected) {
		$('#minPrice').val(minPriceSelected);
	}else {
		$('#minPrice').val('');
	}
	if(maxPriceSelected) {
		$('#maxPrice').val(maxPriceSelected);
	}else{
		$('#maxPrice').val('');
	}
}