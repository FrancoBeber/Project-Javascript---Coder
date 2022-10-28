class listaProductos{
    Producto;
    cant;
    constructor(producto, cant){
        this.producto=producto;
        this.cant=cant;
    }

    sumaPrecio(){
        return this.precio * this.producto.precio;
    }
} 