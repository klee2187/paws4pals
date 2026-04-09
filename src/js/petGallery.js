import { 
    getLocalStorage,
    setLocalStorage,
    qsa
 } from "./utils.mjs";

loadPets();

async function loadPets() {
    try {
        const res = await fetch("/json/pets.json");
        const pets = await res.json();
        console.log(pets);
        renderPets(pets);
    } catch (error) {
        console.error("Error loading pets:", error);
    }
}

function renderPets(pets) {
    const container = document.querySelector("#petGallery");
    container.innerHTML = "";

    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");  

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <div class="pet-card-content">
                <h3>${pet.name}</h3>
                <p>${pet.breed}</p>
                <p>${pet.age} years old</p>

                <button class="favorite-toggle" data-id="${pet.id}">
                    <span class="heart-icon">♡</span>
                </button>

                <button class="btn" onclick="window.location.href='/pets/details.html?id=${pet.id}'">View Details</button>
            </div>
        `;

        container.appendChild(petCard);
    });

    initFavoriteHearts();
}

function initFavoriteHearts() {
    const heartButtons = qsa(".favorite-toggle");

    heartButtons.forEach(btn => {
        const numericId = Number(btn.dataset.id);
        const heartIcon = btn.querySelector(".heart-icon");

        const profile = getLocalStorage("user-profile");
        const favorites = (profile && profile.favorites) || [];
        if (favorites.includes(numericId)) {
            heartIcon.classList.add("filled");
            heartIcon.textContent = "♥";
        } else {
            heartIcon.classList.remove("filled");
            heartIcon.textContent = "♡";
        }
        
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const session = getLocalStorage("logged-in-user");
            if (!session) {
                window.location.href = "/userForms/login.html";
                return;
            }

            const updatedProfile = getLocalStorage("user-profile");
            let updatedFavorites = (updatedProfile && updatedProfile.favorites) || [];

            if (updatedFavorites.includes(numericId)) {
                updatedFavorites = updatedFavorites.filter(id => id !== numericId);
                heartIcon.classList.remove("filled");
                heartIcon.textContent = "♡";
            } else {
                updatedFavorites.push(numericId);
                heartIcon.classList.add("filled");
                heartIcon.textContent = "♥";
            }
            updatedProfile.favorites = updatedFavorites;
            setLocalStorage("user-profile", updatedProfile);
        });
    });
}

export default initFavoriteHearts;
