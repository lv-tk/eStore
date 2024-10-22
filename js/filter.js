import { productsRender } from "./productController.js";
import { paginate } from "./pagination.js";

const categoryFilter = (products, selectedCategory) => {
    return new Promise((resolve) => {
        if (selectedCategory === "all") {
            resolve(products);
        } else {
            const filteredArray = products.filter(
                (product) => product.category == selectedCategory
            );
            resolve(filteredArray);
        }
    });
};

const searchFilter = (products, searchString) => {
    return new Promise((resolve) => {
        const filteredArray = products.filter((product) => {
            // Використовуємо регулярний вираз для ігнорування регістру та пошуку рядка в назві продукту
            const regex = new RegExp(searchString, "i");
            return regex.test(product.title) || regex.test(product.description);
        });
        resolve(filteredArray);
    });
};

const sortFilter = (products, sortOption) => {
    return new Promise((resolve) => {
        let sortedArray;
        switch (sortOption) {
            case "incPr":
                sortedArray = sortProducts(products, "price", 0);
                break;
            case "decPr":
                sortedArray = sortProducts(products, "price", 1);
                break;
            case "nf":
                sortedArray = sortProducts(products, "id", 0);
                break;
            case "of":
                sortedArray = sortProducts(products, "id", 1);
                break;
            case "nosort":
                sortedArray = products;
                break;
            default:
                console.error("Непідтримуваний метод сортування.");
                break;
        }
        resolve(sortedArray);
    });
};


// Фільтрація спрацьювує при кожному стровенні, редагуванні 
// та видаленні продукту.
// Тому фажливо фіксити сторінку на якій знаходимося

export const filtration = async (page = 1) => {
    const productArray = JSON.parse(localStorage.getItem("products"));
    const category = document.getElementById("filter-category").value;
    const searchString = document.getElementById("filter-search").value.trim();
    const sortMethod = document.getElementById("filter-sort").value;

    const filteredByCategory = await categoryFilter(productArray, category);
    const filteredBySearch = await searchFilter(filteredByCategory, searchString);
    const filteredAndSorted = await sortFilter(filteredBySearch, sortMethod);

    productsRender(filteredAndSorted);
    localStorage.setItem("filtered-products", JSON.stringify(filteredAndSorted));

    // Рендермо погінацію для поточної сторінки
    paginate(page);
    //     return filteredAndSorted;
};

function sortProducts(arr, propertyName, sortOrder) {
    if (sortOrder === 0) {
        arr.sort((a, b) => (a[propertyName] < b[propertyName] ? -1 : 1));
    } else if (sortOrder === 1) {
        arr.sort((a, b) => (a[propertyName] > b[propertyName] ? -1 : 1));
    } else {
        console.error(
            "Непідтримуваний порядок сортування. Використовуйте 0 або 1."
        );
    }
    return arr;
}

// Реалізація на колбеках

// import { productsRender } from "./productController.js";

// const categoryFilter = (products, selectedCategory) => {
//     if (selectedCategory === "all") {
//         return products;
//     } else {
//         const filtredArray = products.filter(
//             (product) => product.category == selectedCategory
//         );
//         return filtredArray;
//     }
// };

// const searchFilter = (products, searchString) => {

//     const filtredArray = products.filter((product) => {
//         // Використовуємо регулярний вираз для ігнорування регістру та пошуку рядка в назві продукту
//         const regex = new RegExp(searchString, "i");
//         return regex.test(product.title) || regex.test(product.description);
//     });
//     return filtredArray;
// };

// const sortFilter = (products, sortOption) => {
//     let filtredArray;
//     switch (sortOption) {
//         case "incPr":
//             filtredArray = sortProducts(products, "price", 0);
//             break;
//         case "decPr":
//             filtredArray = sortProducts(products, "price", 1);
//             break;
//         case "nf":
//             filtredArray = sortProducts(products, "id", 0);
//             break;
//         case "of":
//             filtredArray = sortProducts(products, "id", 1);
//             break;
//         case "nosort":
//             filtredArray = products;
//             break;
//     }
//     return filtredArray;
// };

// export const filtration = () => {
//     const productArray = JSON.parse(localStorage.getItem("products"));
//     const category = document.getElementById("filter-category").value;
//     const searchString = document.getElementById("filter-search").value.trim();
//     const sortMethod = document.getElementById("filter-sort").value;

//     const filtredArray = sortFilter(
//         searchFilter(categoryFilter(productArray, category), searchString),
//         sortMethod
//     );
//     productsRender(filtredArray);
// };

// //  функція для сортування масиву об'єктів,
// //  приймає три параметри: масив об'єктів,  назву властивості об'єкта (id, title) ,
// //  та порядок сортування (0 - по зростанню, 1 - по стаданню)
// function sortProducts(arr, propertyName, sortOrder) {
//     if (sortOrder === 0) {
//         // Функція, яка передається в метод sort масиву, повинна приймати два аргументи,
//         // які представляють два елементи масиву, що порівнюються.
//         // Якщо результат виразу  a-b менше 0 (тобто a < b), то a буде розташовано перед b,
//         // що призводить до сортування масиву за зростанням.
//         // Сортування за зростанням
//         arr.sort((a, b) => (a[propertyName] < b[propertyName] ? -1 : 1));
//     } else if (sortOrder === 1) {
//         // Сортування за спаданням
//         arr.sort((a, b) => (a[propertyName] > b[propertyName] ? -1 : 1));
//     } else {
//         console.error(
//             "Непідтримуваний порядок сортування. Використовуйте 0 або 1."
//         );
//     }
//     return arr;
// }
