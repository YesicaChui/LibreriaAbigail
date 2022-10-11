let checkLogin = 0;
//verificarLogin();

function verificarLogin() {

  const logeado = localStorage.getItem("Logeado");
  logeado == "true" && loginExitoso();
}

console.log("se cargo archivo login")
const btnSesion = document.getElementById("btnSesion");
console.log(btnSesion);

btnSesion.addEventListener("click", () => {
  console.log("se presiono btnsesion");

  checkLogin == 1 && cerrarSesion();
  cargarLogin();
  const btnLogin = document.getElementById("btnLogin");
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
      logearse();
    } else {
      alertPersonalizado("Credenciales incorrectas", false);
    }
  })
});
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
  menuAdmin.removeAttribute("style");
  const textoPerfil = document.getElementById("textoPerfil");
  textoPerfil.innerText = inputUsuario.value;
  checkLogin = 1;
}
