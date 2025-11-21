$(document).ready(function ($) {
	
	$("#wl_tooltip").on("click", function (e) {
		let productId = $(this).data("pid");
		$("#span-add-to-wishlist-"+productId).trigger('click');
    });
    
    $("body").on("click", ".deleteWishlist", function () {
		let url = $(this).data("url");
	    deleteWishlist(url);
	});
});

let addToWishList;
function isElementChecked(productId) {
    let elementProduct = $("#input-add-to-wishlist-" + productId);
    if (elementProduct.length > 0) {
      return elementProduct.is(":checked");
    }
    return false;
}
	
function markWishlist(pid, wid,e) {
	e.preventDefault();
 	toggleWishList(pid, wid);
 	e.stopPropagation();
}

function clickWishlistTooltip(productId,wishListId,e) {
	e.preventDefault();
    if(wishListId) {
        deleteWishlistItem(productId,wishListId);
    }else {
       addProductToWishlist(productId);
    }
}
	
function toggleWishList(productId, wishlistId) {
    $("#tooltip_" + productId).off("mouseover").off("mouseout");
    $(".marginForImages").removeClass("remove-wishlist-hover-style");
    $("#tooltip_" + productId).hide();
    let parentElement = $("#tooltip_" + productId);
    if (wishlistId) {
      let imageUrl = $("#addwishlistHoverImage").val();
      let productIdAddWishlist = "tooltip_image_" + productId;
      let htmlStringForHoverImage = `<img id="${productIdAddWishlist}" class="marginForImages addWishlistStyle" src="${imageUrl}">`;
      parentElement.html(htmlStringForHoverImage);
      $(".addWishlistStyle").addClass("addWishlistMargin");
      parentElement.addClass("addRemoveClassEvent");
      deleteWishlistItem(productId,wishlistId);
    } else {
      let imageUrlRemoveWishlist = $("#removeWishlistHoverImage").val();
      let productIdRemoveWishlist = "tooltip_image_" + productId;
      let htmlStringForRemoveWishlistImage = `<img id="${productIdRemoveWishlist}" class="marginForImages removeWishlistStyle" src="${imageUrlRemoveWishlist}">`;
      parentElement.html(htmlStringForRemoveWishlistImage);

      $(".marginForImages").addClass("removeWishlistMargin");
      parentElement.removeClass("addRemoveClassEvent");
      addProductToWishlist(productId);
    }
    $("#tooltip_" + productId).show();
}
  
function wishlistCheckedCallDesktop(productId, wishlistId) {
	  addToWishList = isElementChecked(productId);
	  if (wishlistId) {
	    let wid = $("#wItemId_" + productId).val();
	    if (wid) {
	      deleteWishlistItem(productId,wid);
	    } else {
	      deleteWishlistItem(productId,wishlistId);
	    }
	    deleteWishlistItem(productId,wishlistId);
	  } else {
	    addProductToWishlist(productId);
	  }
	  $("#tooltip_" + productId).show();
}

function wishlistCheckedCall(productId, wishlistId) {
    addToWishList = isElementChecked(productId);
    if (addToWishList) {
      addProductToWishlist(productId);
    } else {
      let wid = $("#wItemId_" + productId).val();
      if (typeof wid !== "undefined" && wid !== null && wid !== "") {
        deleteWishlistItem(wid);
      } else {
        deleteWishlistItem(wishlistId);
      }
    }
}
  
function setImageSource(delete_wishList) {
    $("#setImageWithHeart, #setImageWithHeartDesktop").attr("src", delete_wishList);
}
  
function addProductToWishlist(productId) {
    let url = addWishlistUrl + productId;
    $.ajax({
      url: url,
      type: "POST",
      success: function (res) {
        if (res.success === true) {
			updateWishlist(res.itemCount);
          	addProductToWishlistSuccessHandler(productId,res.wishlistId);
        } else {
          	setImageSource(delete_wishList);
        }
      },
      error: function (err) {
		console.log("In addProductToWishlist, error : "+err);
      },
    });
}

