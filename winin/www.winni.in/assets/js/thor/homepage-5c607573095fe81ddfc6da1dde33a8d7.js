function openTab(event, tabName) {
  let i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tabOne");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  event.target.classList.add("active");
}


$("#FlowerTab").click(function () {
  $("#arrowImageFirst").hide();
  $("#arrowImageSecond").show();
  $(".cakeViewAllButton").hide();
  $(".flowerViewAllButton").show();
});

$("#cakeTab").click(function () {
  $("#arrowImageFirst").show();
  $("#arrowImageSecond").hide();
  $(".cakeViewAllButton").show();
  $(".flowerViewAllButton").hide();
});

function openCustomTab(tabName) {
  let tabContents = document.getElementsByClassName("custom-tab-content");
  for (let tabContent of tabContents) {
    tabContent.classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
}

$("#plantTab").click(function () {
  $("#plantTab").addClass("plantActiveTab");
  $("#chocolateTab").removeClass("chocolatesActiveTab");
  $("#comboTab").removeClass("combosActiveTab");
  $("#arrowImagePlant").show();
  $("#arrowImageChocolate").hide();
  $("#arrowImageCombo").hide();
  $(".chocolateViewButton").hide();
  $(".comboViewButton").hide();
  $(".plantViewButton").show();
  $("#colorChange").addClass("addColorForPlant");
  $("#colorChange").removeClass("addColorForChocolate");
  $("#colorChange").removeClass("addColorForCombos");
});
$("#chocolateTab").click(function () {
  $("#plantTab").removeClass("plantActiveTab");
  $("#comboTab").removeClass("combosActiveTab");
  $("#arrowImagePlant").hide();
  $("#chocolateTab").addClass("chocolatesActiveTab");
  $("#arrowImageChocolate").show();
  $("#arrowImageCombo").hide();
  $(".plantViewButton").hide();
  $(".comboViewButton").hide();
  $(".chocolateViewButton").show();
  $("#colorChange").removeClass("addColorForPlant");
  $("#colorChange").addClass("addColorForChocolate");
  $("#colorChange").removeClass("addColorForCombos");
});
$("#comboTab").click(function () {
  $("#plantTab").removeClass("plantActiveTab");
  $("#comboTab").addClass("combosActiveTab");
  $("#chocolateTab").removeClass("chocolatesActiveTab");
  $("#arrowImageCombo").show();
  $("#arrowImageChocolate").hide();
  $("#arrowImagePlant").hide();
  $(".plantViewButton").hide();
  $(".chocolateViewButton").hide();
  $(".comboViewButton").show();
  $("#colorChange").removeClass("addColorForPlant");
  $("#colorChange").removeClass("addColorForChocolate");
  $("#colorChange").addClass("addColorForCombos");
});
function getCategoryProducts(categoryId, size) {
  $(".preloderForImage").show();
  $("#fullPageLoader").hide();
  let jqxhr = $.ajax({
    url:
      webApp.getCategoryProducts +
      "?categoryId=" +
      categoryId +
      "&size=" +
      size,
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
      if (data.categoryId === 415) {
        $(".cakeBestsellers").html(data.html);
      } else if (data.categoryId === 416) {
        $(".flowersBestsellers").html(data.html);
      } else if (data.categoryId === 2047) {
        $(".trendingGifts").html(data.html);
      } else if (data.categoryId === 2041) {
        $(".personalisedBestsellers").html(data.html);
       if ($(".carousel-wrapper-2041").children().length >= 6) {
           $("#personalisedGiftsBtn").removeClass("hide");
       }
      } else if (data.categoryId === 959) {
        $(".bestsellerPlants").html(data.html);
         if ($(".home-dynamic-product-959").children().length >= 6) {
            $("#bestsellerPlantsBtn").removeClass("hide");
         }
      } else if (data.categoryId === 1197) {
        $(".bestsellerChocolate").html(data.html);
        if ($(".home-dynamic-product-1197").children().length >= 6) {
            $("#chocolateViewBtn").removeClass("hide");
         }
      } else if (data.categoryId === 690) {
        $(".bestsellerCombos").html(data.html);
      }
      loadPrevNextHome(data.categoryId);
      let currency = localStorage.getItem("userCurrency");
      changeCurrecies(currency);
    }
  });
  jqxhr.fail(function (data) {});
  jqxhr.always(function (data) {});
}

