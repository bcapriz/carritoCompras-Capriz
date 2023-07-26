let productsInCart = localStorage.getItem("products-in-cart");
  productsInCart = JSON.parse(productsInCart);


const containerCartEmpty = document.querySelector("#cart-empty");
const containerCartProducts = document.querySelector("#cart-products");
const containerCartActions = document.querySelector("#cart-actions");
const containerCartBought = document.querySelector("#cart-bought");
let btnEliminateProduct = document.querySelectorAll(".cart-product-eliminate");
const buttomCartEliminate = document.querySelector("#cart-actions-clear");
const containerTotal = document.querySelector("#total");
const buttomBuy = document.querySelector("#cart-actions-buy");

function loadCartProducts() {

    if (productsInCart && productsInCart.lenght > 0) {
      
        containerCartEmpty.classList.add("disabled");
        containerCartProducts.classList.remove("disabled");
        containerCartActions.classList.remove("disabled");
        containerCartBought.classList.add("disabled");


        containerCartProducts.innerHTML = "";

        productsInCart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
        <img class="cart-product-img" src="${product.img}" alt="${product.title}">
        <div class="cart-product-title">
            <small>Título</small>
            <h3>${product.title}</h3>
        </div>
        <div class="cart-product-amount">
            <small>Cantidad</small>
            <p>${product.amount}</p>
        </div>
        <div class="cart-product-price">
            <small>Precio</small>
            <p>$${product.price}</p>
        </div>
        <div class="cart-product-subtotal">
            <small>Subtotal</small>
            <p>$${product.price * product.amount}</p>
        </div>
        <button class="cart-product-eliminate" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
    `;

            containerCartProducts.append(div);
        })


    } else {
        containerCartEmpty.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
        containerCartActions.classList.add("disabled");
        containerCartBought.classList.add("disabled");
    }

    resetBtnEliminate();
    loadTotal()
}

loadCartProducts()


function resetBtnEliminate() {
    btnEliminateProduct = document.querySelectorAll(".cart-product-eliminate");
    btnEliminateProduct.forEach(button => {
        button.addEventListener("click", eliminateProduct);
    })
}

function eliminateProduct(e) {
    const idButton = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idButton);
    productsInCart.splice(index, 1)
    loadCartProducts();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

buttomCartEliminate.addEventListener("click", deleteCart);

function deleteCart() {
    productsInCart.lenght = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    loadCartProducts()
}

function loadTotal() {
    const totalCalculate = productsInCart.reduce((acc, product) => acc + (product.price * product.amount), 0);
    containerTotal.innerText = `$${totalCalculate}`;
}

buttomBuy.addEventListener("click", buyCart);

function buyCart() {
    productsInCart.lenght = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

    containerCartEmpty.classList.add("disabled");
    containerCartProducts.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerCartBought.classList.remove("disabled");
}
