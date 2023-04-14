const productos = [
    //INDUMENTARIA
    {
        id: "quepis",
        titulo: "Quepis",
        imagen: "./img/QuepiPSA.jpg",
        categoria:{
            nombre:"quepis",
            id: "Indumentaria"
        },
        precio: 4500,
    },
    {
        id: "remera",
        titulo: "Remera",
        imagen: "./img/Remera PSA.jpg",
        categoria:{
            nombre:"remera",
            id: "Indumentaria"
        },
        precio: 10000,
    },
    {
        id: "pantalon",
        titulo: "Pantalon",
        imagen: "./img/PantalonPSA.jpg",
        categoria:{
            nombre:"pantalon",
            id: "Indumentaria"
        },
        precio: 14000,
    },
    {
        id: "botas",
        titulo: "Botas",
        imagen: "./img/BotasPSA.jpg",
        categoria:{
            nombre:"botas",
            id: "Indumentaria"
        },
        precio: 12000,
    },
    {
        id: "campera",
        titulo: "Campera",
        imagen: "./img/CamperaPSA.jpg",
        categoria:{
            nombre:"campera",
            id: "Indumentaria"
        },
        precio: 15500,
    },
    // ACCESORIOS
    {
        id: "cinturon",
        titulo: "Cinturon",
        imagen: "./img/CinturonPSA.jpg",
        categoria:{
            nombre:"cinturon",
            id: "Accesorios"
        },
        precio: 5500,
    },
    
    {
        id: "guantes",
        titulo: "Guantes",
        imagen: "./img/GuantesPSA.jpg",
        categoria:{
            nombre:"guantes",
            id: "Accesorios"
        },
        precio: 3500,
    },
    {
        id: "parches",
        titulo: "Parches",
        imagen: "./img/ParchesPSa.jpg",
        categoria:{
            nombre:"parches",
            id: "Accesorios"
        },
        precio: 900,
    },
    //ARMAMENTO
    {
        id: "cachiporra",
        titulo: "Cachiporra",
        imagen: "./img/Tonfa.jpg",
        categoria:{
            nombre:"cachiporra",
            id: "Armamento"
        },
        precio: 7000,
    },
    {
        id: "pistola",
        titulo: "Pistola",
        imagen: "./img/PistolaPSA.jpg",
        categoria:{
            nombre:"pistola",
            id: "Armamento"
        },
        precio: 72000,
    },
    {
        id: "municion",
        titulo: "Munición (x250)",
        imagen: "./img/Municion.jpg",
        categoria:{
            nombre:"municion",
            id: "Armamento"
        },
        precio: 2500,
    },
    {
        id: "chalecoAntibalas",
        titulo: "Chaleco Antibalas",
        imagen: "./img/ChalecoAntibalasPSA.jpg",
        categoria:{
            nombre:"chaleco antibalas",
            id: "Armamento"
        },
        precio: 22000,
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
})
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
};

cargarProductos(productos); 

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");


        if (e.currentTarget.id !="todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.id;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
};
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else{ 
    productosEnCarrito = [];
};


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
