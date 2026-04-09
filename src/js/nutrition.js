import { qs } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    const select = qs("#topicSelect");
    const content = qs("#topicContent");

    const res = await fetch("/json/nutrition.json");
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
    <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
    <div class="info-section">
        <h4>General Guidelines</h4>
        ${formatGeneral(info.generalGuidelines)}
    </div>
    `;

    if (info.safeFoods) {
        html += `
        <div class="info-section">
            <h4>Safe Foods</h4>
            <ul>
                ${info.safeFoods.map(food => `<li>${food}</li>`).join("")}
            </ul>
        </div>
        `;
    }

    if (info.unsafeFoods) {
        html += `
        <div class="info-section">
            <h4>Unsafe Foods</h4>
            <ul>
                ${info.unsafeFoods.map(food => `<li>${food}</li>`).join("")}</ul>
        </div>
        `;
    }

    if (info.lifeStageNutrition) {
        html += `
        <div class="info-section">
            <h4>Life Stage Nutrition</h4>
            ${formatLifeStages(info.lifeStageNutrition)}
        </div>
        `;
    }

    if (info.notes) {
        html += `<p class="info-notes">${info.notes}</p>`;
    }

    qs("#topicContent").innerHTML = html;
}

function formatGeneral(guidelines) {
    if (!guidelines) return "";

    let html = "<ul>";

    Object.entries(guidelines).forEach(([key, value]) => {
        if (typeof value ==="object") {
            html += `<li><strong>${key}:</strong><ul>`;
            Object.entries(value).forEach(([stage, frequency]) => {
                html += `<li>${stage}: ${frequency}</li>`;
            });
            html += "</ul></li>";
        } else {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
    });

    html += "</ul>";
    return html;
}

function formatLifeStages(stages) {
    if (!stages) return "";

    let html = "<ul>";

    Object.entries(stages).forEach(([stage, info]) => {
        const details = typeof info === "object"
            ? Object.entries(info).map(([k, v]) => `${k}: ${v}`).join(", ")
            : info;
        html += `<li><strong>${stage}:</strong> ${details}</li>`;
    });

    html += "</ul>";
    return html;
}
