let checkLogin = 0;
//verificarLogin();

function verificarLogin() {

  const logeado = localStorage.getItem("Logeado");
  logeado == "true" && loginExitoso();
}

console.log("se cargo archivo login")
const btnSesion = document.getElementById("btnSesion");
console.log(btnSesion);

const cargarRegistrarse=()=>{
  const divProductos = document.getElementById("productos");
  divProductos.innerHTML = `
        <div class="signupFrm">
        <div class="wrapper">
        <form action="" class="form">
          <h2 class="title">Registrarse</h2>

          <div class="inputContainer">
            <input type="text" class="input" placeholder="a" id="inputFirstName">
            <label for="" class="label">Nombre</label>
          </div>

          <div class="inputContainer">
            <input type="text" class="input" placeholder="a" id="inputLastName">
            <label for="" class="label">Apellido</label>
          </div>

          <div class="inputContainer">
            <input type="number" class="input" placeholder="a" id="inputPhone">
            <label for="" class="label">Telefono</label>
          </div>

          <div class="inputContainer">
            <input type="email" class="input" placeholder="a" id="inputEmail">
            <label for="" class="label">Correo</label>
          </div>

          <div class="inputContainer">
            <input type="text" class="input" placeholder="a" id="inputUserNameRegister">
            <label for="" class="label">Username</label>
          </div>

          <div class="inputContainer">
            <input type="password" class="input" placeholder="a" id="inputPasswordRegister">
            <label for="" class="label">Contraseña</label>
          </div>

          <div class="inputContainer">
            <input type="password" class="input" placeholder="a" id="inputConfirmPassword">
            <label for="" class="label">Confirmar contraseña</label>
          </div>

          <input type="button" class="submitBtn" id="inputRegistro" value="Registrarse">
        </form>
        </div>
      </div>
  `;

  const inputRegistro = document.getElementById("inputRegistro");
  const inputName = document.getElementById("inputFirstName")
  const inputLastName = document.getElementById("inputLastName")
  const inputPhone = document.getElementById("inputPhone")
  const inputEmail = document.getElementById("inputEmail")
  const inputUserNameRegister = document.getElementById("inputUserNameRegister")
  const inputPasswordRegister = document.getElementById("inputPasswordRegister")
  const inputConfirmPassword = document.getElementById("inputConfirmPassword")
  inputRegistro.addEventListener("click", async () => {
    const usuario = {
      "name": inputName.value,
      "last_name": inputLastName.value,
      "username": inputUserNameRegister.value,
      "password": inputPasswordRegister.value,
      "telephone": Number(inputPhone.value),
      "email": inputEmail.value
    }
    const response = await PostUsuarios(usuario);
    if (response.status === 201) {
      alertPersonalizado("Usuario creado correctamente", true);
      iniciarLogin();
    } else {
      alertPersonalizado("Hubo un error al crear el usuario", false);
    }

  });
}

const iniciarLogin=() => {
  console.log("se presiono btnsesion");

  checkLogin == 1 && cerrarSesion();
  cargarLogin();
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegistrarse");
  btnLogin.addEventListener("click", async () => {
    const inputUsuario = document.getElementById("inputUsuario").value;
    const inputPassword = document.getElementById("inputPassword").value;
    const userCredentials = {
      username: inputUsuario,
      password: inputPassword,
    }
    //inputUsuario==="Yesica"&&inputPassword==="123456"?logearse():alertPersonalizado("Credenciales incorrectas",false);//alert("Credenciales incorrectas")
    const response = await SignIn(userCredentials);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("rol_id",response.data.data.role.id);
      logearse();
    } else {
      alertPersonalizado("Credenciales incorrectas", false);
    }
  })

  btnRegister.addEventListener("click", ()=>cargarRegistrarse())

}

btnSesion.addEventListener("click", iniciarLogin);

const cargarLogin = () => {
  const divProductos = document.getElementById("productos");
  divProductos.innerHTML = `
      <form class="mt-5">
      <div class="mb-3">
        <label for="inputUsuario" class="form-label">Nombre de Usuario</label>
        <input type="text" class="form-control" id="inputUsuario" placeholder="Usuario">

      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inputPassword">
      </div>
      <button type="button" class="btn btn-primary" id="btnLogin">Ingresar</button>
      <button type="button" class="btn btn-secondary" id="btnRegistrarse">Registrarse</button>
    </form>
    <div id="respuesta" style="display: none;">Nombre o contraseña Incorrectos</div>
  `;

}
const logearse = () => {
  // alert("Credenciales correctas");
  alertPersonalizado("Credenciales correctas", true);
  localStorage.setItem("Logeado", true);
  localStorage.setItem("Nombre", inputUsuario);
  loginExitoso();
}

const alertPersonalizado = (mensaje, isCorrecto) => {
  if (isCorrecto) {
    Swal.fire({
      icon: 'success',
      title: mensaje,

    })
  }
  else {
    Swal.fire({
      icon: 'error',
      title: mensaje,

    })
  }
}

const cerrarSesion = () => {
  const menuAdmin = document.getElementById("menuAdmin");
  menuAdmin.setAttribute("style", "display:none");
  const textoSesion = document.getElementById("textoSesion");
  textoSesion.innerText = "Inicia Sesión";
  const textoPerfil = document.getElementById("textoPerfil");
  textoPerfil.innerText = "Hola";
  localStorage.setItem("Logeado", false);
}



function loginExitoso() {
  console.log("login exitoso")
  const menuAdmin = document.getElementById("menuAdmin");
  const textoSesion = document.getElementById("textoSesion");
  textoSesion.innerText = "Cerrar Sesión";
  console.log(localStorage.getItem("rol_id"))
  if( localStorage.getItem("rol_id")==1)
    menuAdmin.removeAttribute("style");
  const textoPerfil = document.getElementById("textoPerfil");
  textoPerfil.innerText = inputUsuario.value;
  checkLogin = 1;
  cargarProductos(listaProductos);
}
