
export function setupLogin() {
  const form = document.getElementById('loginForm');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const [user] = await res.json();
    if (!user) return alert('Usuario no encontrado');
    if (password !== user.password) return alert('Contraseña incorrecta');
    localStorage.setItem('user', JSON.stringify(user));
    window.location.hash = '#/dashboard';
  });
}
