export function getArchiveTagsToggleScript() {
  return `
    (() => {
      const root = document.getElementById("archive-tags");
      if (!root || root.dataset.bound === "true") return;
      root.dataset.bound = "true";

      const button = root.querySelector('[data-role="toggle-tags"]');
      const hiddenTags = root.querySelectorAll('[data-role="hidden-tag"]');
      if (!button || hiddenTags.length === 0) return;

      let expanded = false;
      button.addEventListener("click", () => {
        expanded = !expanded;
        hiddenTags.forEach((tag) => {
          tag.classList.toggle("hidden", !expanded);
          tag.classList.toggle("inline-flex", expanded);
        });
        button.textContent = expanded
          ? button.dataset.labelClose
          : button.dataset.labelOpen;
      });
    })();
  `;
}
