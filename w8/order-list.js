const tbody = document.getElementById('order-table-body');

export function renderOrders(orders) {
    tbody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.date}</td>
            <td>${order.qty}</td>
            <td>${order.size}</td>
            <td>$${order.totalPrice}</td>
            <td>—</td>
        `;
        tbody.appendChild(row);
    });
}
