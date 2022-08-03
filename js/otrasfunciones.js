let codigoCorrelativo=listaProductos.length;
//funcion para añadir productos que al final llama a cargar productos para visualizarla
/*por ejemplo se puede probar insertando el producto Compas con precio 10,
 descripcion para dibujo tecnico, stock 5, 
  y con la url de imagen https://plazavea.vteximg.com.br/arquivos/ids/1256227-1000-1000/14971.jpg*/
const agregarProducto=()=>{
    const nombre=prompt("Ingrese el nombre del producto");
    const descripcion=prompt("Ingrese la descripción del producto");
    const precio=Number(prompt("Ingrese el precio del producto"));
    const stock=Number(prompt("Ingrese la cantidad de productos que ingrearon"));
    const imagen=prompt("Ingrese la url de la imagen del producto (sugerencia buscar en google imagenes la Imagen del producto a ingresar)");
    const productoNuevo= new Producto(codigoCorrelativo+1,nombre,descripcion,precio,stock,imagen);
    codigoCorrelativo++;
    listaProductos.push(productoNuevo);
    cargarProductos();
}




//Funcion que Indica las opciones del sistema de ventas
const cargarMenuGeneral=()=>{
    let opcion = -1;
    while (opcion != 0) {
        opcion = Number(prompt(`Bienvenido a nuestro Sistema de Gestion de Libreria seleccione una opción:
            1.Realizar Compra
            2.Añadir Producto
            3.Eliminar Producto
            0.Salir
            
    Seleccione los productos que desea comprar o escriba 0 para finalizar su compra`));
        if (opcion >= 1 && opcion <= 3) {
            if(opcion==1){
               menuGestionVentas();
               calculoTotal();     
            }else if(opcion==2){
               agregarProducto();     
            }else{
               eliminarProducto(); 
            }
        }
        else if (opcion != 0) {
            alert("Porfavor ingrese una opción valida")
        }
    }
    alert("Gracias por su visita");
}

// mostrando en un menu los productos a seleccionar al carrito de compras
const menuGestionVentas = () => {
    let productoSeleccionado = -1;
    let textProductos="";
    listaProductos.forEach((producto,index)=>{
        textProductos+=`${index+1}.${producto.nombre}\n`;
    });
    while (productoSeleccionado != 0) {

        

        productoSeleccionado = Number(prompt(`Nuestros productos disponibles son:\n
            ${textProductos}
            
    Seleccione  los productos que desea comprar o escriba 0 para finalizar su compra`));
        if (productoSeleccionado >= 1 && productoSeleccionado <= listaProductos.length) {
            carrito.push(listaProductos[productoSeleccionado - 1])
        }
        else if (productoSeleccionado != 0) {
            alert("Porfavor ingrese una opción valida")
        }
    }
}


// Realizando el calculo del total incluyendo el impuesto general a las ventas IGV
const calculoTotal = () => {
    let totalPagar = 0

    carrito.forEach((carItem) => {
        console.log(carItem.nombre, carItem.precio);
        totalPagar += carItem.precio + carItem.getIGV();
    });

    alert(`El total a pagar por los productos seleccionados es ${totalPagar}`);
    carrito = [];
}

// cargarMenuGeneral();
// menuGestionVentas();
// calculoTotal();
