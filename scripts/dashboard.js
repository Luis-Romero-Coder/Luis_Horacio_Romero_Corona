import { getCurrentUser, logout } from './auth.js';


export async function setupDashboard() {
  const user = getCurrentUser();
  if (!user) {
    alert('No estás logueado');
    window.location.hash = '#/login';
    return;
  }
  document.getElementById('welcomeMessage').textContent = `Bienvenido, ${user.username}`;
  const roleContent = document.getElementById('roleContent');

  const response = await fetch('http://localhost:3000/events');
  const data = await response.json();

  switch (user.role) {
    case 'visitante':
      roleContent.innerHTML = `
      <p>Puedes ver los eventos.</p>
      <ul>
        ${data.map(event => `<li>${event.nameEvent} - Fecha: ${event.date} - Descripción: ${event.description} - Cupos: ${event.participants}/${event.capacity} <button id="participateBtn">Participar</button> </li>` ).join('')}
      </ul>
      `;
      break;
    case 'admin':
      roleContent.innerHTML = `
      <p> Puedes gestionar el sistema.</p>
      <ul>
        ${data.map(event => `<li>${event.nameEvent} - Fecha: ${event.date} - Descripción: ${event.description} - Cupos: ${event.participants}/${event.capacity} </li>` ).join('')}
      </ul>
      <button id="createEventBtn">Crear Evento</button>
      <button id="deleteEventBtn">Eliminar Evento</button>
      `;
      document.getElementById('createEventBtn').addEventListener('click', () => {
        window.location.hash = '#/create-event';
      });
      document.getElementById('deleteEventBtn').addEventListener('click', async () => {
        window.location.hash = '#/delete-event';
      });
      break;
    default:
      roleContent.innerHTML = `<p>Rol no reconocido.</p>`;
  }
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
  
}
