function cargarMenuCategorias(){
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = `
    <h2 class="mt-3 fw-bold text-center">Categorias</h2>
    <div class="col-sm-12 col-md-6 col-lg-12 m-0 p-0 flex-row " id="boxCarrito">
         
    </div>    
    <div class="card m-2">
      <div class="card-body text-center d-grid gap-2">
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold">Crear Categorias</h5>
          <h5 class="card-text fw-bold" >S/. <span id="montoTotalCarrito">${carrito.reduce((acumulador,elemento)=>acumulador+elemento.price*elemento.cantidad,0)}</span></h5>
        </div>
        <a href="#" class="btn btn-success fw-bold btn-lg" id="btnPagarCarrito">Pagar</a>
      </div>
    </div>
      `;
      cargarProductosCarrito();
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
  addEventoCarrito();
}

function addEventoCarrito(){
    addEventoEliminar();
    addEventoPagarCarrito();
    addEventoMasMenos();
}

function addEventoMasMenos(){
  carrito.forEach((producto,index)=>{  
    const miBtnMas = document.getElementById(`btnAumentar${producto.id}`);  
    const miBtnMenos = document.getElementById(`btnDisminuir${producto.id}`);  
    miBtnMas.addEventListener("click", () => {    
      const itemNro=document.getElementById(`itemNroCarrito${producto.id}`);
      itemNro.innerText=Number(itemNro.innerText)+1;
      producto.cantidad+=1;
      reCalculoMonto();
      const subTotal=document.getElementById(`subtotalCarrito${producto.id}`);
      subTotal.innerText=producto.price*producto.cantidad;

    });    
    miBtnMenos.addEventListener("click", () => {    
      const itemNro=document.getElementById(`itemNroCarrito${producto.id}`);
    
      if(Number(itemNro.innerText)-1>=1){
        itemNro.innerText=Number(itemNro.innerText)-1;
        producto.cantidad-=1;
        reCalculoMonto();
        const subTotal=document.getElementById(`subtotalCarrito${producto.id}`);
        subTotal.innerText=producto.price*producto.cantidad;
      }

  });   

});
}

function addEventoPagarCarrito(){
  const btnPagar=document.getElementById("btnPagarCarrito");
  btnPagar.addEventListener("click",()=>{
    alertPersonalizado("Pago Realizado correctamente",true);
    carrito.splice(0,carrito.length);
    const badgeCarrito=document.getElementById("badgeCarrito");
    badgeCarrito.innerText=0;
    const textoTotal = document.getElementById("textoTotal");   
    textoTotal.innerText=0;
    cargarCarritoCompras();
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

const eliminarProductoCarrito = (codProducto) => {
  let newCarrito=[];
  let indexProducto=carrito.findIndex(unProducto=>unProducto.id==codProducto)
  carrito.splice(indexProducto,1)
  reCalculoMonto();
}

const reCalculoMonto=()=>{
  const badgeCarrito=document.getElementById("badgeCarrito");
  badgeCarrito.innerText=carrito.reduce((acumulador,elemento)=>acumulador+elemento.cantidad,0);
  const textoTotal = document.getElementById("textoTotal");   
  textoTotal.innerText=carrito.reduce((acumulador,elemento)=>acumulador+elemento.price*elemento.cantidad,0);
  const textoMontoTotal = document.getElementById("montoTotalCarrito");  
  textoMontoTotal.innerText=carrito.reduce((acumulador,elemento)=>acumulador+elemento.price*elemento.cantidad,0)
}
