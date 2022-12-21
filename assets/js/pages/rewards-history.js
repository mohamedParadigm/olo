$(function () {
  "use strict";

  const Shuffle = window.Shuffle;
  const element = $(".history-items-wrapper");

  const shuffleInstance = new Shuffle(element, {
    itemSelector: ".history-item",
  });

  // Sorting
  shuffleInstance.sort({
    compare: (a, b) => sortByDate(a, b),
  });
  // Filtering
  $("[data-filter]").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    shuffleInstance.filter($(this).data("filter"));
    if ($(window).width() < 922) {
      $(".mobile-filter-trigger").click();
    }
  });

  // $(".sort-options [data-sortType]").on("click", function (e) {
  //   e.preventDefault();
  //   $(this)
  //     .addClass("active")
  //     .siblings("[data-sortType]")
  //     .removeClass("active");
  //   shuffleInstance.sort({
  //     compare: (a, b) => sortByDate(a, b, $(this).attr("data-sortType")),
  //   });
  //   if ($(window).width() < 922) {
  //     $(".mobile-filter-trigger").click();
  //   }
  // });
});

// Sorting Function
function sortByDate(
  a,
  b,
  sortType = "ascend"
  // Default Value depends on HTML button with active class
) {
  const groupA = a.element.dataset.date;
  const groupB = b.element.dataset.date;
  const splitedGroupA = groupA.split("-").map((el) => +el);
  const splitedGroupB = groupB.split("-").map((el) => +el);

  if (splitedGroupA[0] < splitedGroupB[0]) {
    return sortType === "ascend" ? 1 : -1;
  }
  if (splitedGroupA[0] > splitedGroupB[0]) {
    return sortType === "ascend" ? -1 : 1;
  }
  if (splitedGroupA[0] === splitedGroupB[0]) {
    if (splitedGroupA[1] < splitedGroupB[1]) {
      return sortType === "ascend" ? 1 : -1;
    }
    if (splitedGroupA[1] > splitedGroupB[1]) {
      return sortType === "ascend" ? -1 : 1;
    }
    if (splitedGroupA[1] === splitedGroupB[1]) {
      if (splitedGroupA[2] < splitedGroupB[2]) {
        return sortType === "ascend" ? 1 : -1;
      }
      if (splitedGroupA[2] > splitedGroupB[2]) {
        return sortType === "ascend" ? -1 : 1;
      }
    }
  }
}
