let notas = []
/*
en el caso de editar se creara un dialog (con el id de la nota a editar,
y solicitando los nuevos cambios)
por el momento asi, hasta guardarlo en algo mas maduro
*/



function expandir_nota() {

}

let orden = document.querySelector("#EnviarOrden")
orden.addEventListener("click",()=>{
  console.log("Acomodar")
})

// Crear estructura logica de cada nota, como se guarda en el localStorage.
function estructura_guardar_nota_temporal(titulo, contenido,tag) {
  // regresar un objeto para ingresarlo como una copia exacta al array
  return {
    id: crypto.randomUUID(),   // id único real
    titulo: titulo,
    contenido: contenido,
    fecha: new Date().toISOString(),
    etiquetas: [tag], // intereseante para luego filtrarla
  };
}
function guardarNotas(titulo,contenido,tag) {
 notas.push(estructura_guardar_nota_temporal(titulo,contenido,tag));
    localStorage.setItem("notas",JSON.stringify(notas));
}

function crear_nota_DOM(titulo,contenido,tag) {
   //* ELEMENTO SECTION QUE ES EL CONTENEDOR GENERAL DE NOTAS
  let nota = document.createElement("DIV");

  //* CREAR EL ELEMENTO TITULO 
  let titulo_nota = document.createElement("H2");

  //* CREAR EL ELEMENTO P 
  let contenido_nota = document.createElement("P");

  //*  CREANDO EL ELEMENTO DIV GENERICO CONTENEDOR TITULO
  let contenedor_titulo_nota = document.createElement("DIV");

  //* CREANDO EL ELEMENTO DIV GENERICO QUE ES EL CONTENEDOR DEL TEXTO EXTRAIDO
  let contenedor_contenido_nota = document.createElement("DIV");

  //*  CREANDO EL ELEMENTO DIV GENERICO CONTENEDOR  DE TAGS
  let elementoTag =  document.createElement("DIV")
  let contenidotag = document.createElement("P");

  titulo_nota.innerText = titulo;
  contenido_nota.innerText = contenido;
  if (!tag) {
    contenidotag.innerText = "Agregar Etiqueta";
  }
  else {
    contenidotag.innerText = tag;
  }

  

  nota.classList.add("nota");
  contenedor_titulo_nota.classList.add("titulo_nota");
  contenedor_contenido_nota.classList.add("contenido_nota");
  elementoTag.classList.add("tagelement");

  let elementoContenedor = document.querySelector("#contenedor_real");

  contenedor_titulo_nota.appendChild(titulo_nota);
  contenedor_contenido_nota.appendChild(contenido_nota);
  elementoTag.appendChild(contenidotag)
  // este es el contenedor padre de ambos (titulo,contenido,tag)
  nota.appendChild(contenedor_titulo_nota);
  nota.appendChild(contenedor_contenido_nota);
  nota.appendChild(elementoTag);
  if (elementoContenedor) {
    elementoContenedor.append(nota)
    guardarNotas(titulo,contenido,tag);
  }
}



function Extraer_valores(e){
  return e.value;
}
function verificar_entradas_nota() {
  // Crear otra funcion para extraer valor y separar responsabilidades
  let titulo_nota = document.querySelector("#titulo");
  let contenido_nota = document.querySelector("#contenido_nota");
  let tag_nota = document.querySelector("#tag");
  // mejorar aqui
  if (!Extraer_valores(contenido_nota)) {
    alert("Debes agregar contenido a la nota.")
    return
  }
    else if (!Extraer_valores(titulo_nota)) {
    alert("La nota debe tener un titulo.");
    return;
  } else if (!Extraer_valores(titulo_nota) && Extraer_valores(contenido_nota) ) {
    alert("La nota no puede estar vacia.");
    return;
  } else {
    return crear_nota_DOM(Extraer_valores(titulo_nota), Extraer_valores(contenido_nota),Extraer_valores(tag_nota));
  }
  
}
function cargarNotas() {
  // Aqui tenemos  el array.
  let parsearNotas = JSON.parse(localStorage.getItem("notas")) || [];

  let elementoContenedor = document.querySelector("#contenedor_real");

  for (let i=0;i<parsearNotas.length;i++) {

  let nota = document.createElement("DIV");


  // Hay que tener cuidado al orgnizar esto, debe ser muy logico y correcto

  // Forma correcta para que cada nota tenga su details > summary >> botones
  let details = document.createElement("DETAILS");
  let summary = document.createElement("SUMMARY");
  summary.innerText = "*";

  let boton_delete = document.createElement("BUTTON");
  boton_delete.innerText = "Eliminar Nota"

  let boton_edit = document.createElement("BUTTON");
  boton_edit.innerText = "Editar Nota"

  boton_delete.classList.add("notas_opciones--boton")
  boton_edit.classList.add("notas_opciones--boton")


  let campo_botones = document.createElement("DIV");
  campo_botones.classList.add("campos_botones")
  campo_botones.append(boton_edit,boton_delete)

  

  
  details.append(summary);
  details.append(campo_botones)


  let titulo_nota = document.createElement("H2");
  let contenido_nota = document.createElement("P");
  let contenedor_titulo_nota = document.createElement("DIV");
  let contenedor_contenido_nota = document.createElement("DIV");
  let elementoTag =  document.createElement("DIV")
  let contenidotag = document.createElement("P");



  // cada elemento guardado [i]
  titulo_nota.innerText = parsearNotas[i].titulo;
  contenido_nota.innerText = parsearNotas[i].contenido;
  contenidotag.innerText = parsearNotas[i].etiquetas;
  nota.classList.add("nota");
  contenedor_titulo_nota.appendChild(details)
  contenedor_titulo_nota.classList.add("titulo_nota");
  contenedor_contenido_nota.classList.add("contenido_nota");
  elementoTag.classList.add("tagelement");
  contenedor_titulo_nota.appendChild(titulo_nota);
  contenedor_contenido_nota.appendChild(contenido_nota);
  elementoTag.appendChild(contenidotag)
  // este es el contenedor padre de ambos (titulo,contenido,tag)
  nota.appendChild(contenedor_titulo_nota);
  nota.appendChild(contenedor_contenido_nota);
  nota.appendChild(elementoTag);
  if (elementoContenedor) {
    elementoContenedor.appendChild(nota)
  }
}
}
document.addEventListener("DOMContentLoaded",cargarNotas());
