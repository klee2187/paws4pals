import { 
    qs, 
    getLocalStorage, 
    setLocalStorage, 
} from "./utils.mjs";

const form = qs("#login-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = qs("#email").value;

    let profile = getLocalStorage("user-profile");

    if (!profile) {
        profile = {
            email,
            avatar: "",
            favorites: [],
            firstName: "",
            lastName: "",
            phone: "",
            address: ""
        };
    } else {
        profile.email = email;
    }   

    setLocalStorage("user-profile", profile);
    setLocalStorage("logged-in-user", { email });

    window.location.href = "/userForms/displayProfile.html";
});