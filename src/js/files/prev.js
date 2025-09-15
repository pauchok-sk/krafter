export default function prev() {
  const btn = document.querySelector(".breadcrumbs-prev");

  if (btn) {
    btn.addEventListener("click", () => window.history.back());
  }
}
