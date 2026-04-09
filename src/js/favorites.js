import { 
    getLocalStorage, 
    setLocalStorage, 
    qs 
} from "./utils.mjs";

loadFavorites();

async function loadFavorites() {
    const favoriteList = qs("#favoritesList");
    const profile = getLocalStorage("user-profile");
    const favorites = (profile && profile.favorites) || [];

    if (favorites.length === 0) {
        favoriteList.innerHTML = `
            <p>You have not saved any pets to favorites yet.</p>
            <p>Click the heart icon on a pet card to add it to your favorites!</p>
        `;
        return;
    }

    const response = await fetch("/json/pets.json");
    const pets = await response.json();

    const favoritePets = pets.filter(pet => favorites.includes(pet.id));

    if (favoritePets.length === 0) {
        favoriteList.innerHTML = `
            <p>You have not saved any pets to favorites yet.</p>
            <p>Click the heart icon on a pet card to add it to your favorites!</p>
        `;
        return;
    }

    const template = qs("#favoriteCardTemplate");
    favoriteList.innerHTML = "";

    favoritePets.forEach(pet => {
        const card = template.content.cloneNode(true);
        card.querySelector(".favorite-image").src = pet.image;
        card.querySelector(".favorite-image").alt = pet.name;
        card.querySelector(".favorite-name").textContent = pet.name;
        card.querySelector(".favorite-breed").textContent = pet.breed;
        card.querySelector(".details-btn").href = `/pets/details.html?id=${pet.id}`;
        const heartBtn = card.querySelector(".favorite-toggle");
        heartBtn.dataset.id = pet.id;
        heartBtn.addEventListener("click", () => removeFavorite(pet.id));
        favoriteList.appendChild(card);
    });
}

function removeFavorite(id) {
    const profile = getLocalStorage("user-profile");
    if (!profile) return;
    profile.favorites = (profile.favorites || []).filter(favId => favId !== id);
    setLocalStorage("user-profile", profile);
    loadFavorites();
}
