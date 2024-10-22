import { openModalCreate } from "./modal.js";
import { prepareApp } from "./start.js";
import { filtration } from "./filter.js";


prepareApp();

// Обробник для Create Button
const createBtn = document.getElementById("createBtn");
createBtn.addEventListener("click", openModalCreate);

// Обробник зміни селекту категорій
const categorySelect = document.getElementById("filter-category");
// categorySelect.addEventListener('change', categoryFilter)
categorySelect.addEventListener("change", () => filtration());

// Обробник зміни input для пошуку
const serachInput = document.getElementById("filter-search");
// serachInput.addEventListener("input", searchFilter);
serachInput.addEventListener("input", () => filtration());

// Обробник зміни селекту для сортування
const sortSelect = document.getElementById("filter-sort");
// sortSelect.addEventListener("change", sortFilter);
sortSelect.addEventListener("change", () => filtration());