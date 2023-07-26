let products = [];
fetch("../js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })



const containerProducts = document.querySelector("#container-products")
const btnMains = document.querySelectorAll(".btn-main");
const titleProductMajor = document.querySelector (".title-product-major");
let btnAddProduct = document.querySelectorAll("btnAddProduct");
const btnshopcart = document.querySelector ("#btnshopcart")



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
       <button class="btnAddProduct btn btn-primary" id=${product.id}>COMPRAR</button> 
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
            const productsButtom = products.filter(product => product.ctg.id === e.currentTarget.id);
            loadProducts(productsButtom);
        } else {
           titleProductMajor.innerText = "Todos los productos";
            loadProducts(products);
        }

   })
 });


 function resetBtnAdd () {
     btnAddProduct = document.querySelectorAll(".btnAddProduct");
     btnAddProduct.forEach(button => {
        button.addEventListener("click", addToCart);
     })
}

let productsInCart = [];
let productsInCartLS = localStorage.getItem("products-in-cart");


if (productsInCartLS){
    productsInCart = JSON.parse(productsInCartLS);
    resetBtnShopCart();
} else {
    productsInCart = [];
}


function addToCart (e) {
    const idButton = e.currentTarget.id;
    const productAdd = products.find(product => product.id === idButton);

    if(productsInCart.some( product => product.id === idButton)){
      const index = productsInCart.findIndex(product => product.id === idButton);
      productsInCart[index].amount++
    } else {
        productAdd.amount = 1;
    productsInCart.push(productAdd);
    }

    resetBtnShopCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart))
}
 
function resetBtnShopCart () {
    let newBtnCart = productsInCart.reduce((acc, product) => acc + product.amount, 0);
    console.log (newBtnCart)
    btnshopcart.innerText = newBtnCart;

}
