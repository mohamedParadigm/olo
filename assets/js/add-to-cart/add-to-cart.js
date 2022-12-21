$(function () {
  "use strict";

  // Add To Cart
  const addToCartTriggers = $(".triggerAdd");

  if (addToCartTriggers.length !== 0) {
    addToCartTriggers.on("click", function (e) {
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
        .removeClass("disabled")
        .addClass("ready-to-remove");

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
  }

  // Handle Increase Trigger
  const increaseBtn = $(".numberstyle-qty .qty-add");

  if (increaseBtn.length !== 0) {
    increaseBtn.on("click", function (e) {
      e.preventDefault();

      handleIncrease($(this));
    });
  }

  // Handle Decrease Trigger
  const decreaseBtn = $(".numberstyle-qty .qty-rem");

  if (decreaseBtn.length !== 0) {
    decreaseBtn.on("click", function (e) {
      e.preventDefault();

      handleDecrease($(this));
    });
  }
});
// Handle Increase Function
function handleIncrease(el) {
  const input = el.closest(".numberstyle-qty").find(".numberstyle");

  let currentVal = parseInt(input.val());
  currentVal += 1;

  input.val(currentVal);

  if (currentVal > 1) {
    el.closest(".numberstyle-qty")
      .find(".qty-rem")
      .html("-")
      .removeClass("ready-to-remove");
  }

  // Show Repeat Order Modal
  if (input.closest(".options").hasClass("show-repeat-modal")) {
    $("#repeatOrderTrigger").click();
  }
}
// Handle Decrease Function
function handleDecrease(el) {
  const input = el.closest(".numberstyle-qty").find(".numberstyle");

  let currentVal = parseInt(input.val());

  // Handle Delete Trigger
  if (currentVal === 1) {
    if (el.closest(".options").hasClass("confirm-delete")) {
      if ($("#confirmDelete").length !== 0) {
        const confirmDeleteModal = new bootstrap.Modal("#confirmDelete", {
          keyboard: false,
        });

        confirmDeleteModal.show();

        handleRemoveFromCart(el);
      }
    } else {
      handleRemoveFromCart(el);
    }
  }
  // Handle Dcrease Count
  if (currentVal > 1) {
    currentVal -= 1;

    input.val(currentVal);

    el.html("-").removeClass("ready-to-remove");
  }
  // Put Trash Icon
  if (currentVal < 2) {
    el.html(
      `
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="trash-can"
        class="svg-inline--fa fa-trash-can"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 448 512"
      >
        <path
          fill="currentColor"
          d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"
        ></path>
      </svg>
    `
    ).addClass("ready-to-remove");
  }
}
// Handle Remove From Cart
function handleRemoveFromCart(el) {
  el.closest(".options").removeClass("show");
}
// Handle Fly to Cart Function
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
