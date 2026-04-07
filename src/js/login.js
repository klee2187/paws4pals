import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs";

const form = qs("#login-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = qs("#email").value;

    // Preserve any existing user data (e.g. from registration), update email
    const existing = getLocalStorage("user") || {};
    setLocalStorage("user", { ...existing, email });

    window.location.href = "/userForms/displayProfile.html";
});