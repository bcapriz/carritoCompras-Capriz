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

    if (productsInCart && productsInCart.length > 0) {


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
        <button class="cart-product-eliminate" id="${product.id}"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg></button>
        <div class="separator"></div>
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
    if (index !== -1) {
        productsInCart.splice(index, 1);
        loadCartProducts();
        localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    }
}

buttomCartEliminate.addEventListener("click", deleteCart);

function deleteCart() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productsInCart.reduce((acc, product) => acc + product.amount, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
            loadCartProducts();
        }
    })
}

function loadTotal() {
    const totalCalculate = productsInCart.reduce((acc, product) => acc + (product.price * product.amount), 0);
    containerTotal.innerText = `$${totalCalculate}`;
}

buttomBuy.addEventListener("click", buyCart);

function buyCart() {
    productsInCart.length = 0;

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    containerCartEmpty.classList.add("disabled");
    containerCartProducts.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerCartBought.classList.remove("disabled");


}

