$(function () {
  "use strict";

  // Trigger Star Rating
  if ($(".rating_stars").length !== 0) {
    $(".rating_stars").each(function () {
      $(this).rates({
        shape: "black-star",
        imagesFolderLocation: "assets/js/star-rating/",
        defaultRate: +$(this).data("rated"),
      });
    });
  }
});
