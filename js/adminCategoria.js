function cargarMenuCategorias() {
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
        <tbody id="tbodyCategoria">


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
  cargarCategorias();
}

cargarCategorias = async () => {
  const tbodyCategoria = document.getElementById("tbodyCategoria");
  const token = GetToken();
  const response = await GetCategories(token);
  if (response.status === 200) {
    const categorias = response.data.data;
    console.log(categorias)
    categorias.forEach((categoria, index) => {
      console.log(categoria)
      tbodyCategoria.innerHTML += `
            <tr>
              <th class="align-middle" scope="row">${categoria.id}</th>
              <td class="align-middle">${categoria.name}</td>
              <td class="centerCelda"><button type="button" class="btn btn-outline-info" id="btnEditar${categoria.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 25px;height:25px" alt=""></button></td>
              <td class="centerCelda"><button type="button" class="btn btn-outline-danger" id="btnBorrar${categoria.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button> </td>
            </tr>
          `;


    });
  }



  //addEventoCategoria();
}

function addEventoCategoria() {
  addEventoEliminar();
  addEventoPagarCarrito();
  addEventoMasMenos();
}



function addEventoCrearCategoria() {
  const btnPagar = document.getElementById("btnPagarCarrito");
  btnPagar.addEventListener("click", () => {
    alertPersonalizado("Pago Realizado correctamente", true);
    carrito.splice(0, carrito.length);
    const badgeCarrito = document.getElementById("badgeCarrito");
    badgeCarrito.innerText = 0;
    const textoTotal = document.getElementById("textoTotal");
    textoTotal.innerText = 0;
    //cargarCarritoCompras();
  });
}

function addEventoEliminar() {
  carrito.forEach((producto, index) => {
    const mibtnBorrar = document.getElementById(`btnBorrar${producto.id}`);
    mibtnBorrar.addEventListener("click", () => {
      console.log("boton presionado", producto.id);
      eliminarProductoCarrito(producto.id)
      cargarCarritoCompras();
    });
  });
}

const eliminarCategoria = (codProducto) => {
  let newCarrito = [];
  let indexProducto = carrito.findIndex(unProducto => unProducto.id == codProducto)
  carrito.splice(indexProducto, 1)
  reCalculoMonto();
}

