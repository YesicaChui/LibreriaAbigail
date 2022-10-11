//let codigoCorrelativo=listaProductos.length;
let flagActualizarInsertarPendiente=false;
let selectCategorias=[];
const menuAdministrar = document.getElementById("menuProductos");
const iniciarAdminProductos = async() => {
  await cargarDataServer();
  cargarAdministrarProductos();
  addEventosAdministrar();
  cargarSelectCategorias();
  flagActualizarInsertarPendiente=false;
}
menuAdministrar.addEventListener("click", iniciarAdminProductos)


const cargarSelectCategorias =async()=>{
  const token = GetToken();
  const response = await GetCategories(token);
  if (response.status === 200) {
    selectCategorias = response.data.data;
    console.log(selectCategorias)
  }
}

function cargarAdministrarProductos(cardInsertar) {
  
  const divProductos = document.getElementById("productos");
  divProductos.innerHTML = `
    <div id="cardInsertar" class="card col-sm-12 col-md-6 col-lg-3 m-2 d-flex align-items-center pt-5" style="width: 18.1rem;">
    <img src="https://cdn-icons-png.flaticon.com/512/189/189689.png" 
      class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title m-0 fw-bold text-center">Insertar Producto</h5>


    </div>
  </div>
    `;
/*   if (cardInsertar) {   
          pintarCardGuardar("cardInsertar")
          } */
  cardInsertar && pintarCardGuardar("cardInsertar")
  console.log("pintado de productos");
/*   listaProductos.forEach((producto) => {
    divProductos.innerHTML += `
       <div class="card col-sm-12 col-md-6 col-lg-3 m-2 " style="width: 18.1rem;" id="cardProducto${producto.id}">
          <img src=${producto.image}
            class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title m-0 fw-bold">${producto.name}</h5>
            <p class="card-text m-0">${producto.description}</p>
            <p class="card-text m-0">S/ ${producto.price}</p>
            <p class="card-text m-0">Stock ${producto.stock}</p>
            <p class="card-text m-0">CodProducto #${producto.id}</p>
            <div id="buttonsAddCar" class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-danger" id="btnBorrar${producto.id}"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 30px;height:30px" alt=""></button>
            
              <button type="button" class="btn btn-outline-info" id="btnEditar${producto.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 30px;height:30px" alt=""></button>
            </div>
          </div>
        </div>
         `

  }); */
  listaProductos.forEach(({image:imagen,name:nombre,description:descripcion,price:precio,stock,id}) => {
    divProductos.innerHTML += `
       <div class="card col-sm-12 col-md-6 col-lg-3 m-2 " style="width: 18.1rem;" id="cardProducto${id}">
          <img src=${imagen}
            class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title m-0 fw-bold">${nombre}</h5>
            <p class="card-text m-0">${descripcion}</p>
            <p class="card-text m-0">S/ ${precio}</p>
            <p class="card-text m-0 noVer">Stock ${stock}</p>
            <p class="card-text m-0">CodProducto #${id}</p>
            <div id="buttonsAddCar" class="d-flex justify-content-between">
              <button type="button" class="btn btn-outline-danger" id="btnBorrar${id}"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 30px;height:30px" alt=""></button>
            
              <button type="button" class="btn btn-outline-info" id="btnEditar${id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 30px;height:30px" alt=""></button>
            </div>
          </div>
        </div>
         `
  });

}

const pintarCardGuardar=(idCard)=>{
  const card = document.getElementById(idCard);
  card.innerHTML = `
      <div class="card-body tex">
          <h5 class="card-title m-0 fw-bold mb-3 text-center" id= "tituloCardInsertar">Inserte los datos del Producto</h5>
          <label for="inputUrl">Imagen del Producto</label>
          <input class="w-100 mb-2" type="file" id="inputUrl" placeholder="URL Imagen">
          <label for="inputNombreProducto" >Nombre de Producto</label>
          <input class="w-100  mb-2" type="text" id="inputNombreProducto" placeholder="Nombre de Producto">
          <label for="inputDescripcion">Descripción Producto</label>
          <input class="w-100  mb-2" type="text" id="inputDescripcion"  placeholder="Descripción Producto">
          <label for="inputPrecio">Precio</label>
          <input class="w-100" type="number" value=0 id="inputPrecio">
          <label for="selectCategoria">Categoria</label>
          <select class="form-select" aria-label="Default select example" id="selectCategoria">
            <option selected>Categoria</option>
            ${selectCategorias.map((selectCategoria)=>`<option value="${selectCategoria.id}">${selectCategoria.name}</option>`)}
          </select>
          <label for="inputStock" class="noVer">Stock</label>
          <input class="w-100 mb-3 noVer" type="number" value=1 id="inputStock">            
          <div id="buttonsAddCar" class="d-flex justify-content-between">
            <button type="button" class="btn btn-success fw-bold" id="btnGuardaProducto">Guardar</button>
            <button type="button" class="btn btn-danger fw-bold" id="btnCancelarInsertar">Cancelar</button>
          </div>
        </div>
        `;
}

