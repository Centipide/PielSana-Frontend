// const bloquea el cambio de la variable en sí (no podés reasignarla).
// Pero NO bloquea modificar el contenido interno del objeto o array
let products = [];
let cartProducts = [];
const productsContainer = document.querySelector("#productsContainer");
const clearCartBtn = document.querySelector("#clearCartBtn");

// Insertar productos desde un array declarado en el mismo script
/*
function copyProductsList(list){
    return [...list];
}

function insertProducts(){
    const productsList = copyProductsList(products);

    // a traves del objeto document accedemos a nuestro HTML
    const productsContainer = document.querySelector("#productsContainer");

    //console.log(productsContainer); //verificacion
    
    for(let i = 0; i < productsList.length; i++){
        const currentProd = productsList[i];

        const newElem = document.createElement("div");
        newElem.className = "col-12 col-sm-6 col-lg-3";

        //inner -> accede al contenido
        newElem.innerHTML = `
            <div class="card">
                <img src=${currentProd.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${currentProd.name}</h5>
                    <p class="card-text">
                        ${currentProd.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
                    </p>

                    <p><a class="link-opacity-25-hover" href="#." data-description="descripcionEjemplo">Ver descripción</a></p>
                    <div class="descriptionContainer">
                    </div>
                    <button type="button" class="btn btn-dark" data-id="${currentProd.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `

        // inserta un hijo al div que elegimos
        productsContainer.appendChild(newElem);
    }
}
*/

// insertar productos a partir de un json
function insertProducts(productsList){

    // a traves del objeto document accedemos a nuestro HTML
    const productsContainer = document.querySelector("#productsContainer");

    //console.log(productsContainer); //verificacion
    
    for(let i = 0; i < productsList.length; i++){
        const currentProd = productsList[i];

        const newElem = document.createElement("div");
        newElem.className = "col-12 col-sm-6 col-lg-3 d-flex";

        //inner -> accede al contenido
        newElem.innerHTML = `
            <div class="card product--card">
                <img src=${currentProd.img} alt="${currentProd.name}">
                <div class="card-body">
                    <h5 class="card--title">${currentProd.name}</h5>
                    <p class="card-text">
                        ${currentProd.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
                    </p>

                    <p><a class="link-opacity-25-hover" href="#." data-description="descripcionEjemplo">Ver descripción</a></p>
                    <div class="descriptionContainer">
                    </div>
                    <button type="button" class="btn btn-dark" data-id="${currentProd.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `

        // inserta un hijo al div que elegimos
        productsContainer.appendChild(newElem);
    }
}

function loadCartFromStorage(){
    const cartJSON = localStorage.getItem("cartList");
    if (cartJSON){
        return JSON.parse(cartJSON);
    }
    return [];

}

function productInCart(id, list){
    for(const product of list){
        if (product.id === id){
            return true;
        }
    }

    return false;
}

function getProductById(id, list){
    return list[id];
}

function insertProductInCartHTML(product){
    const cartList = document.querySelector("#cartList");
    const liProd = document.createElement("li");

    liProd.className = "list-group-item";
    liProd.textContent = `${product.name} ${product.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}`;
    cartList.appendChild(liProd);
}

function updateCartCounter(){
    const cartCounter = document.querySelector(".cart--counter");
    cartCounter.textContent = cartProducts.length;
}

function saveCartInLocalStorage(list){
    const cartJSON = JSON.stringify(list);
    localStorage.setItem("cartList", cartJSON);
}

function addProductToCart(event){
    if (event.target.tagName !== "BUTTON"){
        return;
    }

    const productId = parseInt(event.target.dataset.id);
    //busca en el carrito si el producto seleccionado ya está en el carrito
    const foundId = productInCart(productId, cartProducts);

    if (foundId === true){ //si el prod esta en el carrito no hace nada
        return;
    }

    const product = getProductById(productId, products);
    cartProducts.push(product);

    insertProductInCartHTML(product);
    updateCartCounter();
    saveCartInLocalStorage(cartProducts);
}

function printDescription(event){
    console.log(event.target.tagName); //muestra la etiqueta sobre la que se realizo el evento(div, a, p)
    console.log(event.target.dataset); //muestra el dataset

    if (event.target.tagName !== "A"){
        return;
    }
        
    const clickedElement = event.target;
    const productDescription = clickedElement.dataset.description;


    //divCard tiene el elemento mas cercano con esa clase
    const divCard = clickedElement.closest(".card");
    //de este div selecciona el div que tenga con la clase descriptionContainer
    const divDescription = divCard.querySelector(".descriptionContainer");

    if(divDescription.children.length == 0){
        //creamos el elemento a insertar (un parrafo)
        const p = document.createElement("p");
        //insertamos la descripción en el p
        p.textContent = productDescription;
    
        //insertamos el parrafo en el div
        divDescription.appendChild(p);
        clickedElement.textContent = "Ocultar descripción";

    } else{
        clickedElement.textContent = "Ver descripción";
        //esta es una forma
        //divDescription.removeChild(divDescription.firstChild);
        //sino, borrar todos los hijos:
        divDescription.innerHTML = "";
    }
}

function clearCartHTML(){
    const cartListHTML = document.querySelector("#cartList");
    cartListHTML.innerHTML = "";
}

function clearCart(event){
    localStorage.removeItem("cartList");
    cartProducts = [];
    updateCartCounter();
    clearCartHTML();
}

//JSDOC
/**
 * Funcion asincrónica para obtener los productos del JSON
 *  @returns {Promise<Array<Object>>}
*/
async function loadProductsFromAPI() {
    try{
        // peticion del archivo JSON a la URL de API o directamente al JSON
        // await hace que pausa la ejecución de la función async (y sigue con el resto) hasta 
        // que una Promise se resuelve, y te devuelve su resultado.
        const response = await fetch("./products.json");

        if(!response.ok){
            throw new Error(`Error al obtener los datos: ${response.status} - ${response.statusText}`);
        }

        const productsArray = await response.json();
        return productsArray;
    }
    catch(error){
        console.error("Fallo grave en la carga:", error);
        //informar al usuario en la interfaz
        const printError = document.querySelector("#productsContainer");
        printError.innerHTML = `<p id="error--msg">❌ Error al cargar el catalogo</p>`;
        return [];
    }
}

async function main() {
    // como loadProductsFromAPI es una función asincrónica, y el main tmb lo es tenemos que agregar await
    products = await loadProductsFromAPI();
    insertProducts(products);

    cartProducts = loadCartFromStorage();
    if (cartProducts.length != 0){
        for (const product of cartProducts){
            insertProductInCartHTML(product);
        }

        updateCartCounter();
    }


    // cuando 'escuche' un click va a ejecutar la funcion del segundo parametro
    productsContainer.addEventListener("click", printDescription);
    productsContainer.addEventListener("click", addProductToCart);

    clearCartBtn.addEventListener("click", clearCart);
}

main();