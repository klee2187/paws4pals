import { getLocalStorage, qs, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
    const toggle = qs("#menu-toggle");
    const menu = qs("#menu");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");

        const user = getLocalStorage("user");

        const profileLink = qs(".nav-profile");
        const loginLink = qs(".nav-login");
        const logoutLink = qs(".nav-logout");

        if (user) {
            profileLink.classList.remove("hidden");
            logoutLink.classList.remove("hidden");
            loginLink.classList.add("hidden");

            logoutLink.addEventListener("click", () => {
                localStorage.removeItem("user");
                window.location.href = "/";
            });

        } else {

            profileLink.classList.add("hidden");
            logoutLink.classList.add("hidden");
            loginLink.classList.remove("hidden");
        }
    });    
});

