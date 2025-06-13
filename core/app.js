import { renderTiles, enableEditMode, disableEditMode } from './tileManager.js';
import { applyTheme } from './themeManager.js';

let isEditMode = false;

document.addEventListener("DOMContentLoaded", async () => {
    applyTheme(); // load user preferences
    await renderTiles();

    const settings = document.getElementById("settings-img");
    settings.addEventListener("click", () => {
        isEditMode = !isEditMode;
        if (isEditMode) {
            settings.classList.add("edit-mode");
        } else {
            settings.classList.remove("edit-mode");
        }
        settings.src = isEditMode ? "assets/icons/check.svg" : "assets/icons/settings.svg";

        if (isEditMode) {
            enableEditMode();
        } else {
            disableEditMode();
        }
    });
});
