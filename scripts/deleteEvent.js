export function setupDeleteEvent() {
    document.getElementById('deleteEventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const eventId = document.getElementById('eventId').value;

        if (eventId) {
            const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const events = await response.json();
                if (events.length > 0) {
                    const eventId = events[0].id;
            const deleteResponse = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'DELETE'
            });
    
            if (deleteResponse.ok) {
                alert('Evento eliminado exitosamente');
                window.location.hash = '#/dashboard';
            } else {
                alert('Error al eliminar el evento');
            }
            } else {
            alert('Evento no encontrado');
            }
        } else {
            alert('Error al buscar el evento');
        }
        } else {
        alert('Por favor, ingresa el nombre del evento');
        }
    });
    document.getElementById('eventsToDelete').innerHTML = `
        <h2>Eventos disponibles para eliminar</h2>
        <ul id="eventList"></ul>
    `;
    loadEvents();
}
async function loadEvents() {
    const response = await fetch('http://localhost:3000/events');
    const events = await response.json();

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = events.map(event => `<li>${event.nameEvent} (ID: ${event.id})</li>`).join('');
}