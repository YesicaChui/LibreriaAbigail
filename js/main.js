
/* let almacenados = JSON.parse(localStorage.getItem("listaProductos"));
console.log(almacenados,"probando");
if(almacenados){
    listaProductos=almacenados;    
} */
//Aplicando operador OR
const cargarProductos = (productos) => {
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = "";
    productos.forEach((producto) => {
        divProductos.innerHTML += `
         <div class="card col-sm-12 col-md-6 col-lg-3 m-2" style="width: 18.1rem;">
         <img src=${producto.image} class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title m-0 fw-bold">${producto.name}</h5>
           <p class="card-text m-0">${producto.description}</p>
           <p class="card-text m-0">S/ ${producto.price}</p>
           <p class="card-text m-0 noVer">Stock ${producto.stock}</p>
           <p class="card-text m-0">CodProducto #${producto.id}</p>
           <div id="buttonsAddCar">
             <button id="btnDisminuir${producto.id}" type="button" class="btn btn-primary" >-</button>
             <span  class="mx-4" id="itemNro${producto.id}">1</span>
             <button id="btnAumentar${producto.id}" type="button" class="btn btn-primary" >+</button>
             <button id="btnAgregarProductoCarrito${producto.id}" type="button" class="btn btn-primary" >Agregar</button>
           </div>
         </div>
       </div>
         `

    });
    addEventos(productos);
}


//cargando los productos del array de objetos

const addEventos = (productos) => {

    productos.forEach((producto) => {
        const btnDisminuir = document.getElementById(`btnDisminuir${producto.id}`);
        const btnAumentar = document.getElementById(`btnAumentar${producto.id}`);
        const btnAgregaProuctoCarrito = document.getElementById(`btnAgregarProductoCarrito${producto.id}`);
        btnDisminuir.addEventListener("click", () => {
            const itemNro = document.getElementById(`itemNro${producto.id}`);

            if (Number(itemNro.innerText) - 1 >= 1)
                itemNro.innerText = Number(itemNro.innerText) - 1;
        });
        btnAumentar.addEventListener("click", () => {
            const itemNro = document.getElementById(`itemNro${producto.id}`);
            itemNro.innerText = Number(itemNro.innerText) + 1;
        })
        btnAgregaProuctoCarrito.addEventListener("click", () => {

            const itemNro = Number(document.getElementById(`itemNro${producto.id}`).innerText);
            const textoTotal = document.getElementById("textoTotal");
            addCarrito(producto, itemNro);
            console.log(carrito);
            textoTotal.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.price * elemento.cantidad, 0);
        })

    })
}

function addCarrito(producto, itemNro) {
    const badgeCarrito = document.getElementById("badgeCarrito");
    let indexProducto = carrito.findIndex(unProducto => unProducto.id == producto.id)
    if (indexProducto > -1) {
        carrito[indexProducto].cantidad = (carrito[indexProducto].cantidad | 0) + itemNro;
    }
    else {
        producto.cantidad = itemNro;
        carrito.push(producto);
    }
    /*     for(let i=1;i<=itemNro;i++)
            carrito.push(producto); */
    // badgeCarrito.innerText=carrito.length;
    badgeCarrito.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);
}

/* function addCarrito(...argumentos){
    const badgeCarrito=document.getElementById("badgeCarrito");
    for(let i=1;i<=argumentos[1];i++)
        carrito.push(argumentos[0]);
    badgeCarrito.innerText=carrito.length;
} */
function filtrarProductos(inputProducto) {
    //    const filtrados = listaProductos.filter((producto)=>producto.name.toUpperCase().indexOf(inputProducto.toUpperCase())!==-1);
    const filtrados = listaProductos.filter((producto) => producto.name.toUpperCase().includes(inputProducto.toUpperCase()));
    cargarProductos(filtrados);
}

function mostrarCarritoAlert() {
    let textProductos = "";
    carrito.forEach((producto, index) => {
        textProductos += `${index + 1}.${producto.name} precio: ${producto.price}\n`;
    });
    textProductos += "\n EL TOTAL A PAGAR ES: " + carrito.reduce((acumulador, elemento) => acumulador + elemento.price, 0);
    alert(`Los productos Seleccionados para la compra son:\n\n ${textProductos} `)
}

let carrito = [];


const btnBuscar = document.getElementById("btnSearch");
btnBuscar.addEventListener("click", () => {
    const valorInputProducto = document.getElementById("inputBuscar").value;
    filtrarProductos(valorInputProducto);
});
const inputProducto = document.getElementById("inputBuscar");
inputProducto.addEventListener("keydown", () => {
    filtrarProductos(inputProducto.value);
});



const btnCarrito = document.getElementById("btnCarrito");
btnCarrito.addEventListener("click", () => {
    // mostrarCarritoAlert();
    cargarCarritoCompras();
});




const menuInicio = document.getElementById("menuInicio");
menuInicio.addEventListener("click", () => {
    cargarProductos(listaProductos);
})


const menuItems = document.querySelectorAll(".nav-item");
console.log(menuItems);

console.log("-------------");
menuItems.forEach((menuItem) => {
    console.log(menuItem);
    menuItem.addEventListener("mouseenter", () => {
        menuItem.setAttribute("style", "background-color: gray")
    })
    menuItem.addEventListener("mouseleave", () => {
        menuItem.removeAttribute("style")
    })

});