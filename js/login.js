let checkLogin=0;
verificarLogin();

function verificarLogin(){

  const logeado=localStorage.getItem("Logeado");
  console.log(logeado);
  if(logeado=="true"){
    console.log(logeado, "soy verdadero");
    loginExitoso();
  }
}

console.log("se cargo archivo login")
const btnSesion=document.getElementById("btnSesion");
console.log(btnSesion);

btnSesion.addEventListener("click",()=>{
    console.log("se presiono btnsesion");
    if(checkLogin==1){
        const menuAdmin = document.getElementById("menuAdmin");
        menuAdmin.setAttribute("style","display:none");
        const textoSesion= document.getElementById("textoSesion");
        textoSesion.innerText="Inicia Sesión";
        const textoPerfil= document.getElementById("textoPerfil");
        textoPerfil.innerText="Hola";
        localStorage.setItem("Logeado", false);
    }
    cargarLogin();
    const btnLogin=document.getElementById("btnLogin");
    btnLogin.addEventListener("click",()=>{
        const inputUsuario=document.getElementById("inputUsuario").value;
        const inputPassword=document.getElementById("inputPassword").value;
        if(inputUsuario==="Yesica"&&inputPassword==="123456"){
            alert("Credenciales correctas");
            localStorage.setItem("Logeado", true);
            localStorage.setItem("Nombre", inputUsuario);
            loginExitoso();
        }else{
            alert("Credenciales incorrectas");
        }
    })
});

const cargarLogin= ()=>{
    const divProductos=document.getElementById("productos");
    divProductos.innerHTML=`
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
  </form>
  <div id="respuesta" style="display: none;">Nombre o contraseña Incorrectos</div>
    `;
   
}

function loginExitoso(){
  console.log("login exitoso")
  const menuAdmin = document.getElementById("menuAdmin");
  const textoSesion= document.getElementById("textoSesion");
  textoSesion.innerText="Cerrar Sesión";
  menuAdmin.removeAttribute("style");
  const textoPerfil= document.getElementById("textoPerfil");
  textoPerfil.innerText="Yesica";
  checkLogin=1;
}
