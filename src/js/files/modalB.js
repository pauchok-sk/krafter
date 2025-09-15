export default function modalB() {
  const buttons = document.querySelectorAll("[data-modal-b-btn]");

  if (buttons.length) {
    const overlay = document.querySelector("#modal-b-overlay");
    const buttonsClose = document.querySelectorAll("[data-modal-b-close]");

    if (buttonsClose.length) {
      buttonsClose.forEach((b) =>
        b.addEventListener("click", () => {
          const id = b.closest("[data-modal-b]").dataset.modalB;
          handleClose(id);
        })
      );
    }

    overlay.addEventListener("click", handleClose);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.modalBBtn;

        handleOpen(id);
      });
    });

    function handleOpen(id) {
      const modal = document.querySelector(`[data-modal-b="${id}"]`);

      document.body.classList.add("body-hidden");
      modal.classList.add("_active");
      overlay.classList.add("_active");
    }

    function handleClose(id) {
      let modal;
      if (typeof id === "string") {
        modal = document.querySelector(`[data-modal-b="${id}"]`);
        console.log(modal)
      } else {
        modal = document.querySelector("[data-modal-b]._active");
      }

      document.body.classList.remove("body-hidden");
      modal.classList.remove("_active");
      overlay.classList.remove("_active");
    }
  }
}
