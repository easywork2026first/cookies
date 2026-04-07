
document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({behavior: "smooth"});
}

const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"});
    }
}

const buttons = document.querySelectorAll(".products-item .button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        const productName = this.closest(".products-item").querySelector(".products-item-title").innerText;
        const productPrice = parseFloat(this.closest(".products-item").querySelector(".products-item-price").getAttribute("data-base-price"));
        document.getElementById("product").value = productName;
        document.getElementById("product").setAttribute("data-price", productPrice);
        updateOrderSum();

        document.getElementById("order").scrollIntoView({behavior: "smooth"});
    }
}

const prices = document.getElementsByClassName("products-item-price");
let currentCurrencyCoef = 1;
let currentCurrencySymbol = "$";

document.getElementById("change-currency").onclick = function (e) {

    const currentCurrency = e.target.innerText;

    let newCurrency = "$";
    let coefficient = 1;
    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 90;
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }
    e.target.innerText = newCurrency;
    currentCurrencyCoef = coefficient;
    currentCurrencySymbol = newCurrency;

    for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
    
    updateOrderSum();
}

function updateOrderSum() {
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const sumSpan = document.getElementById("order-sum");
    const currencySpan = document.getElementById("sum-currency");
    
    const basePrice = parseFloat(product.getAttribute("data-price")) || 0;
    const qty = parseInt(quantity.value) || 1;
    
    if (basePrice > 0) {
        const totalSum = +(basePrice * qty * currentCurrencyCoef).toFixed(1);
        sumSpan.innerText = totalSum;
        quantity.placeholder = `Количество (1-10) - Сумма: ${totalSum} ${currentCurrencySymbol}`;
    } else {
        sumSpan.innerText = "0";
        quantity.placeholder = "Количество (1-10)";
    }
    currencySpan.innerText = currentCurrencySymbol;
}

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const name = document.getElementById("name");
const phone = document.getElementById("phone");

quantity.addEventListener("input", updateOrderSum);

document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [product, quantity, name, phone].forEach(item => {
        if (!item.value) {
            item.style.borderColor = "red";
            hasError = true;
        } else {
            item.style.borderColor = "";
        }
    });

    if (!hasError) {
        [product, quantity, name, phone].forEach(item => {
            item.value = "";
        });
        quantity.value = "1";
        alert("Спасибо за заказ! Мы скоро свяжемся с Вами!");
    }
}
