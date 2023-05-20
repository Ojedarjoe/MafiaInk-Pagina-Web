// Espera a que el contenido de la página se haya cargado completamente
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el elemento del modal por su ID
    const modal = document.getElementById("modal");

    // Obtiene el botón "Agregar Cita" por su ID
    const addButton = document.getElementById("BotonCita");

    // Obtiene el botón de cierre del modal por su clase
    const closeButton = document.getElementsByClassName("close")[0];

    // Obtiene el formulario de la cita por su ID
    const citaForm = document.getElementById("citaForm");

    // Agrega un evento de clic al botón "Agregar Cita"
    addButton.addEventListener("click", function() {
        // Muestra el modal estableciendo el estilo de visualización en "block"
        modal.style.display = "block";
    });

    // Agrega un evento de clic al botón de cierre del modal
    closeButton.addEventListener("click", function() {
        // Oculta el modal estableciendo el estilo de visualización en "none"
        modal.style.display = "none";
    });

    // Agrega un evento de envío al formulario de la cita
    citaForm.addEventListener("submit", function(event) {
        // Evita que el formulario se envíe y actualice la página
        event.preventDefault();

        // Obtiene los valores ingresados por el usuario en los campos del formulario
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        const cliente = document.getElementById("cliente").value;
        const tatuador = document.getElementById("tatuador").value;

        // Obtiene la tabla existente en la página
        const tabla = document.querySelector("table");

        // Crea una nueva fila en la tabla
        const nuevaFila = tabla.insertRow(-1);

        // Inserta las celdas en la nueva fila y establece el contenido con los valores ingresados
        const celdaFecha = nuevaFila.insertCell(0);
        const celdaHora = nuevaFila.insertCell(1);
        const celdaCliente = nuevaFila.insertCell(2);
        const celdaTatuador = nuevaFila.insertCell(3);

        celdaFecha.innerHTML = fecha;
        celdaHora.innerHTML = hora;
        celdaCliente.innerHTML = cliente;
        celdaTatuador.innerHTML = tatuador;

        // Oculta el modal
        modal.style.display = "none";

        // Restablece los valores del formulario
        citaForm.reset();
    });
});

// Obtener referencia al campo de fecha
const fechaInput = document.getElementById('fecha');

// Agregar evento de cambio al campo de fecha
fechaInput.addEventListener('input', function () {
  let fecha = this.value;
  if (fecha.length === 2 || fecha.length === 5) {
    fecha += '/';
  }
  this.value = fecha;
});

// Obtener referencia al campo de hora
const horaInput = document.getElementById('hora');

// Agregar evento de cambio al campo de hora
horaInput.addEventListener('input', function () {
  let hora = this.value;
  if (hora.length === 2) {
    hora += ':';
  }
  this.value = hora;
});
