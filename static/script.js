let fecha = new Date();
let notas = []

let orden = document.querySelector("#EnviarOrden")
orden.addEventListener("click",()=>{
  console.log("Acomodar")
})

function crearNota(titulo, contenido,tag) {
  // regresar un objeto para ingresarlo como una copia exacta al array
  return {
    id: crypto.randomUUID(),   // id único real
    titulo: titulo,
    contenido: contenido,
    fecha: new Date().toISOString(),
    etiquetas: [tag], // intereseante para luego filtrarla
  };
}
function crearElementos(titulo, contenido) {
  // Crear los elementos traidos del html
  let elementoContenedor = document.querySelector("#contenedor_real");

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


  contenido = contenido.replace("\n",""); // Remplazar saltos de linea con espacios vacios
  elementoTitulo.innerText = titulo;
  elementoContenido.innerText = contenido;
  elementoTag = document.querySelector("#tag").value

  

  // DARLE LOS ATRIBUTOS DEL CSS Y SE AJUSTEN SEGUN LOS ESTILOS
  elementosection.setAttribute("id", "nota");
  elementoDivTitulo.setAttribute("class", "titulo_nota");
  elementoDivContenido.setAttribute("class", "contenido_nota");

  //GuardarNota(titulo,contenido)
  notas.push(crearNota(titulo,contenido,elementoTag));

  localStorage.setItem("notas",JSON.stringify(notas));

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
  let titulo_nota = document.querySelector("#titulo").value;
  let contenido_nota = document.querySelector("#contenido_nota").value;
  if (!titulo_nota && !contenido_nota) {
    alert("Debes agregar contenido a la nota.")
    return
  }
    else if (!titulo_nota) {
    alert("La nota debe tener un titulo.");
    return;
  } else if (!contenido_nota) {
    alert("La nota no puede estar vacia.");
    return;
  } else {
    crearElementos(titulo_nota, contenido_nota);
  }
  
}
function ordenamiento(opOrdenamiento) {
  console.log(opOrdenamiento);
}
function cargarNotas() {
  // Aqui tenemos ya el array.
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  let elementoContenedor = document.querySelector("#contenedor_real");
  
  console.table(notas)
  for (let i=0;i<notas.length;i++) {
  let elementosection = document.createElement("section");
  let elementoDivTitulo = document.createElement("div");

  let elementoDivContenido = document.createElement("div");
  
  let elementoTitulo = document.createElement("h2");

  let elementoContenido = document.createElement("p");


  elementoTitulo.textContent = notas[i].titulo;
  elementoContenido.textContent = notas[i].contenido;

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
  }
  

  
}

cargarNotas()