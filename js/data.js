class Producto {
    constructor(id, nombre, descripcion, precio,stock,imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen=imagen;
    }
    getIGV() {
        return this.precio * 0.18
    }
}

//definiendo los productos de la tienda
const listaProductos = [
    new Producto(1, "Lapicero", "Tinta liquida", 4,10,"https://images.utilex.pe/000979/450x450/lapicero-bps-azul-x-1-unidad-pilot-CYWTLUIE4HCHE.png"),
    new Producto(2, "Cuaderno Layconsa", "Cuaderno cuadriculado 100 hojas", 12,10,"http://s3.amazonaws.com/imagenes-sellers-mercado-ripley/2020/09/02174124/2140110401.jpg"),
    new Producto(3, "Corrector Artesco", "Corrector punta fina", 6,10,"https://images.utilex.pe/022501/450x450/corrector-lapicero-9-ml-x-1-unidad-artesco-CYWNAVQ2LIC7Q.png"),
    new Producto(4, "Borrador Artesco", "Borrador de papa para lapiz", 2,10,"https://images.utilex.pe/024947/650x650/borrador-blanco-grande-artesco-CYN7KRSAYFKXA.png"),
    new Producto(5, "Juego de reglas Vinifan", "Reglas plastificadas", 8,10,"https://librecor.com/wp-content/uploads/2020/07/JUEGO-DE-ESCUADRAS-X-20CM.jpg"),
    new Producto(6, "Corrector Faber", "Corrector plastificado", 6,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1780802493.jpg"),
    new Producto(7, "Corrector Vinifan", "Secado rapido", 8,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/2319037009.jpg"),
    new Producto(8, "Borrador Maped", "Borrador lapicero", 8,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1478986586.jpg"),
    new Producto(9, "Cuaderno Universal", "Rayado de 180 hojas", 10,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/2018248815-600x600.jpg"),
    new Producto(10, "Forro Vinifan", "Forro A-4 Cristal", 7,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/01181006.jpg"),
    new Producto(11, "Borrador Faber", "Borrador Negro Lapiz", 2,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/2436544707.jpg"),
    new Producto(12, "Lapiz Vikingo", "Lapiz bicolor", 6,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1968133560.jpg"),
    new Producto(13, "Reglas y escuadras Maped", "Reglas plastificadas", 8,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1478999890.jpg"),
    new Producto(14, "Compas con Lapiz Artesco", "Compas Plastico", 3,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1983827692.jpg"),
    new Producto(15, "Lapiz Artesco", "Lapiz grafito", 8,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1983847637-600x600.jpg"),
    new Producto(16, "Forro Artesco", "Forro artescofan", 6,10,"https://www.distribuidoranavarrete.com.pe/wp-content/uploads/1478999785.jpg"),
];