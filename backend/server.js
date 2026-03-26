import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Create an Express application
const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, "../src")));

app.use(cors());
app.use(express.json());

const API_KEY = process.env.ADOPT_API_KEY;

// Serve the frontend entry page on the root route.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

// Proxy route to fetch pet data from the Adopt API
app.get("/api/pets", async (req, res) => {
    try {
        const response = await fetch(`https://api.adoptapet.com/search/pets?key=${API_KEY}&location=84074`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("API error:", error);
        res.status(500).json({ error: "Failed to fetch pet data" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
});