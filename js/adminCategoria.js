function cargarMenuCategorias(){
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = `
    <h2 class="mt-3 fw-bold text-center">Categorias</h2>
    <div class="col-sm-12 col-md-12 col-lg-12 m-0 p-0 flex-row " id="boxCategoria">
    <div class="card col-sm-12 col-md-12 col-lg-12 m-2  flex-row " >
      <table class="table">
        <thead class="table-light">
          <tr>
            <th >#</th>
            <th scope="col">Nombre Categoria</th>                
            <th colspan="2" class="align-bottom centerCelda">Opciones</th>
          </tr>
        </thead>
        <tbody>


        </tbody>
      </table>
    </div>       
  </div>   
  <div class="card m-2">
      <div class="card-body text-center d-grid gap-2">
        <div class="d-flex flex-column  align-items-start">
          <h5 class="card-title fw-bold">Nueva Categoria</h5>
          <input class="w-100  mb-2" >
        </div>
        <a href="#" class="btn btn-success fw-bold btn-lg" id="btnCrearCategoria">Crear Categoria</a>
      </div>
    </div>
      `;
      //cargarProductosCarrito();
}

function cargarCategorias(){
  const divProductosCarrito = document.getElementById("boxCarrito");
  console.log(carrito);
  carrito.forEach((producto,index)=>{     

          divProductosCarrito.innerHTML +=`
          <div class="card col-sm-12 col-md-6 col-lg-12 m-2 ps-3 flex-row " >
          <img src= ${producto.image}
            class="card-img-top me-4" alt="..." style="height: 7rem;width: 7rem;">
          <div class="card-body d-flex flex-row align-items-center justify-content-between">
            <div style="width: 25rem;">
              <h5 class="card-title m-0 fw-bold">${producto.name}</h5>
              <p class="card-text m-0">S/ ${producto.price}</p>
            </div>
            <div id="buttonsAddCar">
              <button id="btnDisminuir${producto.id}" type="button" class="btn btn-info" >-</button>
              <span  class="mx-4" id="itemNroCarrito${producto.id}">${producto.cantidad}</span>
              <button id="btnAumentar${producto.id}" type="button" class="btn btn-info" >+</button>
            
            </div>
            <p class="card-text m-0 ">S/ <span id="subtotalCarrito${producto.id}">${producto.price*producto.cantidad}</span></p>
            <div id="buttonsAdmin" class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-danger" id="btnBorrar${producto.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button>          
            </div>
          </div>
          </div> 
          `;     

      
  });
  //addEventoCategoria();
}

function addEventoCategoria(){
    addEventoEliminar();
    addEventoPagarCarrito();
    addEventoMasMenos();
}



function addEventoCrearCategoria(){
  const btnPagar=document.getElementById("btnPagarCarrito");
  btnPagar.addEventListener("click",()=>{
    alertPersonalizado("Pago Realizado correctamente",true);
    carrito.splice(0,carrito.length);
    const badgeCarrito=document.getElementById("badgeCarrito");
    badgeCarrito.innerText=0;
    const textoTotal = document.getElementById("textoTotal");   
    textoTotal.innerText=0;
    //cargarCarritoCompras();
  });
}

function addEventoEliminar(){  
  carrito.forEach((producto,index)=>{  
      const mibtnBorrar = document.getElementById(`btnBorrar${producto.id}`);  
      mibtnBorrar.addEventListener("click", () => {    
          console.log("boton presionado", producto.id); 
          eliminarProductoCarrito(producto.id)
            cargarCarritoCompras();
      });    
  });
}

const eliminarCategoria = (codProducto) => {
  let newCarrito=[];
  let indexProducto=carrito.findIndex(unProducto=>unProducto.id==codProducto)
  carrito.splice(indexProducto,1)
  reCalculoMonto();
}

