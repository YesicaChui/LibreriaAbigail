let listaProductos={};
cargardata();
async function cargardata(){
    let res = await fetch("/js/data/data.json")
    let json = await res.json();
    listaProductos =json;
    console.log(listaProductos)
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))||listaProductos;
    cargarProductos(listaProductos);
}
