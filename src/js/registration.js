import { qs, setLocalStorage } from "./utils.mjs";

const form = qs("#registration-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = qs("#password").value;
    const confirmPassword = qs("#confirmPassword").value;
    const email = qs("#email").value;
    const confirmEmail = qs("#confirmEmail").value;

    if (email !== confirmEmail) {
        alert("Emails do not match.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    setLocalStorage("user", {
        firstName: qs("#firstName").value,
        lastName: qs("#lastName").value,
        email: email,
        phone: "",
        address: "",
        avatar: ""
    });

    window.location.href = "/userForms/displayProfile.html";
});
