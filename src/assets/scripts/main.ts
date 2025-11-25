/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import 'bootstrap';

import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);
/**
 * Write any other JavaScript below
 */

+(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
})();

//cargamos dom y animaciones
document.addEventListener('DOMContentLoaded', () => {
  animacionScrollingText();
  animacionesBasicas();

  guardarReceta();
  cargarReceta();

  if (document.body.id === "home") {
    animarLogoHome();
  }
})

//menu offcanvas
function animarLogoHome(): void {
  const titulohome = document.querySelector('.tituloweb') as HTMLHeadingElement;
  titulohome.classList.add('animationlogo');
  document.addEventListener('scroll', () => {
    const totalScrolleado: number = window.scrollY;
    if (totalScrolleado > 0) {
      titulohome.classList.remove('animationlogo');
    } else {
      titulohome.classList.add('animationlogo');
    }
  })
}

//home
function animacionScrollingText(): void {
  const tracker = document.querySelector(".scrollingtext__wrappertexto__tracker") as HTMLDivElement;
  const elementos = Array.from(tracker.querySelectorAll(".scrollingtext__wrappertexto__elemento"));


  elementos.forEach(el => {
    tracker.appendChild(el.cloneNode(true));
  });

  let totalWidth: number = tracker.scrollWidth / 2;

  gsap.to(tracker, {
    x: `-=${totalWidth}`,
    duration: 30,
    ease: "linear",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(value => parseFloat(value) % -totalWidth)
    }
  });
}

//animaciones gsap básicas

function animacionesBasicas() {
  const animacionesup: NodeListOf<HTMLElement> =
    document.querySelectorAll('.animarup');
  const animacionesleft: NodeListOf<HTMLElement> =
    document.querySelectorAll('.animarleft');

  animacionesup.forEach((animacion, index) => {
    gsap.to(animacion, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.15 * index,
      scrollTrigger: animacion,
      start: "top 80%"
    });
  });

  animacionesleft.forEach((animacion, index) => {
    gsap.to(animacion, {
      x: 0,
      opacity: 1,
      duration: 1,
      delay: 0.15 * index,
      scrollTrigger: animacion,
      start: "top 80%"
    });
  });
}
// Función auxiliar para convertir archivo a Base64
function leerArchivo(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
// Form para crear receta
function guardarReceta() {
  const formulario = document.querySelector('.formreceta') as HTMLFormElement | null;
  if (!formulario) return;

  const botonForm = document.getElementById('guardarreceta') as HTMLButtonElement;
  const inputImagen = document.getElementById('imagencamporeceta') as HTMLInputElement;
  const inputImagen2 = document.getElementById('imagencamporeceta2') as HTMLInputElement;

  botonForm?.addEventListener('click', async (e) => {
    e.preventDefault();

    const datosForm = new FormData(formulario);

    const tituloReceta = String(datosForm.get('tituloreceta') || '');
    const descripcionReceta = String(datosForm.get('descripcioncorta') || '');
    const descripcionLarga = String(datosForm.get('descripcionlarga') || '');
    const tiempoReceta = String(datosForm.get('tiemporeceta') || '');
    const racionesReceta = String(datosForm.get('racionesreceta') || '');
    const ingredientesReceta = datosForm.getAll('ingredientes[]') || [];
    const pasosReceta = String(datosForm.get('pasosreceta') || '');

    // Cargar la receta existente
    const recetaExistente = JSON.parse(localStorage.getItem('receta') || '{}');

    // Leer imágenes si existen en los inputs
    const archivo = inputImagen.files?.[0];
    const archivo2 = inputImagen2.files?.[0];

    const imagenBase64 = archivo ? await leerArchivo(archivo) : recetaExistente.imagen || '/src/assets/images/imagen-receta-formulario.png';
    const imagenBase642 = archivo2 ? await leerArchivo(archivo2) : recetaExistente.imagen2 || '/src/assets/images/imagen-receta-formulario-2.png';

    const datosReceta = {
      titulo: tituloReceta,
      descripcionCorta: descripcionReceta,
      descripcionLarga: descripcionLarga,
      ingredientes: ingredientesReceta,
      tiempo: tiempoReceta,
      raciones: racionesReceta,
      pasos: pasosReceta,
      imagen: imagenBase64,
      imagen2: imagenBase642
    };

    localStorage.setItem('receta', JSON.stringify(datosReceta));
    console.log('Receta guardada con imágenes', datosReceta);

    const preview1 = document.getElementById('previewreceta') as HTMLImageElement;
    const preview2 = document.querySelectorAll('img')[1] as HTMLImageElement;
    if (preview1) preview1.src = imagenBase64;
    if (preview2) preview2.src = imagenBase642;
  });



  const botonIngredientes = document.getElementById('anadiringredientes') as HTMLButtonElement;
  botonIngredientes?.addEventListener('click', (e) => {
    e.preventDefault();
    const listaIngredientes = document.getElementById('listaingredientes') as HTMLDivElement;
    const elementList = document.createElement('input') as HTMLInputElement;
    elementList.type = 'text';
    elementList.name = 'ingredientes[]';
    elementList.classList.add('formreceta__input', 'ingrediente');
    listaIngredientes.appendChild(elementList);
  });

  const quitarIngrediente = document.getElementById('quitaringredientes') as HTMLButtonElement;
  quitarIngrediente?.addEventListener('click', (e) => {
    e.preventDefault();
    const listaIngredientes = document.querySelectorAll('.ingrediente');
    if (listaIngredientes.length > 0) listaIngredientes[listaIngredientes.length - 1].remove();
  });
}

function cargarReceta() {
  if(document.body.id !== 'receta'){return}
  const titulo = document.getElementById('tituloreceta') as HTMLInputElement;
  const descripcionCorta = document.getElementById('descripcioncorta') as HTMLInputElement;
  const descripcionLarga = document.getElementById('descripcionlarga') as HTMLInputElement;
  const tiempo = document.getElementById('tiemporeceta') as HTMLInputElement;
  const raciones = document.getElementById('racionesreceta') as HTMLInputElement;
  const listaingredientes = document.getElementById('listaingredientes') as HTMLDivElement;
  const pasos = document.getElementById('pasosreceta') as HTMLInputElement;
  const preview1 = document.getElementById('previewreceta') as HTMLImageElement;
  const preview2 = document.querySelectorAll('img')[1] as HTMLImageElement;

  const receta = JSON.parse(localStorage.getItem('receta') || '{}');
  if (!receta.titulo) return;

  const htmlingredientes = generarLista(receta.ingredientes);

  titulo.value = receta.titulo;
  descripcionCorta.value = receta.descripcionCorta;
  descripcionLarga.value = receta.descripcionLarga;
  tiempo.value = receta.tiempo;
  raciones.value = receta.raciones;
  pasos.value = receta.pasos;
  listaingredientes.innerHTML = htmlingredientes;

  if (receta.imagen && preview1) preview1.src = receta.imagen;
  if (receta.imagen2 && preview2) preview2.src = receta.imagen2;
}

const generarLista = (ingredientes: any) => {
  let html = '';
  for (let ingrediente of ingredientes) {
    html += `<input type="text" name="ingredientes[]" class="formreceta__input ingrediente mb-2" value="${ingrediente}">`;
  }
  return html;
}
