const menuAdministrar=document.getElementById("menuAdmin");
menuAdministrar.addEventListener("click",()=>{
    cargarAdministrarProductos();
    addEventosAdministrar();
})

function cargarAdministrarProductos(cardInsertar){
    const divProductos=document.getElementById("productos");
    divProductos.innerHTML=`
    <div id="cardInsertar" class="card col-sm-12 col-md-6 col-lg-3 m-2 d-flex align-items-center pt-5" style="width: 18.1rem;">
    <img src="https://cdn-icons-png.flaticon.com/512/189/189689.png" 
      class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title m-0 fw-bold text-center">Insertar Producto</h5>


    </div>
  </div>
    `;
    if(cardInsertar){
        console.log("Se presiono la card de insertar");
        cardInsertar.innerHTML=`
        <div class="card-body tex">
            <h5 class="card-title m-0 fw-bold mb-3 text-center">Inserte los datos del Producto</h5>
            <label for="inputUrl">URL Imagen - Link</label>
            <input class="w-100 mb-2" type="text" id="inputUrl" placeholder="URL Imagen">
            <label for="inputNombreProducto" >Nombre de Producto</label>
            <input class="w-100  mb-2" type="text" id="inputNombreProducto" placeholder="Nombre de Producto">
            <label for="inputDescripcion">Descripción Producto</label>
            <input class="w-100  mb-2" type="text" id="inputDescripcion"  placeholder="Descripción Producto">
            <label for="inputPrecio">Precio</label>
            <input class="w-100" type="number" value=0 id="inputPrecio">
            <label for="inputStock">Stock</label>
            <input class="w-100 mb-3" type="number" value=0 id="inputStock">            
            <div id="buttonsAddCar" class="d-flex justify-content-between">
              <button type="button" class="btn btn-success fw-bold" id="btnGuardaProducto">Guardar</button>
              <button type="button" class="btn btn-danger fw-bold" id="btnCancelarInsertar">Cancelar</button>
            </div>
          </div>
          `;
        const btnCancelarInsertar=document.getElementById("btnCancelarInsertar");
        btnCancelarInsertar.addEventListener("click",()=>{  
            console.log("se presiono el cancelar")         
            cargarAdministrarProductos();
           
        })
        const btnGuardaProducto=document.getElementById("btnGuardaProducto");
        btnGuardaProducto.addEventListener("click",()=>{ 
            console.log("se preseiono el insertar")          
            cargarAdministrarProductos();
           
        })
    }
    listaProductos.forEach((producto)=>{
         divProductos.innerHTML+=`
       <div class="card col-sm-12 col-md-6 col-lg-3 m-2 " style="width: 18.1rem;">
          <img src=${producto.imagen}
            class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title m-0 fw-bold">${producto.nombre}</h5>
            <p class="card-text m-0">${producto.descripcion}</p>
            <p class="card-text m-0">S/ ${producto.precio}</p>
            <p class="card-text m-0">Stock ${producto.stock}</p>
            <p class="card-text m-0">CodProducto #${producto.id}</p>
            <div id="buttonsAddCar" class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-danger" id="btnBorrar${producto.id}"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 30px;height:30px" alt=""></button>
            
              <button type="button" class="btn btn-outline-info" id="btnEditar${producto.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 30px;height:30px" alt=""></button>
            </div>
          </div>
        </div>
         `   
         
    });

}

const addEventosAdministrar=()=>{
    const cardInsertar =document.getElementById("cardInsertar");
    cardInsertar.addEventListener("click",()=>{        
      
        cargarAdministrarProductos(cardInsertar)
        /* console.log("Se presiono la card de insertar");
        cardInsertar.innerHTML=`
        <div class="card-body tex">
            <h5 class="card-title m-0 fw-bold mb-3 text-center">Inserte los datos del Producto</h5>
            <label for="inputUrl">URL Imagen - Link</label>
            <input class="w-100 mb-2" type="text" id="inputUrl" placeholder="URL Imagen">
            <label for="inputNombreProducto" >Nombre de Producto</label>
            <input class="w-100  mb-2" type="text" id="inputNombreProducto" placeholder="Nombre de Producto">
            <label for="inputDescripcion">Descripción Producto</label>
            <input class="w-100  mb-2" type="text" id="inputDescripcion"  placeholder="Descripción Producto">
            <label for="inputPrecio">Precio</label>
            <input class="w-100" type="number" value=0 id="inputPrecio">
            <label for="inputStock">Stock</label>
            <input class="w-100 mb-3" type="number" value=0 id="inputStock">            
            <div id="buttonsAddCar" class="d-flex justify-content-between">
              <button type="button" class="btn btn-success fw-bold" id="btnGuardaProductor">Guardar</button>
              <button type="button" class="btn btn-danger fw-bold" id="btnCancelarInsertar">Cancelar</button>
            </div>
          </div>
          `;
        const btnCancelarInsertar=document.getElementById("btnCancelarInsertar");
        btnCancelarInsertar.addEventListener("click",()=>{           
            cargarAdministrarProductos();
           
        }) */
 

    })
    cardInsertar.addEventListener("mouseenter", () => {
        cardInsertar.setAttribute("style", "width: 18.1rem; background-color: lightblue")
    })
    cardInsertar.addEventListener("mouseleave", () => {
        cardInsertar.setAttribute("style", "width: 18.1rem")
    })
    listaProductos.forEach((producto)=>{
        const btnEliminar=document.getElementById(`btnBorrar${producto.id}`);
        const btnEditar=document.getElementById(`btnEditar${producto.id}`);        
        btnEliminar.addEventListener("click",()=>{
            console.log(`Se presiono eliminar al item ${producto.id}`)
            eliminarProducto(producto.id);

        });
        btnEditar.addEventListener("click",()=>{
            console.log(`Se presiono editar al item ${producto.id}`)
        })

    })
}

const eliminarProducto= (codProducto)=>{
    listaProductos.forEach((producto,index)=>{
        if(producto.id==codProducto) listaProductos.splice(index,1);
    });
    cargarAdministrarProductos();
    addEventosAdministrar();
}