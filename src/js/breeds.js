import { qs } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    const select = qs("#topicSelect");
    const content = qs("#topicContent");

    const res = await fetch("/json/breeds.json");
    const data = await res.json();

    Object.keys(data).forEach(key => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        select.appendChild(option);
    });

    displayTopic(Object.keys(data)[0], data);

    select.addEventListener("change", () => {
        displayTopic(select.value, data);
    });
});

function displayTopic(key, data) {
    const info = data[key];

    let html = `
        <h3 class="breed-title">${key.charAt(0).toUpperCase() + key.slice(1)} Breeds</h3>
        <div class="info-section">
    `;

    info.forEach(breed => {
        html += `
            <div class="breed-card">
                <img src="${breed.image}" alt="${breed.breed}" class="breed-image">

                <h4 class="breed-name">${breed.breed}</h4>
                <p><strong>Origin:</strong> ${breed.origin}</p>
                <p><strong>Energy Level:</strong> ${breed.energyLevel}</p>
                <p><strong>Grooming Needs:</strong> ${breed.groomingNeeds}</p>
                <p><strong>Good with Kids:</strong> ${breed.goodWithKids ? "Yes" : "No"}</p>

                <div class="info-section">
                    <h5>Traits:</h5>
                    <ul>
                        ${breed.traits.map(trait => `<li>${trait}</li>`).join("")}
                    </ul>
                </div>

                <div class="info-section">
                    <h5>History:</h5>
                    <p>${breed.history}</p>
                </div>
            </div>
        `;
    });

    html += `</div>`;

    qs("#topicContent").innerHTML = html;
}
