export function setupCreateEvent() {

    document.getElementById('createEventForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEvent = document.getElementById('nameEvent').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const capacity = parseInt(document.getElementById('capacity').value, 10);

    if (nameEvent && date && description && capacity) {
        const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nameEvent, date, description, capacity, participants: 0 })
        });

        if (response.ok) {
        alert('Evento creado exitosamente');
        window.location.hash = '#/dashboard';
        } else {
        alert('Error al crear el evento');
        }
    } else {
        alert('Por favor, completa todos los campos');
    }
    });
}