function addProductToWishlistSuccessHandler(productId,wishlistId) {
	let tooltipWishlistElm = $("#tooltip_wishlist_" + productId);
	if(tooltipWishlistElm) {
	    tooltipWishlistElm.attr("data-wid",wishlistId);
	    tooltipWishlistElm.attr("onclick","markWishlist('"+productId+"','"+wishlistId+"',event)");
	}
	let spanAddToWishlistElm = $("#span-add-to-wishlist-" + productId);
	if(spanAddToWishlistElm) {
		spanAddToWishlistElm.attr("onclick","clickWishlistTooltip('"+productId+"','"+wishlistId+"',event)");
	}
	 
	let inputWishlistElm = $("#input-add-to-wishlist-" + productId);
	if(inputWishlistElm) {
	    inputWishlistElm.attr("data-wishlistId",wishlistId);
	    inputWishlistElm.attr('checked', true);
	}
	$("#tooltip_image_pdp").attr("src","https://assets.winni.in/groot/2024/05/08/desktop/remove-from-wishlist.png");
	$(".wishlist").addClass("replace-heart-png");
	$(".wishlist").removeClass("remove-heart-png");
	$(".tooltip-pdp").addClass("border-div_color");
}
	
function deleteWishlistItem(productId,wishlistId) {
    if (!wishlistId) {
      return;
    }
    let url = deleteWishlistUrl + wishlistId;
    $.ajax({
      url: url,
      type: "POST",
      success: function (res) {
        if (res.success === true) {
			updateWishlist(res.itemCount);
			deleteWishListSuccessHandler(productId);
        }
      },
      error: function (err) {
		console.log("In deleteWishlistItem, error : "+err);
      },
    });
}

function deleteWishListSuccessHandler(productId) {
	let tooltipWishlistElm = $("#tooltip_wishlist_" + productId);
	if(tooltipWishlistElm) {
		tooltipWishlistElm.removeAttr('data-wid');
		tooltipWishlistElm.attr("onclick","markWishlist('"+productId+"','',event)");
	}
	let spanAddToWishlistElm = $("#span-add-to-wishlist-" + productId);
	if(spanAddToWishlistElm) {
		spanAddToWishlistElm.attr("onclick","clickWishlistTooltip('"+productId+"','',event)");
	}
	let inputWishlistIdElm = $("#input-add-to-wishlist-" + productId);
	if(inputWishlistIdElm) {
		inputWishlistIdElm.removeAttr("data-wishlistId");
		inputWishlistIdElm.removeAttr('checked');
	}
	
	$("#tooltip_image_pdp").attr("src","https://assets.winni.in/groot/2024/05/08/desktop/addto-wish-list.png");
	$(".wishlist").removeClass("replace-heart-png");
	$(".wishlist").addClass("remove-heart-png");
	$(".tooltip-pdp").removeClass("border-div_color");
}

function deleteWishlist(url) {
    $.ajax({
      url: url,
      type: "POST",
      success: function (res) {
        if (res.success === true) {
          if (res.itemCount !== 0) {
            $("#setImageWithHeart, #setImageWithHeartDesktop").attr("src",add_wishList);
          } else {
            setImageSource(delete_wishList);
          }
          loadWishlistPage();
        }
      },
      error: function (err) {

      },
    });
}
  
function loadWishlistPage() {
	let wishlistUrl = document.getElementById('baseUri').value;
	let emlPlatform = document.getElementById('platform');
	if(emlPlatform) {
		let platform = emlPlatform.value;
		let totalCount = document.getElementById('totalCount').value;
		let pageSize = document.getElementById('pageSize').value;
		let currentPage = document.getElementById('currentPage').value;
		if('desktop' == platform && currentPage > 1) {
			let pageRemainder = totalCount%pageSize;
			if(pageRemainder == 1 && currentPage > 1) {
				currentPage = currentPage-1;
			}
			wishlistUrl = wishlistUrl +"?page="+currentPage;
		}
	}
	window.location.href=wishlistUrl;
}
