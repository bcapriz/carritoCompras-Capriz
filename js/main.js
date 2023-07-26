
let products = [];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })

    
const containerProducts = document.querySelector("#container-products")
const btnMains = document.querySelectorAll(".btn-main");
const titleProductMajor = document.querySelector (".title-product-major");
const btnAddProduct = document.querySelectorAll (".btn-add-product")
const btnshopcart = document.querySelector ("btn-shop-cart")



function loadProducts(filterProducts) {

    containerProducts.innerHTML = "";

    filterProducts.forEach(product => {
        
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
       <img class="img-product img-fluid" src="${product.img}" alt="zapatillas-nike-air-jordan-v-retro-sail/racer">=
        <div class="details-product">
       <h2 class="title-product">${product.title}</h2>
       <p class="price-product">${product.price}</p>
       <button class="btn-add-product btn btn-primary" id=${product.id}>COMPRAR</button> 
       </div>
       `;

        containerProducts.append(div)
    })

    resetBtnAdd();
}

loadProducts(products);


btnMains.forEach(buttom => {
    buttom.addEventListener("click", (e) => {

        btnMains.forEach(buttom => buttom.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "allproducts") {
            const productCategory = products.find(product => product.ctg.id === e.currentTarget.id);
            titleProductMajor.innerText = productCategory.ctg.brand;
            const productosBoton = products.filter(product => product.ctg.id === e.currentTarget.id);
            loadProducts(btnMains);
        } else {
           titleProductMajor.innerText = "Todos los productos";
            loadProducts(products);
        }

    })
});

function resetBtnAdd () {
    btnAddProduct = document.querySelectorAll (".btn-add-product");
    btnAddProduct.forEach(buttom => {
        buttom.addEventListener("click", loadCart);
    })
}

const productsInCart = [];

function loadCart (e) {
    const idButtom = e.currentTarget.id;
    const productAdd = products.find(product => product.id === idButtom);

    if(productsInCart.some(product => product.id === idButtom)) {
        const index = productsInCart.findIndex(product => product.id === idButtom);
       productsInCart[index].amount++;
    } else {
       productAdd.amount = 1;
       productsInCart.push(productAdd);
    }

    productsInCart.push (productAdd)
}

function resetBtnShopCart () {
    let btnshopcart = productsInCart.reduce((acc, product) => acc + product.amount, 0);
}