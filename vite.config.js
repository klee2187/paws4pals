import { resolve } from "path";
import { defineConfig } from "vite";
import fs from "fs";

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    closeBundle() {
      fs.cpSync(
        resolve(__dirname, "src/partials"),
        resolve(__dirname, "dist/partials"),
        { recursive: true }
      );
      fs.cpSync(
        resolve(__dirname, "src/images"),
        resolve(__dirname, "dist/images"),
        { recursive: true }
      );
    },
  };
}

export default defineConfig({
  root: "src/",
  plugins: [copyStaticAssets()],
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        contact: resolve(__dirname, "src/contact/contact.html"),
        favorites: resolve(__dirname, "src/favorites/favorites.html"),
        breeds: resolve(__dirname, "src/informational/breeds.html"),
        nutrition: resolve(__dirname, "src/informational/nutrition.html"),
        pets: resolve(__dirname, "src/pets/pets.html"),
        details: resolve(__dirname, "src/pets/details.html"),
        login: resolve(__dirname, "src/userForms/login.html"),
        registration: resolve(__dirname, "src/userForms/registration.html"),
        editProfile: resolve(__dirname, "src/userForms/editProfile.html"),
        displayProfile: resolve(__dirname, "src/userForms/displayProfile.html"),
        application: resolve(__dirname, "src/userForms/application.html"),
      },
    },
  },
});
