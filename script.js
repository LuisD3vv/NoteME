let fecha = new Date();

let nombre = prompt("Hola, ¿Cual es tu nombre?");
let user_name = document.getElementById("user_name");
user_name.textContent = nombre;

function CrearElementos(titulo, contenido) {
  // Crear los elementos traidos del html
  let elementoContenedor = document.getElementById("contenedor_real");

  // CREAR EL ELEMENTO TITULO QUE CONTIENE EL TEXTO EXTRAIDO
  let elementoTitulo = document.createElement("h2");
  // CREAR EL ELEMENTO P, QUE TRAERA EL CONTENIDO
  let elementoContenido = document.createElement("p");
  // ELEMENTO SECTION QUE ES EL CONTENEDOR GENERAL DE NOTAS
  let elementosection = document.createElement("section");
  //  CREANDO EL ELEMENTO DIV GENERICO PARA DARLE LA CLASE TITULO
  let elementoDivTitulo = document.createElement("div");
  // CREANDO EL ELEMENTO DIV GENERICO QUE ES EL CONTENEDOR DEL TEXTO EXTRAIDO
  let elementoDivContenido = document.createElement("div");

  elementoTitulo.innerText = titulo;
  elementoContenido.innerText = contenido;

  // DARLE LOS ATRIBUTOS DEL CSS Y SE AJUSTEN SEGUN LOS ESTILOS
  elementosection.setAttribute("id", "nota");
  elementoDivTitulo.setAttribute("class", "titulo_nota");
  elementoDivContenido.setAttribute("class", "contenido_nota");

  //CREANDO LA ESTRUCTURA DE HERENCIA
  elementoDivTitulo.append(elementoTitulo);
  elementoDivContenido.append(elementoContenido);
  elementosection.appendChild(elementoDivTitulo);
  elementosection.appendChild(elementoDivContenido);
  elementoContenedor.appendChild(elementosection);
  // elementoDivTitulo.appendChild();
  // elementoDivContenido.appendChild();
}
function CrearNotas() {
  // Esta funcion le pasa el contenido de la nota, el titulo y el contenido
  let titulo_nota = document.getElementById("titulo").value;
  let contenido_nota = document.getElementById("contenido_nota").value;
  if (!titulo_nota) {
    alert("La nota debe de tener un titulo");
    return 1;
  } else if (!contenido_nota) {
    alert("Agrega minimamente un parrafo");
    return 1;
  } else {
    CrearElementos(titulo_nota, contenido_nota);
  }
}

// Contenido que necesito traer, el titulo del input y el contenido del text area
