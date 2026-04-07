import { getLocalStorage, qs, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
    const toggle = qs("#nav-menu-toggle");
    const menu = qs("#nav-menu");

    const profileLink = qs(".nav-profile");
    const loginLink = qs(".nav-login");
    const logoutLink = qs(".nav-logout");
    const authOnlyLinks = document.querySelectorAll(".nav-auth-only");

    function updateAuthLinks() {
        const user = getLocalStorage("user");

        if (user) {
            profileLink.classList.remove("hidden");
            logoutLink.classList.remove("hidden");
            loginLink.classList.add("hidden");
            authOnlyLinks.forEach(link => link.classList.remove("hidden"));
        } else {
            profileLink.classList.add("hidden");
            logoutLink.classList.add("hidden");
            loginLink.classList.remove("hidden");
            authOnlyLinks.forEach(link => link.classList.add("hidden"));
        }
    }

    // Run on page load
    updateAuthLinks();

    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
        updateAuthLinks();
    });

    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        window.location.href = "/";
    });
});

