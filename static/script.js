let fecha = new Date();


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
  GuardarNota(titulo,contenido)
  console.log(titulo,contenido)
  //CREANDO LA ESTRUCTURA DE HERENCIA
  elementoDivTitulo.append(elementoTitulo);
  elementoDivContenido.append(elementoContenido);
  elementosection.appendChild(elementoDivTitulo);
  elementosection.appendChild(elementoDivContenido);
  elementoContenedor.appendChild(elementosection);
  // elementoDivTitulo.appendChild();
  // elementoDivContenido.appendChild();
}
function verificar_notas() {
  // Esta funcion le pasa el contenido de la nota, el titulo y el contenido
  let titulo_nota = document.getElementById("titulo").value;
  let contenido_nota = document.getElementById("contenido_nota").value;
  if (!titulo_nota && !contenido_nota) {
    alert("Debes agregar contenido a la nota")
    return
  }
    else if (!titulo_nota) {
    alert("Ingresa el titulo de la nota");
    return;
  } else if (!contenido_nota) {
    alert("La nota no puede estar vacia.");
    return;
  } else {
    CrearElementos(titulo_nota, contenido_nota);
  }
  
}

function ordenamiento(opOrdenamiento) {
  console.log(opOrdenamiento);
}

// El valor del select ya es el valor del option en el estado actual
// por eso no hace falta llamar a cada option
let botonOrdenar = document.querySelector("#EnviarOrden")
botonOrdenar.addEventListener("click",()=>{
  ordenamiento(document.querySelector("#con_options").value)
});

// Funcion promesa una peticion
function GuardarNota(titulo,contenido){
  fetch("/notes", {
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify({titulo, contenido})
  })
  // Response vive solo en el primer then()
  .then(response => response.json())
  .catch(err=>{
    console.error(err)
  });
}

