let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function() {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  // Sticky Sidebar
  $("#sidebar_fixed").theiaStickySidebar({
    minWidth: 992,
    updateSidebarHeight: false,
    additionalMarginTop: 30,
  });
})