import { closeModal } from "./modal.js";
import { productsPerPage } from "./pagination.js";
import { openModalEdit, productForm } from "./modal.js";
import { filtration } from "./filter.js";
import { openConfirmationModal } from "./confirmModal.js";

// Отримання даних з LocalStorage
const storedData = localStorage.getItem('products');
let products;
// Перевірка, чи дані існують та чи не є порожніми
if (storedData && JSON.parse(storedData).length > 0) {
    // Масив не порожній, ви можете виконати потрібні дії
    products = JSON.parse(storedData);
} else {
   products = [];
}

function generateUniqueId() {
    // Використовуємо поточний час для забезпечення унікальності
    const timestamp = new Date().getTime();
    // Генеруємо випадкове число
    const random = Math.floor(Math.random() * 1000);
    // Комбінуємо час та випадкове число для створення унікального ID
    let uniqueId = "id" + timestamp + random;
    return uniqueId;
}

export  const saveProduct = () => {
    const storedData = localStorage.getItem("products");
    const products = JSON.parse(storedData);
    // Отримати дані з форми
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const discountPercentage =
        document.getElementById("discountPercentage").value;
    const stock = document.getElementById("stock").value;
    // const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    // Створити об'єкт із забраними даними
    const newProductData = {
        title: title,
        description: description,
        discountPercentage: discountPercentage,
        price: price,
        stock: stock,
        // brand: brand,
        category: category,
        thumbnail: thumbnail,
    };

    // Перевіряємо, чи створюється новий продукт, чи редагується існуючий
    const productId = document.getElementById("productId").value;
    
    // Якщо елемент існує (редагування):
    // Фіксимо сторінку
    let currentPage;    
    if (productId) {
        // Забираємо номер поточної сторінки з LS
        currentPage = +localStorage.getItem("page");
        newProductData.id = productId;
        // Шукаємо індекс існуючого елемента
        const findIndex = products.findIndex((item) => item.id == productId);
        // Зберігаємо старі властивості
        const oldProductProperties = products[findIndex];

        // Доповнюємо елемент масиву по індексу новими даними
        products[findIndex] = { ...oldProductProperties, ...newProductData };
    } else {
        // Якщо елемент не існує (створення нового):
        newProductData.id = generateUniqueId();
        products.push(newProductData);
        // Стаємо на останню сторінку
        currentPage = Math.ceil(products.length / productsPerPage);; 
    }
    // Сетимо продукти в LS
    localStorage.setItem("products", JSON.stringify(products));
    // Очищуємо форму
    productForm.reset();
    // Видаляємо скритий атрибут з форми із значенням productId
    document.getElementById("productId").removeAttribute("value");
    // Закриваємо модальне вікно
    closeModal();
    // Відмалюовуємо продукти
    filtration(currentPage);
}

export const editProduct = (id) => {
    // Шукаємо в масиві потрібний продукт
    const product = JSON.parse(localStorage.getItem("products")).filter(item => id == item.id)[0];
    // console.log(product);
    // Вставляємо дані продукту у форму
    // Отримати дані з форми
    document.getElementById("productId").value = product.id;
    document.getElementById("title").value = product.title;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("discountPercentage").value = product.discountPercentage;
    document.getElementById("stock").value = product.stock;
    // document.getElementById("brand").value = product.brand;
    document.getElementById("category").value = product.category;
    document.getElementById("thumbnail").value = product.thumbnail;
    openModalEdit();
}

export const deleteProduct = (id) => {
    let products = JSON.parse(localStorage.getItem("products"));
    // Фільтруємо масив продуктів (вибираємо всі, що не == id)
    products = products.filter((product) => product.id !== id);
    console.log(products);

    // Сетимо новий масив продуктів в LS
    localStorage.setItem("products", JSON.stringify(products));
    // Забираємо номер поточної сторінки з LS
    let currentPage = +localStorage.getItem("page");
    filtration(currentPage);
}

export const productsRender = (products) => {
    // Вибираємо та очищуємо контейнер
    const container = document.getElementsByClassName("product-container")[0];
    container.innerHTML = "";
    // Рендиримо карточки
    products.forEach((product) => {
        let pCard = document.createElement("div");
        pCard.classList.add("product-card");
        pCard.innerHTML = `
            <img src=${product.thumbnail} alt="product image">
            <div class="product-card-title">${product.title}</div>
            <div class="product-card-description">${product.description}</div>
            <div class="product-card-discount"><span>${product.discountPercentage}</span><span>%</span></div>
            <div class="product-card-category">${product.category}</div>
            <div class="product-card-cartbox">
                <div class="product-card-price"><span>${product.price}</span> <span>$</span></div>
                <div class="product-card-manage-buttons">
                    <div id="edit${product.id}" class="fa fa-pencil-square-o" ></div>
                    <div id="delete${product.id}" class="fa fa-trash" ></div>
                </div>
            </div>
            `;
        container.appendChild(pCard);
        //Навішуємо обробники
        document
            .getElementById(`edit${product.id}`).onclick = () =>  editProduct(product.id);
        document
            .getElementById(`delete${product.id}`)
            .onclick = () =>  openConfirmationModal(product.id);
    });
}

