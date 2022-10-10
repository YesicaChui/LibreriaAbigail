let listaProductos={};
cargarDataServer();
async function cargarData(){
    let res = await fetch("/js/data/data.json")
    let json = await res.json();
    listaProductos =json;
    console.log(listaProductos)
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))||listaProductos;
    cargarProductos(listaProductos);
    console.log("wil")
}
async function cargarDataServer(){
    let res = await fetch("http://127.0.0.1:5000/products")
    let json = await res.json();
    listaProductos =json.data;
    console.log(listaProductos)
    listaProductos=listaProductos||JSON.parse(localStorage.getItem("listaProductos"));
    cargarProductos(listaProductos);
    console.log("wil")
}