function getRecentlyViewProducts(size) {
  $("#preloderForImage").show();
  let jqxhr = $.ajax({
    url: webApp.getRecentlyViewProducts + "?size=" + size,
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
      $("#preloderForImage").hide();
      $(".recentlyViewProductsSection").html(data.html);
      loadPrevNextHome("recently-view-product-desktop");
      let currency = localStorage.getItem("userCurrency");
      changeCurrecies(currency);
    }
  });
  jqxhr.fail(function (data) {});
  jqxhr.always(function (data) {});
}
if($('#homepage-valentineday-section').length>0){
  loadPrevNextHome("recently-view-product-desktop-valentine");
}
function loadPrevNextHome(categoryId) {
  let currentIndex = 0;
  let totalItems = $(".home-dynamic-product-" + categoryId).length;
  let showProductSize = 4;
  if (categoryId === "recently-view-product-desktop" || categoryId === "recently-view-product-desktop-valentine") {
    showProductSize = 6;
  }
  $(".prev-btn-click-recently-view").on("click", function () {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
      $(".next-btn-click-recently-view").show();
      $(".next-btn-click-recently-view").removeClass("hide");
    }
    if (currentIndex === 0) {
      $(".prev-btn-click-recently-view").hide();
    } else {
      $(".prev-btn-click-recently-view").show();
    }
  });


  $(".next-btn-click-recently-view").on("click", function () {
    if (currentIndex < totalItems - showProductSize) {
      currentIndex += 1;
      updateCarousel();
      $(".prev-btn-click-recently-view").show();
      $(".prev-btn-click-recently-view").removeClass("hide");
    }
    if (currentIndex >= totalItems - showProductSize - 1) {
      $(".next-btn-click-recently-view").hide();
    } else {
      $(".next-btn-click-recently-view").show();
    }
  });

  $(".next-btn-click-" + categoryId).on("click", function () {
    if (currentIndex < totalItems - showProductSize) {
      currentIndex += 1;
      updateCarousel();
      if(categoryId===112 || categoryId==="recently-view-product-desktop-valentine" ){
      $('#previousBtnImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right-pink.png");// Pink
      $('#nextButtonImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right.png");// Pink
      }else{
      $(".prev-btn-click-" + categoryId).show();
      $(".prev-btn-click-" + categoryId).removeClass("hide");
    }
    }
    if(categoryId===112 || categoryId==="recently-view-product-desktop-valentine" ){
    if (currentIndex >= totalItems - showProductSize) {
          $('#nextButtonImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-left-grey.png");// gray
        } else {
          $('#nextButtonImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right.png");// Pink
        }
    }else{
    if (currentIndex >= totalItems - showProductSize) {
          $(".next-btn-click-" + categoryId).hide();
        } else {
          $(".next-btn-click-" + categoryId).show();
        }
    }

  });

  $(".prev-btn-click-" + categoryId).on("click", function () {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
     if(categoryId===112 || categoryId==="recently-view-product-desktop-valentine" ){
      $('#previousBtnImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right-pink.png");// Pink
       $('#nextButtonImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right.png");// Pink
     }else{
     $(".prev-btn-click-" + categoryId).show();
     $(".prev-btn-click-" + categoryId).removeClass("hide");
     $(".next-btn-click-" + categoryId).show();
     }

    }
 if(categoryId===112 || categoryId==="recently-view-product-desktop-valentine" ){

     if (currentIndex === 0) {
           $('#previousBtnImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-left.png");// gray
         } else {
            $('#previousBtnImage').attr("src", "https://assets.winni.in/groot/2025/01/13/desktop/arrow-square-right-pink.png");// Pink
         }
     }else{
    if (currentIndex === 0) {
      $(".prev-btn-click-" + categoryId).hide();
    } else {
      $(".prev-btn-click-" + categoryId).show();
      $(".prev-btn-click-" + categoryId).removeClass("hide");
    }
    }
  });

  function updateCarousel() {
    let itemWidth = $(".home-dynamic-product-" + categoryId).outerWidth(true);
    let translateValue = -currentIndex * itemWidth + "px";
    $(".carousel-wrapper-" + categoryId).css(
      "transform",
      "translateX(" + translateValue + ")"
    );
  }
}

window.addEventListener('load', function() {
  if($("#mobileDeviceBanner").length>0){
    const bannerContainer = document.getElementById('mobileDeviceBanner');
     if (bannerContainer) {
            bannerContainer.addEventListener('touchend', handleTouchEnd);
        }
    }
});

function handleTouchEnd(event) {
    checkMobileDevice();
}

function checkMobileDevice() {
    let userAgent = navigator.userAgent || window.opera;
    if (/android/i.test(userAgent)) {
        window.location.href= webApp.getAndroidPlayStoreUrl;
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
         window.location.href = webApp.getIOSPlayStoreUrl;
    } else {
        console.log('Unsupported device or platform');
    }
}
