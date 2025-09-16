export default function copy() {
  const buttons = document.querySelectorAll("[data-copy]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.copy;

        navigator.clipboard.writeText(value)

        btn.classList.add("_active");

        setTimeout(() => btn.classList.remove("_active"), 2000);
      });
    });
  }
}