const addEventosAdministrar = () => {
  const cardInsertar = document.getElementById("cardInsertar");
  const btnCancelar = document.getElementById("btnCancelarInsertar");
  if (!btnCancelar) {
    cardInsertar.addEventListener("click", () => {
      flagActualizarInsertarPendiente=true;
      cargarAdministrarProductos(cardInsertar);
      addEventosAdministrar();
    })}
    else{
    console.log("botonCancelarInsertar",btnCancelarInsertar);
    btnCancelar.addEventListener("click", () => {
      console.log("se presiono el cancelar")
      cargarAdministrarProductos();
      addEventosAdministrar();
      flagActualizarInsertarPendiente=false;
    })
    const btnGuardaProducto = document.getElementById("btnGuardaProducto");
    console.log("btnGuardaProducto",btnGuardaProducto);
    btnGuardaProducto.addEventListener("click", () => {
      console.log("se preseiono el insertar")
      guardarProducto();  
        
    })
  }

  cardInsertar.addEventListener("mouseenter", () => {
    cardInsertar.setAttribute("style", "width: 18.1rem; background-color: lightblue")
  })
  cardInsertar.addEventListener("mouseleave", () => {
    cardInsertar.setAttribute("style", "width: 18.1rem")
  })
  listaProductos.forEach((producto) => {
    const btnEliminar = document.getElementById(`btnBorrar${producto.id}`);
    const btnEditar = document.getElementById(`btnEditar${producto.id}`);
    btnEliminar.addEventListener("click", () => {
      console.log(`Se presiono eliminar al item ${producto.id}`)
      eliminarProducto(producto.id);

    });
    btnEditar.addEventListener("click", () => {
      console.log(`Se presiono editar al item ${producto.id}`);
      if(!flagActualizarInsertarPendiente)
       { 
        actualizarProducto(producto);
        flagActualizarInsertarPendiente=true;
      }
      else
        alertPersonalizado("Concluya el proceso de actualizar o Insertar un producto para continuar",false)
    })

  })
}

const eliminarProducto = async(codProducto) => {
  const token = GetToken();
  const response = await DeleteProduct(codProducto, token);
  if (response.status === 200) {
    alertPersonalizado("Se elimino el producto correctamente", true);
    iniciarAdminProductos();
  } else {
    alertPersonalizado("Hubo un error al eliminar el producto", false);
  }

}

const actualizarProducto = (producto) => {
  pintarCardGuardar(`cardProducto${producto.id}`);
  const tituloCardInsertar = document.getElementById("tituloCardInsertar");
  tituloCardInsertar.innerText="Actualice los datos del Producto";
  const inputUrl = document.getElementById("inputUrl");
  const inputNombreProducto=document.getElementById("inputNombreProducto");
  const inputDescripcion=document.getElementById("inputDescripcion");
  const inputPrecio=document.getElementById("inputPrecio");
  const inputStock=document.getElementById("inputStock");
  inputUrl.value=producto.image;
  inputNombreProducto.value=producto.name;
  inputDescripcion.value=producto.description;
  inputPrecio.value=producto.price;
  inputStock.value=producto.stock;
  const btnCancelar = document.getElementById("btnCancelarInsertar");
  btnCancelar.addEventListener("click", () => {
    console.log("se presiono el cancelar")
    cargarAdministrarProductos();
    addEventosAdministrar();
    flagActualizarInsertarPendiente=false;
  })
  const btnGuardaProducto = document.getElementById("btnGuardaProducto");
  console.log("btnGuardaProducto",btnGuardaProducto);
  btnGuardaProducto.addEventListener("click", () => {
    console.log("se preseiono el insertar");
    const idProducto=producto.id;
    guardarProducto(idProducto);    
  })
  
/*   cargarAdministrarProductos();
  addEventosAdministrar(); */
}

const guardarProducto = async(idProducto)=>{
  const inputUrl = document.getElementById("inputUrl");
  const inputNombreProducto=document.getElementById("inputNombreProducto").value;
  const inputDescripcion=document.getElementById("inputDescripcion").value;
  const inputPrecio=Number(document.getElementById("inputPrecio").value);
  const selectCategoria=document.getElementById("selectCategoria");
  const selectCategoriaValue = selectCategoria.options[selectCategoria.selectedIndex].value;
  const inputStock=Number(document.getElementById("inputStock").value);
  console.log(selectCategoriaValue);
  console.log(isNaN(selectCategoriaValue))
  if(inputUrl.value===""||inputNombreProducto===""||inputDescripcion===""
  ||inputPrecio<=0||inputStock<=0||isNaN(inputPrecio)||isNaN(inputStock)||isNaN(selectCategoriaValue)){
    alertPersonalizado("Porfavor llene todos los datos y verifique que sean correctos",false);
  }else{    
    if(!idProducto)
    { 
      const token = GetToken();
      const product = {
        image: inputUrl,
        name: inputNombreProducto,
        description: inputDescripcion,
        price: inputPrecio,
        stock: inputStock,
        category_id: selectCategoriaValue,
      }
      const response = await PostProductForm(product, token);
      console.log(response.status);
      console.log(response)
      if (response.status === 201) {
        alertPersonalizado("Producto Creado correctamente", true);  
        iniciarAdminProductos()      
      } else {
        alertPersonalizado("Hubo un error al crear el producto", false);
      }  

    }else{
      listaProductos.forEach((producto, index) => {
        if (producto.id == idProducto){
          producto.image=inputUrl;
          producto.name=inputNombreProducto;
          producto.description=inputDescripcion;
          producto.price=inputPrecio;
          producto.stock=inputStock;
        };
      });
    }
    //guardarProductosStorage();
    /* cargarAdministrarProductos();
    addEventosAdministrar();
    flagActualizarInsertarPendiente=false */
    
  }

}

function guardarProductosStorage(){
  localStorage.setItem("listaProductos", JSON.stringify(listaProductos)) 
}