let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function () {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";

  // Trigger Rate Order Modal
  if ($("#rateOrderModal").length !== 0) {
    const rateOrder = new bootstrap.Modal("#rateOrderModal", {
      keyboard: false,
      backdrop: "static",
    });

    rateOrder.show();
  }

  // Trigger Star Rating
  if ($(".rating_stars").length !== 0) {
    $(".rating_stars").each(function () {
      $(this).rates({
        shape: "black-star",
        imagesFolderLocation: "assets//js/star-rating/",
        defaultRate: +$(this).data("rated"),
      });
    });
  }
});
