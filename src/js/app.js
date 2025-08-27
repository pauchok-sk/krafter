import "../scss/style.scss";
import burger from "./files/burger.js";
import headerScroll from "./files/headerScroll.js";
import introAdv from "./files/introAdv.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
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

Fancybox.bind("[data-fancybox]", {});
