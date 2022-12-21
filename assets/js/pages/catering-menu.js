$(function () {
  "use strict";

  // Show Terms & Conditions Modal on Window Load
  $("#termsModalToggler").click();

  const acceptTermsCheckbox = $("#acceptTerms");
  const termsContinueElement = $("#termsContinue");
  acceptTermsCheckbox.on("change", function(e) {
    if (e.target.checked) {
      termsContinueElement.removeClass("disabled");
    } else {
      termsContinueElement.addClass("disabled");
    }
  });

  $(".secondary_nav a").on("click", function (e) {
    e.preventDefault();

    $(this).parents(".secondary_nav").find("a").removeClass("active");
    $(this).addClass("active");

    $(".page-section").removeClass("active");
    $($(this).attr("href")).addClass("active");
  });

  // Sticky Sidebar
  $("#sidebar_fixed").theiaStickySidebar({
    minWidth: 992,
    updateSidebarHeight: false,
    additionalMarginTop: 100,
  });

  // Secondary scroll
  // const $sticky_nav = $(".secondary_nav");
  // $sticky_nav.find("a").on("click", function (e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   var target = this.hash;
  //   var $target = $(target);
  //   $(this)
  //     .addClass("active")
  //     .parent("li")
  //     .siblings()
  //     .find("a")
  //     .removeClass("active");
  //   $("html, body").animate(
  //     {
  //       scrollTop: $target.offset().top - $(".sticky-header").height() + 1,
  //     },
  //     100,
  //     "linear"
  //   );
  // });
  // $(window).on("scroll", function () {
  //   $('[data-scrollSpy="block"]').each(function () {
  //     if (
  //       $(window).scrollTop() >
  //       $(this).offset().top - $(".sticky-header").height()
  //     ) {
  //       let sectionID = $(this).attr("id");
  //       $(`a[href="#${sectionID}"]`)
  //         .addClass("active")
  //         .parent("li")
  //         .siblings()
  //         .find("a")
  //         .removeClass("active");
  //     }
  //   });
  // });
});
