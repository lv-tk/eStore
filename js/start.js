import { paginate } from "./pagination.js";

export const prepareApp =   () => {
    // Отримання даних з LocalStorage
    const storedData = localStorage.getItem("products");
    // Перевірка, чи дані існують та чи не є порожніми
    if (storedData && JSON.parse(storedData).length > 0) {
        // Масив не порожній, тобто продукти в LS вже є
        paginate();
    } else {
        // Масив порожній або ключ не існує в LocalStorage
        const container = document.querySelector(".product-container");
        container.insertAdjacentHTML(
            "afterbegin",
            `<button id="prepareBtn"  style="margin-top: 30px;">Start</button>`
        );
        const prepareBtn = document.getElementById("prepareBtn");
        prepareBtn.addEventListener("click",  pushDefaultProductsToLS);
    }
};

async function pushDefaultProductsToLS() {
    const response = await fetch(
        "https://dummyjson.com/products?limit=100&skip=0"
    );
    const data = await response.json();
    const { products } = data;
    localStorage.setItem("products", JSON.stringify(products));
    paginate();
}
