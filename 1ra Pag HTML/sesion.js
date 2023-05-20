const btnAbrirRegistro = document.querySelector("#btnAbrirRegistro");
const modal = document.getElementById('modal');
const closeButton = modal.querySelector('.close');

btnAbrirRegistro.addEventListener("click", function (event) {
    modal.showModal();
    event.preventDefault();
});

// Agregar evento de clic al elemento de cierre
closeButton.addEventListener('click', function () {
    modal.close();
});

// Agregar evento de clic al área fuera del modal para cerrarlo
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.close();
    }
});

