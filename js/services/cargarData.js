let listaProductos={};

async function cargarPintar(){
    await cargarDataServer();
    cargarProductos(listaProductos);
}
async function cargarData(){
    let res = await fetch("/js/data/data.json")
    let json = await res.json();
    listaProductos =json;
    console.log(listaProductos)
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))||listaProductos;
    console.log("wil")
}
async function cargarDataServer(){
    let res = await fetch(`${API_URL}/products`)
    let json = await res.json();
    listaProductos =json.data;
    console.log(listaProductos)
    listaProductos=listaProductos||JSON.parse(localStorage.getItem("listaProductos"));
    console.log("wil")
}
