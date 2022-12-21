$(function () {
  "use strict";

  const Shuffle = window.Shuffle;
  const element = $("#filter-group");

  const shuffleInstance = new Shuffle(element, {
    itemSelector: ".filter-item",
  });

  shuffleInstance.enable(false)

  // Filtering
  $("[data-filter]").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    shuffleInstance.filter($(this).data("filter"));
  });

  // Loyality Progress
  $(".loyality-progress").circleProgress({
    fill: { gradient: ["#f6b318"] },
    emptyFill: "#eee",
  });

  $(".redeem").on("click", function (e) {
    e.preventDefault();

    $(this).parents(".copoun-wrapper").addClass("active");
    $.toast({
      text: "Coupon Choosen successfully!",
      icon: "success",
      showHideTransition: "fade",
      allowToastClose: true,
      hideAfter: 3000,
      stack: 5,
      position: "bottom-left",
    });
  });

  $(".popup-gallery").magnificPopup({
    delegate: "a.popup",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return `
        <a href="${item.src}" download class="btn btn-alt w-fit download-btn">
          <i>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64    c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472    c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z" fill="currentColor" data-original="#000000"/></g></g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z" fill="currentColor" data-original="#000000"/></g></g><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/><g xmlns="http://www.w3.org/2000/svg"/></g></svg>
          </i>
        </a>`;
      },
    },
  });
});
