import { renderTiles, enableEditMode, disableEditMode } from './tileManager.js';
import { applyTheme } from './themeManager.js';

let isEditMode = false;

document.addEventListener("DOMContentLoaded", async () => {
    applyTheme(); // load user preferences
    await renderTiles();

    const toggle = document.getElementById("edit-toggle");
    toggle.addEventListener("click", () => {
        isEditMode = !isEditMode;
        toggle.innerText = isEditMode ? "Done" : "Edit";

        if (isEditMode) {
            enableEditMode();
        } else {
            disableEditMode();
        }
    });
});
