import "../scss/style.scss";
import burger from "./files/burger.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";

spoller();
burger();
sliders();
tabs();

Fancybox.bind("[data-fancybox]", {});
