// --- COMPORTAMIENTO ACORDEÓN PRODUCTOS ---

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            // Verificar si el click fue directamente sobre el icono de la flecha
            if (e.target.classList.contains('toggle-icon')) {
                e.preventDefault(); // Evitar navegar
                
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');

                // Alternar visualización del contenido
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                } else {
                    content.style.display = 'block';
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                }
            }
            // Si el click fue en el enlace (item-link), dejar que navegue naturalmente
        });
    });
});

// --- SLIDER PROYECTOS ---
let currentPosition = 0;
const slider = document.getElementById('projectSlider');
const cards = document.querySelectorAll('.project-card');
const cardWidth = cards[0].offsetWidth + 20; // Ancho + gap

function moveSlider(direction) {
    const maxScroll = -(cardWidth * (cards.length - 2));
    currentPosition += direction * cardWidth;

    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < maxScroll) currentPosition = maxScroll;

    slider.style.transform = `translateX(${currentPosition}px)`;
}

// --- MODAL PROYECTOS ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
let currentImageIndex = 0;

const projects = [
    { src: 'images/fondos/construccion01.jpg', caption: 'Edificio Central - Construcción estructura principal' },
    { src: 'images/fondos/construccion02.jpg', caption: 'Puente Río Sur - Cimentación y concreto de alta resistencia' },
    { src: 'images/fondos/construccion03.jpg', caption: 'Conjunto Residencial - Urbanización y pavimentación' },
    { src: 'images/fondos/fondoconstruccion02.jpg', caption: 'Centro Comercial - Plataformas de parqueo' },
    { src: 'images/fondos/fondoconstruccion03.jpg', caption: 'Vía Intermunicipal - Pavimento rígido MR4.3' },
    { src: 'images/fondos/fondoconstruccion04.jpg', caption: 'Planta Industrial - Pisos industriales de alto tráfico' }
];

function openModal(index) {
    currentImageIndex = index;
    modal.style.display = 'flex';
    modalImg.src = projects[index].src;
    modalCaption.innerHTML = projects[index].caption;
}

function closeModal() {
    modal.style.display = 'none';
}

function changeModalImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = projects.length - 1;
    if (currentImageIndex >= projects.length) currentImageIndex = 0;
    modalImg.src = projects[currentImageIndex].src;
    modalCaption.innerHTML = projects[currentImageIndex].caption;
}

// Cerrar modal al clickear fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// --- REDIRECCIÓN PAGOS ---
function irAPagar() {
    window.location.href = '#pagos'; // O la URL real de la pasarela
}