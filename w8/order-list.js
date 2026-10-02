const tbody = document.getElementById('order-table-body');

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
