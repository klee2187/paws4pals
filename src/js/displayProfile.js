import { getLocalStorage, qs } from "./utils.mjs";



const user = getLocalStorage("user");

if (!user) {
    window.location.href = "/userForms/login.html";
} else {
    qs("#displayProfileFirstName").textContent = user.firstName || "";
    qs("#displayProfileLastName").textContent = user.lastName || "";
    qs("#displayProfileEmail").textContent = user.email || "";
    qs("#displayProfilePhone").textContent = user.phone || "";
    qs("#displayProfileAddress").textContent = user.address || "";

    if (user.avatar) {
        qs("#displayProfileAvatar").src = user.avatar;
    }
}