
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
        const btnAgregaProductoCarrito = document.getElementById(`btnAgregarProductoCarrito${producto.id}`);
        btnDisminuir.addEventListener("click", () => {
            const itemNro = document.getElementById(`itemNro${producto.id}`);

            if (Number(itemNro.innerText) - 1 >= 1)
                itemNro.innerText = Number(itemNro.innerText) - 1;
        });
        btnAumentar.addEventListener("click", () => {
            const itemNro = document.getElementById(`itemNro${producto.id}`);
            itemNro.innerText = Number(itemNro.innerText) + 1;
        })
        btnAgregaProductoCarrito.addEventListener("click", async () => {
            if (isAuth()) {
                const itemNro = Number(document.getElementById(`itemNro${producto.id}`).innerText);
                const indexProductCarrito = carrito.findIndex((elemento) => {
                    return elemento.product.id === producto.id;
                  });
                const productCarrito=indexProductCarrito>=0?
                {
                    "product_id":producto.id,
                    "quantity":itemNro+carrito[indexProductCarrito].quantity
                }:
                {
                    "product_id":producto.id,
                    "quantity":itemNro
                }
                console.log(productCarrito);
                const response = await CreateUpdateCarrito(productCarrito,GetToken());
                if (response.status === 200) {
                    leerCarrito();
                    alertPersonalizado("Se añadio el producto al carrito", true);
                } else {
                    alertPersonalizado("Error al insertar al carrito", false);
                }
            }else{
                rejectAuth("Debe Logearse para añadir productos a su carrito");
            }
        })

    })
}

const rejectAuth=(msg)=>{
    checkLogin==1?
    alertPersonalizado("Su Sesión ha expirado vuelva a logearse para continuar", false):
    alertPersonalizado(msg, false)
    checkLogin=0;
    cerrarSesion();
    iniciarLogin();
}

function filtrarProductos(inputProducto) {
    //    const filtrados = listaProductos.filter((producto)=>producto.name.toUpperCase().indexOf(inputProducto.toUpperCase())!==-1);
    const filtrados = listaProductos.filter((producto) => producto.name.toUpperCase().includes(inputProducto.toUpperCase()));
    cargarProductos(filtrados);
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
    if (isAuth()) {
        cargarCarritoCompras();
    }else{
        rejectAuth("Debe logearse para añadir productos a su carrito");
    }

});

const menuInicio = document.getElementById("menuInicio");
menuInicio.addEventListener("click", () => {
    cargarProductos(listaProductos);
})




const menuCategorias = document.getElementById("menuCategorias");
menuCategorias.addEventListener("click", () => {
    cargarMenuCategorias();
})



const addEfectos=()=>{
    const menuItems = document.querySelectorAll(".nav-item");

    menuItems.forEach((menuItem) => {
        console.log(menuItem);
        menuItem.addEventListener("mouseenter", () => {
            menuItem.setAttribute("style", "background-color: gray")
        })
        menuItem.addEventListener("mouseleave", () => {
            menuItem.removeAttribute("style")
        })
    
    });
}

addEfectos();

cargarPintar();
const verificarLogin = async () => {
    if (isAuth()) {
        const response2 = await GetUserProfile(GetToken());
        if (response2.status === 200) {
            loginExitoso(response2.data.data.role.id, response2.data.data.username);

        } else {
            alertPersonalizado("Error leyendo el userProfile", false);
        }
    }
}
verificarLogin();

