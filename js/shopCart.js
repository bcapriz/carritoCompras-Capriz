let productsInCart = localStorage.getItem("productsInCart");
productsInCart = JSON.parse(productsInCart);

const containerCartEmpty = document.querySelector("#cart-empty");
const containerCartProducts = document.querySelector("#cart-products");
const containerCartActions = document.querySelector("#cart-actions");
const containerCartBought = document.querySelector("#cart-bought");
let buttomEliminate = document.querySelectorAll(".cart-product-eliminate");
const buttomCartEliminate = document.querySelector("#cart-actions-empty");
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
            div.classList.add("cart-products");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${product.img}" alt="${product.title}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${product.amount}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${product.price}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.price * product.amount}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            containerCartProducts.append(div);
        })

        resetButtomEliminate();
        resetTotal();

    } else {
        containerCartEmpty.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

loadCartProducts();

function resetButtomEliminate() {
    buttomEliminate = document.querySelectorAll(".cart-product-eliminate");

    buttomEliminate.forEach(boton => {
        boton.addEventListener("click", eliminateCart);
    });
}

function E(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}


function resetTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}