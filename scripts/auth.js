export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

export function hasRole(roles = []) {
  const user = getCurrentUser();
  return roles.includes(user?.role);
}

export function logout() {
  localStorage.removeItem('user');
  window.location.hash = '#/login';
}
