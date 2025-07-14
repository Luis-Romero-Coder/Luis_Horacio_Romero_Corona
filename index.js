import { isAuthenticated } from './scripts/auth.js';
import { setupLogin } from './scripts/login.js';
import { setupRegister } from './scripts/register.js';
import { setupDashboard } from './scripts/dashboard.js';
import { setupCreateEvent } from './scripts/createEvent.js';
import { setupDeleteEvent } from './scripts/deleteEvent.js';



const routes = {
  '/': { page: 'app/home.html', guarded: false },
  '/login': { page: 'app/login.html', guarded: false, script: setupLogin },
  '/register': { page: 'app/register.html', guarded: false, script: setupRegister },
  '/dashboard': { page: 'app/dashboard.html', guarded: true, script: setupDashboard },
  '/create-event': { page: 'app/createEvent.html', guarded: true, script: setupCreateEvent },
  '/delete-event': { page: 'app/deleteEvent.html', guarded: true, script: setupDeleteEvent }
};


export async function navigate(path) {
  const route = routes[path];
  if (!route) {
    return render('<h1>404 - Página no encontrada</h1>');
  }
  if (route.guarded && !isAuthenticated()) {
    return window.location.hash = '#/login';
  }
  const res = await fetch(route.page);
  const html = await res.text();
  render(html);
  if (route.script) route.script();
}

function render(html) {
  document.getElementById('app').innerHTML = html;
}

window.addEventListener('hashchange', () => {
  const path = location.hash.slice(1) || '/';
  navigate(path);
});

window.addEventListener('DOMContentLoaded', () => {
  const path = location.hash.slice(1) || '/';
  navigate(path);
});
