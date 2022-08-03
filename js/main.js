


//cargando los productos del array de objetos
const cargarProductos= (productos)=>{
    const divProductos=document.getElementById("productos");
    divProductos.innerHTML="";
    productos.forEach((producto)=>{
         divProductos.innerHTML+=`
         <div class="card col-sm-12 col-md-6 col-lg-3 m-2" style="width: 18.1rem;">
         <img src=${producto.imagen} class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title m-0 fw-bold">${producto.nombre}</h5>
           <p class="card-text m-0">${producto.descripcion}</p>
           <p class="card-text m-0">S/ ${producto.precio}</p>
           <p class="card-text m-0">Stock ${producto.stock}</p>
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
const addEventos=(productos)=>{
   
    productos.forEach((producto)=>{
        const btnDisminuir=document.getElementById(`btnDisminuir${producto.id}`);
        const btnAumentar=document.getElementById(`btnAumentar${producto.id}`);
        const btnAgregaProuctoCarrito=document.getElementById(`btnAgregarProductoCarrito${producto.id}`);
        btnDisminuir.addEventListener("click",()=>{
            const itemNro=document.getElementById(`itemNro${producto.id}`);
            if(Number(itemNro.innerText)-1>=1)
                itemNro.innerText=Number(itemNro.innerText)-1;
        });
        btnAumentar.addEventListener("click",()=>{
            const itemNro=document.getElementById(`itemNro${producto.id}`);
            itemNro.innerText=Number(itemNro.innerText)+1;
        })
        btnAgregaProuctoCarrito.addEventListener("click",()=>{
            const badgeCarrito=document.getElementById("badgeCarrito");
            const itemNro=Number(document.getElementById(`itemNro${producto.id}`).innerText);
            const textoTotal = document.getElementById("textoTotal");
            addCarrito(producto,itemNro);
            console.log(carrito);
            textoTotal.innerText=carrito.reduce((acumulador,elemento)=>acumulador+elemento.precio,0);
        })

    })
}

function addCarrito(producto,itemNro){
    for(let i=1;i<=itemNro;i++)
        carrito.push(producto);
    badgeCarrito.innerText=carrito.length;
}

cargarProductos(listaProductos);
let carrito = [];


const btnBuscar=document.getElementById("btnSearch");
btnBuscar.addEventListener("click",()=>{
    const valorInputProducto=document.getElementById("inputBuscar").value;
    filtrarProductos(valorInputProducto);
});
const inputProducto = document.getElementById("inputBuscar");
inputProducto.addEventListener("keydown",()=>{
    filtrarProductos(inputProducto.value);
});

function filtrarProductos(inputProducto){
//    const filtrados = listaProductos.filter((producto)=>producto.nombre.toUpperCase().indexOf(inputProducto.toUpperCase())!==-1);
    const filtrados = listaProductos.filter((producto)=>producto.nombre.toUpperCase().includes(inputProducto.toUpperCase()));
    cargarProductos(filtrados);
}

const btnCarrito=document.getElementById("btnCarrito");
btnCarrito.addEventListener("click",()=>{
    mostrarCarritoAlert();
});

function mostrarCarritoAlert(){
    let textProductos="";
    carrito.forEach((producto,index)=>{
        textProductos+=`${index+1}.${producto.nombre} precio: ${producto.precio}\n`;
    });
    textProductos+="\n EL TOTAL A PAGAR ES: "+carrito.reduce((acumulador,elemento)=>acumulador+elemento.precio,0);
    alert(`Los productos Seleccionados para la compra son:\n\n ${textProductos} ` )
}




const menuItems = document.querySelectorAll(".nav-item");
console.log(menuItems);

console.log("-------------");
menuItems.forEach((menuItem)=>{
    console.log(menuItem);
    menuItem.addEventListener("mouseenter", () => {
        menuItem.setAttribute("style", "background-color: gray")
    })
    menuItem.addEventListener("mouseleave", () => {
        menuItem.removeAttribute("style")
    })
    
});
console.log("-------------");









let codigoCorrelativo=listaProductos.length;
//funcion para añadir productos que al final llama a cargar productos para visualizarla
/*por ejemplo se puede probar insertando el producto Compas con precio 10,
 descripcion para dibujo tecnico, stock 5, 
  y con la url de imagen https://plazavea.vteximg.com.br/arquivos/ids/1256227-1000-1000/14971.jpg*/
const agregarProducto=()=>{
    const nombre=prompt("Ingrese el nombre del producto");
    const descripcion=prompt("Ingrese la descripción del producto");
    const precio=Number(prompt("Ingrese el precio del producto"));
    const stock=Number(prompt("Ingrese la cantidad de productos que ingrearon"));
    const imagen=prompt("Ingrese la url de la imagen del producto (sugerencia buscar en google imagenes la Imagen del producto a ingresar)");
    const productoNuevo= new Producto(codigoCorrelativo+1,nombre,descripcion,precio,stock,imagen);
    codigoCorrelativo++;
    listaProductos.push(productoNuevo);
    cargarProductos();
}

//funcion para eliminar un producto y mostrando la lista de productos posteriormente
const eliminarProducto= ()=>{
    const codProducto=prompt("Ingrese el codigo de producto a eliminar");
    listaProductos.forEach((producto,index)=>{
        if(producto.id==codProducto) listaProductos.splice(index,1);
    });
    cargarProductos();
}


//Funcion que Indica las opciones del sistema de ventas
const cargarMenuGeneral=()=>{
    let opcion = -1;
    while (opcion != 0) {
        opcion = Number(prompt(`Bienvenido a nuestro Sistema de Gestion de Libreria seleccione una opción:
            1.Realizar Compra
            2.Añadir Producto
            3.Eliminar Producto
            0.Salir
            
    Seleccione los productos que desea comprar o escriba 0 para finalizar su compra`));
        if (opcion >= 1 && opcion <= 3) {
            if(opcion==1){
               menuGestionVentas();
               calculoTotal();     
            }else if(opcion==2){
               agregarProducto();     
            }else{
               eliminarProducto(); 
            }
        }
        else if (opcion != 0) {
            alert("Porfavor ingrese una opción valida")
        }
    }
    alert("Gracias por su visita");
}

// mostrando en un menu los productos a seleccionar al carrito de compras
const menuGestionVentas = () => {
    let productoSeleccionado = -1;
    let textProductos="";
    listaProductos.forEach((producto,index)=>{
        textProductos+=`${index+1}.${producto.nombre}\n`;
    });
    while (productoSeleccionado != 0) {

        

        productoSeleccionado = Number(prompt(`Nuestros productos disponibles son:\n
            ${textProductos}
            
    Seleccione  los productos que desea comprar o escriba 0 para finalizar su compra`));
        if (productoSeleccionado >= 1 && productoSeleccionado <= listaProductos.length) {
            carrito.push(listaProductos[productoSeleccionado - 1])
        }
        else if (productoSeleccionado != 0) {
            alert("Porfavor ingrese una opción valida")
        }
    }
}


// Realizando el calculo del total incluyendo el impuesto general a las ventas IGV
const calculoTotal = () => {
    let totalPagar = 0

    carrito.forEach((carItem) => {
        console.log(carItem.nombre, carItem.precio);
        totalPagar += carItem.precio + carItem.getIGV();
    });

    alert(`El total a pagar por los productos seleccionados es ${totalPagar}`);
    carrito = [];
}

// cargarMenuGeneral();
// menuGestionVentas();
// calculoTotal();
