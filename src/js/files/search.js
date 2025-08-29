export default function search() {
  const search = document.querySelector("#search");

  if (search) {
    const overlay = document.querySelector("#search-overlay");
    const btn = document.querySelector("#search-btn");
    const headerTopHeight = document.querySelector(".header-top").clientHeight;
    const headerHeight = document.querySelector(".header").clientHeight;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (search.classList.contains("_active")) {
        handleClose();
      } else {
        handleOpen();
      }
    });

    document.body.addEventListener("click", handleClose);
    search.addEventListener("click", (e) => e.stopPropagation());

    function handleOpen() {
      search.classList.add("_active");
      overlay.classList.add("_active");
      btn.classList.add("_active");
      document.body.classList.add("body-hidden");

      updateSize();
    }
    function handleClose() {
      search.classList.remove("_active");
      overlay.classList.remove("_active");
      btn.classList.remove("_active");
      document.body.classList.remove("body-hidden");
    }

    function updateSize() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const offsetTop =
        scrollTop <= headerTopHeight
          ? headerTopHeight + headerHeight - scrollTop
          : headerHeight;

      search.style.top = offsetTop + "px";
      overlay.style.top = offsetTop + "px";
    }
  }
}
