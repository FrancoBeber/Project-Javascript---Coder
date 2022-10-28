/* Obtenemos todos los elementos del documento necesarios */
let inputId= document.getElementById("inputId");
let inputTipo = document.getElementById("inputTipo");
let inputMarca = document.getElementById("inputMarca");
let inputPrecio = document.getElementById("inputPrecio");
let btnAgregar = document.getElementById("btnAgregar");
let btnConsultar = document.getElementById("btnConsultar");
let btnBorrar = document.getElementById("btnBorrar");
let inputIdConsulta = document.getElementById("inputIDCons");
let btnPersistir = document.getElementById("btnPersistir")
let btnAniadir = document.getElementById("btnAniadir");
let selecListado = document.getElementById("listadoProductos");
let tabla = document.getElementById("listItems");
let total = document.getElementById("totalPrecio")
/* Creamos el carro de compra y nuestro inventario de productos */

let carritoCompras = [];
let inventario=[];

/* Añadimos objetos a nuestro inventario*/
inventario.push(new Producto("123A","Auriculares","Redragon",8000));
inventario.push(new Producto("RY78","Notebook", "Dell",160000));
inventario.push(new Producto("33Z6","Cooler CPU", "CoolerMaster",6000));
inventario.push(new Producto("AA9H","Teclado", "Redragon",9000));
inventario.push(new Producto("LP99","Celular", "Xiaomi",130000));
inventario.push(new Producto("118T","Smartwatch", "Xiaomi",9000));

/* Agregamos nuestros productos al Documento */
inventario.forEach((producto)=>{
  let option = document.createElement("option");
  option.innerText=`${producto.id} ${producto.tipo} marca: ${producto.marca} precio $${producto.precio}`
  option.value=inventario.indexOf(producto);
  selecListado.appendChild(option);
  console.log(producto)
})
/* Obtenemos el Form */
let forms = document.querySelectorAll("form");

/* Asignamos los listener a los botones */
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  let product = new Producto(
    inputId.value,
    inputTipo.value,
    inputMarca.value,
    parseInt(inputPrecio.value))
  carritoCompras.push(product);
  alert("Alta exitosa...");
  limpiarForms();
});

btnPersistir.addEventListener("click", ()=>{
    localStorage.setItem("Carrito",JSON.stringify(carritoCompras))
})

btnConsultar.addEventListener("click", consultarProducto);
btnBorrar.addEventListener("click", borrarProducto);

/* Agrego elementos a la tabla */
btnAniadir.addEventListener("click", (e)=>{
  e.preventDefault();
  console.log(inventario[selecListado.value]);
  let producto = inventario[selecListado.value];
  let elementoNuevoCarro = new listaProductos(producto,parseInt(1));
  carritoCompras.push(elementoNuevoCarro);
  newRow(elementoNuevoCarro);
  localStorage.setItem("Carrito",JSON.stringify(carritoCompras));
})
/* Funcion para cargar elementos a una tabla */
function newRow(listadoProductos){
    let row = document.createElement("tr");
    let pos = carritoCompras.indexOf(listadoProductos);
    let celda = document.createElement("td");
    celda.innerText = listadoProductos.producto.id;
    row.appendChild(celda);
    celda = document.createElement("td");
    celda.innerText = listadoProductos.producto.tipo;
    row.append(celda);
    row.appendChild(celda);
    celda = document.createElement("td");
    celda.innerText = listadoProductos.producto.marca;
    row.append(celda);
    row.appendChild(celda);
    celda = document.createElement("td");
    celda.innerText = parseInt(listadoProductos.producto.precio);
    row.append(celda);

    celda= document.createElement("td");
    celda.innerText = parseInt(listadoProductos.cant);

    let botonSumarProd = document.createElement('button');
    botonSumarProd.className= "btn btn-danger";
    botonSumarProd.innerText = "+";

    let botonQuitarProd = document.createElement('button');
    botonQuitarProd.className= "btn btn-danger";
    botonQuitarProd.innerText = "-";

    celda.append(botonSumarProd);
    celda.append(botonQuitarProd);
    row.append(celda);

    //Agregamos un boton para borrar elementos
    let botonBorrarElemento = document.createElement('button');
    botonBorrarElemento.className = "btn btn-danger";
    botonBorrarElemento.innerText = "Eliminar";

    botonBorrarElemento.addEventListener("click", ()=>{
      carritoCompras.splice(pos, 1);
      actualizarLista();
      localStorage.setItem("Carrito",JSON.stringify(carritoCompras))
    })

    celda=document.createElement("td");
    celda.appendChild(botonBorrarElemento);
    row.append(celda);
    tabla.append(row);
    total.innerText = carritoCompras.reduce((suma, listadoProductos) =>
      suma + parseInt(listadoProductos.producto.precio * listadoProductos.cant)
    ,0);

    botonSumarProd.addEventListener("click", ()=>{
      carritoCompras[pos].cant++;
      actualizarLista();
      localStorage.setItem("Carrito", JSON.stringify(carritoCompras));

    })

    botonQuitarProd.addEventListener("click",()=>{
      if(carritoCompras[pos].cant > 0){
        carritoCompras[pos].cant--;
        actualizarLista();
        localStorage.setItem("Carrito", JSON.stringify(carritoCompras));
      }
    })

    function actualizarLista(){
      tabla.innerHTML="";
      carritoCompras.forEach((elemento)=>{
        newRow(elemento);
      });
    }
}
/* Funciones */
function consultarProducto(evento) {
    evento.preventDefault();
    let idCons = parseInt(inputIdConsulta.value);
    prod = buscarProducto(idCons);
    console.log("Producto " + prod);
    if (prod != undefined) {
      inputId.value = prod.id;
      inputTipo.value = prod.tipo;
      inputMarca.value = prod.marca;
      inputPrecio.value = prod.precio;
    } else {
      alert("Producto no encontrado...");
      limpiarForms();
    }
  }
  
  function buscarProducto(id) {
    let elemento;
    elemento = carritoCompras.find((elem) => {
      if (elem.id == id) {
        return elem;
      }
    });
    return elemento;
  }
  
  function borrarProducto(id) {
    const elemento = (elem) => {
      let index = carritoCompras.indexOf(elem);
      if (elem.id == id) {
        carritoCompras.splice(index, 1);
        alert("Prodcuto eliminado con exito...");
      }
    };
  }
  
  function limpiarForms() {
    forms.forEach((form) => {
      form.reset();
    });
  }

  function recuperarCarro(){
    let carroLS= parse(localStorage.getItem('carritoCompras'))
    if(carroLS!=null){
      carritoCompras=carroLS
    }
    
  }

