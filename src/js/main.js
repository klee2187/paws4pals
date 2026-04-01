import { loadHeaderFooter } from "./utils.mjs";

function qs(selector) {
    return document.querySelector(selector);
}

loadHeaderFooter().then(() => {
    const toggle = qs("#menu-toggle");
    const menu = qs("#menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
});

