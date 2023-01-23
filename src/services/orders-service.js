import { API_URL } from "../config"
// create a service to fetch orders with isLoading and error states

const getOrders = () => {
    return fetch(`${API_URL}/orders`)
        .then(response => response.json())
        .then(data => data)
        
}

export { getOrders }