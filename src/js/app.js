import "../scss/style.scss";
import burger from "./files/burger.js";
import filtersSearch from "./files/filters-search.js";
import headerDrop from "./files/headerDrop.js";
import headerScroll from "./files/headerScroll.js";
import introAdv from "./files/introAdv.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
import modalB from "./files/modalB.js";
import prev from "./files/prev.js";
import search from "./files/search.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";

spoller();
burger();
sliders();
tabs();
mediaAdaptive();
introAdv();
headerScroll();
headerDrop();
prev();
search();
filtersSearch();
modalB();

Fancybox.bind("[data-fancybox]", {});
