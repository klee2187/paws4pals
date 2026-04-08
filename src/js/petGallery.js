document.addEventListener("DOMContentLoaded", () => {
    loadPets();
});

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
                <button class="btn" onclick="window.location.href='/petDetails.html?id=${pet.id}'">View Details</button>
                    View Details
                </button>
            </div>
        `;
        
        container.appendChild(petCard);
    });

    const petCards = container.querySelectorAll(".pet-card");
    petCards.forEach(card => {
        card.addEventListener("click", () => {
            const petName = card.querySelector("h3").textContent;
            alert(`You clicked on ${petName}!`);
        });
    });
}

