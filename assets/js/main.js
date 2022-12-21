let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function () {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";
  document.querySelector("html").lang = selectedLang === "en" ? "en" : "ar";
  // Language Change Step 3
  $(".change-lang").each(function () {
    selectedLang === "en" ? $(this).text("العربية") : $(this).text("EN");
    $(this).on("click", function (e) {
      e.preventDefault();
      if (selectedLang === "en") {
        sessionStorage.setItem("lang", "ar");
        location.reload();
      } else {
        sessionStorage.setItem("lang", "en");
        location.reload();
      }
    });
  });

  // Sticky Header
  const header = $(".sticky-header");
  const pageHeader = $(".sticky-header .page-header");

  if (header.length !== 0) {
    $(window).on("scroll", function () {
      // if ($("body").height() > $(this).height() * 2) {
      if ($(this).scrollTop() > header.outerHeight()) {
        if (!header.hasClass("sticky")) {
          header.addClass("sticky");
          pageHeader.length !== 0 &&
            pageHeader.css({
              height: 0,
              overflow: "hidden",
            });
          // pageHeader.length !== 0 &&
          //   pageHeader.css("margin-top", `-=${pageHeader.outerHeight(true)}`);
        }
      } else {
        if (header.hasClass("sticky")) {
          header.removeClass("sticky");
          pageHeader.length !== 0 &&
            pageHeader.css({
              height: "auto",
              overflow: "initial",
            });
          // pageHeader.length !== 0 &&
          //   pageHeader.css("margin-top", 0);
        }
      }
      // }
    });
  }

  // Add Active Class To Radio with Image
  // const radioWithImageParent = $(".radio-with-icon");
  // radioWithImageParent.each(function () {
  //   $(this).find("input[type='radio']").is(":checked") &&
  //     $(this).addClass("active");

  // Handle Change Event
  //   $(this)
  //     .find("input[type='radio']")
  //     .on("change", function () {
  //       radioWithImageParent.each(function () {
  //         $(this).find("input[type='radio']").is(":checked")
  //           ? $(this).addClass("active")
  //           : $(this).removeClass("active");
  //       });
  //     });
  // });

  // Lazy load
  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  // Back To Top Button
  const scrollToTopButton = $("#toTop");
  const hoverMobileApp = $("#hoverMobileApp");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(this).height()) {
      if (!scrollToTopButton.hasClass("show")) {
        scrollToTopButton.addClass("show");
        hoverMobileApp.length !== 0 && hoverMobileApp.addClass("show");
      }
    } else {
      if (scrollToTopButton.hasClass("show")) {
        scrollToTopButton.removeClass("show");
        hoverMobileApp.length !== 0 && hoverMobileApp.removeClass("show");
      }
    }
  });
  scrollToTopButton.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  // Add To Favourites & Wishlist
  const addToFavButtons = $(".add-to-fav"),
    addToWishlistButtons = $(".add-to-widhlist");

  const addToList = (el, btnType) => {
    if (el.hasClass("with-toast")) {
      if (el.hasClass("active")) {
        $.toast({
          text: `${btnType === "fav" ? "Order" : "Item"} removed from ${
            btnType === "fav" ? "favourite order" : "favourite meals"
          } successfully. <a href="profile.html#myOrdersWrapper">View ${
            btnType === "fav" ? "Favourite Orders" : "Favourite Meals"
          }</a>`,
          icon: "error",
          showHideTransition: "fade",
          allowToastClose: true,
          hideAfter: 5000,
          stack: 5,
          position: "bottom-left",
        });
      } else {
        $.toast({
          text: `${btnType === "fav" ? "Order" : "Item"} added to ${
            btnType === "fav" ? "favourite order" : "favourite meals"
          } successfully. <a href="profile.html#myOrdersWrapper">View ${
            btnType === "fav" ? "Favourite Orders" : "Favourite Meals"
          }</a>`,
          icon: "success",
          showHideTransition: "fade",
          allowToastClose: true,
          hideAfter: 5000,
          stack: 5,
          position: "bottom-left",
        });

        if (el.hasClass("rename-modal")) {
          $("#renameOrderModalTrigger").click();
        }
      }
    }
    // if (!el.hasClass("active") && el.hasClass("rename-modal")) {
    //   $("#renameOrderModalTrigger").click();
    // }
    el.toggleClass("active");
  };

  if (addToFavButtons.length) {
    addToFavButtons.on("click", function (e) {
      addToList($(this), "fav");
    });
  }

  if (addToWishlistButtons.length) {
    addToWishlistButtons.on("click", function (e) {
      addToList($(this), "wish");
    });
  }

  // Bootstrap Select Picker
  $(".my-select").selectpicker();
});
