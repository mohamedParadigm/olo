let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function () {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  $("#wizard").steps({
    headerTag: "h2",
    bodyTag: "section",
    enableContentCache: false,
    enableFinishButton: true,
    labels: {
      finish: "Explore Menu",
    },
    onInit: function (event, currentIndex) {
      $(this)
        .find(".actions a")
        .each(function () {
          if ($(this).attr("href") === "#previous") {
            $(this).addClass("btn btn-gray");
          }
          if (
            $(this).attr("href") === "#next" ||
            $(this).attr("href") === "#finish"
          ) {
            $(this).addClass("btn btn-main");
          }
        });
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      if (currentIndex === $("#wizard").steps("getTotalSteps") - 2) {
        $(this).find(".actions a[href='#next']").text("Submit Order");
      } else {
        $(this).find(".actions a[href='#next']").text("Next");
      }
      return true;
    },
    onFinished: function (event, currentIndex) {
      location.replace("catering-menu.html");
    },
  });

  // Add Active Class To Radio with Image
  const radioWithImageParent = $(".radio-with-icon");
  radioWithImageParent.each(function () {
    $(this).find("input[type='radio']").is(":checked") &&
      $(this).addClass("active");

    // Handle Change Event
    $(this)
      .find("input[type='radio']")
      .on("change", function () {
        radioWithImageParent.each(function () {
          $(this).find("input[type='radio']").is(":checked")
            ? $(this).addClass("active")
            : $(this).removeClass("active");
        });
      });
  });
});
