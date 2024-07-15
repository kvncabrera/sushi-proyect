//  JS MENU (MANEJA LA FUNCIONALIDAD DE ABRIR Y CERRAR EL MENU DE NAVEGACIÓN)

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

// LIGHTBOX ( CON EL SIGUIENTE CODIGO SE DA FUNCIONABILIDAD AL LIGTHBOX PARA SUPERPONER LAS IMAGENES SOBRE EL CONTENIDO DE LA PAGINA)

document.addEventListener("DOMContentLoaded", function () {
  let lightbox = document.getElementById("lightbox");
  let lightboxContent = document.getElementById("lightbox-content");
  let closeBtn = document.querySelector(".close");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      lightbox.style.display = "block";
      lightboxContent.src = this.src;
    });
  });

  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target == lightbox || event.target == closeBtn) {
      lightbox.style.display = "none";
    }
  });
});

// TABS (ESTE CODIGO PERMITE GESTIONAR LA INTERFAZ DE PESTAÑAS )

document.querySelectorAll(".contenedor__tabs .li").forEach((tab, index) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".contenedor__tabs .li")
      .forEach((li) => li.classList.remove("activo"));
    document
      .querySelectorAll(".contenedor__tabs .bloque")
      .forEach((bloque) => bloque.classList.remove("activo"));

    tab.classList.add("activo");
    document
      .querySelectorAll(".contenedor__tabs .bloque")
      [index].classList.add("activo");
  });
});

//CARROUSEL DE IMAGENES (CON ESTE CODIGO SE GESTIONA EL CARROUSEL QUE PERMITE LA NAVEGACION MANUAL Y AUTOMATICA DE LAS IMAGENES)

let arrayImagenes = [
  "media/restaurant/rest-1.jpg",
  "media/restaurant/rest-2.jpg",
  "media/restaurant/rest-3.jpg",
];

let numero = 0;

let estadoIntervalo = true;

let imagen = document.getElementById("imagen");

function handlerEvents() {
  let atras = document.getElementById("atras");
  let delante = document.getElementById("delante");
  let parar = document.getElementById("stop");
  let botonesSeccion = document.getElementsByClassName("botonCirculo");

  parar.addEventListener("click", pararIntervalo);
  delante.addEventListener("click", imagenDelante);
  atras.addEventListener("click", imagenAtras);

  for (let i = 0; i < botonesSeccion.length; i++) {
    botonesSeccion[i].addEventListener("click", saltaImagen);
  }
}

function saltaImagen(e) {
  let textoBoton = parseInt(e.target.innerHTML);

  numero = textoBoton - 1;
  pintaBotones();
  imagen.src = arrayImagenes[numero];
}

function pararIntervalo() {
  if (estadoIntervalo == true) {
    estadoIntervalo = false;
    clearInterval(intervalo);
  } else {
    estadoIntervalo = true;
    intervalo = setInterval(imagenDelante, 1000);
  }
}

function imagenAtras() {
  numero--;
  if (numero < 0) {
    numero = arrayImagenes.length - 1;
  }
  pintaBotones();
  imagen.classList.remove("animacion");

  setTimeout(() => {
    imagen.src = arrayImagenes[numero];
    imagen.classList.add("animacion");
  }, 100);
}

function pintaBotones() {
  let botonesSeccion = document.getElementsByClassName("botonCirculo");
  for (let i = 0; i < botonesSeccion.length; i++) {
    botonesSeccion[i].classList.remove("botonCirculoActivo");
  }

  botonesSeccion[numero].classList.add("botonCirculoActivo");
}

function imagenDelante() {
  numero++;
  if (numero == arrayImagenes.length) {
    numero = 0;
  }
  pintaBotones();
  imagen.classList.remove("animacion");

  setTimeout(() => {
    imagen.src = arrayImagenes[numero];
    imagen.classList.add("animacion");
  }, 100);
}

let intervalo = setInterval(imagenDelante, 2000);

window.onload = handlerEvents;