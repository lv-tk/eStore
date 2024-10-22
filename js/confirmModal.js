import { deleteProduct } from "./productController.js";

const confirmationModal = document.getElementById("confirmationModal");
const confirmProductNameElement = document.getElementById("confirmProductName");
const confirmDeleteBtn = document.getElementById("confirmDelete");


// Функція для відкриття модального вікна підтвердження
export const openConfirmationModal = (id) => {
    const products = JSON.parse(localStorage.getItem("products"));
    // Шукаємо в масиві потрібний продукт
    const findIndex = products.findIndex((product) => product.id == id);
    confirmProductNameElement.textContent = products[findIndex].title;
    confirmationModal.style.display = "flex";
    
    // Обробник підтвердження видалення
    confirmDeleteBtn.onclick = () => {
        deleteProduct(id);
        closeConfirmationModal();
        // renderProducts(); // Оновлюємо список після видалення
    };
}

// Функція для закриття модального вікна
const closeConfirmationModal = () => {
    confirmationModal.style.display = 'none';
}

// Закриття модального вікна 
confirmationModal.onclick = (event) => {
    if (event.target.dataset.close) {
        closeConfirmationModal();
    }
};

