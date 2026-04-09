import { 
    qs, 
    setLocalStorage 
} from "./utils.mjs";

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

    setLocalStorage("user-profile", {
        firstName: qs("#firstName").value,
        lastName: qs("#lastName").value,
        email: email,
        phone: "",
        address: "",
        avatar: "",
        favorites: []
    });

    setLocalStorage("logged-in-user", { email });

    window.location.href = "/userForms/displayProfile.html";
});
