function cargarCarritoCompras(){
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = `
    <h2 class="mt-3 fw-bold text-center">Mi Carrito de Compras</h2>
    <div class="col-sm-12 col-md-6 col-lg-12 m-0 p-0 flex-row " id="boxCarrito">
         
    </div>
    <div class="card m-2">
      <div class="card-body text-center d-grid gap-2">
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold">Total</h5>
          <h5 class="card-text fw-bold" id="montoTotalCarrito">S/. ${carrito.reduce((acumulador,elemento)=>acumulador+elemento.precio,0)}</h5>
        </div>
        <a href="#" class="btn btn-success fw-bold btn-lg" id="btnPagarCarrito">Pagar</a>
      </div>
    </div>
      `;
      cargarProductosCarrito();
}
function cargarProductosCarrito(){
    const divProductosCarrito = document.getElementById("boxCarrito");
    console.log(carrito);
    carrito.forEach((producto,index)=>{
        let checkProducto=document.getElementById(`itemNro${producto.id}`);
        if(!checkProducto){
            divProductosCarrito.innerHTML +=`
            <div class="card col-sm-12 col-md-6 col-lg-12 m-2 ps-3 flex-row " >
            <img src= ${producto.imagen}
              class="card-img-top me-4" alt="..." style="height: 7rem;width: 7rem;">
            <div class="card-body d-flex flex-row align-items-center justify-content-between">
              <div style="width: 25rem;">
                <h5 class="card-title m-0 fw-bold">${producto.nombre}</h5>
                <p class="card-text m-0">S/ ${producto.precio}</p>
              </div>
              <div id="buttonsAddCar">
                <button id="btnDisminuir${producto.id}" type="button" class="btn btn-info" >-</button>
                <span  class="mx-4" id="itemNro${producto.id}">1</span>
                <button id="btnAumentar${producto.id}" type="button" class="btn btn-info" >+</button>
              
              </div>
              <p class="card-text m-0 ">S/ <span id="subtotalCarrito${producto.id}">${producto.precio}</span></p>
              <div id="buttonsAdmin" class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-danger" id="btnBorrar${producto.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button>          
              </div>
            </div>
            </div> 
            `;
        }else{
            let itemNro=document.getElementById(`itemNro${producto.id}`);
            itemNro.innerText=Number(itemNro.innerText)+1;
            let subTotalCarrito=document.getElementById(`subtotalCarrito${producto.id}`);
            subTotalCarrito.innerText=Number(itemNro.innerText)*producto.precio;
        }
        
    });
}
/* `

` */