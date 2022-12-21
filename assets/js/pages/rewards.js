$(function () {
  "use strict";

  // Loyality Progress
  $(function () {
    $(".loyality-progress").circleProgress({
      fill: { gradient: ["#f6b318"] },
      emptyFill: "#eee",
    });
  });

  // Add To Cart Items
  const takeItButton = $(".reward-section:not(.not-allowed)");
  const allowedCanvas = new bootstrap.Offcanvas("#allowedCanvas");
  const confirmCanvas = new bootstrap.Offcanvas("#confirmBuyCanvas");
  const confirmBuy = $("#redeemNow");

  takeItButton.on("click", function (e) {
    e.preventDefault();

    allowedCanvas.show();

    if ($(this).hasClass("with-toast")) {
      if ($(this).parents(".reward-section").hasClass("active")) {
        $.toast({
          text: "Item removed from cart successfully <a href='cart.html' class='mx-2 border-white fw-bold'>View Cart</a>",
          icon: "error",
          showHideTransition: "fade",
          allowToastClose: true,
          hideAfter: 5000,
          stack: 5,
          position: "bottom-left",
        });
      }
    }
    $(this).parents(".reward-section").toggleClass("active");
  });

  confirmBuy.on("click", function (e) {
    e.preventDefault();
    
    confirmCanvas.hide();

    $.toast({
      text: "Your item was added to your cart successfully!",
      icon: "success",
      showHideTransition: "fade",
      allowToastClose: true,
      hideAfter: 3000,
      stack: 5,
      position: "bottom-left",
    });
  });

  // Filter By Range
  $(".js-range-slider").ionRangeSlider({
    postfix: " P",
    prettify_enabled: false,
    onChange: function (data) {
      const elements = $("[data-points]");
      elements.hide();
      elements.each(function () {
        if (
          $(this).data("points") >= data["from"] &&
          $(this).data("points") <= data["to"]
        ) {
          $(this).show();
        }
      });
    },
  });
});

function flyToCart(item) {
  const cart = $(".shopping-cart:visible"),
    imgtodrag = item.parents(".reward-section").find(".img-wrapper img");

  if (imgtodrag) {
    const imgclone = imgtodrag
      .clone()
      .offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left,
      })
      .css({
        opacity: "0.5",
        position: "absolute",
        height: "150px",
        width: "150px",
        "z-index": "999999999",
      })
      .appendTo($("body"))
      .animate(
        {
          top: cart.offset().top + 10,
          left: cart.offset().left,
          width: 30,
          height: 30,
        },
        1000
      );

    imgclone.animate(
      {
        width: 0,
        height: 0,
      },
      function () {
        $(this).detach();
      }
    );
  }
}
