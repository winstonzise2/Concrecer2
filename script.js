document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COMPORTAMIENTO ACORDEÓN PRODUCTOS ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            // Solo actúa si se hace clic en el icono de la flecha
            if (e.target.classList.contains('toggle-icon')) {
                e.preventDefault(); 
                
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');

                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                } else {
                    content.style.display = 'block';
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                }
            }
        });
    });

    // --- 2. LÓGICA DEL MODAL CON NAVEGACIÓN ---
    const modalImagen = document.querySelector('.modal-image');
    const modalTitulo = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-description');
    const botonesProyecto = Array.from(document.querySelectorAll('.btn-proyecto'));
    
    let currentIndex = 0; // Almacena el índice del proyecto abierto

    // Función para actualizar el contenido del modal de forma dinámica
    const updateModal = (index) => {
        // Efecto infinito: si pasa del último, vuelve al primero y viceversa
        if (index < 0) index = botonesProyecto.length - 1;
        if (index >= botonesProyecto.length) index = 0;
        
        currentIndex = index;
        const botonActual = botonesProyecto[currentIndex];
        
        // Extraer datos del botón (versión fondo, título y el texto del <p>)
        const rutaFondo = botonActual.getAttribute('data-img');
        const titulo = botonActual.getAttribute('data-title');
        const descripcion = botonActual.querySelector('p').innerText;

        // Actualizar elementos del modal
        modalImagen.src = ""; // Limpiar rastro de imagen anterior
        modalImagen.setAttribute('src', rutaFondo);
        modalTitulo.innerText = titulo;
        modalDesc.innerText = descripcion;
    };

    // Evento para abrir el modal desde el Swiper
    botonesProyecto.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            updateModal(index);
        });
    });

    // Eventos para las flechas del Modal
    const btnPrev = document.getElementById('modalPrev');
    const btnNext = document.getElementById('modalNext');

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            updateModal(currentIndex - 1);
        });

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            updateModal(currentIndex + 1);
        });
    }

    // --- 3. NAVEGACIÓN POR TECLADO (Accesibilidad) ---
    document.addEventListener('keydown', (e) => {
        // Solo si el modal está visible (basado en el hash de la URL o clase)
        if (window.location.hash === "#modal") {
            if (e.key === "ArrowLeft") updateModal(currentIndex - 1);
            if (e.key === "ArrowRight") updateModal(currentIndex + 1);
        }
    });

});

// --- 4. REDIRECCIÓN PAGOS ---
function irAPagar() {
    window.location.href = '#pagos'; 
}
