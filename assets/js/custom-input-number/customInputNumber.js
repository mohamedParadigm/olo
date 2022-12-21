(function ($) {
  $(".add-to-cart").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).parents(".options").hasClass("fly-to-cart") && flyToCart($(this));
    $(this)
      .parents(".options")
      .toggleClass("show")
      .find(".numberstyle")
      .val("1");
    $(this)
      .parents(".options")
      .find(".qty-btn.qty-rem")
      .removeClass("disabled");

    if ($(this).parents(".options").hasClass("show-toast")) {
      $.toast({
        text: "Item added to cart successfully! <a href='cart.html' class='mx-2 border-white fw-bold'>View Cart</a>",
        icon: "success",
        showHideTransition: "fade",
        allowToastClose: true,
        hideAfter: 5000,
        stack: 5,
        position: "bottom-left",
      });
    }
  });
  $.fn.numberstyle = function (options) {
    /*
     * Default settings
     */
    var settings = $.extend(
      {
        value: 0,
        step: undefined,
        min: undefined,
        max: undefined,
      },
      options
    );

    /*
     * Init every element
     */
    return this.each(function (i) {
      /*
       * Base options
       */
      var input = $(this);

      /*
       * Add new DOM
       */
      var container = document.createElement("div"),
        btnAdd = document.createElement("div"),
        btnRem = document.createElement("div"),
        min = settings.min ? settings.min : input.attr("min"),
        max = settings.max ? settings.max : input.attr("max"),
        value = settings.value ? settings.value : parseFloat(input.val());
      container.className = "numberstyle-qty";
      btnAdd.className =
        max && value >= max ? "qty-btn qty-add disabled" : "qty-btn qty-add";
      btnAdd.innerHTML = "+";
      btnRem.className =
        min && value <= min ? "qty-btn qty-rem disabled" : "qty-btn qty-rem";
      btnRem.innerHTML = `${
        value === 1
          ? '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-can" class="svg-inline--fa fa-trash-can " role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg>'
          : "-"
      }`;
      input.wrap(container);
      input.closest(".numberstyle-qty").prepend(btnRem).append(btnAdd);
      /*
       * Attach events
       */
      // use .off() to prevent triggering twice
      $(document)
        .off("click", ".qty-btn")
        .on("click", ".qty-btn", function (e) {
          e.preventDefault();
          var input = $(this).siblings("input"),
            sibBtn = $(this).siblings(".qty-btn"),
            step = settings.step
              ? parseFloat(settings.step)
              : parseFloat(input.attr("step")),
            min = settings.min
              ? settings.min
              : input.attr("min")
              ? input.attr("min")
              : undefined,
            max = settings.max
              ? settings.max
              : input.attr("max")
              ? input.attr("max")
              : undefined,
            oldValue = parseFloat(input.val()),
            newVal;

          //Add value
          if ($(this).hasClass("qty-add")) {
            (newVal = oldValue >= max ? oldValue : oldValue + step),
              (newVal = newVal > max ? max : newVal);

            input.val(newVal);

            if (newVal > 1) {
              input
                .closest(".numberstyle-qty")
                .find(".qty-btn.qty-rem")
                .html("-");
            }

            // Show Repeat Order Modal
            if (input.parents(".options").hasClass("show-repeat-modal")) {
              $("#repeatOrderTrigger").click();
            }

            if (newVal == max) {
              $(this).addClass("disabled");
            }
            sibBtn.removeClass("disabled");

            //Remove value
          } else {
            (newVal = oldValue <= min ? oldValue : oldValue - step),
              (newVal = newVal < min ? min : newVal);

            input.val(newVal);

            if (newVal == 1) {
              input
                .closest(".numberstyle-qty")
                .find(".qty-btn.qty-rem")
                .html(
                  `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-can" class="svg-inline--fa fa-trash-can " role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path></svg>`
                );
            }

            if (newVal == min) {
              $(this).addClass("disabled");
              $(this).parents(".options").removeClass("show");
              $("#confirmTrigger").click();

              if ($(this).parents(".options").hasClass("show-toast")) {
                $.toast({
                  text: "Item removed from cart successfully! <a href='cart.html' class='mx-2 border-white fw-bold'>View Cart</a>",
                  icon: "error",
                  showHideTransition: "fade",
                  allowToastClose: true,
                  hideAfter: 5000,
                  stack: 5,
                  position: "bottom-left",
                });
              }

              if ($(this).parents(".options").hasClass("confirm-delete")) {
                $("#confirmDeleteTrigger").click();
              }
            }
            sibBtn.removeClass("disabled");
          }

          //Update value
          input.val(newVal).trigger("change");
        });

      // input.on("change", function () {
      //   const val = parseFloat(input.val()),
      //     min = settings.min
      //       ? settings.min
      //       : input.attr("min")
      //       ? input.attr("min")
      //       : undefined,
      //     max = settings.max
      //       ? settings.max
      //       : input.attr("max")
      //       ? input.attr("max")
      //       : undefined;

      //   if (val > max) {
      //     input.val(max);
      //   }

      //   if (val < min) {
      //     input.val(min);
      //   }
      // });
    });
  };

  /*
   * Init
   */

  $(".numberstyle").numberstyle();
})(jQuery);

function flyToCart(item) {
  const cart = $(".shopping-cart:visible"),
    imgtodrag = item.parents(".meal-item").find(".meal-image img");

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

    // imgclone.detach();
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
