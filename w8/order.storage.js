const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export function saveOrders(orders) {
    try {
        const json = JSON.stringify(orders);
        localStorage.setItem(LOCAL_STORAGE_KEY, json);
    } catch (error) {
        console.error("Error saving orders", error);
    }
}

export function loadOrders() {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (json === null) {
        return [];
    }

    try {
        return JSON.parse(json);
    } catch (error) {
        console.error("Error loading orders", error);
        return [];
    }
}
