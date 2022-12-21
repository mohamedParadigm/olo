let selectedLang = sessionStorage.getItem("lang") || "en"; // Language Change Step 1

$(function() {
  "use strict";

  // Language Change Step 2
  document.querySelector("html").dir = selectedLang === "en" ? "ltr" : "rtl";

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });

  // Bootstrap Select Picker
  $(".my-select").selectpicker();
})