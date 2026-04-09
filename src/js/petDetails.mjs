import { qs, getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";

async function loadPetDetails() {
    const container = qs("#petDetails");

    const petId = Number(getParam("id"));

    if (!petId) {
        container.innerHTML = "<p>Pet not found.</p>";
        return;
    }

    const res = await fetch("/json/pets.json");
    const pets = await res.json();

    const pet = pets.find(p => p.id === petId);

    if (!pet) {
        container.innerHTML = "<p>Pet not found.</p>";
        return;
    }

    renderPetDetails(pet);
    setupFavoriteButton(petId);
}

function renderPetDetails(pet) {
    const container = qs("#petDetails");
    container.innerHTML = `
        <div class="pet-details-wrapper">
            <img src="${pet.image}" alt="${pet.name}" class="pet-details-image">
            <div class="pet-details-content">
                <h2>${pet.name}</h2>
                <p>${pet.age} yr. old ${pet.gender} ${pet.breed}</p>
                <p><strong>Adoption Fee:</strong> $${pet.adoptionFee}</p>
                <p><strong>Size:</strong> ${pet.size}</p>
                <p><strong>Personality:</strong> ${pet.personality.join(", ")}</p>
                <p><strong>History:</strong> ${pet.history}</p>
                <p><strong>Good with Kids:</strong> ${pet.goodWithKids ? "Yes" : "No"}</p>
                <p><strong>Good with Other Pets:</strong> ${pet.goodWithOtherPets ? "Yes" : "No"}</p>
                <p><strong>Location:</strong> ${pet.location}</p>
                <p><strong>Vaccinated:</strong> ${pet.medical.vaccinated ? "Yes" : "No"}</p>
                <p><strong>Neutered:</strong> ${pet.medical.neutered ? "Yes" : "No"}</p>

                <button id="favoriteBtn" class="favorite-toggle">
                    <span class="heart-icon">♡</span>
                </button>
            </div>
        </div>
    `;
}

function setupFavoriteButton(petId) {
    const favoriteBtn = qs("#favoriteBtn");
    const heartIcon = favoriteBtn.querySelector(".heart-icon");

    const session = getLocalStorage("logged-in-user");
    const profile = getLocalStorage("user-profile");

    if (!session || !profile) {
        favoriteBtn.addEventListener("click", () => {
            window.location.href = "/userForms/login.html";
        });
        return;
    }

    const favorites = profile.favorites || [];
    if (favorites.includes(petId)) {
        heartIcon.textContent = "♥";
        heartIcon.classList.add("filled");
    }

    favoriteBtn.addEventListener("click", () => {
        const updatedProfile = getLocalStorage("user-profile");
        let updatedFavorites = updatedProfile.favorites || [];

        if (updatedFavorites.includes(petId)) {
            updatedFavorites = updatedFavorites.filter(id => id !== petId);
            heartIcon.textContent = "♡";
            heartIcon.classList.remove("filled");
        } else {
            updatedFavorites.push(petId);
            heartIcon.textContent = "♥";
            heartIcon.classList.add("filled");
        }

        updatedProfile.favorites = updatedFavorites;
        setLocalStorage("user-profile", updatedProfile);
    });
}

loadPetDetails();

