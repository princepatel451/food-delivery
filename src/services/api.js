// API Configuration
const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

// Using Fetch API (built into browsers)
export const apiService = {
  // GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  // POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  // PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};

// Example API calls for food delivery app
export const foodAPI = {
  // Get all food items
  getFoodItems: () => apiService.get('/foods'),
  
  // Get food item by ID
  getFoodItem: (id) => apiService.get(`/foods/${id}`),
  
  // Create new order
  createOrder: (orderData) => apiService.post('/orders', orderData),
  
  // Get user orders
  getUserOrders: (userId) => apiService.get(`/orders/user/${userId}`),
  
  // Update order status
  updateOrderStatus: (orderId, status) => apiService.put(`/orders/${orderId}`, { status }),
  
  // Delete order
  deleteOrder: (orderId) => apiService.delete(`/orders/${orderId}`),
  
  // User authentication
  login: (credentials) => apiService.post('/auth/login', credentials),
  register: (userData) => apiService.post('/auth/register', userData),
  logout: () => apiService.post('/auth/logout')
};
