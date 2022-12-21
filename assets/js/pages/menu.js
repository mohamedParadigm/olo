$(function() {
  "use strict";

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  // Sticky Sidebar
  $("#sidebar_fixed").theiaStickySidebar({
    minWidth: 992,
    updateSidebarHeight: false,
    additionalMarginTop: 120,
  });
})