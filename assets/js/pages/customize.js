$(function () {
  "use strict";

  const pageDirection = $("html").attr("dir") || "ltr";

  // Secondary scroll
  const sticky_nav = $("#scrollSpyNav");
  const containerPadding = sticky_nav.parents(".container").length
    ? parseInt(sticky_nav.parents(".container").css("padding-left"))
    : 0;
  sticky_nav.find("a.nav-link").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $(this)
      .addClass("active")
      .parent("li")
      .siblings()
      .find("a")
      .removeClass("active");
    $("html, body").animate(
      {
        scrollTop: $target.offset().top - $(".sticky-header").height() - 24 + 1,
      },
      100,
      "linear"
    );
  });
  $(window).on("scroll", function () {
    // Toggle Class Active on Scroll To section
    $('[data-scrollSpy="block-section"]').each(function () {
      if (
        $(window).scrollTop() >
        $(this).offset().top - $(".sticky-header").height() - 24
      ) {
        let sectionID = $(this).attr("id");
        $(`a[href="#${sectionID}"]`)
          .addClass("active")
          .parent("li")
          .siblings()
          .find("a")
          .removeClass("active");
      }
    });

    // Make Active Link in Front of User
    let activeLink = sticky_nav.find(".nav-link.active");

    if (activeLink.length) {
      let activeLinkOffsetEnd;

      if (pageDirection === "ltr") {
        activeLinkOffsetEnd =
          activeLink.offset().left -
          containerPadding +
          activeLink.outerWidth(true) +
          sticky_nav.scrollLeft();
      } else {
        activeLinkOffsetEnd =
          sticky_nav.width() -
          activeLink.offset().left +
          containerPadding -
          sticky_nav.scrollLeft();
      }

      if (activeLink.hasClass("first")) {
        if (!activeLink.hasClass("front")) {
          sticky_nav.find(".nav-link").removeClass("front");
          activeLink.addClass("front");
          sticky_nav.scrollLeft(0);
        }
      }

      if (activeLinkOffsetEnd > sticky_nav.width()) {
        if (!activeLink.hasClass("front")) {
          sticky_nav.find(".nav-link").removeClass("front");
          activeLink.addClass("front");
          sticky_nav.scrollLeft(
            pageDirection === "ltr"
              ? activeLinkOffsetEnd - sticky_nav.width()
              : -1 * (activeLinkOffsetEnd - sticky_nav.width())
          );
        }
      }
    }

    // if (pageDirection === "ltr") {
    //   if (activeLink.length) {
    //     let activeLinkOffsetEnd =
    //       activeLink.offset().left -
    //       containerPadding +
    //       activeLink.outerWidth(true) +
    //       sticky_nav.scrollLeft();

    //     if (activeLink.hasClass("first")) {
    //       if (!activeLink.hasClass("front")) {
    //         sticky_nav.find(".nav-link").removeClass("front");
    //         activeLink.addClass("front");
    //         sticky_nav.scrollLeft(0);
    //       }
    //     }

    //     if (activeLinkOffsetEnd > sticky_nav.width()) {
    //       if (!activeLink.hasClass("front")) {
    //         sticky_nav.find(".nav-link").removeClass("front");
    //         activeLink.addClass("front");
    //         sticky_nav.scrollLeft(activeLinkOffsetEnd - sticky_nav.width());
    //       }
    //     }
    //   }
    // } else {
    //   if (activeLink.length) {
    //     let activeLinkOffsetEnd =
    //       sticky_nav.width() -
    //       activeLink.offset().left +
    //       containerPadding -
    //       sticky_nav.scrollLeft();

    //     if (activeLink.hasClass("first")) {
    //       if (!activeLink.hasClass("front")) {
    //         sticky_nav.find(".nav-link").removeClass("front");
    //         activeLink.addClass("front");
    //         sticky_nav.scrollLeft(0);
    //       }
    //     }

    //     if (activeLinkOffsetEnd > sticky_nav.width()) {
    //       if (!activeLink.hasClass("front")) {
    //         sticky_nav.find(".nav-link").removeClass("front");
    //         activeLink.addClass("front");
    //         sticky_nav.scrollLeft(
    //           -1 * (activeLinkOffsetEnd - sticky_nav.width())
    //         );
    //       }
    //     }
    //   }
    // }
  });

  // Close other accordion on small screen
  if ($(window).width() < 1200) {
    const accordionItems = $("#scrollSection_1 .accordion-item:not(.first");
    accordionItems.each(function () {
      $(this).find(".accordion-button").addClass("collapsed");
      $(this).find(".accordion-collapse").removeClass("show");
    });
  }

  // Sticky Sidebar
  $("#sidebar_fixed").theiaStickySidebar({
    minWidth: 992,
    updateSidebarHeight: false,
    additionalMarginTop: 120,
  });
});
