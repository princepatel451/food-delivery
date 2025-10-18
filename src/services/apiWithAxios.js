import axios from 'axios';

// Create axios instance with default configuration
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - runs before every request
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response.data;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// API functions using axios
export const foodAPI = {
  // Get all food items
  getFoodItems: async () => {
    try {
      return await api.get('/foods');
    } catch (error) {
      throw new Error('Failed to fetch food items');
    }
  },

  // Get food item by ID
  getFoodItem: async (id) => {
    try {
      return await api.get(`/foods/${id}`);
    } catch (error) {
      throw new Error('Failed to fetch food item');
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      return await api.post('/orders', orderData);
    } catch (error) {
      throw new Error('Failed to create order');
    }
  },

  // Get user orders
  getUserOrders: async (userId) => {
    try {
      return await api.get(`/orders/user/${userId}`);
    } catch (error) {
      throw new Error('Failed to fetch user orders');
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      return await api.put(`/orders/${orderId}`, { status });
    } catch (error) {
      throw new Error('Failed to update order status');
    }
  },

  // Delete order
  deleteOrder: async (orderId) => {
    try {
      return await api.delete(`/orders/${orderId}`);
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  },

  // User authentication
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store token if login successful
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Store token if registration successful
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Upload file (example for food images)
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }
};

// Export the axios instance for custom requests
export { api };

// Example of using the API in a component:
/*
import { foodAPI } from '../services/apiWithAxios';

const MyComponent = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const data = await foodAPI.getFoodItems();
      setFoods(data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        foods.map(food => (
          <div key={food.id}>{food.name}</div>
        ))
      )}
    </div>
  );
};
*/
