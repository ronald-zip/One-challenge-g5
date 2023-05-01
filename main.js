let llaves = {    //creamos un objeto con las llaves proporcionadas en el desafio
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat" 
};

function encriptar(texto) {
  return texto.replace(/[aeiou]/g, function(match) { //usando expresiones regulares con el modificador global
    return llaves[match];
  });
}

function desencriptar(texto) {
  return texto.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
}

//Creamos la funcion para encriptar
function procesar() {
  let entrada = document.getElementById("textoOriginal");
  let salida = document.getElementById("textoEncriptado");
  let texto = entrada.value;

  if (texto.trim() === "") {
    mostrarNotificacion("No ingresaste ningún texto");
    return;
  }

  let resultado = encriptar(texto);
  salida.value = resultado;
  mostrarNotificacion("Texto encriptado correctamente");
}

//Creamos la funcion para desencriptar
function procesarDesencriptar() {
  let entrada = document.getElementById("textoOriginal");
  let salida = document.getElementById("textoEncriptado");
  let texto = entrada.value;

  if (texto.trim() === "") {
    mostrarNotificacion("No ingresaste ningún texto");
    return;
  }

  let resultado = desencriptar(texto);
  salida.value = resultado;
  mostrarNotificacion("Texto desencriptado correctamente");
}

//Creamos la funcion procesarBotonCopiar para el boton COPIAR
function procesarBotonCopiar() {
  let texto = document.getElementById("textoEncriptado").value.trim();
  if (!texto) {
    notificarNadaQueCopiar();
    return;
  }
  copiarAlPortapapeles();
}

//Creamos la funcion para copiar al portapapeles
function copiarAlPortapapeles() {
  let texto = document.getElementById("textoEncriptado").value;

  if (texto.trim() === "") {
    return;
  }

  navigator.clipboard.writeText(texto)
    .then(() => {
      mostrarNotificacion("Texto copiado al portapapeles");
    })
    .catch((error) => {
      console.error("Error al copiar el texto: ", error);
    });
}
//creando el boton pegar aprendiendo el evento click
//Obtenemos el botón de pegar usando el método getElementById
const pegar = document.getElementById("pegar");

//Asignamos un evento click al botón de pegar
pegar.addEventListener("click", function(event) {
  event.preventDefault();
  //Usamos el objeto navigator.clipboard para acceder al portapapeles
  navigator.clipboard.readText()
    .then((texto) => {
      //Asignamos el texto del portapapeles al valor de la textarea que queramos
      document.getElementById("textoOriginal").value = texto;
      //Llamamos a la función mostrarOcultarDivs para activar la segunda textarea
      mostrarOcultarDivs();
      //Mostramos una notificación indicando que se ha pegado el texto
      mostrarNotificacion("Texto pegado correctamente");
    })
    .catch((error) => {
      //Mostramos una notificación indicando que hubo un error al pegar el texto
      mostrarNotificacion("Error al pegar el texto: " + error);
    });
})

//Creamos la funcion restablecer para limpiar nuestra area de trabajo con el Boton restablecer
function borrarSegundoTextarea() {
  let salida = document.getElementById("textoEncriptado");
  salida.value = "";
} 
//Ocultar Divs dinamicamente si hay o no hay ningun texto en nuestra area de trabajo
function mostrarOcultarDivs() {
  setTimeout(() => {
    let texto = document.getElementById("textoOriginal").value;
    let divPasivo = document.getElementById("pasivo");
    let divActivo = document.getElementById("activo");
    let textoEncriptado = document.getElementById("textoEncriptado");
    if (texto == "") {
      // Si el primer textarea está vacío, mostrar el div pasivo y ocultar el div activo
      divPasivo.style.display = "block";
      divActivo.style.display = "none";
    } else {
      // Si el primer textarea tiene algún valor, ocultar el div pasivo y mostrar el div activo
      divPasivo.style.display = "none";
      divActivo.style.display = "block";
      // Asignar el valor del primer textarea al segundo
      textoEncriptado.value = texto;
    }
  }, 0); // El tiempo de espera es 0 milisegundos
}