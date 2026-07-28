/* Mobile menu toggle + click-driven accordion/flyout dropdowns (works alongside the
   CSS :hover behavior used on desktop pointer devices). */

function closeAllDropdowns() {
  document.querySelectorAll(".has-dropdown.open, .has-flyout.open").forEach((el) => {
    el.classList.remove("open");
  });
}

function closeMobileMenu() {
  const header = document.querySelector(".site-header");
  if (header) header.classList.remove("nav-open");
  closeAllDropdowns();
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    if (!header.classList.contains("nav-open")) {
      closeAllDropdowns();
    }
  });
}

function initDropdowns() {
  document.querySelectorAll(".has-dropdown > .nav-toplevel").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains("open");
      parent.parentElement.querySelectorAll(":scope > .has-dropdown.open").forEach((sibling) => {
        if (sibling !== parent) sibling.classList.remove("open");
      });
      parent.classList.toggle("open", !wasOpen);
    });
  });

  document.querySelectorAll(".has-flyout > .dropdown-item").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains("open");
      parent.parentElement.querySelectorAll(":scope > .has-flyout.open").forEach((sibling) => {
        if (sibling !== parent) sibling.classList.remove("open");
      });
      parent.classList.toggle("open", !wasOpen);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-menu")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  document.querySelectorAll(".nav-side a[data-route], .nav-side a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

function initActiveNavLink(path) {
  document.querySelectorAll(".nav-link[data-route]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("data-route") === path);
  });
}
