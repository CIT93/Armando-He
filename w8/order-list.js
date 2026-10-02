const tbody = document.getElementById('order-table-body');

tbody.addEventListener('click', function(event) {
    const target = event.target;
    const id = target.dataset.id;

    if (!id) return;

    if (target.classList.contains("delete-btn")) {
        callbacks.onDelete(id);
    }

    if (target.classList.contains("edit-btn")) {
        callbacks.onEdit(id);
    }
});


export function renderOrders(orders, callbacks) {
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
