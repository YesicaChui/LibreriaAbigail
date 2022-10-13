function cargarCarritoCompras(){
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = `
    <h2 class="mt-3 fw-bold text-center">Mi Carrito de Compras</h2>
    <div class="col-sm-12 col-md-6 col-lg-12 m-0 p-0 flex-row " id="boxCarrito">
         
    </div>
    <div class="d-flex justify-content-end">
      <a href="#" class="btn btn-success fw-bold btn-lg w-25" id="btnActualizarValor">Actualizar Valores</a>
    </div>
    <div class="card m-2">
      <div class="card-body text-center d-grid gap-2">
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold">SubTotal</h5>
          <h5 class="card-text fw-bold" >S/. <span id="subTotalCarrito"></span></h5>
        </div>
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold">IGV</h5>
          <h5 class="card-text fw-bold" >S/. <span id="IGVCarrito"></span></h5>
        </div>
          <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold">Total</h5>
          <h5 class="card-text fw-bold" >S/. <span id="montoTotalCarrito"></span></h5>
        </div>
        <a href="#" class="btn btn-success fw-bold btn-lg" id="btnPagarCarrito">Pagar</a>
      </div>
    </div>
      `;
      leerCarrito()
      cargarProductosCarrito();
}

function cargarProductosCarrito(){
  const divProductosCarrito = document.getElementById("boxCarrito");
  console.log(carrito);
  carrito.forEach((producto,index)=>{     

          divProductosCarrito.innerHTML +=`
          <div class="card col-sm-12 col-md-6 col-lg-12 m-2 ps-3 flex-row " >
          <img src= ${producto.product.image}
            class="card-img-top me-4" alt="..." style="height: 7rem;width: 7rem;">
          <div class="card-body d-flex flex-row align-items-center justify-content-between">
            <div style="width: 25rem;">
              <h5 class="card-title m-0 fw-bold">${producto.product.name}</h5>
              <p class="card-text m-0">S/ ${producto.product.price}</p>
            </div>
            <div id="buttonsAddCar">
              <button id="btnDisminuir${producto.product.id}" type="button" class="btn btn-info" >-</button>
              <span  class="mx-4" id="itemNroCarrito${producto.product.id}">${producto.quantity}</span>
              <button id="btnAumentar${producto.product.id}" type="button" class="btn btn-info" >+</button>
            
            </div>
            <p class="card-text m-0 ">S/ <span id="subtotalCarrito${producto.product.id}">${producto.product.price*producto.quantity}</span></p>
            <div id="buttonsAdmin" class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-danger" id="btnBorrar${producto.product.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button>          
            </div>
          </div>
          </div> 
          `;     

      
  });
 addEventoCarrito();
}

function addEventoCarrito(){
/*     addEventoEliminar();
    addEventoPagarCarrito(); */
    addEventoMasMenos();
    addEventoActualizarValor();
}

const addEventoActualizarValor=()=>{

  const btnActualizarValor=document.getElementById("btnActualizarValor");
  btnActualizarValor.addEventListener("click", async()=>{

    if (isAuth()) {     

      let cambioValor=0;
      console.log(carrito.length);
      for(const producto of carrito){
        const itemNro=document.getElementById(`itemNroCarrito${producto.product.id}`);
        if(Number(itemNro.innerText)!==producto.quantity){
          
          const productCarrito=
          {
              "product_id":producto.product.id,
              "quantity":Number(itemNro.innerText)
          }
          console.log(productCarrito)
          const response = await CreateUpdateCarrito(productCarrito,GetToken());
          if (response.status === 200) {
              cambioValor=1;          
              
          } else {
              cambioValor=2;
          }
          console.log(cambioValor);
        }
      }

      console.log(cambioValor);
      if(cambioValor===0) alertPersonalizado("No se encontraron cambios", true)
      else if(cambioValor===1) {
        alertPersonalizado("Se actualizaron los valores", true)
        cargarCarritoCompras();
      }
      else alertPersonalizado("Hubo un error al actualizar el carrito", false)
   

  }else{
      rejectAuth("Debe Logearse para añadir productos a su carrito");
  }


  });

  }

function addEventoMasMenos(){
  carrito.forEach((producto,index)=>{  
    const miBtnMas = document.getElementById(`btnAumentar${producto.product.id}`);  
    const miBtnMenos = document.getElementById(`btnDisminuir${producto.product.id}`);  
    miBtnMas.addEventListener("click", () => {    
      const itemNro=document.getElementById(`itemNroCarrito${producto.product.id}`);
      itemNro.innerText=Number(itemNro.innerText)+1;
      //producto.cantidad+=1;
/*       reCalculoMonto();
      const subTotal=document.getElementById(`subtotalCarrito${producto.id}`);
      subTotal.innerText=producto.price*producto.cantidad; */

    });    
    miBtnMenos.addEventListener("click", () => {    
      const itemNro=document.getElementById(`itemNroCarrito${producto.product.id}`);
    
      if(Number(itemNro.innerText)-1>=1){
        itemNro.innerText=Number(itemNro.innerText)-1;
/*         producto.cantidad-=1;
        reCalculoMonto();
        const subTotal=document.getElementById(`subtotalCarrito${producto.id}`);
        subTotal.innerText=producto.price*producto.cantidad; */
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
  let indexProducto=carrito.findIndex(unProducto=>unProducto.id==codProducto)
  carrito.splice(indexProducto,1)
  reCalculoMonto();
}

const reCalculoMonto=(data,subtotal,igv,total)=>{
  const badgeCarrito=document.getElementById("badgeCarrito");
  badgeCarrito.innerText=data.reduce((acumulador,elemento)=>acumulador+elemento.quantity,0);
  const textoTotal = document.getElementById("textoTotal");   
  textoTotal.innerText=subtotal;
  const textoSubTotal = document.getElementById("subTotalCarrito");
  const textoIGVTotal = document.getElementById("IGVCarrito");
  const textoMontoTotal = document.getElementById("montoTotalCarrito"); 
  if(textoSubTotal){
    textoSubTotal.innerText=subtotal; 
    textoIGVTotal.innerText=igv;   
    textoMontoTotal.innerText=total;  
  }

}

const leerCarrito=async()=>{
  console.log("leyendo carrito")
  const responseCarrito = await GetCarrito(GetToken());
  if (responseCarrito.status === 200) {
      console.log(responseCarrito.data);
      carrito=responseCarrito.data.data;
      console.log(carrito);
      reCalculoMonto(
         responseCarrito.data.data,
         responseCarrito.data.prices.subtotal,
         responseCarrito.data.prices.igv,
         responseCarrito.data.prices.total
         )
  } else {
      alertPersonalizado("Error leyendo el carrito", false);
  }
}

