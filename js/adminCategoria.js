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
          <input class="w-100  mb-2" id="inputCategory">
        </div>
        <a href="#" class="btn btn-success fw-bold btn-lg" id="btnCrearCategoria">Crear Categoria</a>
      </div>
    </div>
      `;
  cargarCategorias();
}

const cargarCategorias = async () => {
  const tbodyCategoria = document.getElementById("tbodyCategoria");
  const token = GetToken();
  const response = await GetCategories(token);
  if (response.status === 200) {
    const categorias = response.data.data;
    console.log(categorias)
    tbodyCategoria.innerHTML = "";
    categorias.forEach((categoria) => {
      console.log(categoria)
      if (categoria.status)
        tbodyCategoria.innerHTML += `
            <tr>
              <th class="align-middle" scope="row">${categoria.id}</th>
              <td class="align-middle">${categoria.name}</td>
              <td class="centerCelda"><button type="button" class="btn btn-outline-info" id="btnEditar${categoria.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 25px;height:25px" alt=""></button></td>
              <td class="centerCelda"><button type="button" class="btn btn-outline-danger" id="btnBorrar${categoria.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button> </td>
            </tr>
          `;
    });
    addEventoCategoria(categorias);
  }


}

function addEventoCategoria(categorias) {
  addEventoEliminarCategoria(categorias);
  addEventoEditarCategoria(categorias);
  addEventoCrearCategoria();
}



function addEventoCrearCategoria() {
  const btnCrearCategoria = document.getElementById("btnCrearCategoria");
  const inputCategory = document.getElementById("inputCategory")
  btnCrearCategoria.addEventListener("click", async () => {
    const token = GetToken();
    const category = {
      name: inputCategory.value,
    }
    const response = await PostCategory(category, token);
    if (response.status === 201) {
      alertPersonalizado("Categoria Creada correctamente", true);
      cargarCategorias();
    } else {
      alertPersonalizado("Hubo un error al crear categoria", false);
    }

  });
}

function addEventoEliminarCategoria(categorias) {

  categorias.forEach(setBtnDeleteCategoria);
}

const setBtnDeleteCategoria = (categoria) => {
  const mibtncategoria = document.getElementById(`btnBorrar${categoria.id}`);
  mibtncategoria.addEventListener("click", async () => {
    console.log("boton presionado", categoria.id);
    const token = GetToken();
    const response = await DeleteCategory(categoria.id, token);
    if (response.status === 200) {
      alertPersonalizado("Se elimino la categoria correctamente", true);
      cargarCategorias();
    } else {
      alertPersonalizado("Hubo un error al eliminar la categoria", true);
    }

  });
}

function addEventoEditarCategoria(categorias) {

  categorias.forEach(setBtnEditarCategoria);
}

const setBtnEditarCategoria=(categoria) => {
  const mibtnEditarCategoria = document.getElementById(`btnEditar${categoria.id}`);
  mibtnEditarCategoria.addEventListener("click", () => {
    console.log("boton presionado", categoria.id);
    mibtnEditarCategoria.parentElement.parentElement.innerHTML = `
        <tr>
          <th class="align-middle" scope="row">${categoria.id}</th>
          <td class="align-middle"><input class="w-100  mb-2"  id="inputCategoria${categoria.id}" value=${categoria.name}></td>
          <td class="centerCelda"> <button type="button" class="btn btn-success fw-bold" id="btnGuardaCategoria${categoria.id}">Guardar</button></td>
          <td class="centerCelda"><button type="button" class="btn btn-danger fw-bold" id="btnCancelarEditarCategoria${categoria.id}">Cancelar</button> </td>
        </tr>
    `;
    addEventoCancelarEditarCategoria(categoria)
    addEventoGuardaCategoria(categoria)
  });
}

function addEventoGuardaCategoria(categoria){
  const btnGuardaCategoria = document.getElementById(`btnGuardaCategoria${categoria.id}`);
  const inputCategoria = document.getElementById(`inputCategoria${categoria.id}`);
  btnGuardaCategoria.addEventListener("click", async() => {
    const category = {
      name: inputCategoria.value,
    }
    const token = GetToken();
    const response = await UpdateCategory(categoria.id,category, token);
    if (response.status === 200) {
      alertPersonalizado("Se actualizo la categoria correctamente", true);
      console.log("boton presionado", categoria.id);
      btnGuardaCategoria.parentElement.parentElement.innerHTML = `
        <tr>
          <th class="align-middle" scope="row">${categoria.id}</th>
          <td class="align-middle">${category.name}</td>
          <td class="centerCelda"><button type="button" class="btn btn-outline-info" id="btnEditar${categoria.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 25px;height:25px" alt=""></button></td>
          <td class="centerCelda"><button type="button" class="btn btn-outline-danger" id="btnBorrar${categoria.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button> </td>
        </tr>
      `;
      setBtnDeleteCategoria(categoria)
      setBtnEditarCategoria(categoria)
    } else {
      alertPersonalizado("Hubo un error al actualizar la categoria", false);
    }



    });
}

function addEventoCancelarEditarCategoria(categoria){
  const btnCancelarEditarCategoria = document.getElementById(`btnCancelarEditarCategoria${categoria.id}`);
  btnCancelarEditarCategoria.addEventListener("click", () => {
      console.log("boton presionado", categoria.id);
      btnCancelarEditarCategoria.parentElement.parentElement.innerHTML = `
        <tr>
          <th class="align-middle" scope="row">${categoria.id}</th>
          <td class="align-middle">${categoria.name}</td>
          <td class="centerCelda"><button type="button" class="btn btn-outline-info" id="btnEditar${categoria.id}"><img src="https://cdn-icons-png.flaticon.com/512/104/104668.png" style="width: 25px;height:25px" alt=""></button></td>
          <td class="centerCelda"><button type="button" class="btn btn-outline-danger" id="btnBorrar${categoria.id}" style="width: 50px;height:40px"><img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" style="width: 20px;height:20px" alt=""></button> </td>
        </tr>
      `;
      setBtnDeleteCategoria(categoria)
      setBtnEditarCategoria(categoria)
    });
}
