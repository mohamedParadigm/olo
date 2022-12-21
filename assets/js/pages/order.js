let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function () {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  const stepWizard = $("#wizard");
  // let clicks = 0;

  stepWizard.steps({
    headerTag: "h2",
    bodyTag: "section",
    enableContentCache: false,
    enableFinishButton: true,
    labels: {
      finish: "Place Order",
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
    onFinished: function (event, currentIndex) {
      location.replace("track-order.html");
    },
  });

  // stepWizard.steps({
  //   headerTag: "h2",
  //   bodyTag: "section",
  //   enableContentCache: false,
  //   enableFinishButton: false,
  //   enablePagination: false,
  //   onInit: function (event, currentIndex) {},
  // });

  // $("#placeOrderBtn").on("click", function (e) {
  //   e.preventDefault();
  //   clicks += 1;

  //   if (
  //     stepWizard.steps("getCurrentIndex") + 1 <
  //     stepWizard.steps("getTotalSteps")
  //   ) {
  //     stepWizard.steps("next");
  //   }
  //   if (
  //     stepWizard.steps("getCurrentIndex") + 1 ===
  //     stepWizard.steps("getTotalSteps")
  //   ) {
  //     $(this).text("Place Order");
  //   }
  //   if (clicks === stepWizard.steps("getTotalSteps")) {
  //     location.replace("track-order.html");
  //   }
  // });

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

  // Bootstrap Select Picker
  $(".my-select").selectpicker();
});
