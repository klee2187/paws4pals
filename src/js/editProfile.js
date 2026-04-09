import { 
    getLocalStorage, 
    setLocalStorage, 
    qs 
} from "./utils.mjs";

export const avatars = [
    "/images/avatars/default-avatar.png",
    "/images/avatars/2.png",
    "/images/avatars/3.png",
    "/images/avatars/4.png",
    "/images/avatars/5.png",
    "/images/avatars/6.png",
    "/images/avatars/7.png",
    "/images/avatars/8.png",
    "/images/avatars/9.png",
    "/images/avatars/10.png",
    "/images/avatars/11.png",
    "/images/avatars/12.png",
    "/images/avatars/13.png",
    "/images/avatars/14.png",
    "/images/avatars/15.png",
    "/images/avatars/16.png",
    "/images/avatars/17.png",
    "/images/avatars/18.png",
];

const session = getLocalStorage("logged-in-user");

if (!session) {
    window.location.href = "/userForms/login.html";
} else {
    const profile = getLocalStorage("user-profile");

    if (!profile) {
        window.location.href = "/userForms/login.html";
    } else {
    qs("#firstName").value = profile.firstName || "";
    qs("#lastName").value = profile.lastName || "";
    qs("#email").value = profile.email || "";
    qs("#phone").value = profile.phone || "";
    qs("#address").value = profile.address || "";
    qs("#avatar").value = profile.avatar || "";

    renderAvatarGrid(profile.avatar);

    qs("#edit-profile-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedProfile = {
            ...profile,
            firstName: qs("#firstName").value,
            lastName: qs("#lastName").value,
            email: qs("#email").value,
            phone: qs("#phone").value,
            address: qs("#address").value,
            avatar: qs("#avatar").value
        };
        
        setLocalStorage("user-profile", updatedProfile);
        window.location.href = "/userForms/displayProfile.html";
    });
  }
}

function renderAvatarGrid(selectedAvatar) {
    const grid = qs("#editAvatarGrid");
    grid.innerHTML = "";

    avatars.forEach(src => {
        const div = document.createElement("div");
        div.classList.add("edit-avatar-option");
        if (src === selectedAvatar) div.classList.add("selected");

        div.innerHTML = `<img src="${src}" alt="Avatar option">`;

        div.addEventListener("click", () => {
            qs("#avatar").value = src;

            document.querySelectorAll(".edit-avatar-option")
                .forEach(opt => opt.classList.remove("selected"));
            div.classList.add("selected");
        });

        grid.appendChild(div);
    });
}
