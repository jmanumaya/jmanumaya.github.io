// web/js/main-app.js

import Model from '../../../js/model.js'; // Ajusta la ruta a tu archivo model.js

document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const profileDropdown = document.getElementById('profileDropdown');
    const welcomeUserName = document.getElementById('welcomeUserName');
    const userEmail = document.getElementById('userEmail');
    const buttonCerrarSesion = document.getElementById('buttonCerrarSesion');

    const model = new Model(); // Instancia tu modelo para usar el método cerrarSesion

    // Función para obtener las iniciales del email
    const getInitials = (email) => {
        if (!email) return '';
        const parts = email.split('@');
        if (parts[0]) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return '';
    };

    // Observador de estado de autenticación de Firebase
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Usuario logueado: Muestra la información
            const username = user.email.split('@')[0];
            welcomeUserName.textContent = username;
            userEmail.textContent = user.email;

            // Rellena el avatar con las iniciales del usuario
            profileAvatar.textContent = getInitials(user.email);

        } else {
            // No hay usuario logueado: Redirige de vuelta a la página de login
            console.log("No hay usuario logueado, redirigiendo a la página de inicio de sesión.");
            window.location.href = '../index.html'; // Ajusta la ruta si tu estructura de carpetas es diferente
        }
    });

    // Toggle del menú desplegable al hacer click en el avatar
    profileAvatar.addEventListener('click', (event) => {
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        event.stopPropagation(); // Evita que el clic se propague al documento
    });

    // Ocultar el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!profileDropdown.contains(event.target) && event.target !== profileAvatar) {
            profileDropdown.style.display = 'none';
        }
    });

    // Event listener para el botón de cerrar sesión
    buttonCerrarSesion.addEventListener('click', async () => {
        try {
            await model.cerrarSesion(); // Llama al método de cerrar sesión de tu modelo
            console.log("Sesión cerrada exitosamente.");
            // firebase.auth().onAuthStateChanged() se encargará de la redirección
            window.location.href = '../index.html'; // Ajusta la ruta a tu página de login
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            alert("Error al cerrar sesión: " + error.message);
        }
    });
});