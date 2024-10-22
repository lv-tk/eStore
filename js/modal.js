import { saveProduct } from "./productController.js";

const modal = document.getElementById("myModal");

export const openModalCreate = () => {
    modal.style.display = "flex";
    modalTitle.textContent = "Create product";
}

export const openModalEdit = () => {
    modal.style.display = "flex";
    modalTitle.textContent = "Edit product";
};

export const closeModal = () => {
    document.getElementById("productId").removeAttribute('value');
    modal.style.display = "none";
}

export const productForm = document.forms.productForm;

productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveProduct();
});

// Додано обробник події для закриття модального вікна при кліку на область overlay або кнопку з атрибутом data-close
modal.addEventListener("click",  event =>  {
    if (event.target.dataset.close) {
        closeModal();
    }
});





