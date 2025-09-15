export default function filtersSearch() {
  const input = document.querySelector("#filters-search");

  if (input) {
    const btnOpen = document.querySelector("#filters-search-open");
    const wrapper = document.querySelector("#filters-search-wrapper");
    const labels = document
      .querySelector(".modal-filters .bapf_body")
      .querySelectorAll("label");

    btnOpen.addEventListener("click", () => {
      if (wrapper.classList.contains("_open")) {
        wrapper.classList.remove("_open")
        setTimeout(() => (wrapper.style.display = "none"), 300);
      } else {
        wrapper.style.display = "block";
        setTimeout(() => (wrapper.classList.add("_open")), 10);
      }
    });

    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      if (value) {
        labels.forEach((label) => {
          const li = label.closest("li");
          if (label.textContent.toLowerCase().includes(value)) {
            li.style.display = "block";
          } else {
            li.style.display = "none";
          }
        });
      } else {
        labels.forEach((label) => {
          const li = label.closest("li");
          li.style.display = "block";
        });
      }
    });
  }
}
