import { 
    getLocalStorage, 
    qs 
} from "./utils.mjs";

const session = getLocalStorage("logged-in-user");

if (!session) {
    window.location.href = "/userForms/login.html";
} else {
    const profile = getLocalStorage("user-profile");

    if (!profile) {
        window.location.href = "/userForms/login.html";
    } else {
        qs("#displayProfileFirstName").textContent = profile.firstName || "";
        qs("#displayProfileLastName").textContent = profile.lastName || "";
        qs("#displayProfileEmail").textContent = profile.email || "";
        qs("#displayProfilePhone").textContent = profile.phone || "";
        qs("#displayProfileAddress").textContent = profile.address || "";

        if (profile.avatar) {
            qs("#displayProfileAvatar").src = profile.avatar;
        }
    }
}