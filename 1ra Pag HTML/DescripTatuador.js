// Obtener elementos del DOM
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

// Configurar eventos de desplazamiento
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;
let currentIndex = 0;

slides.forEach((slide, index) => {
  // Evitar el desplazamiento de la página al arrastrar el slider
  slide.addEventListener('dragstart', (e) => e.preventDefault());

  // Inicio del arrastre
  slide.addEventListener('mousedown', dragStart);
  slide.addEventListener('touchstart', dragStart);

  // Final del arrastre
  slide.addEventListener('mouseup', dragEnd);
  slide.addEventListener('touchend', dragEnd);

  // Arrastrar
  slide.addEventListener('mousemove', drag);
  slide.addEventListener('touchmove', drag);

  // Arrastrar cancelado
  slide.addEventListener('mouseleave', dragEnd);
  slide.addEventListener('touchcancel', dragEnd);
});

// Desactivar el texto seleccionable durante el arrastre
window.Sizzle('*').forEach(function (el) {
  el.setAttribute('unselectable', 'on');
});

// Función de inicio del arrastre
function dragStart(event) {
  currentIndex = Array.from(slides).indexOf(event.target);

  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
    isDragging = true;
  }

  animationID = requestAnimationFrame(animation);
}

// Función de arrastre
function drag(event) {
  if (isDragging) {
    let currentPosition = 0;

    if (event.type === 'touchmove') {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }

    currentTranslate = previousTranslate + currentPosition - startPosition;
  }
}

// Función de final del arrastre
function dragEnd() {
  cancelAnimationFrame(animationID);

  if (isDragging) {
    const slideSize = slides[currentIndex].offsetWidth;
    const moveBy = currentTranslate - previousTranslate;

    if (moveBy < -slideSize / 4 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    }

    if (moveBy > slideSize / 4 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
  }

  isDragging = false;
  startPosition = 0;
  currentTranslate = 0;
  previousTranslate = 0;
}

// Función de animación del desplazamiento
function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

// Establecer la posición del slider según el índice actual
function setPositionByIndex() {
  currentTranslate = currentIndex * -slides[0].offsetWidth;
  previousTranslate = currentTranslate;
  setSliderPosition();
}

// Establecer la posición del slider
function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Ajustar el tamaño del slider cuando se redimensiona la ventana
window.addEventListener('resize', setPositionByIndex);
