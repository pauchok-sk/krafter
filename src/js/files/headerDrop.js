export default function headerDrop() {
  const drops = document.querySelectorAll(".header__drop");

  if (drops.length) {
    const header = document.querySelector(".header");

    const buttons = document.querySelectorAll("[data-header-drop]");
    const overlay = document.querySelector(".header__drop-overlay");

    // overlays.forEach((overlay) => {
    //   overlay.addEventListener("mouseenter", (e) => {
    //     if (overlay.classList.contains("_active")) {
    //       const currentDrop = overlay.closest("[data-header-drop]").querySelector(".header__drop")
          
    //       // overlay.classList.remove("_active");
    //       // currentDrop.classList.remove("_active")
    //     }
    //   });
    // });

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", handleOpen);
      btn.addEventListener("mouseleave", handleClose);
    });

    window.addEventListener("scroll", () => {
      const currentDrop = document.querySelector(".header__drop._active");
      const currentOverlay = document.querySelector(
        ".header__drop-overlay._active"
      );

      if (currentDrop) {
        updateSizeDrop(currentDrop, currentOverlay);
      }
    });

    function handleOpen(e) {
      const drop = e.target.querySelector(".header__drop");

      overlay.classList.add("_active");
      drop.classList.add("_active");

      updateSizeDrop(drop, overlay);
    }

    function handleClose() {
      const drop = document.querySelector(".header__drop._active");

      overlay.classList.remove("_active");
      drop?.classList.remove("_active");
    }

    function updateSizeDrop(drop, overlay) {
      const headerTopHeight =
        document.querySelector(".header-top").clientHeight;
      const headerHeight = header.clientHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const offsetTop =
        scrollTop <= headerTopHeight
          ? headerTopHeight + headerHeight - scrollTop
          : headerHeight;

      drop.style.top = `${offsetTop}px`;
      drop.style.maxHeight = `calc(100vh - ${offsetTop}px)`;

      overlay.style.top = `${offsetTop}px`;
      overlay.style.bottom = `${-offsetTop}px`;
      overlay.style.height = `100vh`;
    }
  }
}
