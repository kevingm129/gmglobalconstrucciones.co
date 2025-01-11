document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const links = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    // === Resaltar la Página Actual ===
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("current-page");
        } else {
            link.classList.remove("current-page");
        }
    });

    // === Scroll Suave ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // === Validación y Envío del Formulario ===
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevenir envío por defecto

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validación de los campos
        if (!name || !email || !message) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        // Enviar datos con EmailJS
        const templateParams = {
            name: name,
            email: email,
            message: message,
        };

        emailjs.send("service_ghgiirg", "template_n09mdm4", templateParams)
            .then(() => {
                alert("¡Mensaje enviado correctamente!");
                form.reset(); // Reiniciar formulario
            })
            .catch((error) => {
                alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
                console.error("Error:", error);
            });
    });

    // === Validar Email ===
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
