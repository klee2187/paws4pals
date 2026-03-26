export async function getPets() {
    try {
        const response = await fetch("http://localhost:3000/api/pets");
        return response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching pets:", error);
        return [];
    }
}