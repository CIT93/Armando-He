const tbody = document.getElementById('order-table-body');

// PASO 5: Event Delegation
tbody.addEventListener('click', function(event) {
    const target = event.target;

    // obtener el id del botón clickeado
    const id = target.dataset.id;

    // si no hay id, significa que no clickeaste un botón
    if (!id) return;

    // prueba temporal: mostrar el id en consola
    console.log("Clicked button with ID:", id);
});

export function renderOrders(orders) {
    tbody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.timestamp}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
