export default function introAdv() {
  const buttons = document.querySelectorAll("[data-intro-adv-btn]");
  const windows = document.querySelectorAll("[data-intro-adv]");

  if (buttons.length && window.matchMedia("(max-width: 991px)").matches) {
    const buttonsClose = document.querySelectorAll("[data-intro-adv-close]");

    buttonsClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        const window = btn.closest("[data-intro-adv]");

        handleClose(window);
      });
    });

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.introAdvBtn;
        const window = document.querySelector(`[data-intro-adv="${id}"]`);

        handleOpen(window);
      });
    });
  }

  const wrappers = document.querySelectorAll(".intro-adv-wrapper");

  if (wrappers.length) {
    wrappers.forEach((wrapper) => {
      const buttonsNext = wrapper.querySelectorAll(".intro-adv__nav-btn");

      buttonsNext.forEach((btn) => {
        btn.addEventListener("click", () => {
          const nextWindow = btn.closest(".intro-adv").nextElementSibling;

          console.log(nextWindow)

          handleOpen(nextWindow);
        });
      });
    });
  }

  function handleOpen(window) {
    windows.forEach((w) => w.classList.remove("_open"));

    window.classList.add("_open");
    document.body.classList.add("body-hidden");
    document.querySelector(".header").classList.remove("_scroll");
  }
  function handleClose(window) {
    window.classList.remove("_open");
    document.body.classList.remove("body-hidden");
  }
}
